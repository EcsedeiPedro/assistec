import { SearchForm } from "@/components/search/search-form";

import { SearchResults } from "@/components/search/search-results";

import * as service from "@/services/search-service";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;

  const documents = await service.searchDocuments(q);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Busca</h1>

        <p className="text-muted-foreground">
          Pesquise documentos, empresas e caixas
        </p>
      </div>

      <SearchForm />

      <SearchResults documents={documents} />
    </div>
  );
}
