"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateBoxAction } from "@/actions/box-actions";

type Props = {
  id: string;
  number: number;
  observation?: string | null;
};

export function BoxEditModal({ id, number, observation }: Props) {
  const [open, setOpen] = useState(false);
  const [boxNumber, setBoxNumber] = useState(number);
  const [boxObservation, setBoxObservation] = useState(observation || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await updateBoxAction(id, {
        number: boxNumber,
        observation: boxObservation,
      });

      toast.success("Caixa atualizada");
      setOpen(false);
    } catch {
      toast.error("Erro ao atualizar a caixa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-primary-brand font-semibold" variant="outline">
          <Pencil /> Editar caixa
        </Button>
      </DialogTrigger>

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
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
