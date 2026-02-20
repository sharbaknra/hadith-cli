import { createRequire } from 'node:module';
import { program } from 'commander';
import { categoryCommand } from './commands/category.js';
import { configCommand } from './commands/config.js';
import { dailyCommand } from './commands/daily.js';
import { favoritesCommand } from './commands/favorites.js';
import { randomCommand } from './commands/random.js';
import { scrapeHadithCommand } from './commands/scrape-hadith.js';
import { searchCommand } from './commands/search.js';
import { showCommand } from './commands/show.js';
import { startupCommand } from './commands/startup.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json') as {
  readonly version: string;
};

program
  .name('hadith-cli')
  .description('CLI tool for Islamic hadith entries')
  .version(pkg.version, '-v, --version');

program
  .command('daily')
  .description("Show today's hadith entry")
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((options) => {
    dailyCommand(options);
  });

program
  .command('search')
  .description('Search for hadith entries by keyword')
  .argument('<query>', 'Search query')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((query, options) => {
    searchCommand({ query, ...options });
  });

program
  .command('show')
  .description('Show a specific hadith entry by ID')
  .argument('<id>', 'Hadith entry ID')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((id, options) => {
    showCommand({ id, ...options });
  });

program
  .command('category')
  .description('List hadith entries by category')
  .option('-c, --category <category>', 'Category ID')
  .option('-l, --list', 'List all categories')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((options) => {
    categoryCommand(options);
  });

program
  .command('random')
  .description('Show a random hadith entry')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((options) => {
    randomCommand(options);
  });

program
  .command('startup')
  .description('Show a hadith on shell startup')
  .action(async () => {
    await startupCommand();
  });

program
  .command('scrape-hadith')
  .description('Scrape and cache hadith collections locally')
  .action(async () => {
    await scrapeHadithCommand();
  });

program
  .command('favorites')
  .description('Manage favorite hadith entries')
  .option('-a, --add <id>', 'Add hadith entry to favorites')
  .option('-r, --remove <id>', 'Remove hadith entry from favorites')
  .option('-l, --list', 'List favorite hadith entries')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((options) => {
    favoritesCommand(options);
  });

program
  .command('config')
  .description('Manage configuration')
  .option('--show', 'Show current configuration')
  .option('--clear', 'Clear configuration')
  .option(
    '--daily-reminder <boolean>',
    'Enable/disable daily reminder',
    (value) => value === 'true',
  )
  .option('--reminder-time <time>', 'Set reminder time (HH:MM format)')
  .option(
    '--preferred-language <lang>',
    'Set preferred language (arabic|transliteration|translation|all)',
  )
  .action((options) => {
    configCommand(options);
  });

// Default command: show daily hadith entry
program.action(() => {
  dailyCommand();
});

void program.parseAsync();
