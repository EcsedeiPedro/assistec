import { z } from "zod";

export const createBoxSchema = z.object({
  number: z.number().min(1, "Número obrigatório"),

  companyIds: z.array(z.string()).min(1, "Selecione ao menos uma empresa"),

  observation: z.string().optional(),
});

export const updateBoxSchema = z.object({
  number: z.number().min(1, "Número obrigatório"),

  companyIds: z.array(z.string()).min(1, "Selecione ao menos uma empresa"),

  observation: z.string().optional(),
});

export type CreateBoxSchema = z.infer<typeof createBoxSchema>;

export type UpdateBoxSchema = z.infer<typeof updateBoxSchema>;
