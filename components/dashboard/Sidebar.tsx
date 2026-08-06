"use client";

import React from "react";
import { ItemTypeWithCount } from "@/lib/db/items";
import { CollectionWithDetails } from "@/lib/db/collections";
import { UserDetails } from "@/lib/db/user";
import { useSidebar } from "@/components/dashboard/SidebarContext";
import { cn } from "@/lib/utils";
import { SidebarItemTypes } from "@/components/dashboard/sidebar/SidebarItemTypes";
import { SidebarCollections } from "@/components/dashboard/sidebar/SidebarCollections";
import { SidebarUserProfile } from "@/components/dashboard/sidebar/SidebarUserProfile";
import { SidebarMobileDrawer } from "@/components/dashboard/sidebar/SidebarMobileDrawer";

export type SidebarProps = {
  itemTypes?: ItemTypeWithCount[];
  favoriteCollections?: CollectionWithDetails[];
  recentCollections?: CollectionWithDetails[];
  user?: UserDetails | null;
};

export function Sidebar({
  itemTypes = [],
  favoriteCollections = [],
  recentCollections = [],
  user,
}: SidebarProps) {
  const { isCollapsed } = useSidebar();

  const renderContent = (collapsed: boolean) => (
    <div className="flex flex-col h-full min-h-0 justify-between select-none overflow-hidden">
      <div className="flex-1 overflow-y-auto py-2 space-y-4">
        <SidebarItemTypes itemTypes={itemTypes} collapsed={collapsed} />
        <div className="border-t border-border/40 mx-2" />
        <SidebarCollections
          favoriteCollections={favoriteCollections}
          recentCollections={recentCollections}
          collapsed={collapsed}
        />
      </div>
      <SidebarUserProfile user={user} collapsed={collapsed} />
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
        {renderContent(isCollapsed)}
      </aside>

      {/* Mobile Drawer */}
      <SidebarMobileDrawer>{renderContent(false)}</SidebarMobileDrawer>
    </>
  );
}
