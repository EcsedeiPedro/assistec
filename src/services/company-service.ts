import { companySchema } from "@/schemas/company-schema";
import * as repository from "@/repositories/company-repository";

export async function createCompany(data: unknown) {
  const parsed = companySchema.parse(data);

  return repository.createCompany(parsed.name);
}

export async function getCompanies() {
  return repository.findCompanies();
}

export async function updateCompany(id: string, data: unknown) {
  const parsed = companySchema.parse(data);

  return repository.updateCompany(id, parsed.name);
}

export async function deleteCompany(id: string) {
  return repository.deleteCompany(id);
}
