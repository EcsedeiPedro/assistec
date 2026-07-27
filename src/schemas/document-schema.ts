import { z } from "zod";

export const createDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  companyId: z.string().min(1, "Empresa obrigatória"),
  dateFrom: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  dateTo: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  observation: z.string().optional(),
});

export const updateDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  companyId: z.string().min(1),
  dateFrom: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  dateTo: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  observation: z.string().optional(),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;

export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;
