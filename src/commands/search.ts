import { searchDuas } from '../dua-service.js';
import { formatDuaList } from '../ui/formatter.js';
import { getBanner } from '../ui/banner.js';
import { getConfig } from '../config.js';
import type { FormatOptions } from '../ui/formatter.js';

export interface SearchCommandOptions {
  query: string;
  json?: boolean;
  plain?: boolean;
}

export const searchCommand = (options: SearchCommandOptions): void => {
  const results = searchDuas(options.query);
  const config = getConfig();

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  if (!options.plain) {
    console.log(getBanner());
  }

  const formatOptions: FormatOptions = {
    json: options.json ?? undefined,
    compact: options.plain ?? undefined,
    showArabic: config.preferredLanguage === 'all' || config.preferredLanguage === 'arabic' ? true : undefined,
    showTransliteration:
      config.preferredLanguage === 'all' || config.preferredLanguage === 'transliteration' ? true : undefined,
    showTranslation:
      config.preferredLanguage === 'all' || config.preferredLanguage === 'translation' ? true : undefined,
  };

  if (results.length === 0) {
    console.log(`No duas found matching "${options.query}"`);
    return;
  }

  console.log(`Found ${results.length} dua(s) matching "${options.query}":\n`);
  console.log(formatDuaList(results, formatOptions));
};
