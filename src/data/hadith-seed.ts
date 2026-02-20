import type { Hadith } from '../types.js';

export const HADITH_SEED: ReadonlyArray<Hadith> = [
  {
    id: 'seed-bukhari-1',
    collection: 'Sahih al-Bukhari',
    hadithNumber: 1,
    text: "Actions are judged by intentions, and every person will get what they intended.",
    reference: 'Sahih al-Bukhari 1',
  },
  {
    id: 'seed-muslim-2699',
    collection: 'Sahih Muslim',
    hadithNumber: 2699,
    text:
      'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.',
    reference: 'Sahih Muslim 2699',
  },
  {
    id: 'seed-riyad-13',
    collection: 'Riyad as-Salihin',
    hadithNumber: 13,
    text: 'None of you truly believes until he loves for his brother what he loves for himself.',
    reference: 'Riyad as-Salihin 13',
  },
  {
    id: 'seed-tirmidhi-1956',
    collection: 'Jami at-Tirmidhi',
    hadithNumber: 1956,
    text: 'The most beloved of people to Allah are those who are most beneficial to people.',
    reference: 'Jami at-Tirmidhi 1956',
  },
] as const;
