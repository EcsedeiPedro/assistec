import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const companies = await prisma.company.findMany();

  return <pre>{JSON.stringify(companies, null, 2)}</pre>;
}
