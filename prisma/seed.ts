import { PrismaClient } from "@prisma/client";
import fs from "node:fs";

const prisma = new PrismaClient();

async function main() {
  // Read and parse data.json
  // console log pwd
  console.log("pwd", process.cwd());
  const rawData = fs.readFileSync("./prisma/data.json", "utf-8");
  const newsData = JSON.parse(rawData);

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

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
