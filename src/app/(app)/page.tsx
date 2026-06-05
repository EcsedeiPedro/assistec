import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Building2, Box, FileText, Clock } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const [user, companiesCount, boxesCount, documentsCount, recentBoxes, recentDocuments] =
    await Promise.all([
      getCurrentUser(),
      prisma.company.count(),
      prisma.box.count(),
      prisma.document.count(),
      prisma.box.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { company: { select: { id: true, name: true } } },
      }),
      prisma.document.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          box: {
            select: {
              id: true,
              number: true,
              company: { select: { id: true, name: true } },
            },
          },
        },
      }),
    ]);

  const stats = [
    { label: "Empresas", value: companiesCount, icon: Building2, href: "/companies" },
    { label: "Caixas",   value: boxesCount,     icon: Box,       href: "/boxes"     },
    { label: "Documentos", value: documentsCount, icon: FileText, href: "/search"   },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm text-gray">
          Bem-vindo de volta,{" "}
          <span className="font-semibold text-green-base">{user?.firstName}</span>!
        </p>
        <h1 className="text-3xl font-bold text-green-dark">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-light transition-shadow hover:shadow-md"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-base/10 text-green-base transition-colors group-hover:bg-green-base group-hover:text-white">
              <Icon className="size-6" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-2xl font-bold text-green-dark">
                {value.toLocaleString("pt-BR")}
              </p>
              <p className="text-sm text-gray">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent boxes */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-light">
          <div className="flex items-center justify-between border-b border-gray-light px-6 py-4">
            <div className="flex items-center gap-2">
              <Box className="size-4 text-green-base" strokeWidth={1.5} />
              <h2 className="font-semibold text-green-dark">Últimas caixas</h2>
            </div>
            <Link href="/boxes" className="text-xs text-green-base hover:underline">
              Ver todas →
            </Link>
          </div>

          {recentBoxes.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray">
              Nenhuma caixa cadastrada ainda.
            </p>
          ) : (
            <ul className="divide-y divide-gray-light">
              {recentBoxes.map((box) => (
                <li key={box.id}>
                  <Link
                    href={`/boxes/${box.id}`}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-light/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-green-base/10 text-xs font-bold text-green-base">
                        #{box.number}
                      </span>
                      <span className="text-sm text-gray-dark">{box.company.name}</span>
                    </div>
                    <span className="text-xs text-gray">
                      {new Date(box.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent documents */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-light">
          <div className="flex items-center justify-between border-b border-gray-light px-6 py-4">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-green-base" strokeWidth={1.5} />
              <h2 className="font-semibold text-green-dark">Documentos recentes</h2>
            </div>
            <Link href="/search" className="text-xs text-green-base hover:underline">
              Buscar →
            </Link>
          </div>

          {recentDocuments.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray">
              Nenhum documento cadastrado ainda.
            </p>
          ) : (
            <ul className="divide-y divide-gray-light">
              {recentDocuments.map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/boxes/${doc.box.id}`}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-light/40 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-dark">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray">
                        Caixa #{doc.box.number} · {doc.box.company.name}
                      </p>
                    </div>
                    <span className="ml-4 shrink-0 text-xs text-gray">
                      {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}