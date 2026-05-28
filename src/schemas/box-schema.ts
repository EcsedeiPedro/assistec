import { z } from 'zod'

export const boxSchema = z.object({
  number: z
    .number()
    .min(1),

  companyId: z.string(),

  observation: z.string().optional(),
})

export type BoxSchema = z.infer<
  typeof boxSchema
>