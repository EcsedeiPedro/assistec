import * as repository from "@/repositories/search-repository";

export async function searchDocuments(query: string) {
  if (!query.trim()) {
    return [];
  }

  return repository.searchDocuments(query);
}
