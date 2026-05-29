import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/document-service";

import { DocumentTable } from "@/components/documents/document-table";
import { BoxPageActions } from "@/components/boxes/box-page-actions";
import { DocumentCreateModal } from "@/components/documents/document-create-modal";

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
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2 w-1/2">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Caixa {box.number}</h1>
            <BoxPageActions
              boxId={id}
              number={box.number}
              observation={box.observation}
            />
          </div>

          <p className="text-sm text-neutral-700 font-semibold">
            Pertence à:
            <Link
              href={`/companies/${box.company.id}`}
              className="text-primary-brand font-bold"
            >
              {" "}
              {box.company.name}
            </Link>
          </p>

          {box.observation && (
            <p className="text-sm text-neutral-500">{box.observation}</p>
          )}
        </div>

        <DocumentCreateModal boxId={id} />
      </div>

      <h3 className="text-lg font-semibold">Documentos</h3>

      <DocumentTable documents={documents} />
    </div>
  );
}
