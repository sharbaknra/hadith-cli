import pc from 'picocolors';
import {
  clearConfig,
  getConfig,
  setDailyReminder,
  setPreferredLanguage,
  setReminderTime,
} from '../config.js';

export interface ConfigCommandOptions {
  show?: boolean;
  clear?: boolean;
  'daily-reminder'?: boolean;
  'reminder-time'?: string;
  'preferred-language'?: 'arabic' | 'transliteration' | 'translation' | 'all';
}

export const configCommand = (options: ConfigCommandOptions = {}): void => {
  if (options.clear) {
    clearConfig();
    console.log(pc.green('Configuration cleared.'));
    return;
  }

  if (options.show || Object.keys(options).length === 0) {
    const config = getConfig();
    console.log(pc.dim('Current configuration:'));
    console.log(`  Daily Reminder: ${config.dailyReminder ? 'enabled' : 'disabled'}`);
    if (config.reminderTime) {
      console.log(`  Reminder Time: ${config.reminderTime}`);
    }
    console.log(`  Preferred Language: ${config.preferredLanguage ?? 'all'}`);
    console.log(`  Favorite Hadith Entries: ${(config.favoriteHadiths ?? []).length}`);
    return;
  }

  if (options['daily-reminder'] !== undefined) {
    setDailyReminder(options['daily-reminder']);
    console.log(pc.green(`Daily reminder ${options['daily-reminder'] ? 'enabled' : 'disabled'}.`));
  }

  if (options['reminder-time']) {
    setReminderTime(options['reminder-time']);
    console.log(pc.green(`Reminder time set to ${options['reminder-time']}.`));
  }

  if (options['preferred-language']) {
    setPreferredLanguage(options['preferred-language']);
    console.log(pc.green(`Preferred language set to ${options['preferred-language']}.`));
  }
};
