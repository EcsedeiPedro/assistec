"use client";

import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { editDocumentAction } from "@/actions/document-actions";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  boxId: string;
  document: {
    id: string;
    name: string;
    dateFrom: Date | string;
    dateTo: Date | string;
    observation: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatDateInput(date: Date | string) {
  const normalizedDate = date instanceof Date ? date : new Date(date);

  return normalizedDate.toISOString().slice(0, 10);
}

export function DocumentEditModal({ boxId, document, open, onOpenChange }: Props) {
  const [name, setName] = useState(document.name);
  const [dateFrom, setDateFrom] = useState(formatDateInput(document.dateFrom));
  const [dateTo, setDateTo] = useState(formatDateInput(document.dateTo));
  const [observation, setObservation] = useState(document.observation ?? "");
  const [loading, setLoading] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const isOpening = open && !wasOpenRef.current;

    if (isOpening) {
      setName(document.name);
      setDateFrom(formatDateInput(document.dateFrom));
      setDateTo(formatDateInput(document.dateTo));
      setObservation(document.observation ?? "");
    }

    wasOpenRef.current = open;
  }, [open, document]);

  async function handleSubmit() {
    try {
      setLoading(true);

      await editDocumentAction(boxId, document.id, {
        name,
        dateFrom,
        dateTo,
        observation,
      });

      toast.success("Documento atualizado");
      onOpenChange(false);
    } catch {
      toast.error("Erro ao atualizar documento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <>
            <Label htmlFor="name">Nome do Documento</Label>
            <Input
              id="name"
              placeholder="Digite o nome do documento"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>

          <>
            <Label htmlFor="dateFrom">Data de Início</Label>
            <Input
              className="w-max"
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </>

          <>
            <Label htmlFor="dateTo">Data de Término</Label>
            <Input
              className="w-max"
              id="dateTo"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </>

          <>
            <Label htmlFor="observation">Observação</Label>
            <Input
              id="observation"
              placeholder="Digite uma observação"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
