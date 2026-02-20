import { getRandomHadith } from '../hadith-service.js';
import { formatHadith } from '../ui/hadith-formatter.js';

export const startupCommand = async (): Promise<void> => {
  const hadith = await getRandomHadith();
  console.log(formatHadith(hadith));
};
