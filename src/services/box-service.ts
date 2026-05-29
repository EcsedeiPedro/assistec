import { prisma } from "@/lib/prisma";

import {
  CreateBoxSchema,
  createBoxSchema,
  UpdateBoxSchema,
  updateBoxSchema,
} from "@/schemas/box-schema";

import * as repository from "@/repositories/box-repository";
import { Prisma } from "@prisma/client";

export async function createBox(data: CreateBoxSchema) {
  const parsed = createBoxSchema.parse(data);

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

export async function updateBox(id: string, data: UpdateBoxSchema) {
  const parsed = updateBoxSchema.parse(data);

  const existingBox = await prisma.box.findFirst({
    where: {
      number: parsed.number,

      NOT: {
        id,
      },
    },
  });

  if (existingBox) {
    throw new Error("Número da caixa já existe");
  }

  return repository.updateBox(id, parsed);
}
