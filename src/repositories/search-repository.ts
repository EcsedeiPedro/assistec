import { prisma } from "@/lib/prisma";

export async function searchDocuments(query: string) {
  return prisma.document.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },

        {
          observation: {
            contains: query,
            mode: "insensitive",
          },
        },

        {
          box: {
            number: Number(query) || -1,
          },
        },

        {
          box: {
            companies: {
              some: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
        },
      ],
    },

    include: {
      box: {
        include: {
          companies: true,
        },
      },
    },

    orderBy: {
      dateFrom: "desc",
    },
  });
}
