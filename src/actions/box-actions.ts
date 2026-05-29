"use server";

import { BoxSchema } from "@/schemas/box-schema";
import * as service from "@/services/box-service";

import { revalidatePath } from "next/cache";

export async function createBoxAction(data: BoxSchema) {
  await service.createBox(data);

  revalidatePath("/boxes");
}

export async function deleteBoxAction(id: string) {
  await service.deleteBox(id);

  revalidatePath("/boxes");
}

export async function updateBoxAction(id: string, data: BoxSchema) {
  await service.updateBox(id, data);

  revalidatePath("/boxes");
}
