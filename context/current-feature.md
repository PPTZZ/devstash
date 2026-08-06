[//]: # (Never delete the section titles or the comments that explain each section.)
[//]: # (After the status is changed to complete leave only the Current Feature, Status and History sections populated. The content Goals and the Notes can be cleared excepting the descriptive comments.)

## Current Feature
Codebase Quick Wins: DB Query Optimization & Sidebar Modularization (Issues 1, 2 & 4)

## Status
Complete

## Goals
1. **Issue 1 (Prisma Over-Fetching)**: Optimize collection database query payloads in `lib/db/collections.ts` by replacing heavy nested item joins with lean projections and `_count` aggregations.
2. **Issue 2 (Sidebar Indexing & User Scoping)**: Add composite index `@@index([userId, isFavorite])` to `Collection` in `prisma/schema.prisma` and add `userId` scoping to `getSidebarCollections`.
3. **Issue 4 (Sidebar Refactoring & Modularization)**: Decompose monolithic 372-line `Sidebar.tsx` into clean, modular sub-components in `components/dashboard/sidebar/` (`SidebarItemTypes.tsx`, `SidebarCollections.tsx`, `SidebarUserProfile.tsx`, `SidebarMobileDrawer.tsx`).

## Notes
- Ensure zero regression in sidebar collapse states, badge rendering, icon colors, and mobile drawer interactions.
- Run `pnpm lint` and `pnpm build` verification after changes.

## History
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
- Added Dashboard Collections Spec to `current-feature.md`.
- Created and checked out new Git branch `feature/dashboard-collections`.
- Created `lib/db/collections.ts` with `getDashboardCollections`, `getAllCollections`, and `getDashboardStats` functions.
- Updated `app/dashboard/page.tsx` and `app/collections/page.tsx` to fetch collections & stats directly from database in Server Components.
- Updated `CollectionCard.tsx` and `StatsCards.tsx` using `type` definitions and rendered dynamic border color from dominant item type.
- Verified `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` cleanly with 0 errors.
- Added Dashboard Items Spec to `current-feature.md`.
- Created and checked out new Git branch `feature/dashboard-items`.
- Created `lib/db/items.ts` with `getPinnedItems` and `getRecentItems` database query functions.
- Updated `ItemCard.tsx` to support DB `ItemWithDetails` schema, dynamic left border color derived from item type, and date formatting.
- Updated `app/dashboard/page.tsx` to fetch pinned and recent items from Neon PostgreSQL via Prisma.
- Verified `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` cleanly with 0 errors.
- Created and checked out new Git branch `feature/stats-sidebar`.
- Added `getItemTypesWithCounts` and `getItemsByType` database query functions to `lib/db/items.ts`.
- Added `getSidebarCollections` database query function to `lib/db/collections.ts`.
- Updated `app/dashboard/layout.tsx` to asynchronously fetch system item types with item counts and sidebar collections from Neon PostgreSQL database.
- Updated `components/dashboard/Sidebar.tsx` to render system item types with live item counts, favorite collections with star badges, recent collections with colored circle indicators for dominant item types, and a "View all collections" link pointing to `/collections`.
- Updated `app/items/[type]/page.tsx` to fetch and display items by type dynamically from database.
- Updated `lib/db/items.ts` `getItemTypesWithCounts` query to order system item types by `name: "asc"`.
- Updated `components/dashboard/Sidebar.tsx` to sort displayed item types alphabetically by name.
- Reordered `itemTypes` array in `lib/mock-data.ts` to be in alphabetical order (Commands, Files, Images, Links, Notes, Prompts, Snippets).
- Removed `lib/mock-data.ts` file.
- Added `getCollectionById` database query to `lib/db/collections.ts` and updated `app/collections/[id]/page.tsx` to fetch collection from Neon PostgreSQL DB.
- Refactored `ItemTypeIcon.tsx`, `ItemCard.tsx`, `Sidebar.tsx`, and `StatsCards.tsx` to eliminate mock-data dependencies.
- Verified `pnpm lint` and `pnpm build` cleanly with 0 errors.
- Loaded feature spec `context/features/add-pro-badge-sidebar.md` and checked out feature branch `feature/add-pro-badge-sidebar`.
- Created ShadCN UI `Badge` component in `components/ui/badge.tsx`.
- Updated `lib/db/items.ts` `getItemTypesWithCounts` query to include `isProOnly`.
- Updated `components/dashboard/Sidebar.tsx` to render clean, subtle uppercase `PRO` badge for Files and Images item types.
- Verified `pnpm lint` and `pnpm build` cleanly with 0 errors.
- Created and checked out feature branch `feature/quick-wins-db-sidebar`.
- Added composite index `@@index([userId, isFavorite])` to `Collection` model in `prisma/schema.prisma` and generated Prisma Client.
- Optimized `collectionIncludeConfig` in `lib/db/collections.ts` with lean field selection and added `userId` parameter to `getSidebarCollections`.
- Decomposed monolithic `Sidebar.tsx` (372 lines) into 4 modular sub-components in `components/dashboard/sidebar/` (`SidebarItemTypes.tsx`, `SidebarCollections.tsx`, `SidebarUserProfile.tsx`, `SidebarMobileDrawer.tsx`).
- Verified `pnpm lint` and `pnpm build` cleanly with 0 errors.


