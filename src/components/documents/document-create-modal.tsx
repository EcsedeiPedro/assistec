"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { DocumentForm } from "./document-form";
import { Plus } from "lucide-react";

type Props = {
  boxId: string;

  companies: {
    id: string;
    name: string;
  }[];
};

export function DocumentCreateModal({ boxId, companies }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-base text-white hover:bg-green-light focus:bg-green-dark">
          <Plus />
          Novo Documento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Documento</DialogTitle>
        </DialogHeader>

        <DocumentForm boxId={boxId} companies={companies} />
      </DialogContent>
    </Dialog>
  );
}
