const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // カテゴリの作成
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        name: "和食",
      },
    }),
    prisma.category.upsert({
      where: { id: "2" },
      update: {},
      create: {
        id: "2",
        name: "うどん",
      },
    }),
    prisma.category.upsert({
      where: { id: "3" },
      update: {},
      create: {
        id: "3",
        name: "丼物",
      },
    }),
    prisma.category.upsert({
      where: { id: "4" },
      update: {},
      create: {
        id: "4",
        name: "ラーメン",
      },
    }),
    prisma.category.upsert({
      where: { id: "5" },
      update: {},
      create: {
        id: "5",
        name: "おでん",
      },
    }),
    prisma.category.upsert({
      where: { id: "6" },
      update: {},
      create: {
        id: "6",
        name: "揚げ物",
      },
    }),
  ]);

  console.log("シードデータを作成しました");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
