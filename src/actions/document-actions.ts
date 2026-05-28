"use server";

import { revalidatePath } from "next/cache";

import * as service from "@/services/document-service";

export async function createDocumentAction(
  boxId: string,
  data: {
    name: string;
    dateFrom: string;
    dateTo: string;
    observation?: string;
  },
) {
  await service.createDocument(boxId, data);

  revalidatePath(`/boxes/${boxId}`);
}
