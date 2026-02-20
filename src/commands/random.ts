import { getRandomHadith } from '../hadith-service.js';
import { formatHadith } from '../ui/hadith-formatter.js';

export interface RandomCommandOptions {
  json?: boolean;
  plain?: boolean;
}

export const randomCommand = async (options: RandomCommandOptions = {}): Promise<void> => {
  const hadith = await getRandomHadith();

  if (options.json) {
    console.log(JSON.stringify(hadith, null, 2));
    return;
  }

  console.log(formatHadith(hadith));
};
