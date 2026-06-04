"use server";

import { revalidatePath } from "next/cache";
import type {
  CreateDocumentSchema,
  UpdateDocumentSchema,
} from "@/schemas/document-schema";

import * as service from "@/services/document-service";

export async function createDocumentAction(
  boxId: string,
  data: CreateDocumentSchema,
) {
  await service.createDocument(boxId, data);

  revalidatePath(`/boxes/${boxId}`);
}

export async function editDocumentAction(
  boxId: string,
  documentId: string,
  data: UpdateDocumentSchema,
) {
  await service.updateDocument(documentId, data);

  revalidatePath(`/boxes/${boxId}`);
}

export async function deleteDocumentAction(boxId: string, documentId: string) {
  await service.deleteDocument(documentId);

  revalidatePath(`/boxes/${boxId}`);
}
