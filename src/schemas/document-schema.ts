import { z } from "zod";

export const createDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  dateFrom: z.string(),
  dateTo: z.string(),
  observation: z.string().optional(),
});

export const updateDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  dateFrom: z.string(),
  dateTo: z.string(),
  observation: z.string().optional(),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;

export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;
