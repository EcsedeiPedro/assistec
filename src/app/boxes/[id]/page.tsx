import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import * as service from "@/services/document-service";

import { DocumentTable } from "@/components/documents/document-table";
import { BoxPageActions } from "@/components/boxes/box-page-actions";
import { DocumentCreateModal } from "@/components/documents/document-create-modal";
import { PageContainer } from "@/components/layout/page-container";

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
    <PageContainer
      className="space-y-6"
      title={`Caixa ${box.number}`}
      description={box.observation ?? undefined}
      titleAction={
        <BoxPageActions
          boxId={id}
          number={box.number}
          observation={box.observation}
        />
      }
      actions={<DocumentCreateModal boxId={id} />}
    >
      <div className="space-y-2 w-1/2">
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
      </div>

      <h3 className="text-lg font-semibold text-green-dark">Documentos</h3>

      <DocumentTable documents={documents} />
    </PageContainer>
  );
}
