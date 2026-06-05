import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { CurrentUser } from "@/types/user";

/**
 * Returns the currently authenticated user's profile, or null if not logged in.
 * Safe to call in any Server Component or Server Action.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      cpf: true,
      avatarUrl: true,
    },
  });

  if (!profile) return null;

  return {
    ...profile,
    fullName: `${profile.firstName} ${profile.lastName}`,
  };
}
