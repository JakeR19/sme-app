import { PrismaClient } from "@prisma/client";

import { env } from "~/env.js";

// setting up prisma orm for global use
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
