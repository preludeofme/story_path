import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

// Determine the appropriate database URL based on the environment
const databaseUrl = process.env.POSTGRES_PRISMA_URL;

const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
