import React from "react";
import { Pin, Star, ExternalLink, FileText } from "lucide-react";
import { Item } from "@/lib/mock-data";
import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/50 bg-card/40 p-4 transition-all duration-200 hover:border-border hover:bg-card/70 hover:shadow-md">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Type Icon Container */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 border border-border/40 group-hover:border-border/80 transition-colors">
          <ItemTypeIcon typeId={item.itemTypeId} className="h-4 w-4" />
        </div>

        {/* Title, Badges, Description, Tags */}
        <div className="space-y-1.5 min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {item.title}
            </h3>

            <div className="flex items-center gap-1 shrink-0">
              {item.isPinned && (
                <Pin className="h-3.5 w-3.5 text-muted-foreground fill-muted-foreground/30 rotate-45" />
              )}
              {item.isFavorite && (
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-1">
            {item.description}
          </p>

          {/* Content Preview (Snippet / Command / URL) if applicable */}
          {item.content && (
            <div className="mt-1 max-w-xl">
              <pre className="text-[11px] font-mono bg-muted/40 text-muted-foreground p-2 rounded-md overflow-x-auto max-h-16 line-clamp-2 leading-relaxed border border-border/30">
                {item.content}
              </pre>
            </div>
          )}

          {item.url && (
            <div className="flex items-center gap-1 text-xs text-blue-400 hover:underline">
              <ExternalLink className="h-3 w-3" />
              <a href={item.url} target="_blank" rel="noreferrer" className="truncate">
                {item.url}
              </a>
            </div>
          )}

          {item.fileName && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <FileText className="h-3 w-3 text-muted-foreground" />
              <span className="font-mono text-[11px]">{item.fileName}</span>
              {item.fileSize && (
                <span className="text-[10px] text-muted-foreground/60">
                  ({(item.fileSize / 1024).toFixed(1)} KB)
                </span>
              )}
            </div>
          )}

          {/* Tags Pills */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1 flex-wrap">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Far Right: Date */}
      <div className="text-xs text-muted-foreground/70 shrink-0 self-end sm:self-center font-medium">
        {item.createdAt}
      </div>
    </div>
  );
}
