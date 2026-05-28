import { prisma } from "@/lib/prisma";

import { boxSchema } from "@/schemas/box-schema";

import * as repository from "@/repositories/box-repository";

export async function createBox(companyId: string, data: unknown) {
  const parsed = boxSchema.parse(data);

  const existingBox = await prisma.box.findUnique({
    where: {
      number: parsed.number,
    },
  });

  if (existingBox) {
    throw new Error("Número da caixa já existe");
  }

  return repository.createBox(companyId, parsed);
}

export async function getBoxesByCompany(companyId: string) {
  return repository.findBoxesByCompany(companyId);
}
