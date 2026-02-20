import { program } from 'commander';
import { createRequire } from 'node:module';
import { dailyCommand } from './commands/daily.js';
import { searchCommand } from './commands/search.js';
import { categoryCommand } from './commands/category.js';
import { showCommand } from './commands/show.js';
import { favoritesCommand } from './commands/favorites.js';
import { randomCommand } from './commands/random.js';
import { configCommand } from './commands/config.js';
import { startupCommand } from './commands/startup.js';
import { scrapeHadithCommand } from './commands/scrape-hadith.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json') as {
  readonly version: string;
};

program
  .name('dua')
  .description('CLI tool for Islamic duas (supplications)')
  .version(pkg.version, '-v, --version');

program
  .command('daily')
  .description('Show today\'s dua')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((options) => {
    dailyCommand(options);
  });

program
  .command('search')
  .description('Search for duas by keyword')
  .argument('<query>', 'Search query')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((query, options) => {
    searchCommand({ query, ...options });
  });

program
  .command('show')
  .description('Show a specific dua by ID')
  .argument('<id>', 'Dua ID')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((id, options) => {
    showCommand({ id, ...options });
  });

program
  .command('category')
  .description('List duas by category')
  .option('-c, --category <category>', 'Category ID')
  .option('-l, --list', 'List all categories')
  .option('-j, --json', 'JSON output')
  .option('-p, --plain', 'Plain text output')
  .action((options) => {
    categoryCommand(options);
  });

program
  .command('random')
  .description('Show a random dua')
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
  .description('Manage favorite duas')
  .option('-a, --add <id>', 'Add dua to favorites')
  .option('-r, --remove <id>', 'Remove dua from favorites')
  .option('-l, --list', 'List favorite duas')
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
  .option('--daily-reminder <boolean>', 'Enable/disable daily reminder', (value) => value === 'true')
  .option('--reminder-time <time>', 'Set reminder time (HH:MM format)')
  .option('--preferred-language <lang>', 'Set preferred language (arabic|transliteration|translation|all)')
  .action((options) => {
    configCommand(options);
  });

// Default command: show daily dua
program
  .action(() => {
    dailyCommand();
  });

void program.parseAsync();
