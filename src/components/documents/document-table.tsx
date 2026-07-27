"use client";

import { DocumentPageActions } from "./document-page-actions";
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
    boxId: string;

    company: {
      id: string;
      name: string;
    };

    name: string;
    date?: string | null;
    observation: string | null;
  }[];
};

export function DocumentTable({ documents }: Props) {
  const boxId = documents[0]?.boxId;

  if (!documents.length) {
    return (
      <div className="border rounded-md p-8 text-center text-gray-dark">
        Nenhum documento cadastrado
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table variant="brand">
        <TableHeader variant="brand">
          <TableRow>
            <TableHead className="p-3">Nome</TableHead>

            <TableHead className="p-3">Empresa</TableHead>

            <TableHead className="p-3">Período</TableHead>

            <TableHead className="p-3">Observação</TableHead>

            <TableHead className="p-3 w-20" />
          </TableRow>
        </TableHeader>

        <TableBody variant="brand">
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="p-3">{document.name}</TableCell>

              <TableCell className="p-3">{document.company.name}</TableCell>

              <TableCell className="p-3">{document.date || "-"}</TableCell>

              <TableCell className="p-3">{document.observation || "-"}</TableCell>

              <TableCell className="p-3">
                {boxId && (
                  <DocumentPageActions
                    boxId={boxId}
                    document={document}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
