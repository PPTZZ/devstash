import React from "react";
import { itemTypes } from "@/src/lib/mock-data";

export default async function ItemTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const itemType = itemTypes.find(
    (t) =>
      t.slug === type ||
      `${t.slug}s` === type ||
      t.name.toLowerCase() === type.toLowerCase()
  );

  const title = itemType ? itemType.name : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">
        Showing all items categorized under {title.toLowerCase()}.
      </p>
    </div>
  );
}
