const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function main() {
  // Read and parse data.json
  const rawData = fs.readFileSync("data.json");
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
