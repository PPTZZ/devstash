# Feature Spec: Quick Wins (Issues 1, 2, & 4)

## Objective
Optimize database query payloads and modularize the dashboard sidebar component to improve performance, maintainability, and responsiveness.

---

## Technical Specifications

### Issue 1: Database Query Payload Optimization (`lib/db/collections.ts`)
- Replace deep nested includes (`items: { include: { item: { include: { itemType: true } } } }`) with lean Prisma projections.
- Utilize Prisma `_count: { select: { items: true } }` for item counting instead of pulling full entity tables into memory.

### Issue 2: User Scoping & Database Indexing (`prisma/schema.prisma` & `lib/db/collections.ts`)
- Add composite index `@@index([userId, isFavorite])` in `prisma/schema.prisma` to optimize sidebar collection lookups.
- Update `getSidebarCollections` to accept `userId?: string` to scope queries per user.

### Issue 4: Sidebar Component Modularization (`components/dashboard/sidebar/`)
- Break down monolithic [`components/dashboard/Sidebar.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/Sidebar.tsx) (372 lines) into smaller, focused sub-components:
  - `components/dashboard/sidebar/SidebarItemTypes.tsx`: Handles item types navigation and PRO badge rendering.
  - `components/dashboard/sidebar/SidebarCollections.tsx`: Handles favorites and recent collections listing.
  - `components/dashboard/sidebar/SidebarUserProfile.tsx`: Renders bottom user profile card and avatar.
  - `components/dashboard/sidebar/SidebarMobileDrawer.tsx`: Manages mobile drawer sheet overlay.
- Keep `Sidebar.tsx` clean as a layout shell.

---

## Verification Plan
1. Run `pnpm lint` to ensure zero ESLint warnings or errors.
2. Run `pnpm build` to confirm Next.js build compilation succeeds.
