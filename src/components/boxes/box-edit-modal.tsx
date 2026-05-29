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

type Props = {
  id: string;
  number: number;
  observation?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BoxEditModal({
  id,
  number,
  observation,
  open,
  onOpenChange,
}: Props) {
  const [boxNumber, setBoxNumber] = useState(number);
  const [boxObservation, setBoxObservation] = useState(observation || "");
  const [loading, setLoading] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const isOpening = open && !wasOpenRef.current;

    if (isOpening) {
      setBoxNumber(number);
      setBoxObservation(observation || "");
    }

    wasOpenRef.current = open;
  }, [open, number, observation]);

  async function handleSubmit() {
    try {
      setLoading(true);

      await updateBoxAction(id, {
        number: boxNumber,
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

          <Button onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
