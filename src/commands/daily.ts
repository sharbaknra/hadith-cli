import { getDailyCollectionHadith } from '../hadith-service.js';
import { formatHadith } from '../ui/hadith-formatter.js';

export interface DailyCommandOptions {
  json?: boolean;
  plain?: boolean;
}

export const dailyCommand = async (options: DailyCommandOptions = {}): Promise<void> => {
  const hadith = await getDailyCollectionHadith();

  if (options.json) {
    console.log(JSON.stringify(hadith, null, 2));
    return;
  }

  console.log(formatHadith(hadith));
};
