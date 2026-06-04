"use client";

import { useState } from "react";

import { DocumentRowActions } from "./document-row-actions";
import { DocumentDeleteModal } from "@/components/documents/document-delete-modal";
import { DocumentEditModal } from "@/components/documents/document-edit-modal";

type Props = {
  boxId: string;
  document: {
    id: string;
    name: string;
    dateFrom: Date | string;
    dateTo: Date | string;
    observation: string | null;
  };
};

export function DocumentPageActions({ boxId, document }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div>
        <DocumentRowActions
          onEdit={() => setEditOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
      </div>

      <DocumentEditModal
        boxId={boxId}
        document={document}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DocumentDeleteModal
        boxId={boxId}
        documentId={document.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
