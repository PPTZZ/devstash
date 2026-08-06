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
  ChevronDown,
  LucideProps,
} from "lucide-react";
import { ItemTypeWithCount } from "@/lib/db/items";
import { useSidebar } from "@/components/dashboard/SidebarContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

function getTypeRoute(slug: string): string {
  if (slug.endsWith("s")) {
    return `/items/${slug}`;
  }
  return `/items/${slug}s`;
}

export type SidebarItemTypesProps = {
  itemTypes: ItemTypeWithCount[];
  collapsed: boolean;
};

export function SidebarItemTypes({ itemTypes, collapsed }: SidebarItemTypesProps) {
  const pathname = usePathname();
  const { closeMobileSidebar } = useSidebar();

  const displayItemTypes = [...itemTypes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
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
        {displayItemTypes.map((type) => {
          const route = getTypeRoute(type.slug);
          const isActive = pathname === route;
          const isPro =
            type.isProOnly ||
            type.slug === "file" ||
            type.slug === "files" ||
            type.slug === "image" ||
            type.slug === "images" ||
            type.name.toLowerCase() === "files" ||
            type.name.toLowerCase() === "images";

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
              <div className={cn("flex items-center gap-2.5 min-w-0", collapsed && "justify-center")}>
                {getItemTypeIcon(type.icon, type.color, { className: "h-4 w-4 shrink-0" })}
                {!collapsed && (
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="truncate">{type.name}</span>
                    {isPro && (
                      <Badge
                        variant="pro"
                        className="px-1.5 py-0 text-[9px] font-bold uppercase tracking-wider leading-tight shrink-0"
                      >
                        PRO
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {!collapsed && (
                <span className="text-xs font-normal text-muted-foreground/80 tabular-nums shrink-0 ml-2">
                  {type.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
