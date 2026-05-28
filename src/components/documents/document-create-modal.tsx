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
};

export function DocumentCreateModal({ boxId }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Novo Documento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Documento</DialogTitle>
        </DialogHeader>

        <DocumentForm boxId={boxId} />
      </DialogContent>
    </Dialog>
  );
}
