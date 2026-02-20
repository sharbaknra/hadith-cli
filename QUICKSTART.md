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
dua
```

## Common Commands

```bash
# Daily dua
node dist/cli.js daily

# Search duas
node dist/cli.js search "eating"

# List categories
node dist/cli.js category --list

# Show specific dua
node dist/cli.js show morning-1

# Random dua
node dist/cli.js random

# Manage favorites
node dist/cli.js favorites --add morning-1
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
- `src/data/duas.ts` - Dua database
- `src/dua-service.ts` - Business logic
- `src/config.ts` - Configuration management
- `src/ui/` - UI components (formatters, themes)
