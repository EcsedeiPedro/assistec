import { documentSchema } from "@/schemas/document-schema";

import * as repository from "@/repositories/document-repository";

export async function createDocument(boxId: string, data: unknown) {
  const parsed = documentSchema.parse(data);

  return repository.createDocument(boxId, parsed);
}

export async function getDocumentsByBox(boxId: string) {
  return repository.findDocumentsByBox(boxId);
}
