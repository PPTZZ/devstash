"use client";

import React from "react";
import { Search, Plus, PanelLeft, FolderPlus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/dashboard/SidebarContext";

export function TopBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left Section: Sidebar Toggle & Brand Logo */}
      <div className="flex items-center gap-3 w-1/4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 font-semibold text-foreground tracking-tight select-none">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Layers className="h-4 w-4" />
          </div>
          <span className="text-base font-bold">DevStash</span>
        </div>
      </div>

      {/* Middle Section: Centered Search Bar */}
      <div className="flex flex-1 justify-center max-w-md px-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="w-full pl-9 pr-12 h-9 bg-muted/40 text-sm border-border/50 focus-visible:ring-1 focus-visible:ring-ring"
            readOnly
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground select-none pointer-events-none">
            <span className="text-xs">⌘</span>K
          </div>
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex items-center justify-end gap-2 w-1/4">
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-xs font-medium border-border/60"
        >
          <FolderPlus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Collection</span>
        </Button>
        <Button
          size="sm"
          className="h-9 gap-1.5 text-xs font-medium"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Item</span>
        </Button>
      </div>
    </header>
  );
}
