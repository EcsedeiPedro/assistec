"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { boxSchema, type BoxSchema } from "@/schemas/box-schema";

import { useBoxFormViewModel } from "@/view-models/use-box-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  companyId: string;
};

export function BoxForm({ companyId }: Props) {
  const { loading, submit } = useBoxFormViewModel(companyId);

  const form = useForm<BoxSchema>({
    resolver: zodResolver(boxSchema),

    defaultValues: {
      number: 0,
      observation: "",
    },
  });

  async function onSubmit(data: BoxSchema) {
    try {
      await submit(data);

      toast.success("Caixa criada");

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("Erro ao criar caixa");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        type="number"
        placeholder="Número"
        {...form.register("number", {
          valueAsNumber: true,
        })}
      />

      <Input placeholder="Observação" {...form.register("observation")} />

      <Button type="submit" disabled={loading}>
        Criar caixa
      </Button>
    </form>
  );
}
