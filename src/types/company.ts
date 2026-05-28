import { z } from "zod";
import { createCompanySchema, updateCompanySchema } from "@/schemas/company-schema";

export type CreateCompanyDTO = z.infer<typeof createCompanySchema>;
export type UpdateCompanyDTO = z.infer<typeof updateCompanySchema>;

export type Company = {
  id: string;
  name: string;
};