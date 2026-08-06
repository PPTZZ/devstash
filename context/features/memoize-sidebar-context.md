# Feature Spec: Memoize Sidebar Context & Optimize Component Re-renders

## Objective
Eliminate unnecessary re-render cascades across the dashboard layout by memoizing the `SidebarContext` value, stabilizing handler callbacks (`useCallback`), and wrapping sidebar sub-components in `React.memo`.

---

## 1. Problem Analysis & Affected Components

Currently, `SidebarProvider` in [`components/dashboard/SidebarContext.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/SidebarContext.tsx) instantiates a fresh context object literal on every render pass:

```tsx
<SidebarContext.Provider
  value={{
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    setIsCollapsed,
    setIsMobileOpen,
    closeMobileSidebar,
  }}
>
```

Additionally, `toggleSidebar` and `closeMobileSidebar` functions are recreated on every render without `useCallback`.

### Affected Codebase Components:
1. [`components/dashboard/SidebarContext.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/SidebarContext.tsx): Context provider and custom hook.
2. [`components/dashboard/TopBar.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/TopBar.tsx): Consumes `toggleSidebar`. Re-renders on any context reference change.
3. [`components/dashboard/sidebar/SidebarItemTypes.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarItemTypes.tsx): Consumes `closeMobileSidebar`. Re-renders and re-sorts item types array on every context change.
4. [`components/dashboard/sidebar/SidebarCollections.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarCollections.tsx): Consumes `closeMobileSidebar`. Re-renders on any context change.
5. [`components/dashboard/sidebar/SidebarUserProfile.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarUserProfile.tsx): Receives `collapsed` prop. Re-renders when parent re-renders.
6. [`components/dashboard/sidebar/SidebarMobileDrawer.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarMobileDrawer.tsx): Consumes `isMobileOpen` and `closeMobileSidebar`.

---

## 2. Detailed Implementation Plan

### Step 1: Memoize Context & Handlers in `SidebarContext.tsx`
- Wrap `toggleSidebar` in `useCallback(..., [])`.
- Wrap `closeMobileSidebar` in `useCallback(..., [])`.
- Wrap context `value` in `useMemo(..., [isCollapsed, isMobileOpen, toggleSidebar, closeMobileSidebar])`.

```tsx
const toggleSidebar = useCallback(() => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    setIsMobileOpen((prev) => !prev);
  } else {
    setIsCollapsed((prev) => !prev);
  }
}, []);

const closeMobileSidebar = useCallback(() => {
  setIsMobileOpen(false);
}, []);

const value = useMemo(
  () => ({
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    setIsCollapsed,
    setIsMobileOpen,
    closeMobileSidebar,
  }),
  [isCollapsed, isMobileOpen, toggleSidebar, closeMobileSidebar]
);
```

### Step 2: Memoize Sub-components & Array Sorting
- **[`SidebarItemTypes.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarItemTypes.tsx)**:
  - Memoize item types array sorting using `useMemo(() => [...itemTypes].sort(...), [itemTypes])`.
  - Wrap `SidebarItemTypes` export with `React.memo`.
- **[`SidebarCollections.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarCollections.tsx)**:
  - Wrap `SidebarCollections` export with `React.memo`.
- **[`SidebarUserProfile.tsx`](file:///home/ppt/Desktop/DEV/ai/dev_stash/components/dashboard/sidebar/SidebarUserProfile.tsx)**:
  - Wrap `SidebarUserProfile` export with `React.memo`.

---

## 3. Impact Assessment

- **Behavior**: Zero breaking changes to UI, responsive drawer behavior, or collapse transitions.
- **Performance**:
  - Clicking item types or collections links on mobile will only update `isMobileOpen` without re-sorting lists.
  - Toggling sidebar collapse on desktop will only update `isCollapsed` without recreating function handlers.
- **Lint & Build**: Preserves strict TypeScript types and complies with `@typescript-eslint` rules.

---

## 4. Verification Steps
1. Run `pnpm lint` to verify ESLint compliance with 0 errors.
2. Run `pnpm build` to verify Next.js production build succeeds.
