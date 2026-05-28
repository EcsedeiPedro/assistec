"use server";

import { revalidatePath } from "next/cache";
import * as service from "@/services/company-service";

export async function createCompanyAction(data: { name: string }) {
  await service.createCompany(data);

  revalidatePath("/companies");
}

export async function updateCompanyAction(id: string, data: { name: string }) {
  try {
    console.log("ACTION HIT:", id, data);

    await service.updateCompany(id, data);

    revalidatePath("/companies");
  } catch (err) {
    console.error("UPDATE COMPANY ERROR:", err);
    throw err;
  }
}

export async function deleteCompanyAction(id: string) {
  try {
    await service.deleteCompany(id);

    revalidatePath("/companies");
  } catch (err) {
    throw err;
  }
}
