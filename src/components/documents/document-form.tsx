"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  createDocumentSchema,
  type CreateDocumentSchema,
} from "@/schemas/document-schema";

import { useDocumentFormViewModel } from "@/view-models/use-document-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  boxId: string;
  companies: {
    id: string;
    name: string;
  }[];
};

export function DocumentForm({ boxId, companies }: Props) {
  const { loading, submit } = useDocumentFormViewModel(boxId);

  const form = useForm<CreateDocumentSchema>({
    resolver: zodResolver(createDocumentSchema),

    defaultValues: {
      name: "",
      companyId: "",
      dateFrom: "",
      dateTo: "",
      observation: "",
    },
  });

  async function onSubmit(data: CreateDocumentSchema) {
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
        <Label htmlFor="companyId">Empresa</Label>

        <Select
          onValueChange={(value) =>
            form.setValue("companyId", value, {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a empresa" />
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

      <Button
        className="bg-green-base text-white hover:bg-green-light focus:bg-green-dark"
        type="submit"
        disabled={loading}
      >
        Criar documento
      </Button>
    </form>
  );
}
