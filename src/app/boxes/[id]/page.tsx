import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/document-service";

import { DocumentTable } from "@/components/documents/document-table";
import { DocumentCreateModal } from "@/components/documents/document-create-modal";
import { BoxDeleteButton } from "@/components/boxes/box-delete-button";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Caixa {box.number}</h1>

          <Link
            href={`/companies/${box.company.id}`}
            className="text-primary-brand font-bold"
          >
            {box.company.name}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <BoxDeleteButton boxId={id} />
          <DocumentCreateModal boxId={id} />
        </div>
      </div>

      <h3 className="text-lg font-semibold">Documentos</h3>

      <DocumentTable documents={documents} />
    </div>
  );
}
