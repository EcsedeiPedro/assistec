'use server'

import { revalidatePath } from 'next/cache'
import * as service from '@/services/company-service'

export async function createCompanyAction(data: {
  name: string
}) {
  await service.createCompany(data)

  revalidatePath('/companies')
}