import prisma from "./prismaClient";

async function main() {
  await prisma.$connect();

  if ((await prisma.userTypes.findMany()).length === 0) {
    const usertypes = await prisma.userTypes.createMany({
      data: [{ userTypeName: "view" }, { userTypeName: "admin" }],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
