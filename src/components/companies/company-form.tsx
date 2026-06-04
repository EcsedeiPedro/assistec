"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCompanyFormViewModel } from "@/view-models/use-company-form-view-model";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateCompanyDTO } from "@/types/company";
import { createCompanySchema } from "@/schemas/company-schema";
import { Label } from "../ui/label";

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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex items-end  gap-2"
    >
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="name" className="ml-2 text-xs text-neutral-700">
          Nome da empresa
        </Label>

        <Input
          id="name"
          className="w-max bg-white placeholder:text-green-base border border-green-base text-green-base font-medium text-xs placeholder:text-xs"
          placeholder="Nome da empresa"
          {...form.register("name")}
        />
      </div>

      <Button className="bg-green-base" type="submit" disabled={loading}>
        Criar
      </Button>
    </form>
  );
}
