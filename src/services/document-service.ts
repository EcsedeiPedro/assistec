import {
  CreateDocumentSchema,
  createDocumentSchema,
  UpdateDocumentSchema,
  updateDocumentSchema,
} from "@/schemas/document-schema";

import * as repository from "@/repositories/document-repository";

export async function createDocument(
  boxId: string,
  data: CreateDocumentSchema,
) {
  const parsed = createDocumentSchema.parse(data);

  return repository.createDocument(boxId, parsed);
}

export async function updateDocument(id: string, data: UpdateDocumentSchema) {
  const parsed = updateDocumentSchema.parse(data);

  return repository.updateDocument(id, parsed);
}

export async function deleteDocument(id: string) {
  return repository.deleteDocument(id);
}

export async function getDocumentsByBox(boxId: string) {
  return repository.findDocumentsByBox(boxId);
}
