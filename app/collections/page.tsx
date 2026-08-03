import React from "react";
import { getAllCollections } from "@/lib/db/collections";
import { CollectionCard } from "@/components/dashboard/CollectionCard";

export default async function CollectionsPage() {
  const collections = await getAllCollections();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          All Collections
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse and manage all developer knowledge collections
        </p>
      </div>

      {collections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/20 p-8 text-center">
          <p className="text-sm text-muted-foreground">No collections found in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
