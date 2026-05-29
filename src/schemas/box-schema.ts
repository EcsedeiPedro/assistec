import { z } from "zod";

export const createBoxSchema = z.object({
  number: z.number().min(1, "Número obrigatório"),

  companyId: z.string().min(1, "Empresa obrigatória"),

  observation: z.string().optional(),
});

export const updateBoxSchema = z.object({
  number: z.number().min(1, "Número obrigatório"),

  observation: z.string().optional(),
});

export type CreateBoxSchema = z.infer<typeof createBoxSchema>;

export type UpdateBoxSchema = z.infer<typeof updateBoxSchema>;
