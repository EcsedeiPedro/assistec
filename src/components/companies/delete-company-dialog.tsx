"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteCompanyAction } from "@/actions/company-actions";

import { toast } from "sonner";
import { Button } from "../ui/button";

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
      onOpenChange(false);
    } catch (err) {
      if (err instanceof Error && err.message === "COMPANY_HAS_BOXES") {
        toast.error(
          "Não é possível excluir: existem caixas associadas a essa empresa",
        );
        return;
      }

      toast.error("Erro ao remover empresa");
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

          <Button variant="destructive" onClick={handleDelete}>
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
