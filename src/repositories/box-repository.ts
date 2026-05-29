import { prisma } from "@/lib/prisma";

export async function createBox(
  companyId: string,
  data: {
    number: number;
    observation?: string;
  },
) {
  return prisma.box.create({
    data: {
      number: data.number,
      observation: data.observation,
      companyId,
    },
  });
}

export async function findAllBoxes() {
  return prisma.box.findMany({
    include: {
      company: true,
    },

    orderBy: {
      number: "asc",
    },
  });
}

export async function findBoxesByCompany(companyId: string) {
  return prisma.box.findMany({
    where: {
      companyId,
    },

    orderBy: {
      number: "asc",
    },
  });
}

export async function deleteBox(id: string) {
  return prisma.box.delete({
    where: {
      id,
    },
  });
}

export async function updateBox(
  id: string,
  number: number,
  observation?: string,
) {
  return prisma.box.update({
    where: {
      id,
    },
    data: {
      number,
      observation,
    },
  });
}
