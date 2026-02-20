import { getAllDuas, getDuaById } from '../dua-service.js';
import { formatDuaList } from '../ui/formatter.js';
import { getBanner } from '../ui/banner.js';
import { getConfig, addFavoriteDua, removeFavoriteDua } from '../config.js';
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
    const dua = getDuaById(options.add);
    if (!dua) {
      console.error(`Error: Dua with ID "${options.add}" not found.`);
      process.exit(1);
    }
    addFavoriteDua(options.add);
    console.log(`Added "${dua.title}" to favorites.`);
    return;
  }

  if (options.remove) {
    const dua = getDuaById(options.remove);
    if (!dua) {
      console.error(`Error: Dua with ID "${options.remove}" not found.`);
      process.exit(1);
    }
    removeFavoriteDua(options.remove);
    console.log(`Removed "${dua.title}" from favorites.`);
    return;
  }

  // List favorites
  const favoriteIds = config.favoriteDuas ?? [];
  const favoriteDuas = favoriteIds
    .map((id) => getDuaById(id))
    .filter((dua): dua is NonNullable<typeof dua> => dua !== undefined);

  if (options.json) {
    console.log(JSON.stringify(favoriteDuas, null, 2));
    return;
  }

  if (!options.plain) {
    console.log(getBanner());
  }

  if (favoriteDuas.length === 0) {
    console.log('No favorite duas yet. Use "dua favorites --add <id>" to add some.');
    return;
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

  console.log(`Your favorite duas (${favoriteDuas.length}):\n`);
  console.log(formatDuaList(favoriteDuas, formatOptions));
};
