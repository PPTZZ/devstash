import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';

async function main() {
  console.log('🌱 Starting database seeding per seed-spec.md...');

  // 1. Clean all existing user data (items, collections, tags) for a fresh seed state
  await db.itemCollection.deleteMany({});
  await db.itemTag.deleteMany({});
  await db.item.deleteMany({});
  await db.collection.deleteMany({});
  await db.user.deleteMany({});

  // 2. Password hashing with bcryptjs (12 rounds)
  const hashedPassword = await bcrypt.hash('12345678', 12);

  // 3. Demo User
  const user = await db.user.upsert({
    where: { email: 'demo@devstash.io' },
    update: {
      name: 'Demo User',
      passwordHash: hashedPassword,
      isPro: false,
      tier: 'FREE',
      emailVerified: new Date(),
    },
    create: {
      name: 'Demo User',
      email: 'demo@devstash.io',
      passwordHash: hashedPassword,
      isPro: false,
      tier: 'FREE',
      emailVerified: new Date(),
    },
  });
  console.log(`👤 Seeded Demo User: ${user.name} (${user.email})`);

  // 3. System Item Types
  const systemItemTypes = [
    { name: 'snippet', slug: 'snippet', icon: 'Code', color: '#3b82f6', isProOnly: false },
    { name: 'prompt', slug: 'prompt', icon: 'Sparkles', color: '#8b5cf6', isProOnly: false },
    { name: 'command', slug: 'command', icon: 'Terminal', color: '#f97316', isProOnly: false },
    { name: 'note', slug: 'note', icon: 'StickyNote', color: '#fde047', isProOnly: false },
    { name: 'file', slug: 'file', icon: 'File', color: '#6b7280', isProOnly: true },
    { name: 'image', slug: 'image', icon: 'Image', color: '#ec4899', isProOnly: true },
    { name: 'link', slug: 'link', icon: 'Link', color: '#10b981', isProOnly: false },
  ];

  const itemTypeMap: Record<string, string> = {};

  for (const type of systemItemTypes) {
    const existing = await db.itemType.findFirst({
      where: { userId: null, slug: type.slug },
    });

    const itemType = existing
      ? await db.itemType.update({
          where: { id: existing.id },
          data: {
            name: type.name,
            icon: type.icon,
            color: type.color,
            isSystem: true,
            isProOnly: type.isProOnly,
          },
        })
      : await db.itemType.create({
          data: {
            name: type.name,
            slug: type.slug,
            icon: type.icon,
            color: type.color,
            isSystem: true,
            isProOnly: type.isProOnly,
          },
        });

    itemTypeMap[type.slug] = itemType.id;
  }
  console.log(`🏷️  Seeded ${systemItemTypes.length} System ItemTypes.`);

  // Helper function to create or get tag ID
  const getTagId = async (name: string) => {
    const tag = await db.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    return tag.id;
  };

  // Helper function to seed collection + items
  const seedCollectionWithItems = async (
    collectionData: { name: string; description: string; isFavorite: boolean },
    itemsData: Array<{
      title: string;
      description: string;
      contentType: 'TEXT' | 'FILE' | 'URL';
      content?: string;
      url?: string;
      language?: string;
      isFavorite?: boolean;
      isPinned?: boolean;
      typeSlug: string;
      tags: string[];
    }>
  ) => {
    // Find or create collection for this user
    let collection = await db.collection.findFirst({
      where: { userId: user.id, name: collectionData.name },
    });

    if (!collection) {
      collection = await db.collection.create({
        data: {
          name: collectionData.name,
          description: collectionData.description,
          isFavorite: collectionData.isFavorite,
          userId: user.id,
        },
      });
    } else {
      collection = await db.collection.update({
        where: { id: collection.id },
        data: {
          description: collectionData.description,
          isFavorite: collectionData.isFavorite,
        },
      });
    }

    for (const itemDef of itemsData) {
      const itemTypeId = itemTypeMap[itemDef.typeSlug];

      const item = await db.item.create({
        data: {
          title: itemDef.title,
          description: itemDef.description,
          contentType: itemDef.contentType,
          content: itemDef.content || null,
          url: itemDef.url || null,
          language: itemDef.language || null,
          isFavorite: itemDef.isFavorite || false,
          isPinned: itemDef.isPinned || false,
          userId: user.id,
          itemTypeId,
        },
      });

      // Link Item to Collection
      await db.itemCollection.create({
        data: {
          itemId: item.id,
          collectionId: collection.id,
        },
      });

      // Link Item to Tags
      for (const tagName of itemDef.tags) {
        const tagId = await getTagId(tagName);
        await db.itemTag.create({
          data: {
            itemId: item.id,
            tagId,
          },
        });
      }
    }

    return collection;
  };

  // 4. Clean previous seed data for demo user if re-running
  await db.itemCollection.deleteMany({
    where: { collection: { userId: user.id } },
  });
  await db.itemTag.deleteMany({
    where: { item: { userId: user.id } },
  });
  await db.item.deleteMany({
    where: { userId: user.id },
  });
  await db.collection.deleteMany({
    where: { userId: user.id },
  });

  // 5. Seed Collections & Items per spec

  // Collection 1: React Patterns
  await seedCollectionWithItems(
    {
      name: 'React Patterns',
      description: 'Reusable React patterns and hooks',
      isFavorite: true,
    },
    [
      {
        title: 'useDebounce Hook',
        description: 'Custom React hook to delay value updates until user stops typing',
        contentType: 'TEXT',
        content: `import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debouncedValue;\n}`,
        language: 'typescript',
        isFavorite: true,
        isPinned: true,
        typeSlug: 'snippet',
        tags: ['react', 'hooks', 'typescript', 'debounce'],
      },
      {
        title: 'useLocalStorage Hook',
        description: 'Persistent state hook synchronized with browser localStorage',
        contentType: 'TEXT',
        content: `import { useState, useEffect } from 'react';\n\nexport function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch {\n      return initialValue;\n    }\n  });\n\n  useEffect(() => {\n    try {\n      window.localStorage.setItem(key, JSON.stringify(storedValue));\n    } catch (error) {\n      console.error(error);\n    }\n  }, [key, storedValue]);\n\n  return [storedValue, setStoredValue];\n}`,
        language: 'typescript',
        isFavorite: true,
        isPinned: false,
        typeSlug: 'snippet',
        tags: ['react', 'hooks', 'typescript', 'storage'],
      },
      {
        title: 'Compound Component Pattern',
        description: 'Flexible component composition pattern using React Context',
        contentType: 'TEXT',
        content: `import { createContext, useContext, useState, ReactNode } from 'react';\n\ninterface ToggleContextType {\n  on: boolean;\n  toggle: () => void;\n}\n\nconst ToggleContext = createContext<ToggleContextType | undefined>(undefined);\n\nexport function Toggle({ children }: { children: ReactNode }) {\n  const [on, setOn] = useState(false);\n  const toggle = () => setOn((prev) => !prev);\n\n  return <ToggleContext.Provider value={{ on, toggle }}>{children}</ToggleContext.Provider>;\n}\n\nexport function ToggleButton() {\n  const context = useContext(ToggleContext);\n  if (!context) throw new Error('ToggleButton must be used within Toggle');\n  return <button onClick={context.toggle}>{context.on ? 'Turn Off' : 'Turn On'}</button>;\n}`,
        language: 'typescript',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'snippet',
        tags: ['react', 'patterns', 'context', 'components'],
      },
    ]
  );

  // Collection 2: AI Workflows
  await seedCollectionWithItems(
    {
      name: 'AI Workflows',
      description: 'AI prompts and workflow automations',
      isFavorite: true,
    },
    [
      {
        title: 'Principal Engineer Code Review',
        description: 'Security, performance, and architecture focused code review prompt',
        contentType: 'TEXT',
        content: 'You are a Principal Software Engineer. Conduct a thorough code review of the following pull request code. Analyze security risks, memory efficiency, algorithm time complexity, adherence to DRY principles, and type safety. Highlight breaking changes and recommend clean refactoring options with examples.',
        isFavorite: true,
        isPinned: true,
        typeSlug: 'prompt',
        tags: ['ai', 'code-review', 'security', 'architecture'],
      },
      {
        title: 'Documentation Generator Prompt',
        description: 'Prompt to generate precise JSDoc annotations and OpenAPI specs',
        contentType: 'TEXT',
        content: 'Parse the following TypeScript route handlers or functions and generate comprehensive JSDoc comments detailing param types, return types, throws errors, and standard OpenAPI 3.0 JSON schema specifications for request and response payloads.',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'prompt',
        tags: ['ai', 'documentation', 'jsdoc', 'openapi'],
      },
      {
        title: 'Refactoring Assistant Prompt',
        description: 'Prompt for decomposing monolithic functions into pure modular helpers',
        contentType: 'TEXT',
        content: 'Analyze the provided monolithic function. Identify separate concerns, extract them into single-responsibility pure functions, write unit test assertions for each helper, and explain your refactoring step-by-step.',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'prompt',
        tags: ['ai', 'refactoring', 'clean-code', 'prompt'],
      },
    ]
  );

  // Collection 3: DevOps
  await seedCollectionWithItems(
    {
      name: 'DevOps',
      description: 'Infrastructure and deployment resources',
      isFavorite: false,
    },
    [
      {
        title: 'Next.js Multi-Stage Dockerfile',
        description: 'Optimized multi-stage Dockerfile for Next.js standalone output',
        contentType: 'TEXT',
        content: `FROM node:20-alpine AS base\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\n\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY --from=base /app/node_modules ./node_modules\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\nEXPOSE 3000\nCMD ["node", "server.js"]`,
        language: 'dockerfile',
        isFavorite: true,
        isPinned: false,
        typeSlug: 'snippet',
        tags: ['docker', 'nextjs', 'devops', 'container'],
      },
      {
        title: 'Zero-Downtime Deployment Script',
        description: 'Bash command sequence for zero-downtime container swaps',
        contentType: 'TEXT',
        content: 'docker-compose -f docker-compose.green.yml up -d --build && sleep 10 && docker exec nginx nginx -s reload && docker-compose -f docker-compose.blue.yml stop',
        language: 'bash',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'command',
        tags: ['bash', 'deployment', 'docker', 'cicd'],
      },
      {
        title: 'Docker Documentation',
        description: 'Official guides and reference docs for Docker Engine & Compose',
        contentType: 'URL',
        url: 'https://docs.docker.com',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'link',
        tags: ['docker', 'docs', 'devops'],
      },
      {
        title: 'GitHub Actions Documentation',
        description: 'Official guide for CI/CD workflow automation on GitHub',
        contentType: 'URL',
        url: 'https://docs.github.com/en/actions',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'link',
        tags: ['github', 'actions', 'cicd', 'docs'],
      },
    ]
  );

  // Collection 4: Terminal Commands
  await seedCollectionWithItems(
    {
      name: 'Terminal Commands',
      description: 'Useful shell commands for everyday development',
      isFavorite: true,
    },
    [
      {
        title: 'Interactive Git Rebase',
        description: 'Rebase last 4 commits interactively before pushing PR',
        contentType: 'TEXT',
        content: 'git rebase -i HEAD~4',
        language: 'bash',
        isFavorite: true,
        isPinned: true,
        typeSlug: 'command',
        tags: ['git', 'cli', 'rebase'],
      },
      {
        title: 'Prune Docker System Resources',
        description: 'Remove all stopped containers, unused networks, images, and volumes',
        contentType: 'TEXT',
        content: 'docker system prune -a --volumes -f',
        language: 'bash',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'command',
        tags: ['docker', 'cli', 'cleanup'],
      },
      {
        title: 'Kill Process on Port 3000',
        description: 'Find process occupying port 3000 and forcefully terminate it',
        contentType: 'TEXT',
        content: "lsof -i :3000 | awk 'NR>1 {print $2}' | xargs kill -9",
        language: 'bash',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'command',
        tags: ['bash', 'port', 'process', 'kill'],
      },
      {
        title: 'pnpm Clean Install & Cache Clear',
        description: 'Clear global pnpm package store and run fresh clean install',
        contentType: 'TEXT',
        content: 'pnpm store prune && pnpm install --frozen-lockfile',
        language: 'bash',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'command',
        tags: ['pnpm', 'cli', 'package-manager'],
      },
    ]
  );

  // Collection 5: Design Resources
  await seedCollectionWithItems(
    {
      name: 'Design Resources',
      description: 'UI/UX resources and references',
      isFavorite: false,
    },
    [
      {
        title: 'Tailwind CSS Documentation',
        description: 'Official Tailwind CSS utility framework documentation',
        contentType: 'URL',
        url: 'https://tailwindcss.com/docs',
        isFavorite: true,
        isPinned: false,
        typeSlug: 'link',
        tags: ['css', 'tailwind', 'design', 'docs'],
      },
      {
        title: 'Shadcn UI Component Library',
        description: 'Re-usable accessible React components built with Radix UI and Tailwind',
        contentType: 'URL',
        url: 'https://ui.shadcn.com',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'link',
        tags: ['shadcn', 'components', 'ui', 'react'],
      },
      {
        title: 'Radix UI Primitives',
        description: 'Unstyled, accessible component primitives for building design systems',
        contentType: 'URL',
        url: 'https://www.radix-ui.com',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'link',
        tags: ['radix', 'accessibility', 'ui', 'primitives'],
      },
      {
        title: 'Lucide Icons Catalog',
        description: 'Beautiful & consistent open-source icon set for web applications',
        contentType: 'URL',
        url: 'https://lucide.dev/icons',
        isFavorite: false,
        isPinned: false,
        typeSlug: 'link',
        tags: ['icons', 'lucide', 'design', 'svg'],
      },
    ]
  );

  console.log('✅ Database seeding finished successfully according to seed-spec.md!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  });
