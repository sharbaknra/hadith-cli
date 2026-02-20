import { BOOK_EMOJI, hadithBlue, hadithBold } from './theme.js';

export const getBanner = (): string => {
  return hadithBlue(`${BOOK_EMOJI} ${hadithBold('Hadith CLI')} - Islamic Hadith Browser\n`);
};
