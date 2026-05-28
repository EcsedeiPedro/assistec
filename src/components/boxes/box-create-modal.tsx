"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { BoxForm } from "./box-form";
import { Plus } from "lucide-react";

type Props = {
  companyId?: string;

  companies?: {
    id: string;
    name: string;
  }[];
};

export function BoxCreateModal({ companyId, companies }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus />Nova Caixa</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Caixa</DialogTitle>
        </DialogHeader>

        <BoxForm companyId={companyId} companies={companies} />
      </DialogContent>
    </Dialog>
  );
}
