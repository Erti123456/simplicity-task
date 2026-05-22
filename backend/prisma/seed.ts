import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Category } from "../src/generated/prisma/enums.js";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const ALL_CATEGORIES = Object.values(Category);

async function main() {
  await prisma.announcement.deleteMany();

  const data = Array.from({ length: 20 }, () => ({
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    body: faker.lorem.paragraphs(2),
    categories: faker.helpers.arrayElements(ALL_CATEGORIES, { min: 1, max: 3 }),
    publishedAt: faker.date.recent({ days: 90 }),
  }));

  await prisma.announcement.createMany({ data });

  console.log(`seeded ${data.length} announcements`);
}

main()
  .catch((e) => {
    console.error(e);
    return -1;
  })
  .finally(() => prisma.$disconnect());
