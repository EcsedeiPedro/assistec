import { prisma } from "@/lib/prisma";

import { boxSchema, type BoxSchema } from "@/schemas/box-schema";

import * as repository from "@/repositories/box-repository";
import { Prisma } from "@prisma/client";

export async function createBox(data: BoxSchema) {
  const parsed = boxSchema.parse(data);

  const existingBox = await prisma.box.findUnique({
    where: {
      number: parsed.number,
    },
  });

  if (existingBox) {
    throw new Error("Número da caixa já existe");
  }

  return repository.createBox(parsed.companyId, parsed);
}

export async function getAllBoxes() {
  return repository.findAllBoxes();
}

export async function getBoxesByCompany(companyId: string) {
  return repository.findBoxesByCompany(companyId);
}

export async function deleteBox(id: string) {
  try {
    return await repository.deleteBox(id);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      throw new Error("BOX_HAS_DOCUMENTS");
    }

    throw err;
  }
}

export async function updateBox(id: string, data: BoxSchema) {
  const parsed = boxSchema.parse(data);
  return repository.updateBox(id, parsed.number, parsed.observation);
}
