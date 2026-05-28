import { prisma } from "@/lib/prisma";

export async function findCompanies() {
  return prisma.company.findMany({
    orderBy: {
      name: "asc",
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

export async function updateCompany(id: string, name: string) {
  return prisma.company.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteCompany(id: string) {
  return prisma.company.delete({
    where: {
      id,
    },
  });
}
