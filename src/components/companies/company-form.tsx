"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCompanyFormViewModel } from "@/view-models/use-company-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateCompanyDTO } from "@/types/company";
import { createCompanySchema } from "@/schemas/company-schema";

export function CompanyForm() {
  const { loading, submit } = useCompanyFormViewModel();

  const form = useForm<CreateCompanyDTO>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: CreateCompanyDTO) {
    try {
      await submit(data);

      toast.success("Empresa criada");

      form.reset();
    } catch {
      toast.error("Erro ao criar empresa");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        className="w-max"
        placeholder="Nome da empresa"
        {...form.register("name")}
      />

      <Button type="submit" disabled={loading}>
        Criar
      </Button>
    </form>
  );
}
