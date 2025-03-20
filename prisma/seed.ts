import { PrismaClient } from "@prisma/client";
import fs from "node:fs";

const prisma = new PrismaClient();

async function main() {
  const rawNewsData = fs.readFileSync("./prisma/news.json", "utf-8");
  const newsData = JSON.parse(rawNewsData);

  for (const news of newsData) {
    await prisma.news.create({
      data: {
        title: news.title,
        text: news.text,
        imageUrl: news.imageUrl || null,
        publisher: news.publisher,
        job: news.job,
      },
    });
  }

  const rawGuidesData = fs.readFileSync("./prisma/guides.json", "utf-8");
  const guidesData = JSON.parse(rawGuidesData);

  for (const guide of guidesData) {
    await prisma.guide.create({
      data: {
        aiRecommendation: guide.aiRecommendation,
        imageUrl: guide.heroImage,
        title: guide.title,
        text: guide.text,
        shortDescription: guide.shortDescription,
        shortTitle: guide.shortTitle,
        order: guide.order,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
