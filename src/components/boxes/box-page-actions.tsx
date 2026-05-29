"use client";

import { useState } from "react";

import { BoxEditModal } from "@/components/boxes/box-edit-modal";
import { BoxDeleteButton } from "@/components/boxes/box-delete-modal";
import { DocumentCreateModal } from "@/components/documents/document-create-modal";

import { BoxRowActions } from "./box-row-actions";

type Props = {
  boxId: string;
  number: number;
  observation?: string | null;
};

export function BoxPageActions({ boxId, number, observation }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <BoxRowActions
          onEdit={() => setEditOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
      </div>

      <BoxEditModal
        id={boxId}
        number={number}
        observation={observation}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <BoxDeleteButton
        boxId={boxId}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}