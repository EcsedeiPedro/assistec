"use client";

import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateBoxAction } from "@/actions/box-actions";
import { CompanyMultiSelect } from "../companies/company-multi-select";

type Props = {
  id: string;
  number: number;
  observation?: string | null;

  companies: {
    id: string;
    name: string;
  }[];

  allCompanies: {
    id: string;
    name: string;
  }[];

  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BoxEditModal({
  id,
  number,
  observation,
  companies,
  allCompanies,
  open,
  onOpenChange,
}: Props) {
  const [boxNumber, setBoxNumber] = useState(number);
  const [boxObservation, setBoxObservation] = useState(observation || "");
  const [loading, setLoading] = useState(false);
  const wasOpenRef = useRef(false);

  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>(
    companies?.map((company) => company.id) ?? [],
  );

  useEffect(() => {
    const isOpening = open && !wasOpenRef.current;

    if (isOpening) {
      setBoxNumber(number);
      setBoxObservation(observation || "");
      setSelectedCompanyIds(companies?.map((company) => company.id) ?? []);
    }

    wasOpenRef.current = open;
  }, [open, number, observation, companies]);

  async function handleSubmit() {
    try {
      setLoading(true);

      await updateBoxAction(id, {
        number: boxNumber,
        companyIds: selectedCompanyIds,
        observation: boxObservation,
      });

      toast.success("Caixa atualizada");
      onOpenChange(false);
    } catch {
      toast.error("Erro ao atualizar a caixa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja editar esta caixa?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <>
            <Label className="text-neutral-700" htmlFor="number">
              Número da caixa
            </Label>
            <Input
              id="number"
              type="number"
              value={boxNumber}
              placeholder="Edite o número da caixa."
              onChange={(e) => setBoxNumber(Number(e.target.value))}
            />
          </>

          <CompanyMultiSelect
            companies={allCompanies}
            selectedIds={selectedCompanyIds}
            onChange={setSelectedCompanyIds}
          />

          <>
            <Label className="text-neutral-700" htmlFor="observation">
              Observação
            </Label>
            <Input
              id="observation"
              value={boxObservation}
              placeholder="Edite ou adicione uma nova observação."
              onChange={(e) => setBoxObservation(e.target.value)}
            />
          </>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button
            className="bg-green-base text-white hover:bg-green-light focus:bg-green-dark"
            onClick={handleSubmit}
            disabled={loading}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
