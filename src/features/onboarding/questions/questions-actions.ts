"use server";
import { getOrCreateAnonymousUser } from "@/app/actions";
import { prisma } from "@/lib/client";
import { UserType } from "@prisma/client";

export async function innovationKnowledgeAction({
  userType,
}: {
  userType: UserType;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      type: userType,
    },
  });
}
