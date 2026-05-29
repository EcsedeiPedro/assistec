import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/box-service";

import { BoxTable } from "@/components/boxes/box-table";
import { BoxCreateModal } from "@/components/boxes/box-create-modal";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CompanyPage({ params }: Props) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: {
      id,
    },
  });

  if (!company) {
    notFound();
  }

  const boxes = await service.getBoxesByCompany(id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{company.name}</h1>

          <p className="text-muted-foreground">Caixas da empresa</p>
        </div>

        <BoxCreateModal
          companyId={company.id}
        />
      </div>

      <BoxTable boxes={boxes} showCompany={false} />
    </div>
  );
}
