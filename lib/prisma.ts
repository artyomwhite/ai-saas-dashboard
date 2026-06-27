import type { PrismaClient } from "@prisma/client";
import { ensureDatabaseUrl } from "@/lib/env";
import { isVercel } from "@/lib/runtime";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrisma(): PrismaClient {
  if (isVercel()) {
    throw new Error("Prisma is disabled on Vercel. Use lib/data instead.");
  }

  if (!globalForPrisma.prisma) {
    ensureDatabaseUrl();
    const { PrismaClient } = require("@prisma/client") as typeof import("@prisma/client");
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return globalForPrisma.prisma;
}
