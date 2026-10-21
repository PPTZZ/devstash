"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { UserDetails } from "@/lib/db/user";
import { UserAvatar } from "@/components/ui/user-avatar";
import { cn } from "@/lib/utils";

export type SidebarUserProfileProps = {
  user?: UserDetails | null;
  collapsed: boolean;
};

export const SidebarUserProfile = React.memo(function SidebarUserProfile({
  user,
  collapsed,
}: SidebarUserProfileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (!user) return null;

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-auto pt-3 border-t border-border/40"
    >
      {menuOpen && (
        <div
          role="menu"
          aria-label="User menu"
          className={cn(
            "absolute bottom-full mb-2 z-50 min-w-52 rounded-xl border border-border/60 bg-popover p-1.5 text-popover-foreground shadow-lg backdrop-blur",
            collapsed ? "left-0" : "left-0 right-0"
          )}
        >
          <div className="px-2.5 py-2 border-b border-border/40 mb-1">
            <p className="text-xs font-semibold text-foreground truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Profile</span>
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-2 rounded-xl transition-colors hover:bg-accent/40",
          collapsed ? "justify-center p-2" : "justify-between px-2.5 py-2"
        )}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="Open user menu"
          className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer focus:outline-none"
        >
          <div className="relative shrink-0">
            <UserAvatar
              name={user.name}
              email={user.email}
              image={user.image}
              size="md"
            />
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
        </button>

        {!collapsed && (
          <Link
            href="/profile"
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors shrink-0"
            title="Profile"
            aria-label="Profile"
          >
            <User className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
});

SidebarUserProfile.displayName = "SidebarUserProfile";
