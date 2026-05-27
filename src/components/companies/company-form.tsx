"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { companySchema, type CompanySchema } from "@/schemas/company-schema";

import { useCompanyFormViewModel } from "@/view-models/use-company-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CompanyForm() {
  const { loading, submit } = useCompanyFormViewModel();

  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: CompanySchema) {
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
      <Input className="w-max" placeholder="Nome da empresa" {...form.register("name")} />

      <Button type="submit" disabled={loading}>
        Criar
      </Button>
    </form>
  );
}
