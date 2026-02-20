import { DUAS, CATEGORIES, CONTEXTS } from './data/duas.js';
import type { Dua, DuaCategory, DuaContext, DailyDua } from './types.js';

export const getAllDuas = (): ReadonlyArray<Dua> => {
  return DUAS;
};

export const getDuaById = (id: string): Dua | undefined => {
  return DUAS.find((dua) => dua.id === id);
};

export const getDuasByCategory = (categoryId: string): ReadonlyArray<Dua> => {
  return DUAS.filter((dua) => dua.category === categoryId);
};

export const getDuasByContext = (contextId: string): ReadonlyArray<Dua> => {
  return DUAS.filter((dua) => dua.context === contextId);
};

export const searchDuas = (query: string): ReadonlyArray<Dua> => {
  const lowerQuery = query.toLowerCase();
  return DUAS.filter(
    (dua) =>
      dua.title.toLowerCase().includes(lowerQuery) ||
      dua.arabic.includes(query) ||
      dua.transliteration?.toLowerCase().includes(lowerQuery) ||
      dua.translation.toLowerCase().includes(lowerQuery) ||
      dua.category.toLowerCase().includes(lowerQuery) ||
      dua.context?.toLowerCase().includes(lowerQuery)
  );
};

export const getCategories = (): ReadonlyArray<DuaCategory> => {
  return CATEGORIES;
};

export const getContexts = (): ReadonlyArray<DuaContext> => {
  return CONTEXTS;
};

export const getDailyDua = (): DailyDua => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
  const duaIndex = dayOfYear % DUAS.length;
  const dua = DUAS[duaIndex];
  if (!dua) {
    throw new Error('No duas available');
  }

  const dateStr = today.toISOString().split('T')[0];
  if (!dateStr) {
    throw new Error('Invalid date');
  }

  return {
    dua,
    date: dateStr,
  };
};

export const getDuasByTime = (time: string): ReadonlyArray<Dua> => {
  return DUAS.filter((dua) => dua.times?.includes(time));
};

export const getRandomDua = (): Dua => {
  const randomIndex = Math.floor(Math.random() * DUAS.length);
  const dua = DUAS[randomIndex];
  if (!dua) {
    throw new Error('No duas available');
  }
  return dua;
};
