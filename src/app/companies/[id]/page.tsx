import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/box-service";

import { BoxForm } from "@/components/boxes/box-form";
import { BoxTable } from "@/components/boxes/box-table";

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
      <div>
        <h1 className="text-3xl font-bold">{company.name}</h1>

        <p className="text-muted-foreground">Caixas da empresa</p>
      </div>

      <BoxForm companyId={id} />

      <BoxTable boxes={boxes} />
    </div>
  );
}
