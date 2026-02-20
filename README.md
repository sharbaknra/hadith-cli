# hadith-cli

A terminal CLI for browsing Islamic duas with optional hadith-at-startup support.

It includes:
- daily and random duas
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
dua --help
```

You can also run directly without linking:

```bash
node dist/cli.js --help
```

## Quick Usage

```bash
# default action (same as "daily")
dua

# today's dua
dua daily

# random dua
dua random

# search
dua search "patience"

# show one dua by id
dua show morning-1

# list categories
dua category --list

# list duas in a category
dua category --category morning

# favorites
dua favorites --add morning-1
dua favorites --list
dua favorites --remove morning-1

# config
dua config --show
dua config --preferred-language translation
```

## Commands

- `daily` - show today's dua
- `search <query>` - search by keyword
- `show <id>` - show a specific dua
- `category --list` - list all categories
- `category --category <category>` - list duas in a category
- `random` - show a random dua
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

Most dua commands also support:
- `-j, --json` for JSON output
- `-p, --plain` for compact plain output

## Hadith Cache

The `startup` command reads hadiths from a local cache.  
If cache is missing/stale, it attempts to sync automatically.  
If sync fails (for example offline), it falls back to built-in seed hadiths.

## Environment Variables

- `HADITH_CLI_CONFIG_DIR` - custom directory for config + hadith cache
- `DUA_CLI_CONFIG_DIR` - legacy/alternate config directory env var

`HADITH_CLI_CONFIG_DIR` takes precedence when both are set.

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
