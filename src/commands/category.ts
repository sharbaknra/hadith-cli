import { getDuasByCategory, getCategories } from '../dua-service.js';
import { formatDuaList } from '../ui/formatter.js';
import { getBanner } from '../ui/banner.js';
import { getConfig } from '../config.js';
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
    categories.forEach((cat) => {
      const duas = getDuasByCategory(cat.id);
      console.log(`  ${cat.name} (${duas.length} duas)`);
      if (cat.description) {
        console.log(`    ${cat.description}`);
      }
    });
    return;
  }

  if (!options.category) {
    console.error('Error: Category name is required. Use --list to see available categories.');
    process.exit(1);
  }

  const duas = getDuasByCategory(options.category);

  if (options.json) {
    console.log(JSON.stringify(duas, null, 2));
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

  if (duas.length === 0) {
    console.log(`No duas found in category "${options.category}"`);
    return;
  }

  console.log(`Duas in category "${options.category}" (${duas.length}):\n`);
  console.log(formatDuaList(duas, formatOptions));
};
