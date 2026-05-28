"use server";

import { revalidatePath } from "next/cache";

import * as service from "@/services/document-service";

export async function createDocumentAction(
  boxId: string,
  data: {
    name: string;
    date: string;
    observation?: string;
  },
) {
  await service.createDocument(boxId, data);

  revalidatePath(`/boxes/${boxId}`);
}
