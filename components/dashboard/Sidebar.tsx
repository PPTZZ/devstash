"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  Folder,
  Star,
  Settings,
  X,
  ChevronDown,
  Layers,
  LucideProps,
} from "lucide-react";
import { itemTypes, collections, currentUser, ItemType } from "@/lib/mock-data";
import { useSidebar } from "@/components/dashboard/SidebarContext";
import { cn } from "@/lib/utils";

function getItemTypeIcon(iconName: string, color: string, props: LucideProps) {
  const iconProps = { ...props, style: { color } };
  switch (iconName) {
    case "Code":
      return <Code {...iconProps} />;
    case "Sparkles":
      return <Sparkles {...iconProps} />;
    case "Terminal":
      return <Terminal {...iconProps} />;
    case "StickyNote":
      return <StickyNote {...iconProps} />;
    case "File":
      return <File {...iconProps} />;
    case "Image":
      return <ImageIcon {...iconProps} />;
    case "Link":
      return <LinkIcon {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
}

// Map slug to route according to spec: /items/snippets, /items/prompts, etc.
function getTypeRoute(slug: string): string {
  if (slug.endsWith("s")) {
    return `/items/${slug}`;
  }
  return `/items/${slug}s`;
}

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections.filter((c) => !c.isFavorite);

  const sidebarContent = (collapsed: boolean) => (
    <div className="flex flex-col h-full min-h-0 justify-between select-none overflow-hidden">
      <div className="flex-1 overflow-y-auto py-2 space-y-4">
        {/* Item Types Section */}
        <div>
          {!collapsed ? (
            <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Types</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </div>
          ) : (
            <div className="h-4" />
          )}

          <nav className="space-y-0.5 mt-1 px-1.5">
            {itemTypes.map((type: ItemType) => {
              const route = getTypeRoute(type.slug);
              const isActive = pathname === route;

              return (
                <Link
                  key={type.id}
                  href={route}
                  onClick={closeMobileSidebar}
                  title={type.name}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors hover:bg-accent/60 hover:text-accent-foreground",
                    collapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    {getItemTypeIcon(type.icon, type.color, { className: "h-4 w-4 shrink-0" })}
                    {!collapsed && <span>{type.name}</span>}
                  </div>

                  {!collapsed && (
                    <span className="text-xs font-normal text-muted-foreground/80 tabular-nums">
                      {type.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border/40 mx-2" />

        {/* Collections Section */}
        <div>
          {!collapsed ? (
            <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Collections</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </div>
          ) : (
            <div className="h-2" />
          )}

          {/* Favorites Subheader */}
          <div className="mt-2 space-y-0.5 px-1.5">
            {!collapsed && (
              <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wide">
                Favorites
              </div>
            )}
            {favoriteCollections.map((col) => {
              const route = `/collections/${col.id}`;
              const isActive = pathname === route;

              return (
                <Link
                  key={col.id}
                  href={route}
                  onClick={closeMobileSidebar}
                  title={col.name}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors hover:bg-accent/60 hover:text-accent-foreground",
                    collapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  <div className={cn("flex items-center gap-3 truncate", collapsed && "justify-center")}>
                    <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {!collapsed && <span className="truncate">{col.name}</span>}
                  </div>
                  {!collapsed && (
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* All / Recent Collections Subheader */}
          <div className="mt-3 space-y-0.5 px-1.5">
            {!collapsed && (
              <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wide">
                All Collections
              </div>
            )}
            {recentCollections.map((col) => {
              const route = `/collections/${col.id}`;
              const isActive = pathname === route;

              return (
                <Link
                  key={col.id}
                  href={route}
                  onClick={closeMobileSidebar}
                  title={col.name}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors hover:bg-accent/60 hover:text-accent-foreground",
                    collapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  <div className={cn("flex items-center gap-3 truncate", collapsed && "justify-center")}>
                    <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {!collapsed && <span className="truncate">{col.name}</span>}
                  </div>
                  {!collapsed && (
                    <span className="text-xs font-normal text-muted-foreground/80 tabular-nums">
                      {col.itemCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Section at Bottom */}
      <div className="mt-auto pt-3 border-t border-border/40">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-accent/40",
            collapsed ? "justify-center p-2" : "justify-between px-3 py-2"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              {/* User Avatar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full border border-border/60 object-cover"
              />
              {currentUser.isPro && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                  ★
                </span>
              )}
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-xs text-muted-foreground truncate leading-tight">
                  {currentUser.email}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border/40 bg-background/95 transition-[width] duration-300 ease-in-out shrink-0 h-full overflow-hidden",
          isCollapsed ? "w-16 p-2" : "w-64 p-3"
        )}
      >
        {sidebarContent(isCollapsed)}
      </aside>

      {/* Mobile Drawer (Sheet / Overlay) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeMobileSidebar}
          />

          {/* Drawer Panel */}
          <div className="relative flex flex-col w-72 max-w-[85vw] bg-background border-r border-border/40 p-4 shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-border/40">
              <div className="flex items-center gap-2 font-semibold text-foreground tracking-tight select-none">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Layers className="h-4 w-4" />
                </div>
                <span className="text-base font-bold">DevStash</span>
              </div>
              <button
                type="button"
                onClick={closeMobileSidebar}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-hidden">{sidebarContent(false)}</div>
          </div>
        </div>
      )}
    </>
  );
}
