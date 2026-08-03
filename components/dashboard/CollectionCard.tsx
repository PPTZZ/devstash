import React from "react";
import Link from "next/link";
import { Star, MoreHorizontal } from "lucide-react";
import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";

export type CollectionCardItemType = {
  slug: string;
  name?: string;
  icon?: string;
  color?: string;
};

export type CollectionCardData = {
  id: string;
  name: string;
  description?: string | null;
  isFavorite: boolean;
  itemCount: number;
  itemTypes?: CollectionCardItemType[];
  itemTypeSlugs?: string[];
  dominantItemType?: {
    slug: string;
    name?: string;
    color: string;
  };
};

type CollectionCardProps = {
  collection: CollectionCardData;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  const leftBorderStyle = collection.dominantItemType?.color
    ? { borderLeftColor: collection.dominantItemType.color, borderLeftWidth: "3px" }
    : undefined;

  const itemTypesList: CollectionCardItemType[] =
    collection.itemTypes ||
    (collection.itemTypeSlugs
      ? collection.itemTypeSlugs.map((slug): CollectionCardItemType => ({ slug }))
      : []);

  return (
    <div
      className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card/40 p-4 transition-all duration-200 hover:border-border hover:bg-card/70 hover:shadow-md border-l-[3px]"
      style={leftBorderStyle}
    >
      <div className="space-y-3">
        {/* Header: Name + Favorite Star + Ellipsis */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              href={`/collections/${collection.id}`}
              className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate"
            >
              {collection.name}
            </Link>
            {collection.isFavorite && (
              <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
            )}
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors opacity-70 group-hover:opacity-100"
            aria-label={`Options for ${collection.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Item Count */}
        <div className="text-xs text-muted-foreground font-medium">
          {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
        </div>

        {/* Description */}
        {collection.description && (
          <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
            {collection.description}
          </p>
        )}
      </div>

      {/* Footer: Item Type Icons */}
      {itemTypesList.length > 0 && (
        <div className="flex items-center gap-2 pt-4 mt-2 border-t border-border/30">
          {itemTypesList.map((type) => (
            <ItemTypeIcon
              key={type.slug}
              slug={type.slug}
              iconName={type.icon}
              color={type.color}
              className="h-3.5 w-3.5"
            />
          ))}
        </div>
      )}
    </div>
  );
}
