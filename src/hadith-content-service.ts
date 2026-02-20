import { CATEGORIES, CONTEXTS, HADITH_ENTRIES } from './data/hadith-entries.js';
import type { DailyHadith, HadithCategory, HadithContext, HadithEntry } from './types.js';

export const getAllHadithEntries = (): ReadonlyArray<HadithEntry> => {
  return HADITH_ENTRIES;
};

export const getHadithEntryById = (id: string): HadithEntry | undefined => {
  return HADITH_ENTRIES.find((hadithEntry) => hadithEntry.id === id);
};

export const getHadithEntriesByCategory = (categoryId: string): ReadonlyArray<HadithEntry> => {
  return HADITH_ENTRIES.filter((hadithEntry) => hadithEntry.category === categoryId);
};

export const getHadithEntriesByContext = (contextId: string): ReadonlyArray<HadithEntry> => {
  return HADITH_ENTRIES.filter((hadithEntry) => hadithEntry.context === contextId);
};

export const searchHadithEntries = (query: string): ReadonlyArray<HadithEntry> => {
  const lowerQuery = query.toLowerCase();
  return HADITH_ENTRIES.filter(
    (hadithEntry) =>
      hadithEntry.title.toLowerCase().includes(lowerQuery) ||
      hadithEntry.arabic.includes(query) ||
      hadithEntry.transliteration?.toLowerCase().includes(lowerQuery) ||
      hadithEntry.translation.toLowerCase().includes(lowerQuery) ||
      hadithEntry.category.toLowerCase().includes(lowerQuery) ||
      hadithEntry.context?.toLowerCase().includes(lowerQuery),
  );
};

export const getCategories = (): ReadonlyArray<HadithCategory> => {
  return CATEGORIES;
};

export const getContexts = (): ReadonlyArray<HadithContext> => {
  return CONTEXTS;
};

export const getDailyHadith = (): DailyHadith => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24,
  );
  const hadithIndex = dayOfYear % HADITH_ENTRIES.length;
  const hadith = HADITH_ENTRIES[hadithIndex];
  if (!hadith) {
    throw new Error('No hadith entries available');
  }

  const dateStr = today.toISOString().split('T')[0];
  if (!dateStr) {
    throw new Error('Invalid date');
  }

  return {
    hadith,
    date: dateStr,
  };
};

export const getHadithEntriesByTime = (time: string): ReadonlyArray<HadithEntry> => {
  return HADITH_ENTRIES.filter((hadithEntry) => hadithEntry.times?.includes(time));
};

export const getRandomHadithEntry = (): HadithEntry => {
  const randomIndex = Math.floor(Math.random() * HADITH_ENTRIES.length);
  const hadith = HADITH_ENTRIES[randomIndex];
  if (!hadith) {
    throw new Error('No hadith entries available');
  }
  return hadith;
};
