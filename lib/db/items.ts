import { db } from "@/lib/db";

export type ItemWithDetails = {
  id: string;
  title: string;
  description: string | null;
  contentType: "TEXT" | "FILE" | "URL";
  content: string | null;
  url: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  itemType: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    color: string;
  };
  tags: string[];
  createdAt: Date;
};

/**
 * Fetch all pinned items with itemType and tags details
 */
export async function getPinnedItems(userId?: string): Promise<ItemWithDetails[]> {
  const items = await db.item.findMany({
    where: {
      isPinned: true,
      ...(userId ? { userId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      itemType: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    contentType: item.contentType,
    content: item.content,
    url: item.url,
    fileUrl: item.fileUrl,
    fileName: item.fileName,
    fileSize: item.fileSize,
    language: item.language,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    itemTypeId: item.itemTypeId,
    itemType: {
      id: item.itemType.id,
      name: item.itemType.name,
      slug: item.itemType.slug,
      icon: item.itemType.icon,
      color: item.itemType.color,
    },
    tags: item.tags.map((t) => t.tag.name),
    createdAt: item.createdAt,
  }));
}

/**
 * Fetch recent items up to specified limit
 */
export async function getRecentItems(
  limit: number = 10,
  userId?: string
): Promise<ItemWithDetails[]> {
  const items = await db.item.findMany({
    take: limit,
    where: userId ? { userId } : undefined,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      itemType: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    contentType: item.contentType,
    content: item.content,
    url: item.url,
    fileUrl: item.fileUrl,
    fileName: item.fileName,
    fileSize: item.fileSize,
    language: item.language,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    itemTypeId: item.itemTypeId,
    itemType: {
      id: item.itemType.id,
      name: item.itemType.name,
      slug: item.itemType.slug,
      icon: item.itemType.icon,
      color: item.itemType.color,
    },
    tags: item.tags.map((t) => t.tag.name),
    createdAt: item.createdAt,
  }));
}

export type ItemTypeWithCount = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isProOnly?: boolean;
  count: number;
};

/**
 * Fetch all system item types with dynamic item counts from database
 */
export async function getItemTypesWithCounts(userId?: string): Promise<ItemTypeWithCount[]> {
  const types = await db.itemType.findMany({
    where: {
      isSystem: true,
    },
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          items: userId ? { where: { userId } } : true,
        },
      },
    },
  });

  return types.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    icon: t.icon,
    color: t.color,
    isProOnly: t.isProOnly,
    count: t._count.items,
  }));
}

/**
 * Fetch items matching a specific item type slug or name
 */
export async function getItemsByType(
  typeSlug: string,
  userId?: string
): Promise<ItemWithDetails[]> {
  const normalizedSlug = typeSlug.endsWith("s") ? typeSlug.slice(0, -1) : typeSlug;

  const items = await db.item.findMany({
    where: {
      itemType: {
        OR: [
          { slug: normalizedSlug },
          { slug: typeSlug },
          { name: { equals: typeSlug, mode: "insensitive" } },
        ],
      },
      ...(userId ? { userId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      itemType: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    contentType: item.contentType,
    content: item.content,
    url: item.url,
    fileUrl: item.fileUrl,
    fileName: item.fileName,
    fileSize: item.fileSize,
    language: item.language,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    itemTypeId: item.itemTypeId,
    itemType: {
      id: item.itemType.id,
      name: item.itemType.name,
      slug: item.itemType.slug,
      icon: item.itemType.icon,
      color: item.itemType.color,
    },
    tags: item.tags.map((t) => t.tag.name),
    createdAt: item.createdAt,
  }));
}

