import { duaBlue, duaBold, duaDim } from './theme.js';
import type { Hadith } from '../types.js';

export const formatHadith = (hadith: Hadith): string => {
  let output = '';
  output += `${duaBold(duaBlue('Hadith'))}\n`;
  output += `${duaDim(`${hadith.reference} (${hadith.collection})`)}` + '\n\n';
  output += hadith.text + '\n';
  return output;
};
