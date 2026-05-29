import { z } from "zod";

export const boxSchema = z.object({
  number: z.number().min(1, "Número da caixa é obrigatório"),

  companyId: z.string().min(1, "Selecione uma empresa"),

  observation: z.string().optional(),
});

export type BoxSchema = z.infer<typeof boxSchema>;