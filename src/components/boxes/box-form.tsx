"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { boxSchema, type BoxSchema } from "@/schemas/box-schema";

import { useBoxFormViewModel } from "@/view-models/use-box-form-view-model";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

type Props = {
  companyId?: string;

  companies?: {
    id: string;
    name: string;
  }[];
};

export function BoxForm({ companyId, companies }: Props) {
  const { loading, submit } = useBoxFormViewModel();

  const form = useForm<BoxSchema>({
    resolver: zodResolver(boxSchema),

    defaultValues: {
      number: 0,
      observation: "",
      companyId: companyId ?? "",
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {!companyId && companies && (
        <>
          <Label htmlFor="companyId">Empresa</Label>

          <Select onValueChange={(value) => form.setValue("companyId", value)}>
            <SelectTrigger id="companyId">
              <SelectValue placeholder="Empresa" />
            </SelectTrigger>

            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      <Label htmlFor="number">Número da caixa</Label>

      <Input
        id="number"
        className="w-20"
        type="number"
        placeholder="Número da caixa"
        {...form.register("number", {
          valueAsNumber: true,
        })}
      />

      <Label htmlFor="observation">Observação</Label>

      <Input
        id="observation"
        placeholder="Observação"
        {...form.register("observation")}
      />

      <Button type="submit" disabled={loading} className="w-full">
        Criar caixa
      </Button>
    </form>
  );
}
