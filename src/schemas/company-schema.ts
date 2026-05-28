import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Nome da empresa é obrigatório"),
});

export type CompanySchema = z.infer<typeof companySchema>;