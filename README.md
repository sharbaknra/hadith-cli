# hadith-cli

Command-line tool that shows a hadith in your terminal and supports local hadith cache sync.

## Requirements

- Node.js `>=18`
- npm

## Installation

```bash
# one-off run
npx @sharbaknra/hadith-cli startup

# global install
npm install -g @sharbaknra/hadith-cli
```

Installed binaries:
- `hadith-cli`
- `hadith`

## Usage

```bash
# default command (same as "daily")
hadith-cli

# show today's entry
hadith-cli daily

# random entry
hadith-cli random

# search text
hadith-cli search "patience"

# list categories
hadith-cli category --list

# show entries for a category
hadith-cli category --category daily

# show specific entry by id
hadith-cli show morning-1

# favorites
hadith-cli favorites --add morning-1
hadith-cli favorites --list
hadith-cli favorites --remove morning-1

# show startup hadith now
hadith-cli startup

# show one random hadith on demand (without startup hooks)
hadith-cli hadith-now

# scrape full english hadith cache
hadith-cli scrape-hadith
```

Most content commands support:
- `-j, --json` for JSON output
- `-p, --plain` for compact output

## Auto-show Hadith On Terminal Open

The npm package does not edit your shell profile automatically.
Configure it once in your shell startup file.

### Bash (Linux/macOS)

Add to `~/.bashrc`:

```bash
hadith-cli startup 2>/dev/null || true
```

Reload:

```bash
source ~/.bashrc
```

### Zsh (Linux/macOS)

Add to `~/.zshrc`:

```bash
hadith-cli startup 2>/dev/null || true
```

Reload:

```bash
source ~/.zshrc
```

### PowerShell (Windows)

Open profile:

```powershell
notepad $PROFILE
```

Add:

```powershell
hadith-cli startup 2>$null
```

Restart PowerShell.

## Cache and Config

- `startup` and `hadith-now` read from local hadith cache.
- If cache is missing/stale, it tries to sync from remote source.
- If sync fails (offline/network issue), it falls back to seed hadiths.

Environment variable:
- `HADITH_CLI_CONFIG_DIR` - custom directory for config and hadith cache.

## Development

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npm run check
```

## Publishing

```bash
npm login
npm publish --access public
```

`prepublishOnly` runs `npm run check`, so publish fails if quality checks fail.

## License

MIT
