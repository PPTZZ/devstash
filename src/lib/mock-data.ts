export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  isPro: boolean;
};

export type ItemType = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count: number;
  isSystem: boolean;
  isProOnly: boolean;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  itemTypeSlugs: string[];
  createdAt: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  contentType: 'TEXT' | 'FILE' | 'URL';
  content?: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  language?: string;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  createdAt: string;
};

export const currentUser: User = {
  id: 'usr_1',
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://avatar.vercel.sh/john',
  isPro: true,
};

export const itemTypes: ItemType[] = [
  {
    id: 'type_snippet',
    name: 'Snippets',
    slug: 'snippet',
    icon: 'Code',
    color: '#3b82f6',
    count: 24,
    isSystem: true,
    isProOnly: false,
  },
  {
    id: 'type_prompt',
    name: 'Prompts',
    slug: 'prompt',
    icon: 'Sparkles',
    color: '#8b5cf6',
    count: 18,
    isSystem: true,
    isProOnly: false,
  },
  {
    id: 'type_command',
    name: 'Commands',
    slug: 'command',
    icon: 'Terminal',
    color: '#f97316',
    count: 15,
    isSystem: true,
    isProOnly: false,
  },
  {
    id: 'type_note',
    name: 'Notes',
    slug: 'note',
    icon: 'StickyNote',
    color: '#fde047',
    count: 12,
    isSystem: true,
    isProOnly: false,
  },
  {
    id: 'type_file',
    name: 'Files',
    slug: 'file',
    icon: 'File',
    color: '#6b7280',
    count: 5,
    isSystem: true,
    isProOnly: true,
  },
  {
    id: 'type_image',
    name: 'Images',
    slug: 'image',
    icon: 'Image',
    color: '#ec4899',
    count: 3,
    isSystem: true,
    isProOnly: true,
  },
  {
    id: 'type_link',
    name: 'Links',
    slug: 'link',
    icon: 'Link',
    color: '#10b981',
    count: 8,
    isSystem: true,
    isProOnly: false,
  },
];

export const collections: Collection[] = [
  {
    id: 'col_react_patterns',
    name: 'React Patterns',
    description: 'Common React patterns and hooks',
    isFavorite: true,
    itemCount: 12,
    itemTypeSlugs: ['snippet', 'file', 'link'],
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'col_python_snippets',
    name: 'Python Snippets',
    description: 'Useful Python code snippets',
    isFavorite: false,
    itemCount: 8,
    itemTypeSlugs: ['snippet', 'file'],
    createdAt: '2026-01-11T12:00:00Z',
  },
  {
    id: 'col_context_files',
    name: 'Context Files',
    description: 'AI context files for projects',
    isFavorite: true,
    itemCount: 5,
    itemTypeSlugs: ['file', 'note'],
    createdAt: '2026-01-12T14:30:00Z',
  },
  {
    id: 'col_interview_prep',
    name: 'Interview Prep',
    description: 'Technical interview preparation',
    isFavorite: false,
    itemCount: 24,
    itemTypeSlugs: ['note', 'snippet', 'link', 'prompt'],
    createdAt: '2026-01-05T09:15:00Z',
  },
  {
    id: 'col_git_commands',
    name: 'Git Commands',
    description: 'Frequently used git commands',
    isFavorite: true,
    itemCount: 15,
    itemTypeSlugs: ['command', 'file'],
    createdAt: '2026-01-08T16:20:00Z',
  },
  {
    id: 'col_ai_prompts',
    name: 'AI Prompts',
    description: 'Curated AI prompts for coding',
    isFavorite: false,
    itemCount: 18,
    itemTypeSlugs: ['prompt', 'snippet', 'file'],
    createdAt: '2026-01-02T11:45:00Z',
  },
];

export const items: Item[] = [
  {
    id: 'item_1',
    title: 'useAuth Hook',
    description: 'Custom authentication hook for React applications',
    contentType: 'TEXT',
    content: `import { useState, useEffect, createContext, useContext } from 'react';\n\nconst AuthContext = createContext(null);\n\nexport const AuthProvider = ({ children }) => {\n  const [user, setUser] = useState(null);\n  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;\n};\n\nexport const useAuth = () => useContext(AuthContext);`,
    language: 'typescript',
    isFavorite: true,
    isPinned: true,
    itemTypeId: 'type_snippet',
    collectionIds: ['col_react_patterns'],
    tags: ['react', 'auth', 'hooks'],
    createdAt: 'Jan 15',
  },
  {
    id: 'item_2',
    title: 'API Error Handling Pattern',
    description: 'Fetch wrapper with exponential backoff retry logic',
    contentType: 'TEXT',
    content: `async function fetchWithRetry(url: string, options = {}, retries = 3, backoff = 300) {\n  try {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);\n    return await response.json();\n  } catch (err) {\n    if (retries <= 0) throw err;\n    await new Promise(r => setTimeout(r, backoff));\n    return fetchWithRetry(url, options, retries - 1, backoff * 2);\n  }\n}`,
    language: 'typescript',
    isFavorite: false,
    isPinned: true,
    itemTypeId: 'type_snippet',
    collectionIds: ['col_react_patterns'],
    tags: ['typescript', 'fetch', 'api'],
    createdAt: 'Jan 12',
  },
  {
    id: 'item_3',
    title: 'System Prompt for Code Review',
    description: 'Comprehensive code review prompt focusing on security and performance',
    contentType: 'TEXT',
    content: 'Act as a principal software engineer. Review the following code for security vulnerabilities, performance bottlenecks, and adherence to clean code principles...',
    isFavorite: true,
    isPinned: false,
    itemTypeId: 'type_prompt',
    collectionIds: ['col_ai_prompts', 'col_interview_prep'],
    tags: ['ai', 'code-review', 'prompt'],
    createdAt: 'Jan 10',
  },
  {
    id: 'item_4',
    title: 'Git Undo Last Commit (Keep Changes)',
    description: 'Soft reset command to move HEAD back by one commit while keeping modifications in workspace',
    contentType: 'TEXT',
    content: 'git reset --soft HEAD~1',
    language: 'bash',
    isFavorite: true,
    isPinned: false,
    itemTypeId: 'type_command',
    collectionIds: ['col_git_commands'],
    tags: ['git', 'cli', 'undo'],
    createdAt: 'Jan 08',
  },
  {
    id: 'item_5',
    title: 'Project Architecture & Spec Context File',
    description: 'Standard project specification template for AI context injection',
    contentType: 'FILE',
    fileName: 'project-overview.md',
    fileSize: 13418,
    fileUrl: '/files/project-overview.md',
    isFavorite: false,
    isPinned: false,
    itemTypeId: 'type_file',
    collectionIds: ['col_context_files'],
    tags: ['context', 'spec', 'markdown'],
    createdAt: 'Jan 05',
  },
  {
    id: 'item_6',
    title: 'Tailwind CSS v4 Documentation',
    description: 'Official Tailwind CSS v4 documentation link and release highlights',
    contentType: 'URL',
    url: 'https://tailwindcss.com/docs',
    isFavorite: false,
    isPinned: false,
    itemTypeId: 'type_link',
    collectionIds: ['col_react_patterns'],
    tags: ['css', 'tailwind', 'docs'],
    createdAt: 'Jan 03',
  },
  {
    id: 'item_7',
    title: 'Python Decorator for Execution Time',
    description: 'Decorator to measure and log function performance metrics in milliseconds',
    contentType: 'TEXT',
    content: `import time\nimport functools\n\ndef timeit(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        res = func(*args, **kwargs)\n        print(f"{func.__name__} took {(time.perf_counter() - start) * 1000:.2f}ms")\n        return res\n    return wrapper`,
    language: 'python',
    isFavorite: true,
    isPinned: false,
    itemTypeId: 'type_snippet',
    collectionIds: ['col_python_snippets'],
    tags: ['python', 'decorator', 'performance'],
    createdAt: 'Jan 02',
  },
  {
    id: 'item_8',
    title: 'Docker Compose for Postgres & Redis',
    description: 'Local development environment setup for Postgres and Redis cache',
    contentType: 'TEXT',
    content: `version: '3.8'\nservices:\n  db:\n    image: postgres:16-alpine\n    ports:\n      - "5432:5432"\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"`,
    language: 'yaml',
    isFavorite: false,
    isPinned: false,
    itemTypeId: 'type_command',
    collectionIds: ['col_git_commands'],
    tags: ['docker', 'postgres', 'redis'],
    createdAt: 'Dec 28',
  },
  {
    id: 'item_9',
    title: 'System Design Interview Cheatsheet',
    description: 'Key trade-offs, estimation formulas, and architectural patterns for system design',
    contentType: 'TEXT',
    content: '1. Scale: QPS calculations and bandwidth estimations\n2. Caching: Redis vs Memcached\n3. Database: SQL normalization vs NoSQL sharding',
    isFavorite: false,
    isPinned: false,
    itemTypeId: 'type_note',
    collectionIds: ['col_interview_prep'],
    tags: ['architecture', 'system-design', 'interview'],
    createdAt: 'Dec 24',
  },
  {
    id: 'item_10',
    title: 'Next.js App Router Official Docs',
    description: 'Guide on Server Components, Client Components, and routing patterns in Next.js',
    contentType: 'URL',
    url: 'https://nextjs.org/docs/app',
    isFavorite: true,
    isPinned: false,
    itemTypeId: 'type_link',
    collectionIds: ['col_react_patterns'],
    tags: ['nextjs', 'react', 'routing'],
    createdAt: 'Dec 20',
  },
];
