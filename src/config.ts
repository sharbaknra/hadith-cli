import Conf from 'conf';
import { z } from 'zod';
import type { DuaConfig } from './types.js';

const ConfigSchema = z.object({
  favoriteDuas: z.array(z.string()).optional(),
  dailyReminder: z.boolean().optional(),
  reminderTime: z.string().optional(),
  preferredLanguage: z.enum(['arabic', 'transliteration', 'translation', 'all']).optional(),
});

const getConfigCwd = (): string | undefined => {
  const configuredPath = process.env.HADITH_CLI_CONFIG_DIR ?? process.env.DUA_CLI_CONFIG_DIR;
  if (configuredPath) {
    return configuredPath;
  }

  const isTestRuntime =
    process.env.VITEST === 'true' || process.env.NODE_ENV === 'test';
  if (isTestRuntime) {
    return '/tmp';
  }

  return undefined;
};

const configCwd = getConfigCwd();

const config = new Conf<DuaConfig>({
  projectName: 'hadith-cli',
  ...(configCwd ? { cwd: configCwd } : {}),
  defaults: {
    favoriteDuas: [],
    dailyReminder: false,
    preferredLanguage: 'all',
  },
});

const getValidatedConfig = (): DuaConfig => {
  const parsed = ConfigSchema.safeParse(config.store);
  if (!parsed.success) {
    return {
      favoriteDuas: [],
      dailyReminder: false,
      preferredLanguage: 'all',
    };
  }
  return parsed.data;
};

export const getConfig = (): DuaConfig => {
  return getValidatedConfig();
};

export const setFavoriteDuas = (duaIds: string[]): void => {
  config.set('favoriteDuas', duaIds);
};

export const addFavoriteDua = (duaId: string): void => {
  const current = getConfig();
  const favorites = current.favoriteDuas ?? [];
  if (!favorites.includes(duaId)) {
    config.set('favoriteDuas', [...favorites, duaId]);
  }
};

export const removeFavoriteDua = (duaId: string): void => {
  const current = getConfig();
  const favorites = current.favoriteDuas ?? [];
  config.set('favoriteDuas', favorites.filter((id) => id !== duaId));
};

export const isFavoriteDua = (duaId: string): boolean => {
  const current = getConfig();
  return (current.favoriteDuas ?? []).includes(duaId);
};

export const setDailyReminder = (enabled: boolean): void => {
  config.set('dailyReminder', enabled);
};

export const setReminderTime = (time: string): void => {
  config.set('reminderTime', time);
};

export const setPreferredLanguage = (
  language: 'arabic' | 'transliteration' | 'translation' | 'all'
): void => {
  config.set('preferredLanguage', language);
};

export const clearConfig = (): void => {
  config.clear();
};
