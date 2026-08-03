import React from "react";
import Link from "next/link";
import { Pin, Clock } from "lucide-react";
import { getDashboardCollections, getDashboardStats } from "@/lib/db/collections";
import { getPinnedItems, getRecentItems } from "@/lib/db/items";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";

export default async function DashboardPage() {
  const [collections, stats, pinnedItems, recentItems] = await Promise.all([
    getDashboardCollections(6),
    getDashboardStats(),
    getPinnedItems(),
    getRecentItems(10),
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Top Header Section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Your developer knowledge hub
        </p>
      </div>

      {/* 4 Stats Cards */}
      <section aria-label="Dashboard Overview Statistics">
        <StatsCards stats={stats} />
      </section>

      {/* Collections Section */}
      <section className="space-y-4" aria-label="Recent Collections">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Collections
          </h2>
          <Link
            href="/collections"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
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
      </section>

      {/* Pinned Items Section */}
      {pinnedItems.length > 0 && (
        <section className="space-y-4" aria-label="Pinned Items">
          <div className="flex items-center gap-2">
            <Pin className="h-4 w-4 text-muted-foreground rotate-45" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Pinned
            </h2>
          </div>

          <div className="space-y-3">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* 10 Recent Items Section */}
      <section className="space-y-4" aria-label="Recent Items">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Recent Items
          </h2>
        </div>

        {recentItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/60 bg-card/20 p-8 text-center">
            <p className="text-sm text-muted-foreground">No recent items found in database.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
