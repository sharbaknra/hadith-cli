import { getConfig } from '../config.js';
import { getCategories, getHadithEntriesByCategory } from '../hadith-content-service.js';
import { getBanner } from '../ui/banner.js';
import { formatHadithEntryList } from '../ui/formatter.js';
import type { FormatOptions } from '../ui/formatter.js';

export interface CategoryCommandOptions {
  category?: string;
  list?: boolean;
  json?: boolean;
  plain?: boolean;
}

export const categoryCommand = (options: CategoryCommandOptions = {}): void => {
  const config = getConfig();

  if (options.list || (!options.category && !options.json)) {
    const categories = getCategories();

    if (options.json) {
      console.log(JSON.stringify(categories, null, 2));
      return;
    }

    if (!options.plain) {
      console.log(getBanner());
    }

    console.log('Available categories:\n');
    for (const cat of categories) {
      const hadithEntries = getHadithEntriesByCategory(cat.id);
      console.log(`  ${cat.name} (${hadithEntries.length} entries)`);
      if (cat.description) {
        console.log(`    ${cat.description}`);
      }
    }
    return;
  }

  if (!options.category) {
    console.error('Error: Category name is required. Use --list to see available categories.');
    process.exit(1);
  }

  const hadithEntries = getHadithEntriesByCategory(options.category);

  if (options.json) {
    console.log(JSON.stringify(hadithEntries, null, 2));
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

  if (hadithEntries.length === 0) {
    console.log(`No hadith entries found in category "${options.category}"`);
    return;
  }

  console.log(`Hadith entries in category "${options.category}" (${hadithEntries.length}):\n`);
  console.log(formatHadithEntryList(hadithEntries, formatOptions));
};
