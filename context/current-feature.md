[//]: # (Never delete the section titles or the comments that explain each section.)
[//]: # (After the status is changed to complete leave only the Current Feature, Status and History sections populated. The content Goals and the Notes can be cleard excepting the descriptive comments.)

## Current Feature
[//]: # (Feature name and short description)
Seed Data Specification - Create a seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos.

## Status
[//]: # (Not started | In Progress | Complete)
Complete

## Goals
[//]: # (Goals and requirements)

## Notes
[//]: # (Any extra notes)

## History
[//]: # (Keep this updated. Earliest to latest)
- Switched to `feature/dashboard-ui-phase-2` branch.
- Implemented `SidebarContext` provider to handle responsive sidebar states (collapsible desktop view and overlay mobile drawer).
- Updated `TopBar` to toggle sidebar state on `PanelLeft` button click.
- Built full `Sidebar` component rendering item types with Lucide icons and item counts, favorite collections with star badges, recent collections with counts, and user profile card pinned at bottom.
- Added dynamic item type routes `/items/[type]` and collection routes `/collections/[id]`.
- Verified production build (`pnpm build`) and linting (`pnpm lint`) cleanly.
- Added Dashboard UI Phase 3 spec to `current-feature.md`.
- Created and checked out new Git branch `feature/dashboard-ui-phase-3`.
- Created reusable `ItemTypeIcon` component to map items and collections to distinct Lucide icons and brand colors.
- Built `StatsCards` component displaying 4 overview stat cards: Total Items, Total Collections, Favorite Items, and Favorite Collections.
- Built `CollectionCard` component rendering collection titles, star indicators, item counts, descriptions, options menu, and item type badges.
- Built `ItemCard` component supporting code snippet previews, external link badges, file indicators, tag pills, pin/star badges, and timestamps.
- Updated `app/dashboard/page.tsx` with header, stats cards grid, collections grid, pinned items list, and 10 recent items list.
- Created `app/collections/page.tsx` for full collections listing view.
- Extended `src/lib/mock-data.ts` with 10 total items to satisfy recent items spec.
- Verified ESLint (`pnpm lint`) with 0 errors and 0 warnings.
- Added Prisma + Neon PostgreSQL Setup spec to `current-feature.md`.
- Created and checked out feature branch `feature/prisma-neon-setup`.
- Installed Prisma 7 packages (`prisma@7.9.1`, `@prisma/client`, `@prisma/adapter-neon`, `@neondatabase/serverless`, `ws`).
- Defined complete data model schema in `prisma/schema.prisma` using `provider = "prisma-client"`.
- Created `prisma.config.ts` using `defineConfig` for connection configuration.
- Instantiated database client singleton in `src/lib/db.ts` using `@prisma/adapter-neon` and WebSocket configuration.
- Generated Prisma Client to `src/generated/prisma`.
- Created `.env` and `.env.example` templates for database connection URLs.
- Added database CLI scripts (`db:generate`, `db:migrate`, `db:deploy`, `db:studio`) to `package.json`.
- Approved pnpm build scripts and verified `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` with 0 errors.
- Executed `pnpm db:migrate --name init`, creating initial migration `20260803081919_init` and verifying `prisma migrate status` is in sync.
- Created `prisma/seed.ts` mapping `src/lib/mock-data.ts` records into database tables and configured seed script in `prisma.config.ts`.
- Executed `pnpm db:seed` successfully populating the user, system item types, collections, items, tags, and item-collection join records.
- Added Seed Data Specification to `current-feature.md`.
- Created and checked out new Git branch `feature/seed-data-setup`.
- Installed `bcryptjs` and updated `prisma/seed.ts` to implement full seed specification with `demo@devstash.io` demo user (bcrypt hashed password, 12 rounds), 7 system item types, and 5 detailed sample collections with real URLs.
- Ran `pnpm db:seed` and verified database output with `pnpm db:test` (1 user, 7 item types, 5 collections, 18 items with tags).
- Verified `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` cleanly with 0 errors.