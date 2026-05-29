import Link from "next/dist/client/link";

type Props = {
  documents: {
    id: string;
    name: string;
    dateFrom: Date;
    dateTo: Date;
    observation: string | null;

    box: {
      id: string;
      number: number;

      company: {
        id: string;
        name: string;
      };
    };
  }[];
};

export function SearchResults({ documents }: Props) {
  if (!documents.length) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        Nenhum resultado encontrado
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Documento</th>

            <th className="text-left p-3">Empresa</th>

            <th className="text-left p-3">Caixa</th>

            <th className="text-left p-3">Período</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <tr key={document.id} className="border-b">
              <td className="p-3">{document.name}</td>

              <td className="p-3">
                <Link
                  href={`/companies/${document.box.company.id}`}
                  className="text-primary-brand font-bold hover:underline"
                >
                  {document.box.company.name}
                </Link>
              </td>

              <td className="p-3">
                <Link
                  href={`/boxes/${document.box.id}`}
                  className="text-primary-brand font-bold hover:underline"
                >
                  {document.box.number}
                </Link>
              </td>

              <td className="p-3">
                {document.dateFrom.toLocaleDateString("pt-BR")} -{" "}
                {document.dateTo.toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
