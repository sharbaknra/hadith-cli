import { readFile, writeFile } from 'node:fs/promises';
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HADITH_SEED } from './data/hadith-seed.js';
import { getRandomHadith, syncHadithCache } from './hadith-service.js';

vi.mock('node:fs/promises', () => {
  return {
    mkdir: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn(),
    writeFile: vi.fn().mockResolvedValue(undefined),
  };
});

describe('hadith-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.HADITH_CLI_CONFIG_DIR = '/tmp/hadith-cli-tests';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back to seed hadiths when cache/network are unavailable', async () => {
    (readFile as unknown as Mock).mockRejectedValue(new Error('cache missing'));
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const hadith = await getRandomHadith();

    expect(HADITH_SEED.some((entry) => entry.id === hadith.id)).toBe(true);
  });

  it('scrapes english editions and writes cache', async () => {
    const editionsPayload = {
      demo: {
        name: 'Demo Book',
        collection: [
          {
            name: 'eng-demo',
            language: 'English',
            linkmin: 'https://example.test/eng-demo.min.json',
          },
          {
            name: 'ara-demo',
            language: 'Arabic',
            linkmin: 'https://example.test/ara-demo.min.json',
          },
        ],
      },
    };

    const editionPayload = {
      metadata: {
        name: 'Demo Collection',
      },
      hadiths: [
        {
          hadithnumber: 42,
          text: '  A  test    hadith.  ',
        },
      ],
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => editionsPayload,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => editionPayload,
      });

    vi.stubGlobal('fetch', fetchMock);

    const count = await syncHadithCache();

    expect(count).toBe(1);
    expect(writeFile).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const writeArgs = (writeFile as unknown as Mock).mock.calls[0];
    expect(writeArgs).toBeDefined();

    const payload = String(writeArgs?.[1] ?? '');
    expect(payload).toContain('"id": "eng-demo-42"');
    expect(payload).toContain('"collection": "Demo Collection"');
    expect(payload).toContain('"text": "A test hadith."');
  });
});
