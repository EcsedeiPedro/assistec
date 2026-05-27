"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteCompanyAction } from "@/actions/company-actions";

import { toast } from "sonner";

type Props = {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteCompanyDialog({ companyId, open, onOpenChange }: Props) {
  async function handleDelete() {
    try {
      await deleteCompanyAction(companyId);

      toast.success("Empresa removida");
    } catch {
      toast.error("Erro ao remover");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover esta empresa?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
