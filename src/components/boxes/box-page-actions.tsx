"use client";

import { useState } from "react";

import { BoxEditModal } from "@/components/boxes/box-edit-modal";
import { BoxDeleteButton } from "@/components/boxes/box-delete-modal";

import { BoxRowActions } from "./box-row-actions";

type Props = {
  boxId: string;
  number: number;
  observation?: string | null;

  companies: {
    id: string;
    name: string;
  }[];

  allCompanies: {
    id: string;
    name: string;
  }[];
};

export function BoxPageActions({
  boxId,
  number,
  observation,
  companies,
  allCompanies,
}: Props) {
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
        companies={companies}
        allCompanies={allCompanies}
      />

      <BoxDeleteButton
        boxId={boxId}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
