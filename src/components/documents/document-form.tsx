"use client";

import { useForm, type Resolver } from "react-hook-form";

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

type DocumentFormValues = {
  name: string;
  companyId: string;
  date?: string;
  observation?: string;
};

export function DocumentForm({ boxId, companies }: Props) {
  const { loading, submit } = useDocumentFormViewModel(boxId);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(createDocumentSchema) as Resolver<DocumentFormValues>,
    defaultValues: {
      name: "",
      companyId: "",
      date: "",
      observation: "",
    },
  });

  const { watch, setValue } = form;
  // eslint-disable-next-line react-hooks/incompatible-library
  const companyId = watch("companyId");

  async function onSubmit(data: DocumentFormValues) {
    const submitData: CreateDocumentSchema = {
      name: data.name,
      companyId: data.companyId,
      date: data.date,
      observation: data.observation,
    };

    try {
      await submit(submitData);

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
          value={companyId}
          onValueChange={(value) =>
            form.setValue("companyId", value ?? "", {
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
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          placeholder="Digite a data livremente"
          {...form.register("date")}
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
