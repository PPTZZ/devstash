import 'dotenv/config';
import { db } from '../src/lib/db';

async function testDatabase() {
  console.log('🔍 Testing database connection and models...\n');

  try {
    // 1. Fetch User
    const userCount = await db.user.count();
    const users = await db.user.findMany({ take: 5 });
    console.log(`✅ Users count: ${userCount}`);
    console.log('   Sample User:', users[0]?.email ?? 'No users found');

    // 2. Fetch ItemTypes
    const itemTypeCount = await db.itemType.count();
    const itemTypes = await db.itemType.findMany({ select: { name: true, slug: true } });
    console.log(`✅ ItemTypes count: ${itemTypeCount}`);
    console.log('   ItemTypes:', itemTypes.map((t) => t.name).join(', '));

    // 3. Fetch Collections
    const collectionCount = await db.collection.count();
    const collections = await db.collection.findMany({
      include: {
        _count: {
          select: { items: true },
        },
      },
    });
    console.log(`✅ Collections count: ${collectionCount}`);
    collections.forEach((col) => {
      console.log(`   - ${col.name} (${col._count.items} items)`);
    });

    // 4. Fetch Items with relations
    const itemCount = await db.item.count();
    const items = await db.item.findMany({
      take: 3,
      include: {
        itemType: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    console.log(`✅ Items count: ${itemCount}`);
    items.forEach((item) => {
      const tags = item.tags.map((t) => t.tag.name).join(', ');
      console.log(`   - [${item.itemType.name}] ${item.title} (Tags: ${tags})`);
    });

    console.log('\n🎉 Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

testDatabase();
