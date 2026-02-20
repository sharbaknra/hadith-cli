import { syncHadithCache } from '../hadith-service.js';

export const scrapeHadithCommand = async (): Promise<void> => {
  const count = await syncHadithCache();
  console.log(`Scraped ${count} hadith entries into local cache.`);
};
