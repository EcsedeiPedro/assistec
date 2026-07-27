import * as boxService from "@/services/box-service";

import * as companyService from "@/services/company-service";

import { BoxesView } from "@/components/boxes/boxes-view";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BoxesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const [allBoxes, companiesData] = await Promise.all([
    boxService.getAllBoxesUnpaginated(),
    companyService.getCompanies(1), // fetch first page of companies for the filter dropdown
  ]);

  return (
    <BoxesView
      allBoxes={allBoxes}
      companies={companiesData.companies}
      currentPage={page}
    />
  );
}
