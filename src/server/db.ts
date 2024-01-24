import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "@prisma/client";

import { env } from "~/env.js";

// setting up prisma orm for global use
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const client = new Client({ url: env.DATABASE_URL });

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPlanetScale(client),
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
