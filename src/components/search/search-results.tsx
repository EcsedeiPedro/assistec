import Link from "next/dist/client/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  documents: {
    id: string;
    name: string;
    dateFrom?: Date | string | null;
    dateTo?: Date | string | null;
    year?: number | null;
    observation: string | null;

    box: {
      id: string;
      number: number;

      companies: {
        id: string;
        name: string;
      }[];
    };
  }[];
};

function formatDate(value?: Date | string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function SearchResults({ documents }: Props) {
  if (!documents.length) {
    return (
      <div className="border rounded-md p-8 text-center text-gray-dark bg-white">
        Nenhum resultado encontrado :(
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table variant="brand">
        <TableHeader variant="brand">
          <TableRow>
            <TableHead className="p-3">Documento</TableHead>

            <TableHead className="p-3">Empresa</TableHead>

            <TableHead className="p-3">Caixa</TableHead>

            <TableHead className="p-3">Período</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody variant="brand">
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="p-3">
                <Link
                  href={`/boxes/${document.box.id}`}
                  className="text-primary-brand font-bold hover:underline"
                >
                  {document.name}
                </Link>
              </TableCell>

              <TableCell className="p-3">
                <div className="flex flex-col">
                  {document.box.companies.map((company) => (
                    <Link
                      key={company.id}
                      href={`/companies/${company.id}`}
                      className="text-primary-brand font-bold hover:underline"
                    >
                      {company.name}
                    </Link>
                  ))}
                </div>
              </TableCell>

              <TableCell className="p-3">
                <Link
                  href={`/boxes/${document.box.id}`}
                  className="text-primary-brand font-bold hover:underline"
                >
                  {document.box.number}
                </Link>
              </TableCell>

              <TableCell className="p-3">
                {document.year ? (
                  document.year
                ) : document.dateFrom || document.dateTo ? (
                  <>
                    {formatDate(document.dateFrom)} - {formatDate(document.dateTo)}
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
