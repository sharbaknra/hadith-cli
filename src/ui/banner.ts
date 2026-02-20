import { duaBlue, duaBold, PRAYER_HANDS_EMOJI } from './theme.js';

export const getBanner = (): string => {
  return duaBlue(
    `${PRAYER_HANDS_EMOJI} ${duaBold('Dua CLI')} - Islamic Supplications\n`
  );
};
