"use client";

import React from "react";
import Image from "next/image";
import { Settings } from "lucide-react";
import { UserDetails } from "@/lib/db/user";
import { cn } from "@/lib/utils";

export type SidebarUserProfileProps = {
  user?: UserDetails | null;
  collapsed: boolean;
};

export function SidebarUserProfile({ user, collapsed }: SidebarUserProfileProps) {
  if (!user) return null;

  return (
    <div className="mt-auto pt-3 border-t border-border/40">
      <div
        className={cn(
          "flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-accent/40",
          collapsed ? "justify-center p-2" : "justify-between px-3 py-2"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-full border border-border/60 object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            {user.isPro && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                ★
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-foreground truncate leading-tight">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground truncate leading-tight">
                {user.email}
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
  );
}
