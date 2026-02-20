# hadith-cli

A terminal CLI for browsing Islamic hadith entries with optional startup hadith support.

It includes:
- daily and random hadith entries
- keyword search and category browsing
- favorites and local config management
- startup hadith output with a locally cached hadith dataset

## Requirements

- Node.js `>=18`
- npm or pnpm

## Installation

```bash
# install dependencies
npm install

# build
npm run build
```

To run as a global command:

```bash
npm link
hadith-cli --help
```

You can also run directly without linking:

```bash
node dist/cli.js --help
```

## Quick Usage

```bash
# default action (same as "daily")
hadith-cli

# today's hadith entry
hadith-cli daily

# random hadith entry
hadith-cli random

# search
hadith-cli search "patience"

# show one hadith entry by id
hadith-cli show morning-1

# list categories
hadith-cli category --list

# list hadith entries in a category
hadith-cli category --category morning

# favorites
hadith-cli favorites --add morning-1
hadith-cli favorites --list
hadith-cli favorites --remove morning-1

# config
hadith-cli config --show
hadith-cli config --preferred-language translation
```

## Commands

- `daily` - show today's hadith entry
- `search <query>` - search by keyword
- `show <id>` - show a specific hadith entry
- `category --list` - list all categories
- `category --category <category>` - list hadith entries in a category
- `random` - show a random hadith entry
- `favorites --add <id>` - add a favorite
- `favorites --remove <id>` - remove a favorite
- `favorites --list` - list favorites
- `config --show` - show current config
- `config --clear` - clear saved config
- `config --daily-reminder <boolean>` - enable/disable reminder
- `config --reminder-time <HH:MM>` - set reminder time
- `config --preferred-language <arabic|transliteration|translation|all>` - output language
- `startup` - print a random hadith for shell startup usage
- `scrape-hadith` - refresh local hadith cache from remote source

Most content commands also support:
- `-j, --json` for JSON output
- `-p, --plain` for compact plain output

## Hadith Cache

The `startup` command reads hadiths from a local cache.  
If cache is missing/stale, it attempts to sync automatically.  
If sync fails (for example offline), it falls back to built-in seed hadiths.

## Environment Variables

- `HADITH_CLI_CONFIG_DIR` - custom directory for config + hadith cache

## Development

```bash
# watch build
npm run dev

# tests
npm run test

# lint
npm run lint

# type-check
npm run typecheck
```

## License

MIT
