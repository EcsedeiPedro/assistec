import * as boxService from "@/services/box-service";

import * as companyService from "@/services/company-service";

import { BoxCard } from "@/components/boxes/box-card";

import { BoxCreateModal } from "@/components/boxes/box-create-modal";

export default async function BoxesPage() {
  const [boxes, companies] = await Promise.all([
    boxService.getAllBoxes(),

    companyService.getCompanies(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Caixas</h1>

          <p className="text-muted-foreground">Gerencie as caixas do sistema</p>
        </div>

        <BoxCreateModal companies={companies} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} />
        ))}
      </div>
    </div>
  );
}
