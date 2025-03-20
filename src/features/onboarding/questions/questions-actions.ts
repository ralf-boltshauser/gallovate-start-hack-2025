"use server";
import { getOrCreateAnonymousUser } from "@/app/actions";
import { prisma } from "@/lib/client";
import { getUserBucket } from "@/lib/utils";
import { Job, UserType } from "@prisma/client";

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

export async function innovationSupportAction({
  support,
}: {
  support: string;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      innovationSupportQuestion: support,
    },
  });
}

export async function innovationTopicsAction({ topic }: { topic: string }) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      innovationTopicsQuestion: topic,
    },
  });
}

export async function innovationBarrierAction({
  barrier,
}: {
  barrier: string;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      innovationBarrierQuestion: barrier,
    },
  });
}

export async function biggestChallengeAction({
  challenge,
}: {
  challenge: string;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      biggestChallengeQuestion: challenge,
    },
  });
}

export async function technologyApproachAction({
  approach,
}: {
  approach: string;
}) {
  const user = await getOrCreateAnonymousUser();
  const userBucket = getUserBucket({
    biggestChallengeQuestion: user.biggestChallengeQuestion,
    technologyApproachQuestion: approach,
    innovationOpinionQuestion: user.innovationOpinionQuestion,
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      technologyApproachQuestion: approach,
      type: userBucket,
    },
  });
}

export async function mainChallengeAction({
  challenge,
}: {
  challenge: string;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      mainChallengeQuestion: challenge,
    },
  });
}

export async function decisionMakingAction({
  decisionMethod,
}: {
  decisionMethod: string;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      decisionMakingQuestion: decisionMethod,
    },
  });
}

export async function innovationOpinionAction({
  opinion,
}: {
  opinion: string;
}) {
  const user = await getOrCreateAnonymousUser();
  const userBucket = getUserBucket({
    biggestChallengeQuestion: user.biggestChallengeQuestion,
    technologyApproachQuestion: user.technologyApproachQuestion,
    innovationOpinionQuestion: opinion,
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      innovationOpinionQuestion: opinion,
      type: userBucket,
    },
  });
}

export async function companyInformationAction({
  name,
  job,
  numberOfEmployees,
}: {
  name: string;
  job: string;
  numberOfEmployees: number;
}) {
  const user = await getOrCreateAnonymousUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      job: job as Job,
      numberOfEmployees,
    },
  });
}
