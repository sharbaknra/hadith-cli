# Quick Start Guide

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

```bash
# Run the CLI
node dist/cli.js

# Or make it executable globally
npm link
hadees-cli
```

## Common Commands

```bash
# Daily hadith entry
node dist/cli.js daily

# Search hadith entries
node dist/cli.js search "eating"

# List categories
node dist/cli.js category --list

# Show a startup hadith
node dist/cli.js startup

# Scrape and cache complete english hadith dataset
node dist/cli.js scrape-hadith

# Manage favorites
node dist/cli.js favorites --add guidance
node dist/cli.js favorites

# Configuration
node dist/cli.js config --show
```

## Development

```bash
# Watch mode
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

## Project Structure

- `src/cli.ts` - Main CLI entry point
- `src/commands/` - Command handlers
- `src/data/duas.ts` - Built-in data used by existing commands
- `src/hadith-service.ts` - Hadith scraping/cache service
- `src/config.ts` - Configuration management
- `src/ui/` - UI components (formatters, themes)
