import { prisma } from "@/lib/prisma";
import { CreateBoxSchema, UpdateBoxSchema } from "@/schemas/box-schema";

export async function createBox(companyIds: string[], data: CreateBoxSchema) {
  return prisma.box.create({
    data: {
      number: data.number,
      observation: data.observation,
      companies: {
        connect: companyIds.map((id) => ({ id })),
      },
    },
  });
}

export async function findAllBoxes(skip?: number, take?: number) {
  return prisma.box.findMany({
    include: {
      companies: true,
    },

    orderBy: {
      number: "asc",
    },

    skip,
    take,
  });
}

export async function findAllBoxesUnpaginated() {
  return prisma.box.findMany({
    include: {
      companies: true,
    },

    orderBy: {
      number: "asc",
    },
  });
}

export async function countAllBoxes() {
  return prisma.box.count();
}

export async function findBoxesByCompany(companyId: string) {
  return prisma.box.findMany({
    where: {
      companies: {
        some: {
          id: companyId,
        },
      },
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

export async function updateBox(id: string, data: UpdateBoxSchema) {
  return prisma.box.update({
    where: {
      id,
    },

    data: {
      number: data.number,

      observation: data.observation,

      companies: {
        set: data.companyIds.map((id) => ({ id })),
      },
    },
  });
}
