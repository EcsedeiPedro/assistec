'use server'

import { revalidatePath } from 'next/cache'

import * as service from '@/services/box-service'

export async function createBoxAction(
  companyId: string,
  data: {
    number: number
    observation?: string
  }
) {
  await service.createBox(companyId, data)

  revalidatePath(
    `/companies/${companyId}`
  )
}