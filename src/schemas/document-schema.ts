import { z } from "zod";

const optionalTextField = z
  .string()
  .optional()
  .transform((value) => (value?.trim() ? value : undefined));

export const createDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  companyId: z.string().min(1, "Empresa obrigatória"),
  date: optionalTextField,
  observation: z.string().optional(),
});

export const updateDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  companyId: z.string().min(1),
  date: optionalTextField,
  observation: z.string().optional(),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;

export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;
