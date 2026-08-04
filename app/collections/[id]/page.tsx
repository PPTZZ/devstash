import React from "react";
import { getCollectionById } from "@/lib/db/collections";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = await getCollectionById(id);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {collection ? collection.name : "Collection Not Found"}
      </h1>
      {collection?.description && (
        <p className="text-sm text-muted-foreground">{collection.description}</p>
      )}
    </div>
  );
}
