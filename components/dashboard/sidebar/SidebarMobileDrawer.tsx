"use client";

import React from "react";
import { Layers, X } from "lucide-react";
import { useSidebar } from "@/components/dashboard/SidebarContext";

export type SidebarMobileDrawerProps = {
  children: React.ReactNode;
};

export function SidebarMobileDrawer({ children }: SidebarMobileDrawerProps) {
  const { isMobileOpen, closeMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
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
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
