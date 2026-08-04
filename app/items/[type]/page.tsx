import React from "react";
import { getItemsByType } from "@/lib/db/items";
import { ItemCard } from "@/components/dashboard/ItemCard";

export default async function ItemTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const items = await getItemsByType(type);
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground capitalize">
          {items.length > 0 ? items[0].itemType.name : title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Showing all items categorized under {title.toLowerCase()}.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/20 p-8 text-center">
          <p className="text-sm text-muted-foreground">No items found for this type in database.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

