# hadith-cli 🤲

> CLI tool for Islamic duas (supplications) with daily reminders and context-based recommendations

A beautiful command-line interface for accessing Islamic duas, inspired by [ramadan-cli](https://github.com/ahmadawais/ramadan-cli).

## Features

- 📖 **Daily Dua** - Get a different dua each day
- 🔍 **Search** - Search duas by keyword, Arabic text, or translation
- 📁 **Categories** - Browse duas by category (food, sleep, travel, etc.)
- ⭐ **Favorites** - Save your favorite duas
- 🎲 **Random** - Get a random dua for inspiration
- 🎨 **Beautiful Output** - Colorful, formatted terminal output
- ⚙️ **Configurable** - Customize language preferences and reminders
- 📊 **JSON Support** - Machine-readable output for automation

## Install

```bash
# Using npx (no installation needed)
npx hadith-cli

# Or install globally
npm install -g hadith-cli
```

## Usage

### Daily Dua

```bash
# Show today's dua
dua
dua daily

# Plain text output
dua daily --plain

# JSON output
dua daily --json
```

### Search

```bash
# Search for duas
dua search "eating"
dua search "travel"
dua search "اللَّهُمَّ"

# JSON output
dua search "sleep" --json
```

### Show Specific Dua

```bash
# Show a dua by ID
dua show morning-1
dua show eating-before
```

### Categories

```bash
# List all categories
dua category --list

# Show duas in a category
dua category food
dua category sleep
dua category travel
```

### Random Dua

```bash
# Get a random dua
dua random
```

### Favorites

```bash
# List favorite duas
dua favorites --list
dua favorites

# Add to favorites
dua favorites --add morning-1

# Remove from favorites
dua favorites --remove morning-1
```

### Configuration

```bash
# Show current config
dua config --show

# Set preferred language
dua config --preferred-language arabic
dua config --preferred-language translation
dua config --preferred-language all

# Enable daily reminder
dua config --daily-reminder true

# Set reminder time
dua config --reminder-time "08:00"

# Clear configuration
dua config --clear
```

## Examples

```bash
# Get today's dua
dua

# Search for duas about food
dua search food

# Browse sleep-related duas
dua category sleep

# Get a random dua
dua random

# Add current dua to favorites
dua favorites --add morning-1

# View favorites
dua favorites
```

## Output Formats

### Default (Formatted)

```
🤲 Dua CLI - Islamic Supplications

Morning Remembrance [daily] (morning)

اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ

Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur

O Allah, by You we enter the morning, and by You we enter the evening, and by You we live, and by You we die, and to You is the resurrection.

Reference: Tirmidhi
```

### JSON Output

```bash
dua daily --json
```

```json
{
  "dua": {
    "id": "morning-1",
    "title": "Morning Remembrance",
    "arabic": "اللَّهُمَّ بِكَ أَصْبَحْنَا...",
    "transliteration": "Allahumma bika asbahna...",
    "translation": "O Allah, by You we enter...",
    "category": "daily",
    "context": "morning",
    "reference": "Tirmidhi"
  },
  "date": "2026-02-20"
}
```

## Categories

- **daily** - Daily Remembrances
- **food** - Food & Drink
- **sleep** - Sleep
- **travel** - Travel
- **home** - Home
- **worship** - Worship
- **hygiene** - Hygiene
- **supplication** - General Supplications

## Configuration

Configuration is stored in your OS config directory and can be customized:

- `favoriteDuas` - Array of favorite dua IDs
- `dailyReminder` - Enable/disable daily reminders
- `reminderTime` - Time for daily reminder (HH:MM format)
- `preferredLanguage` - Language preference (arabic|transliteration|translation|all)

Set `HADITH_CLI_CONFIG_DIR` environment variable to customize config location.

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run in development
pnpm dev

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# Test
pnpm test
```

## License

MIT

## Credits

Inspired by [ramadan-cli](https://github.com/ahmadawais/ramadan-cli) by Ahmad Awais.
