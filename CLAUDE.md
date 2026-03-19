# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start Vite dev server on localhost:3000
npm run dev-bot          # Start dev server + ngrok tunnel for Telegram testing

# Build & Preview
npm run build            # Type-check + build for production
npm run preview          # Preview production build locally

# Testing
npm run test:unit        # Run Vitest unit tests (jsdom environment)

# Linting & Formatting
npm run lint             # Run oxlint + eslint (both with auto-fix)
npm run format           # Prettier formatting
npm run type-check       # vue-tsc type validation only

# API Client Generation
npm run openapi-ts       # Regenerate src/services/client/ from backend OpenAPI spec
```

## Architecture

### What This Is

A Vue 3 SPA built as a **Telegram Mini App** for a wedding event. It runs inside Telegram and communicates with a backend at `https://yz-wedding.vn.ua/api/`.

### Key Architectural Decisions

**Telegram Mini App integration**: The app detects if it's running inside Telegram via `isTMA()` from `@tma.js/sdk`. If so, `initSDK()` sets up viewport, back button, and sharing features. When running in a browser (dev/testing), it falls back gracefully.

**Auto-generated API client**: `src/services/client/` is fully generated — never edit those files manually. To update them, run `npm run openapi-ts` which pulls the OpenAPI spec from `https://yz-wedding.vn.ua/api/docs/json`. The config is in `openapi-ts.config.ts`. Actual API calls and auth setup live in `src/services/api.ts`.

**Bootstrap order in `main.ts`**: `setupApiClient()` must run before the user store initializes. The user store's `init()` is awaited before mounting, so the app only renders once auth state is known (Telegram WebApp data is used for authentication).

**User roles**: The Pinia user store (`src/stores/user.ts`) tracks whether a user is approved/pending/admin. Route access for galleries is gated on approval status.

### Styling System

Tailwind CSS 4 (utility-first) + SCSS for component styles. CSS custom properties define the wedding color palette (`--ivory`, `--cream`, `--blush`, `--rose`, `--mauve`, etc.) — use these variables rather than hardcoding color values. Animations and Vue transitions are defined in `src/style/`.

### Path Alias

`@/` maps to `src/` — use this for all internal imports.

### Environment Variables

- `VITE_APP_URL` — the Telegram bot deep link (dev vs. production values in `.env` / `.env.production`)
