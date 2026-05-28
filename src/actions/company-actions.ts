"use server";

import { revalidatePath } from "next/cache";
import * as service from "@/services/company-service";

export async function createCompanyAction(data: { name: string }) {
  await service.createCompany(data);

  revalidatePath("/companies");
}

export async function updateCompanyAction(
  id: string,
  data: {
    name: string;
  },
) {
  await service.updateCompany(id, data);

  revalidatePath("/companies");
}

export async function deleteCompanyAction(id: string) {
  await service.deleteCompany(id);

  revalidatePath("/companies");
}
