import { getConfig } from '../config.js';
import { getRandomHadithEntry } from '../hadith-content-service.js';
import { getBanner } from '../ui/banner.js';
import { formatHadithEntry } from '../ui/formatter.js';
import type { FormatOptions } from '../ui/formatter.js';

export interface RandomCommandOptions {
  json?: boolean;
  plain?: boolean;
}

export const randomCommand = (options: RandomCommandOptions = {}): void => {
  const hadith = getRandomHadithEntry();
  const config = getConfig();

  if (options.json) {
    console.log(JSON.stringify(hadith, null, 2));
    return;
  }

  if (!options.plain) {
    console.log(getBanner());
  }

  const formatOptions: FormatOptions = {
    json: options.json ?? undefined,
    compact: options.plain ?? undefined,
    showArabic:
      config.preferredLanguage === 'all' || config.preferredLanguage === 'arabic'
        ? true
        : undefined,
    showTransliteration:
      config.preferredLanguage === 'all' || config.preferredLanguage === 'transliteration'
        ? true
        : undefined,
    showTranslation:
      config.preferredLanguage === 'all' || config.preferredLanguage === 'translation'
        ? true
        : undefined,
  };

  console.log(formatHadithEntry(hadith, formatOptions));
};
