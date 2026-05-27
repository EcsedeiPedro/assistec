"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateCompanyAction } from "@/actions/company-actions";

import { toast } from "sonner";

type Props = {
  company: {
    id: string;
    name: string;
  };

  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditCompanyDialog({ company, open, onOpenChange }: Props) {
  const [name, setName] = useState(company.name);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await updateCompanyAction(company.id, {
        name,
      });

      toast.success("Empresa atualizada");

      onOpenChange(false);
    } catch {
      toast.error("Erro ao atualizar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar empresa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Button onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
