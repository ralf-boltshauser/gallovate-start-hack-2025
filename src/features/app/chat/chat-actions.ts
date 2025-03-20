"use server";
import { getOrCreateAnonymousUser } from "@/app/actions";
import { prisma } from "@/lib/client";

export async function getRelevantNews(amount: number) {
  const user = await getOrCreateAnonymousUser();

  const news = await prisma.news.findMany({
    where: {
      job: user.job || undefined,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: amount,
  });

  return news;
}

export async function searchNews(query: string) {
  const news = await prisma.news.findMany({
    where: {
      title: { contains: query },
    },
  });

  return news;
}
