"use server";

import { prisma } from "@/lib/client";
import { GuideCompletionType, UserType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ANON_COOKIE_NAME = "anon_user_id";

export async function getOrCreateAnonymousUser() {
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

export async function submitAnswer(formData: FormData) {
  const questionId = formData.get("questionId") as string;
  const answer = formData.get("answer") as string;
  const userType = formData.get("userType") as UserType | null;

  console.log(`Question: ${questionId}, Answer: ${answer}`);

  // If this is the innovation knowledge question and we have a user type
  if (questionId === "innovation_knowledge" && userType) {
    console.log(`Updating user type to: ${userType}`);
    // Here you would update the user type in your database
    // For now, we'll just log it
  }

  revalidatePath("/");
  return { success: true };
}

export async function onboardUser() {
  const user = await getOrCreateAnonymousUser();
  console.log("onboarding user", user);

  await prisma.user.update({
    where: { id: user.id },
    data: { onboarded: true },
  });

  const guides = await prisma.guide.findMany({
    orderBy: { order: "asc" },
  });

  if (guides.length > 0) {
    const guideCompletions = guides.map((guide, index) => ({
      guideId: guide.id,
      userId: user.id,
      state:
        index === 0
          ? GuideCompletionType.AVAILABLE
          : GuideCompletionType.LOCKED,
    }));

    await prisma.guideCompletion.createMany({
      data: guideCompletions,
    });
  }

  console.log("onboarded user");

  revalidatePath("/");

  redirect("/");
}

export async function markGuideAsFinished(guideId: string, userId: string) {
  "use server";

  try {
    // Check if completion record already exists
    const existingCompletion = await prisma.guideCompletion.findFirst({
      where: {
        guideId,
        userId,
      },
    });

    if (existingCompletion) {
      // Update the state to COMPLETED
      await prisma.guideCompletion.update({
        where: { id: existingCompletion.id },
        data: { state: GuideCompletionType.COMPLETED },
      });

      const currentGuide = await prisma.guide.findUnique({
        where: { id: guideId },
      });

      if (!currentGuide) throw new Error("Guide not found");

      // Find the next guide in order
      const nextGuide = await prisma.guide.findFirst({
        where: {
          order: { gt: currentGuide.order },
        },
        orderBy: { order: "asc" },
      });

      if (nextGuide) {
        // Update the next guide's completion state to AVAILABLE
        await prisma.guideCompletion.updateMany({
          where: {
            guideId: nextGuide.id,
            userId,
          },
          data: { state: GuideCompletionType.AVAILABLE },
        });
      }

      return { success: true, alreadyCompleted: true };
    }

    return { success: false, error: "Guide completion record not found" };
  } catch (error) {
    console.error("Failed to mark guide as finished:", error);
    return { success: false, error: "Failed to mark guide as finished" };
  }
}
