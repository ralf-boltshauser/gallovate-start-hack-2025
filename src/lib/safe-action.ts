import { prisma } from "@/lib/client";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";

export const actionClient = createSafeActionClient();

const ANON_COOKIE_NAME = "anon_user_id";

async function getOrCreateAnonymousUser() {
  const cookieStore = await cookies();
  const anonId = cookieStore.get(ANON_COOKIE_NAME)?.value;

  if (anonId) {
    // Try to get existing user
    const existingUser = await prisma.user.findUnique({
      where: { id: anonId },
    });
    if (existingUser) return existingUser;
  }

  // Create new anonymous user if none exists
  const newUser = await prisma.user.create({
    data: {
      name: "Anonymous",
    },
  });

  // Set cookie with new user ID
  cookieStore.set(ANON_COOKIE_NAME, newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
  });

  return newUser;
}

export type AnonymousUser = Awaited<
  ReturnType<typeof getOrCreateAnonymousUser>
>;

export const authClient = actionClient.use(async ({ next }) => {
  const user = await getOrCreateAnonymousUser();
  console.log("user", user);
  return next({ ctx: { user } });
});
