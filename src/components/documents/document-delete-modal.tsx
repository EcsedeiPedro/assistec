"use client";

import { toast } from "sonner";

import { deleteDocumentAction } from "@/actions/document-actions";
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
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DocumentDeleteModal({
  boxId,
  documentId,
  open,
  onOpenChange,
}: Props) {
  async function handleDelete() {
    try {
      await deleteDocumentAction(boxId, documentId);

      toast.success("Documento removido");
      onOpenChange(false);
    } catch {
      toast.error("Erro ao remover documento");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover este documento?</AlertDialogTitle>
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
