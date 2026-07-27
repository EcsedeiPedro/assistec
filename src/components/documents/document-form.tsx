"use client";

import { useState } from "react";
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
  dateFrom?: string;
  dateTo?: string;
  year?: string;
  observation?: string;
};

export function DocumentForm({ boxId, companies }: Props) {
  const [mode, setMode] = useState<"none" | "date" | "year">("none");
  const { loading, submit } = useDocumentFormViewModel(boxId);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(createDocumentSchema) as Resolver<DocumentFormValues>,
    defaultValues: {
      name: "",
      companyId: "",
      dateFrom: "",
      dateTo: "",
      year: "",
      observation: "",
    },
  });

  const { watch, setValue } = form;
  // eslint-disable-next-line react-hooks/incompatible-library
  const companyId = watch("companyId");

  function toggleDateMode() {
    if (mode === "date") {
      setMode("none");
      setValue("dateFrom", undefined);
      setValue("dateTo", undefined);
    } else {
      setMode("date");
      setValue("year", undefined);
    }
  }

  function toggleYearMode() {
    if (mode === "year") {
      setMode("none");
      setValue("year", undefined);
    } else {
      setMode("year");
      setValue("dateFrom", undefined);
      setValue("dateTo", undefined);
    }
  }

  async function onSubmit(data: DocumentFormValues) {
    const submitData: CreateDocumentSchema = {
      name: data.name,
      companyId: data.companyId,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      year: data.year ? Number(data.year) : undefined,
      observation: data.observation,
    };

    try {
      await submit(submitData);

      toast.success("Documento criado");

      form.reset();
      setMode("none");
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
          disabled={mode !== "date"}
          {...form.register("dateFrom")}
        />
      </>

      <>
        <Label htmlFor="dateTo">Data de Término</Label>
        <Input
          className="w-max"
          id="dateTo"
          type="date"
          disabled={mode !== "date"}
          {...form.register("dateTo")}
        />
      </>

      <>
        <Label htmlFor="year">Ano</Label>
        <Input
          className="w-max"
          id="year"
          type="number"
          placeholder="2026"
          disabled={mode !== "year"}
          min={1900}
          max={2099}
          {...form.register("year")}
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
