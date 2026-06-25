import { prisma } from "@/lib/prisma";
import {
  CreateDocumentSchema,
  UpdateDocumentSchema,
} from "@/schemas/document-schema";

export async function createDocument(
  boxId: string,
  data: CreateDocumentSchema,
) {
  return prisma.document.create({
    data: {
      name: data.name,

      companyId: data.companyId,

      dateFrom: new Date(data.dateFrom),

      dateTo: new Date(data.dateTo),

      observation: data.observation,

      boxId,
    },
  });
}

export async function updateDocument(id: string, data: UpdateDocumentSchema) {
  return prisma.document.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      companyId: data.companyId,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
      observation: data.observation,
    },
  });
}

export async function deleteDocument(id: string) {
  return prisma.document.delete({
    where: { id },
  });
}

export async function findDocumentsByBox(boxId: string) {
  return prisma.document.findMany({
    where: {
      boxId,
    },

    include: {
      company: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      dateFrom: "desc",
    },
  });
}
