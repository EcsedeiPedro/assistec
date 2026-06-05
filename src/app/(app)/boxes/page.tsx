import * as boxService from "@/services/box-service";

import * as companyService from "@/services/company-service";

import { BoxesView } from "@/components/boxes/boxes-view";

export default async function BoxesPage() {
  const [boxes, companies] = await Promise.all([
    boxService.getAllBoxes(),

    companyService.getCompanies(),
  ]);

  return <BoxesView boxes={boxes} companies={companies} />;
}
