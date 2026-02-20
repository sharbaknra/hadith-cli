import pc from 'picocolors';
import type { Dua } from '../types.js';
import { duaBlue, duaBold, duaDim, duaGreen, duaYellow, STAR_EMOJI } from './theme.js';
import { isFavoriteDua } from '../config.js';

export interface FormatOptions {
  showArabic?: boolean | undefined;
  showTransliteration?: boolean | undefined;
  showTranslation?: boolean | undefined;
  showReference?: boolean | undefined;
  showCategory?: boolean | undefined;
  showContext?: boolean | undefined;
  compact?: boolean | undefined;
  json?: boolean | undefined;
}

const DEFAULT_FORMAT_OPTIONS: FormatOptions = {
  showArabic: true,
  showTransliteration: true,
  showTranslation: true,
  showReference: true,
  showCategory: true,
  showContext: true,
  compact: false,
  json: false,
};

export const formatDua = (dua: Dua, options: FormatOptions = {}): string => {
  const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };

  if (opts.json) {
    return JSON.stringify(dua, null, 2);
  }

  const isFavorite = isFavoriteDua(dua.id);
  const favoriteMarker = isFavorite ? ` ${STAR_EMOJI}` : '';

  let output = '';

  if (!opts.compact) {
    output += '\n';
  }

  // Title
  output += duaBold(duaBlue(`${dua.title}${favoriteMarker}`));
  if (opts.showCategory && dua.category) {
    output += ` ${duaDim(`[${dua.category}]`)}`;
  }
  if (opts.showContext && dua.context) {
    output += ` ${duaDim(`(${dua.context})`)}`;
  }
  output += '\n';

  if (!opts.compact) {
    output += '\n';
  }

  // Arabic
  if (opts.showArabic && dua.arabic) {
    output += duaGreen(dua.arabic);
    output += '\n';
    if (!opts.compact) {
      output += '\n';
    }
  }

  // Transliteration
  if (opts.showTransliteration && dua.transliteration) {
    output += duaYellow(dua.transliteration);
    output += '\n';
    if (!opts.compact) {
      output += '\n';
    }
  }

  // Translation
  if (opts.showTranslation && dua.translation) {
    output += duaDim(dua.translation);
    output += '\n';
    if (!opts.compact) {
      output += '\n';
    }
  }

  // Reference
  if (opts.showReference && dua.reference) {
    output += duaDim(`Reference: ${dua.reference}`);
    output += '\n';
  }

  if (!opts.compact) {
    output += '\n';
  }

  return output;
};

export const formatDuaList = (
  duas: readonly Dua[],
  options: FormatOptions = {}
): string => {
  const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };

  if (opts.json) {
    return JSON.stringify(duas, null, 2);
  }

  if (duas.length === 0) {
    return duaDim('No duas found.\n');
  }

  return duas.map((dua) => formatDua(dua, opts)).join('\n');
};

export const formatCompactDua = (dua: Dua): string => {
  return `${dua.title} - ${dua.translation.substring(0, 50)}...`;
};
