import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/document-service";

import { DocumentForm } from "@/components/documents/document-form";
import { DocumentTable } from "@/components/documents/document-table";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BoxPage({ params }: Props) {
  const { id } = await params;

  const box = await prisma.box.findUnique({
    where: {
      id,
    },

    include: {
      company: true,
    },
  });

  if (!box) {
    notFound();
  }

  const documents = await service.getDocumentsByBox(id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Caixa {box.number}</h1>

        <p className="text-muted-foreground">{box.company.name}</p>
      </div>

      <DocumentForm boxId={id} />

      <DocumentTable documents={documents} />
    </div>
  );
}
