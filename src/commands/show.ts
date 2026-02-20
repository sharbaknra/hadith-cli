import { getDuaById } from '../dua-service.js';
import { formatDua } from '../ui/formatter.js';
import { getBanner } from '../ui/banner.js';
import { getConfig } from '../config.js';
import type { FormatOptions } from '../ui/formatter.js';

export interface ShowCommandOptions {
  id: string;
  json?: boolean;
  plain?: boolean;
}

export const showCommand = (options: ShowCommandOptions): void => {
  const dua = getDuaById(options.id);
  const config = getConfig();

  if (!dua) {
    console.error(`Error: Dua with ID "${options.id}" not found.`);
    process.exit(1);
  }

  if (options.json) {
    console.log(JSON.stringify(dua, null, 2));
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

  console.log(formatDua(dua, formatOptions));
};
