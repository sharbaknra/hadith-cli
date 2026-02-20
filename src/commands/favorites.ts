import { addFavoriteHadith, getConfig, removeFavoriteHadith } from '../config.js';
import { getHadithEntryById } from '../hadith-content-service.js';
import { getBanner } from '../ui/banner.js';
import { formatHadithEntryList } from '../ui/formatter.js';
import type { FormatOptions } from '../ui/formatter.js';

export interface FavoritesCommandOptions {
  add?: string;
  remove?: string;
  list?: boolean;
  json?: boolean;
  plain?: boolean;
}

export const favoritesCommand = (options: FavoritesCommandOptions = {}): void => {
  const config = getConfig();

  if (options.add) {
    const hadith = getHadithEntryById(options.add);
    if (!hadith) {
      console.error(`Error: Hadith entry with ID "${options.add}" not found.`);
      process.exit(1);
    }
    addFavoriteHadith(options.add);
    console.log(`Added "${hadith.title}" to favorites.`);
    return;
  }

  if (options.remove) {
    const hadith = getHadithEntryById(options.remove);
    if (!hadith) {
      console.error(`Error: Hadith entry with ID "${options.remove}" not found.`);
      process.exit(1);
    }
    removeFavoriteHadith(options.remove);
    console.log(`Removed "${hadith.title}" from favorites.`);
    return;
  }

  // List favorites
  const favoriteIds = config.favoriteHadiths ?? [];
  const favoriteHadiths = favoriteIds
    .map((id) => getHadithEntryById(id))
    .filter((hadith): hadith is NonNullable<typeof hadith> => hadith !== undefined);

  if (options.json) {
    console.log(JSON.stringify(favoriteHadiths, null, 2));
    return;
  }

  if (!options.plain) {
    console.log(getBanner());
  }

  if (favoriteHadiths.length === 0) {
    console.log(
      'No favorite hadith entries yet. Use "hadees-cli favorites --add <id>" to add some.',
    );
    return;
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

  console.log(`Your favorite hadith entries (${favoriteHadiths.length}):\n`);
  console.log(formatHadithEntryList(favoriteHadiths, formatOptions));
};
