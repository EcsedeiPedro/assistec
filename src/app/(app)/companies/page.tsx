import { CompanyForm } from "@/components/companies/company-form";
import { CompanyTable } from "@/components/companies/company-table";
import { PageContainer } from "@/components/layout/page-container";

import * as service from "@/services/company-service";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CompaniesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const allCompanies = await service.getCompaniesUnpaginated();

  return (
    <PageContainer title="Empresas" description="Gerencie as empresas">
      <CompanyForm />

      <CompanyTable allCompanies={allCompanies} currentPage={page} />
    </PageContainer>
  );
}
