import { prisma } from "@/lib/prisma";

const DEFAULT_USER = {
  name: "Alex Morgan",
  email: "alex@example.com",
};

export async function getDefaultUser() {
  return prisma.user.upsert({
    where: { email: DEFAULT_USER.email },
    update: {},
    create: DEFAULT_USER,
  });
}
