type Props = {
  documents: {
    id: string;
    name: string;
    date: Date;
    observation: string | null;
  }[];
};

export function DocumentTable({ documents }: Props) {
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

            <th className="text-left p-3">Data</th>

            <th className="text-left p-3">Observação</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <tr key={document.id} className="border-b">
              <td className="p-3">{document.name}</td>

              <td className="p-3">
                {document.date.toLocaleDateString("pt-BR")}
              </td>

              <td className="p-3">{document.observation || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
