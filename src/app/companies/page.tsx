import { CompanyForm } from "@/components/companies/company-form";
import { CompanyTable } from "@/components/companies/company-table";
import { PageContainer } from "@/components/layout/page-container";

import * as service from "@/services/company-service";

export default async function CompaniesPage() {
  const companies = await service.getCompanies();

  return (
    <PageContainer title="Empresas" description="Gerencie as empresas">
      <CompanyForm />

      <CompanyTable companies={companies} />
    </PageContainer>
  );
}
