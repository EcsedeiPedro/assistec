"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { documentSchema, type DocumentSchema } from "@/schemas/document-schema";

import { useDocumentFormViewModel } from "@/view-models/use-document-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      className="grid grid-cols-4 gap-2"
    >
      <Input placeholder="Nome" {...form.register("name")} />

      <Input type="date" {...form.register("dateFrom")} />

      <Input type="date" {...form.register("dateTo")} />

      <Input placeholder="Observação" {...form.register("observation")} />

      <Button type="submit" disabled={loading}>
        Criar documento
      </Button>
    </form>
  );
}
