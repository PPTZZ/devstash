import { db } from "@/lib/db";

export type CollectionWithDetails = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  itemTypes: {
    slug: string;
    name: string;
    icon: string;
    color: string;
    count: number;
  }[];
  dominantItemType?: {
    slug: string;
    name: string;
    color: string;
  };
  createdAt: Date;
};

export type DashboardStats = {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
};

/**
 * Fetch recent collections with item counts, unique item types, and dominant type color
 */
export async function getDashboardCollections(limit: number = 6): Promise<CollectionWithDetails[]> {
  const collections = await db.collection.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          item: {
            include: {
              itemType: true,
            },
          },
        },
      },
    },
  });

  return collections.map((col) => {
    const typeCounts: Record<
      string,
      { slug: string; name: string; icon: string; color: string; count: number }
    > = {};

    col.items.forEach(({ item }) => {
      if (item && item.itemType) {
        const { slug, name, icon, color } = item.itemType;
        if (!typeCounts[slug]) {
          typeCounts[slug] = { slug, name, icon, color, count: 0 };
        }
        typeCounts[slug].count += 1;
      }
    });

    const itemTypesList = Object.values(typeCounts);

    // Find dominant item type (most-used type in this collection)
    let dominantType: { slug: string; name: string; color: string } | undefined = undefined;
    let maxCount = 0;

    itemTypesList.forEach((t) => {
      if (t.count > maxCount) {
        maxCount = t.count;
        dominantType = { slug: t.slug, name: t.name, color: t.color };
      }
    });

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      itemTypes: itemTypesList,
      dominantItemType: dominantType,
      createdAt: col.createdAt,
    };
  });
}

/**
 * Fetch all collections from database
 */
export async function getAllCollections(): Promise<CollectionWithDetails[]> {
  return getDashboardCollections(100);
}

/**
 * Fetch overall statistics from database
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] = await Promise.all([
    db.item.count(),
    db.collection.count(),
    db.item.count({ where: { isFavorite: true } }),
    db.collection.count({ where: { isFavorite: true } }),
  ]);

  return {
    totalItems,
    totalCollections,
    favoriteItems,
    favoriteCollections,
  };
}

/**
 * Fetch collections formatted for the sidebar (separated into favorites and recents)
 */
export async function getSidebarCollections(): Promise<{
  favorites: CollectionWithDetails[];
  recents: CollectionWithDetails[];
}> {
  const allCollections = await getAllCollections();
  const favorites = allCollections.filter((c) => c.isFavorite);
  const recents = allCollections.filter((c) => !c.isFavorite);

  return {
    favorites,
    recents,
  };
}

