"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, Star, ChevronDown, ChevronRight } from "lucide-react";
import { CollectionWithDetails } from "@/lib/db/collections";
import { useSidebar } from "@/components/dashboard/SidebarContext";
import { cn } from "@/lib/utils";

export type SidebarCollectionsProps = {
  favoriteCollections: CollectionWithDetails[];
  recentCollections: CollectionWithDetails[];
  collapsed: boolean;
};

export function SidebarCollections({
  favoriteCollections,
  recentCollections,
  collapsed,
}: SidebarCollectionsProps) {
  const pathname = usePathname();
  const { closeMobileSidebar } = useSidebar();

  return (
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

      {/* Recents Subheader */}
      <div className="mt-3 space-y-0.5 px-1.5">
        {!collapsed && (
          <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wide">
            Recents
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
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: col.dominantItemType?.color || "#6b7280",
                    }}
                    title={
                      col.dominantItemType
                        ? `Dominant type: ${col.dominantItemType.name}`
                        : "Collection"
                    }
                  />
                  <span className="text-xs font-normal text-muted-foreground/80 tabular-nums">
                    {col.itemCount}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* View All Collections Link */}
      {!collapsed && (
        <div className="mt-2 px-1.5">
          <Link
            href="/collections"
            onClick={closeMobileSidebar}
            className="flex items-center justify-between px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/40 group"
          >
            <span>View all collections</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      )}
    </div>
  );
}
