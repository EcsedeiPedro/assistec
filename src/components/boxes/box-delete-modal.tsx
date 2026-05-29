"use client";

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
} from "@/components/ui/alert-dialog";

type Props = {
  boxId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BoxDeleteButton({ boxId, open, onOpenChange }: Props) {

  async function handleDelete() {
    try {
      await deleteBoxAction(boxId);

      toast.success("Caixa removida");
      onOpenChange(false);
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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
