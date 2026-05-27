import { CompanyForm } from "@/components/companies/company-form";
import { CompanyTable } from "@/components/companies/company-table";

import * as service from "@/services/company-service";

export default async function CompaniesPage() {
  const companies = await service.getCompanies();

  return (
    <main className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Empresas</h1>
      </div>

      <CompanyForm />

      <CompanyTable companies={companies} />
    </main>
  );
}
