# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WIP dashboard for PocketBase, built with SvelteKit 2.16 and Svelte 5 (using modern runes syntax), Tailwind CSS 4.0, and TypeScript. The project uses static site generation via `@sveltejs/adapter-static` and connects to a PocketBase backend for authentication and data management.

## Common Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production (outputs to build/)
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run check

# Watch mode type checking
npm run check:watch

# Format code
npm run format

# Check formatting (lint)
npm run lint
```

## Environment Configuration

The project requires a `.env` file with the following variables:

```env
VITE_PB_URL=https://pocketbase.soikathome.xyz
```

All client-accessible environment variables must be prefixed with `VITE_` and accessed via `import.meta.env.VITE_*`.

## Architecture Overview

### SvelteKit Structure

The project follows SvelteKit's file-based routing conventions:
- `+page.svelte` - Page components
- `+layout.svelte` - Layout wrappers
- `+page.ts` / `+layout.ts` - Load functions and configuration

**Layout Hierarchy:**
1. Root layout (`src/routes/+layout.svelte`) - Basic page container
2. Dashboard layout (`src/routes/dashboard/+layout.svelte`) - Sidebar + Header + main content area
3. Individual pages render within these layouts

**Key Routes:**
- `/` - Landing page
- `/login` - Authentication page
- `/dashboard` - Dashboard home
- `/dashboard/settings` - User settings

### PocketBase Integration Pattern

**Core Pattern** (`src/lib/pocketbase.ts`):
```typescript
export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
export const currentUser = writable(pb.authStore.record);

pb.authStore.onChange((auth) => {
    if (pb.authStore.record) {
        currentUser.set(pb.authStore.record);
    } else {
        currentUser.set(null);
    }
});
```

**Critical Architecture Decision:**
- The PocketBase client (`pb`) and auth state (`currentUser`) are managed via Svelte stores
- Auth state is automatically synced from PocketBase's authStore to the reactive `currentUser` store
- Components access auth state via `$currentUser` (dollar-sign auto-subscription syntax)
- All authentication operations use `pb.collection('users').authWithPassword()` and similar methods

**Authentication Flow:**
1. User logs in via `pb.collection('users').authWithPassword(email, password)`
2. PocketBase auth store updates automatically
3. onChange listener syncs to `currentUser` Svelte store
4. All components subscribed to `$currentUser` reactively update
5. Logout via `pb.authStore.clear()`

### State Management

**Svelte 5 Runes (Modern Syntax):**
- Use `$state()` for reactive component state
- Use `$derived()` for computed values
- Use `$effect()` for side effects
- Example: `let email = $state('');`

**Svelte Stores (Shared State):**
- Used for cross-component state like authentication
- Import from `svelte/store`
- Subscribe in components via `$storeName` syntax

### Service Layer Pattern

External API integrations are abstracted into service files under `src/lib/api/`:

**Pattern:**
- Encapsulates API communication logic
- Uses environment variables for configuration
- Returns typed interfaces for type safety
- Handles success/error responses

When adding new external integrations, follow this pattern:
1. Create service file in `src/lib/api/`
2. Export async functions that use `fetch` or SDK clients
3. Define TypeScript interfaces for responses
4. Use `import.meta.env.VITE_*` for API keys/URLs

### Component Organization

**Reusable Components** (`src/lib/components/`):
- `Header.svelte` - Top navigation bar with user info
- `Sidebar.svelte` - Dashboard navigation sidebar
- `LoginRedux.svelte` - Login form component

**Pattern:**
- Presentational components focus on UI rendering
- Pages in `src/routes/` handle business logic
- Use `$props()` for component props (Svelte 5 syntax)
- Use `{@render children()}` for slot content

### Styling Approach

**Tailwind CSS 4.0:**
- Utility-first approach with inline classes
- Custom CSS in `<style>` blocks only when necessary
- Plugins enabled: `@tailwindcss/forms`, `@tailwindcss/typography`
- Configured via `@tailwindcss/vite` plugin for optimal performance

**Icon Library:**
- Uses `@lucide/svelte` for icons
- Import specific icons: `import { Send } from '@lucide/svelte';`

## Development Patterns

### Adding a New Page

1. Create directory under `src/routes/` (e.g., `src/routes/dashboard/users/`)
2. Add `+page.svelte` file
3. If authentication required, access `$currentUser` from `$lib/pocketbase`
4. Use `goto` from `@sveltejs/kit` for programmatic navigation

### Adding a New API Integration

1. Create service file in `src/lib/api/[service-name].ts`
2. Define TypeScript interfaces for requests/responses
3. Export async functions for API operations
4. Import and use in components as needed

### Working with Forms

**Svelte 5 Patterns:**
- Two-way binding: `<input bind:value={email} />`
- Event handlers: `<form onsubmit={handleSubmit}>`
- Conditional rendering: `{#if $currentUser}...{/if}`
- Array iteration: `{#each items as item}...{/each}`

**Form Submission:**
- Prevent default: `event.preventDefault()`
- Use loading states during async operations
- Show user feedback via conditional rendering or toast libraries

### Pre-rendering Configuration

The project uses static site generation:
- `export const prerender = true` is set in layout files
- Enables deployment to static hosts (no server runtime needed)
- Client-side routing and API calls happen in the browser

## Important Technical Details

### Svelte 5 Migration

This project uses **Svelte 5** with the modern runes syntax:
- Use `$state()` instead of `let` for reactive variables
- Use `$props()` instead of `export let` for component props
- Use `$derived()` instead of `$:` for computed values
- Slots are rendered with `{@render children()}` syntax

### Static Adapter

The project uses `@sveltejs/adapter-static`:
- Outputs static HTML/CSS/JS to `build/` directory
- No server-side runtime required
- All API calls happen client-side to PocketBase backend
- PocketBase backend must be accessible from client browsers

### TypeScript Configuration

- Strict mode enabled for type safety
- Extends `.svelte-kit/tsconfig.json` (auto-generated)
- `moduleResolution: "bundler"` for modern import resolution
- Use `.ts` files for utilities and services
- Use `<script lang="ts">` in `.svelte` files

## Key Files to Understand

- `src/lib/pocketbase.ts` - Authentication state management (crucial pattern)
- `src/routes/dashboard/+layout.svelte` - Dashboard layout structure
- `src/lib/components/LoginRedux.svelte` - Auth implementation example
- `svelte.config.js` - SvelteKit configuration with static adapter
- `vite.config.ts` - Build configuration with Tailwind integration

## PocketBase Backend

The dashboard connects to a PocketBase instance at `VITE_PB_URL`:
- Authentication is handled by PocketBase SDK
- Data collections accessed via `pb.collection('collectionName')`
- Real-time subscriptions available via `pb.collection().subscribe()`
- File uploads handled via PocketBase's built-in file API

When working with PocketBase:
- Always check `pb.authStore.isValid` for auth state
- Use `pb.collection('users')` for user operations
- Error handling via try/catch on async operations
- Auth tokens are automatically managed by the SDK
