import { z } from 'zod'

export const documentSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome obrigatório'),

  date: z.string(),

  observation: z.string().optional(),
})

export type DocumentSchema = z.infer<
  typeof documentSchema
>