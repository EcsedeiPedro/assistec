import {
  createCompanySchema,
  updateCompanySchema,
} from "@/schemas/company-schema";

import * as repository from "@/repositories/company-repository";
import { Prisma } from "@prisma/client";

export async function createCompany(data: { name: string }) {
  const parsed = createCompanySchema.parse(data);

  return repository.createCompany(parsed.name);
}

export async function updateCompany(id: string, data: { name: string }) {
  const parsed = updateCompanySchema.parse(data);

  return repository.updateCompany(id, parsed.name);
}

export async function getCompanies() {
  return repository.findCompanies();
}

export async function deleteCompany(id: string) {
  try {
    return await repository.deleteCompany(id);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      throw new Error("COMPANY_HAS_BOXES");
    }

    throw err;
  }
}
