import type { CollectionHadith } from '../types.js';
import { hadithBlue, hadithBold, hadithDim } from './theme.js';

export const formatHadith = (hadith: CollectionHadith): string => {
  let output = '';
  output += `${hadithBold(hadithBlue('Hadith'))}\n`;
  output += `${hadithDim(`${hadith.reference} (${hadith.collection})`)}\n\n`;
  output += `${hadith.text}\n`;
  return output;
};
