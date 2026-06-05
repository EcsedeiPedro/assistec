import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Building2, Box, FileText } from "lucide-react";

export default async function HomePage() {
  const [user, companies, boxes, documents] = await Promise.all([
    getCurrentUser(),
    prisma.company.count(),
    prisma.box.count(),
    prisma.document.count(),
  ]);

  const stats = [
    {
      label: "Empresas",
      value: companies,
      icon: Building2,
      href: "/companies",
    },
    {
      label: "Caixas",
      value: boxes,
      icon: Box,
      href: "/boxes",
    },
    {
      label: "Documentos",
      value: documents,
      icon: FileText,
      href: "/search",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm text-gray">
          Bem-vindo de volta,{" "}
          <span className="font-semibold text-green-base">{user?.firstName}</span>!
        </p>
        <h1 className="text-3xl font-bold text-green-dark">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <a
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
          </a>
        ))}
      </div>
    </div>
  );
}