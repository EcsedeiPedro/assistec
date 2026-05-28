type Props = {
  documents: {
    id: string;
    name: string;
    date: Date;
    observation: string | null;

    box: {
      number: number;

      company: {
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

            <th className="text-left p-3">Data</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <tr key={document.id} className="border-b">
              <td className="p-3">{document.name}</td>

              <td className="p-3">{document.box.company.name}</td>

              <td className="p-3">{document.box.number}</td>

              <td className="p-3">
                {document.date.toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
