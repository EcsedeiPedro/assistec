import { prisma } from '@/lib/prisma'

export async function createDocument(
  boxId: string,
  data: {
    name: string
    date: string
    observation?: string
  }
) {
  return prisma.document.create({
    data: {
      name: data.name,

      date: new Date(data.date),

      observation: data.observation,

      boxId,
    },
  })
}

export async function findDocumentsByBox(
  boxId: string
) {
  return prisma.document.findMany({
    where: {
      boxId,
    },

    orderBy: {
      date: 'desc',
    },
  })
}