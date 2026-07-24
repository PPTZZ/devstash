# Current Feature
Dashboard UI Phase 2

## Status

## Goals

## Notes

## History
- Switched to `feature/dashboard-ui-phase-2` branch.
- Implemented `SidebarContext` provider to handle responsive sidebar states (collapsible desktop view and overlay mobile drawer).
- Updated `TopBar` to toggle sidebar state on `PanelLeft` button click.
- Built full `Sidebar` component rendering item types with Lucide icons and item counts, favorite collections with star badges, recent collections with counts, and user profile card pinned at bottom.
- Added dynamic item type routes `/items/[type]` and collection routes `/collections/[id]`.
- Verified production build (`pnpm build`) and linting (`pnpm lint`) cleanly.