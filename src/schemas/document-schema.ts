import { z } from "zod";

const optionalDateField = z
  .string()
  .optional()
  .transform((value) => (value?.trim() ? value : undefined));

const optionalYearField = z
  .union([z.string(), z.number()])
  .optional()
  .transform((value) => {
    if (typeof value === "undefined") {
      return undefined;
    }

    if (typeof value === "number") {
      return Number.isNaN(value) ? undefined : value;
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return undefined;
    }

    const year = Number(trimmed);
    return Number.isNaN(year) ? undefined : year;
  });

export const createDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  companyId: z.string().min(1, "Empresa obrigatória"),
  dateFrom: optionalDateField,
  dateTo: optionalDateField,
  year: optionalYearField,
  observation: z.string().optional(),
});

export const updateDocumentSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  companyId: z.string().min(1),
  dateFrom: optionalDateField,
  dateTo: optionalDateField,
  year: optionalYearField,
  observation: z.string().optional(),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;

export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;
