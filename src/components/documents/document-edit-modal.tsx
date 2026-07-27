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

    company: {
      id: string;
      name: string;
    };

    dateFrom?: Date | string | null;
    dateTo?: Date | string | null;
    year?: number | null;
    observation: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatDateInput(date?: Date | string | null) {
  if (!date) {
    return "";
  }

  const normalizedDate = date instanceof Date ? date : new Date(date);

  return normalizedDate.toISOString().slice(0, 10);
}

export function DocumentEditModal({ boxId, document, open, onOpenChange }: Props) {
  const [name, setName] = useState(document.name);
  const [dateFrom, setDateFrom] = useState(formatDateInput(document.dateFrom));
  const [dateTo, setDateTo] = useState(formatDateInput(document.dateTo));
  const [year, setYear] = useState(document.year?.toString() ?? "");
  const [mode, setMode] = useState<"none" | "date" | "year">("none");
  const [observation, setObservation] = useState(document.observation ?? "");
  const [loading, setLoading] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const isOpening = open && !wasOpenRef.current;

    if (isOpening) {
      setName(document.name);
      setDateFrom(formatDateInput(document.dateFrom));
      setDateTo(formatDateInput(document.dateTo));
      setYear(document.year?.toString() ?? "");
      setObservation(document.observation ?? "");

      /* eslint-disable react-hooks/set-state-in-effect */
      if (document.year) {
        setMode("year");
      } else if (document.dateFrom || document.dateTo) {
        setMode("date");
      } else {
        setMode("none");
      }
      /* eslint-enable react-hooks/set-state-in-effect */
    }

    wasOpenRef.current = open;
  }, [open, document]);

  function toggleDateMode() {
    if (mode === "date") {
      setMode("none");
      setDateFrom("");
      setDateTo("");
    } else {
      setMode("date");
      setYear("");
    }
  }

  function toggleYearMode() {
    if (mode === "year") {
      setMode("none");
      setYear("");
    } else {
      setMode("year");
      setDateFrom("");
      setDateTo("");
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await editDocumentAction(boxId, document.id, {
        name,
        companyId: document.company.id,
        dateFrom,
        dateTo,
        year: year ? Number(year) : undefined,
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

          <div className="flex items-center gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={mode === "date"}
                onChange={toggleDateMode}
                className="h-4 w-4 rounded border-gray-300 text-green-base focus:ring-green-base"
              />
              Data completa
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={mode === "year"}
                onChange={toggleYearMode}
                className="h-4 w-4 rounded border-gray-300 text-green-base focus:ring-green-base"
              />
              Ano
            </label>
          </div>

          <>
            <Label htmlFor="dateFrom">Data de Início</Label>
            <Input
              className="w-max"
              id="dateFrom"
              type="date"
              value={dateFrom}
              disabled={mode !== "date"}
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
              disabled={mode !== "date"}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </>

          <>
            <Label htmlFor="year">Ano</Label>
            <Input
              className="w-max"
              id="year"
              type="number"
              placeholder="2026"
              min={1900}
              max={2099}
              value={year}
              disabled={mode !== "year"}
              onChange={(e) => setYear(e.target.value)}
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

          <Button className="bg-green-base text-white hover:bg-green-light focus:bg-green-dark" onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
