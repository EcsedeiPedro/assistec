import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/box-service";

import { BoxTable } from "@/components/boxes/box-table";
import { BoxCreateModal } from "@/components/boxes/box-create-modal";
import { PageContainer } from "@/components/layout/page-container";

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
    <PageContainer
      title={company.name}
      description="Caixas da empresa"
      actions={<BoxCreateModal companyId={company.id} />}
    >
      <BoxTable boxes={boxes} showCompany={false} />
    </PageContainer>
  );
}
