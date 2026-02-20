import Conf from 'conf';
import { z } from 'zod';
import type { HadithCliConfig } from './types.js';

const ConfigSchema = z.object({
  favoriteHadiths: z.array(z.string()).optional(),
  dailyReminder: z.boolean().optional(),
  reminderTime: z.string().optional(),
  preferredLanguage: z.enum(['arabic', 'transliteration', 'translation', 'all']).optional(),
});

const getConfigCwd = (): string | undefined => {
  const configuredPath = process.env.HADITH_CLI_CONFIG_DIR;
  if (configuredPath) {
    return configuredPath;
  }

  const isTestRuntime = process.env.VITEST === 'true' || process.env.NODE_ENV === 'test';
  if (isTestRuntime) {
    return '/tmp';
  }

  return undefined;
};

const configCwd = getConfigCwd();

const config = new Conf<HadithCliConfig>({
  projectName: 'hadith-cli',
  ...(configCwd ? { cwd: configCwd } : {}),
  defaults: {
    favoriteHadiths: [],
    dailyReminder: false,
    preferredLanguage: 'all',
  },
});

const getValidatedConfig = (): HadithCliConfig => {
  const parsed = ConfigSchema.safeParse(config.store);
  if (!parsed.success) {
    return {
      favoriteHadiths: [],
      dailyReminder: false,
      preferredLanguage: 'all',
    };
  }
  return parsed.data;
};

export const getConfig = (): HadithCliConfig => {
  return getValidatedConfig();
};

export const setFavoriteHadiths = (hadithIds: string[]): void => {
  config.set('favoriteHadiths', hadithIds);
};

export const addFavoriteHadith = (hadithId: string): void => {
  const current = getConfig();
  const favorites = current.favoriteHadiths ?? [];
  if (!favorites.includes(hadithId)) {
    config.set('favoriteHadiths', [...favorites, hadithId]);
  }
};

export const removeFavoriteHadith = (hadithId: string): void => {
  const current = getConfig();
  const favorites = current.favoriteHadiths ?? [];
  config.set(
    'favoriteHadiths',
    favorites.filter((id) => id !== hadithId),
  );
};

export const isFavoriteHadith = (hadithId: string): boolean => {
  const current = getConfig();
  return (current.favoriteHadiths ?? []).includes(hadithId);
};

export const setDailyReminder = (enabled: boolean): void => {
  config.set('dailyReminder', enabled);
};

export const setReminderTime = (time: string): void => {
  config.set('reminderTime', time);
};

export const setPreferredLanguage = (
  language: 'arabic' | 'transliteration' | 'translation' | 'all',
): void => {
  config.set('preferredLanguage', language);
};

export const clearConfig = (): void => {
  config.clear();
};
