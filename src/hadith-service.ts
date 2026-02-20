import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { HADITH_SEED } from './data/hadith-seed.js';
import type { CollectionHadith } from './types.js';

const EDITIONS_URL =
  'https://raw.githubusercontent.com/fawazahmed0/hadith-api/refs/heads/1/editions.json';
const CACHE_FILE_NAME = 'hadith-cache.json';
const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

interface EditionCollection {
  readonly name: string;
  readonly language: string;
  readonly link?: string;
  readonly linkmin?: string;
}

interface EditionBook {
  readonly name: string;
  readonly collection: ReadonlyArray<EditionCollection>;
}

type EditionsIndex = Record<string, EditionBook>;

interface HadithApiRecord {
  readonly hadithnumber?: number;
  readonly text?: string;
}

interface HadithApiEdition {
  readonly metadata?: {
    readonly name?: string;
  };
  readonly hadiths?: ReadonlyArray<HadithApiRecord>;
}

interface HadithCachePayload {
  readonly updatedAt: string;
  readonly hadiths: ReadonlyArray<CollectionHadith>;
}

const resolveCachePath = (): string => {
  const baseDir = process.env.HADEES_CLI_CONFIG_DIR ?? join(homedir(), '.config', 'hadees-cli');
  return join(baseDir, CACHE_FILE_NAME);
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return (await response.json()) as T;
};

const normalizeText = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\uFFFD/g, '')
    .trim();
};

const scrapeAllEnglishHadiths = async (): Promise<ReadonlyArray<CollectionHadith>> => {
  const editions = await fetchJson<EditionsIndex>(EDITIONS_URL);

  const englishEditions = Object.values(editions)
    .flatMap((book) => book.collection)
    .filter((entry) => entry.language.toLowerCase() === 'english');

  const perEdition = await Promise.all(
    englishEditions.map(async (entry) => {
      const url = entry.linkmin ?? entry.link;
      if (!url) {
        return [] as CollectionHadith[];
      }

      const payload = await fetchJson<HadithApiEdition>(url);
      const collectionName = payload.metadata?.name ?? entry.name;
      const hadiths = payload.hadiths ?? [];

      return hadiths
        .filter((item) => typeof item.text === 'string' && typeof item.hadithnumber === 'number')
        .map((item) => {
          const hadithNumber = item.hadithnumber as number;
          const text = normalizeText(item.text as string);

          return {
            id: `${entry.name}-${hadithNumber}`,
            collection: collectionName,
            hadithNumber,
            text,
            reference: `${collectionName} ${hadithNumber}`,
          } satisfies CollectionHadith;
        })
        .filter((item) => item.text.length > 0);
    }),
  );

  return perEdition.flat();
};

const readHadithCache = async (): Promise<HadithCachePayload | undefined> => {
  try {
    const raw = await readFile(resolveCachePath(), 'utf8');
    return JSON.parse(raw) as HadithCachePayload;
  } catch {
    return undefined;
  }
};

const writeHadithCache = async (hadiths: ReadonlyArray<CollectionHadith>): Promise<void> => {
  const cachePath = resolveCachePath();
  await mkdir(dirname(cachePath), { recursive: true });
  await writeFile(
    cachePath,
    JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        hadiths,
      } satisfies HadithCachePayload,
      null,
      2,
    ),
    'utf8',
  );
};

const isFresh = (updatedAt: string): boolean => {
  const lastUpdated = Date.parse(updatedAt);
  if (Number.isNaN(lastUpdated)) {
    return false;
  }
  return Date.now() - lastUpdated < CACHE_MAX_AGE_MS;
};

const pickRandom = (hadiths: ReadonlyArray<CollectionHadith>): CollectionHadith => {
  const index = Math.floor(Math.random() * hadiths.length);
  const hadith = hadiths[index];
  if (!hadith) {
    throw new Error('No hadith available');
  }
  return hadith;
};

export const syncHadithCache = async (): Promise<number> => {
  const hadiths = await scrapeAllEnglishHadiths();
  await writeHadithCache(hadiths);
  return hadiths.length;
};

export const getRandomHadith = async (): Promise<CollectionHadith> => {
  const cached = await readHadithCache();
  if (cached && cached.hadiths.length > 0 && isFresh(cached.updatedAt)) {
    return pickRandom(cached.hadiths);
  }

  try {
    const count = await syncHadithCache();
    if (count > 0) {
      const refreshed = await readHadithCache();
      if (refreshed && refreshed.hadiths.length > 0) {
        return pickRandom(refreshed.hadiths);
      }
    }
  } catch {
    // Fall back to seed hadiths so startup still shows something offline.
  }

  if (cached && cached.hadiths.length > 0) {
    return pickRandom(cached.hadiths);
  }

  return pickRandom(HADITH_SEED);
};
