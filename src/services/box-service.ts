import { boxSchema } from "@/schemas/box-schema";

import * as repository from "@/repositories/box-repository";

export async function createBox(companyId: string, data: unknown) {
  const parsed = boxSchema.parse(data);

  return repository.createBox(companyId, parsed);
}

export async function getBoxesByCompany(companyId: string) {
  return repository.findBoxesByCompany(companyId);
}
