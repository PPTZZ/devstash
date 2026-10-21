import { auth } from "@/auth";
import { db } from "@/lib/db";

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
};

/**
 * Fetch current authenticated user from session and Neon database
 */
export async function getCurrentUser(): Promise<UserDetails | null> {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = session.user.id
    ? await db.user.findUnique({ where: { id: session.user.id } })
    : session.user.email
      ? await db.user.findUnique({ where: { email: session.user.email } })
      : null;

  if (!user) {
    return {
      id: session.user.id || "",
      name: session.user.name || "Developer",
      email: session.user.email || "",
      image: session.user.image ?? null,
      isPro: false,
    };
  }

  return {
    id: user.id,
    name: user.name || session.user.name || "Developer",
    email: user.email || session.user.email || "",
    image: user.image ?? session.user.image ?? null,
    isPro: user.isPro,
  };
}
