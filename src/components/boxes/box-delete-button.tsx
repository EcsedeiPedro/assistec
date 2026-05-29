"use client";

import { useState } from "react";

import { Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteBoxAction } from "@/actions/box-actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  boxId: string;
};

export function BoxDeleteButton({ boxId }: Props) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      await deleteBoxAction(boxId);

      toast.success("Caixa removida");
      setOpen(false);
    } catch (err) {
      if (err instanceof Error && err.message === "BOX_HAS_DOCUMENTS") {
        toast.error(
          "Não é possível excluir: existem documentos associados a essa caixa",
        );
        return;
      }

      toast.error("Erro ao remover caixa");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash /> Excluir caixa
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover esta caixa?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button variant="destructive" onClick={handleDelete}>
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
