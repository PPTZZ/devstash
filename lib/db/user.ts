import { db } from "@/lib/db";

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  image: string;
  isPro: boolean;
};

/**
 * Fetch current user from Neon database
 */
export async function getCurrentUser(): Promise<UserDetails | null> {
  const user = await db.user.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name || "Developer",
    email: user.email || "dev@devstash.io",
    image: user.image || `https://avatar.vercel.sh/${user.id}`,
    isPro: user.isPro,
  };
}
