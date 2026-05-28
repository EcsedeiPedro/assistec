import { prisma } from "@/lib/prisma";

export async function createDocument(
  boxId: string,
  data: {
    name: string;
    dateFrom: string;
    dateTo: string;
    observation?: string;
  },
) {
  return prisma.document.create({
    data: {
      name: data.name,

      dateFrom: new Date(data.dateFrom),

      dateTo: new Date(data.dateTo),

      observation: data.observation,

      boxId,
    },
  });
}

export async function findDocumentsByBox(boxId: string) {
  return prisma.document.findMany({
    where: {
      boxId,
    },

    orderBy: {
      dateFrom: "desc",
    },
  });
}
