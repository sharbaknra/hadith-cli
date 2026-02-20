import { isFavoriteHadith } from '../config.js';
import type { HadithEntry } from '../types.js';
import {
  STAR_EMOJI,
  hadithBlue,
  hadithBold,
  hadithDim,
  hadithGreen,
  hadithYellow,
} from './theme.js';

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

export const formatHadithEntry = (
  hadithEntry: HadithEntry,
  options: FormatOptions = {},
): string => {
  const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };

  if (opts.json) {
    return JSON.stringify(hadithEntry, null, 2);
  }

  const isFavorite = isFavoriteHadith(hadithEntry.id);
  const favoriteMarker = isFavorite ? ` ${STAR_EMOJI}` : '';

  let output = '';

  if (!opts.compact) {
    output += '\n';
  }

  // Title
  output += hadithBold(hadithBlue(`${hadithEntry.title}${favoriteMarker}`));
  if (opts.showCategory && hadithEntry.category) {
    output += ` ${hadithDim(`[${hadithEntry.category}]`)}`;
  }
  if (opts.showContext && hadithEntry.context) {
    output += ` ${hadithDim(`(${hadithEntry.context})`)}`;
  }
  output += '\n';

  if (!opts.compact) {
    output += '\n';
  }

  // Arabic
  if (opts.showArabic && hadithEntry.arabic) {
    output += hadithGreen(hadithEntry.arabic);
    output += '\n';
    if (!opts.compact) {
      output += '\n';
    }
  }

  // Transliteration
  if (opts.showTransliteration && hadithEntry.transliteration) {
    output += hadithYellow(hadithEntry.transliteration);
    output += '\n';
    if (!opts.compact) {
      output += '\n';
    }
  }

  // Translation
  if (opts.showTranslation && hadithEntry.translation) {
    output += hadithDim(hadithEntry.translation);
    output += '\n';
    if (!opts.compact) {
      output += '\n';
    }
  }

  // Reference
  if (opts.showReference && hadithEntry.reference) {
    output += hadithDim(`Reference: ${hadithEntry.reference}`);
    output += '\n';
  }

  if (!opts.compact) {
    output += '\n';
  }

  return output;
};

export const formatHadithEntryList = (
  hadithEntries: readonly HadithEntry[],
  options: FormatOptions = {},
): string => {
  const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };

  if (opts.json) {
    return JSON.stringify(hadithEntries, null, 2);
  }

  if (hadithEntries.length === 0) {
    return hadithDim('No hadith entries found.\n');
  }

  return hadithEntries.map((hadithEntry) => formatHadithEntry(hadithEntry, opts)).join('\n');
};

export const formatCompactHadithEntry = (hadithEntry: HadithEntry): string => {
  return `${hadithEntry.title} - ${hadithEntry.translation.substring(0, 50)}...`;
};
