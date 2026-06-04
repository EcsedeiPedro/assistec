import { SearchForm } from "@/components/search/search-form";

import { SearchResults } from "@/components/search/search-results";
import { PageContainer } from "@/components/layout/page-container";

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
    <PageContainer
      title="Busca"
      description="Pesquise documentos, empresas e caixas"
    >

      <SearchForm />

      <SearchResults documents={documents} />
    </PageContainer>
  );
}
