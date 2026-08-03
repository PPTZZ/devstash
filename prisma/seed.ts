import { db } from '../src/lib/db';
import { currentUser, itemTypes, collections, items } from '../src/lib/mock-data';

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Current User
  const user = await db.user.upsert({
    where: { id: currentUser.id },
    update: {
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      isPro: currentUser.isPro,
      tier: currentUser.isPro ? 'PRO' : 'FREE',
    },
    create: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      isPro: currentUser.isPro,
      tier: currentUser.isPro ? 'PRO' : 'FREE',
    },
  });
  console.log(`👤 User seeded: ${user.name} (${user.id})`);

  // 2. Seed ItemTypes
  for (const type of itemTypes) {
    await db.itemType.upsert({
      where: { id: type.id },
      update: {
        name: type.name,
        slug: type.slug,
        icon: type.icon,
        color: type.color,
        isSystem: type.isSystem,
        isProOnly: type.isProOnly,
      },
      create: {
        id: type.id,
        name: type.name,
        slug: type.slug,
        icon: type.icon,
        color: type.color,
        isSystem: type.isSystem,
        isProOnly: type.isProOnly,
      },
    });
  }
  console.log(`🏷️  Seeded ${itemTypes.length} system ItemTypes.`);

  // 3. Seed Collections
  for (const col of collections) {
    await db.collection.upsert({
      where: { id: col.id },
      update: {
        name: col.name,
        description: col.description,
        isFavorite: col.isFavorite,
        userId: user.id,
        createdAt: new Date(col.createdAt),
      },
      create: {
        id: col.id,
        name: col.name,
        description: col.description,
        isFavorite: col.isFavorite,
        userId: user.id,
        createdAt: new Date(col.createdAt),
      },
    });
  }
  console.log(`📁 Seeded ${collections.length} Collections.`);

  // 4. Seed Items, Tags, and Collection Relations
  for (const item of items) {
    // Calculate valid date from createdAt string or default to current date
    let itemCreatedAt = new Date();
    if (item.createdAt.includes('Jan') || item.createdAt.includes('Dec')) {
      const year = item.createdAt.includes('Dec') ? 2025 : 2026;
      itemCreatedAt = new Date(`${item.createdAt}, ${year}`);
    }

    await db.item.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        contentType: item.contentType,
        content: item.content || null,
        url: item.url || null,
        fileUrl: item.fileUrl || null,
        fileName: item.fileName || null,
        fileSize: item.fileSize || null,
        language: item.language || null,
        isFavorite: item.isFavorite,
        isPinned: item.isPinned,
        userId: user.id,
        itemTypeId: item.itemTypeId,
        createdAt: itemCreatedAt,
      },
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        contentType: item.contentType,
        content: item.content || null,
        url: item.url || null,
        fileUrl: item.fileUrl || null,
        fileName: item.fileName || null,
        fileSize: item.fileSize || null,
        language: item.language || null,
        isFavorite: item.isFavorite,
        isPinned: item.isPinned,
        userId: user.id,
        itemTypeId: item.itemTypeId,
        createdAt: itemCreatedAt,
      },
    });

    // Link item to collections
    for (const colId of item.collectionIds) {
      await db.itemCollection.upsert({
        where: {
          itemId_collectionId: {
            itemId: item.id,
            collectionId: colId,
          },
        },
        update: {},
        create: {
          itemId: item.id,
          collectionId: colId,
        },
      });
    }

    // Process Tags
    for (const tagName of item.tags) {
      const tag = await db.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      await db.itemTag.upsert({
        where: {
          itemId_tagId: {
            itemId: item.id,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          itemId: item.id,
          tagId: tag.id,
        },
      });
    }
  }
  console.log(`📝 Seeded ${items.length} Items with Tags & Collection relations.`);

  console.log('✅ Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  });
