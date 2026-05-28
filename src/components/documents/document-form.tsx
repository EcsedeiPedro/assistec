"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { documentSchema, type DocumentSchema } from "@/schemas/document-schema";

import { useDocumentFormViewModel } from "@/view-models/use-document-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

type Props = {
  boxId: string;
};

export function DocumentForm({ boxId }: Props) {
  const { loading, submit } = useDocumentFormViewModel(boxId);

  const form = useForm<DocumentSchema>({
    resolver: zodResolver(documentSchema),

    defaultValues: {
      name: "",
      dateFrom: "",
      dateTo: "",
      observation: "",
    },
  });

  async function onSubmit(data: DocumentSchema) {
    try {
      await submit(data);

      toast.success("Documento criado");

      form.reset();
    } catch {
      toast.error("Erro ao criar documento");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col space-y-4"
    >
      <>
        <Label htmlFor="name">Nome do Documento</Label>
        <Input
          id="name"
          placeholder="Digite o nome do documento"
          {...form.register("name")}
        />
      </>

      <>
        <Label htmlFor="dateFrom">Data de Início</Label>
        <Input
          className="w-max"
          id="dateFrom"
          type="date"
          {...form.register("dateFrom")}
        />
      </>

      <>
        <Label htmlFor="dateTo">Data de Término</Label>
        <Input
          className="w-max"
          id="dateTo"
          type="date"
          {...form.register("dateTo")}
        />
      </>

      <>
        <Label htmlFor="observation">Observação</Label>
        <Input
          id="observation"
          placeholder="Digite uma observação"
          {...form.register("observation")}
        />
      </>

      <Button type="submit" disabled={loading}>
        Criar documento
      </Button>
    </form>
  );
}
