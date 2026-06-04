"use client";

import { DocumentPageActions } from "./document-page-actions";

type Props = {
  documents: {
    id: string;
    boxId: string;
    name: string;
    dateFrom: Date | string;
    dateTo: Date | string;
    observation: string | null;
  }[];
};

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function DocumentTable({ documents }: Props) {
  const boxId = documents[0]?.boxId;

  if (!documents.length) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        Nenhum documento cadastrado
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Nome</th>

            <th className="text-left p-3">Período</th>

            <th className="text-left p-3">Observação</th>

            <th className="text-left p-3 w-20" />
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <tr key={document.id} className="border-b">
              <td className="p-3">{document.name}</td>

              <td className="p-3">
                {formatDate(document.dateFrom)} a {formatDate(document.dateTo)}
              </td>

              <td className="p-3">{document.observation || "-"}</td>

              <td>
                {boxId && <DocumentPageActions boxId={boxId} document={document} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
