import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import {
  CreateDocumentSchema,
  UpdateDocumentSchema,
} from "@/schemas/document-schema";

export async function createDocument(
  boxId: string,
  data: CreateDocumentSchema,
) {
  const documentData: Prisma.DocumentUncheckedCreateInput = {
    name: data.name,
    companyId: data.companyId,
    observation: data.observation,
    boxId,
  };

  if (data.dateFrom) {
    documentData.dateFrom = new Date(data.dateFrom);
  }

  if (data.dateTo) {
    documentData.dateTo = new Date(data.dateTo);
  }

  return prisma.document.create({
    data: documentData,
  });
}

export async function updateDocument(id: string, data: UpdateDocumentSchema) {
  const updateData: Prisma.DocumentUncheckedUpdateInput = {
    name: data.name,
    companyId: data.companyId,
    observation: data.observation,
  };

  if (data.dateFrom) {
    updateData.dateFrom = new Date(data.dateFrom);
  }

  if (data.dateTo) {
    updateData.dateTo = new Date(data.dateTo);
  }

  return prisma.document.update({
    where: {
      id,
    },
    data: updateData,
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
