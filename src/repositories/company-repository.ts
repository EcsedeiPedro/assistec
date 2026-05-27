import { prisma } from "@/lib/prisma";

export async function findCompanies() {
  return prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCompany(name: string) {
  return prisma.company.create({
    data: {
      name,
    },
  });
}
