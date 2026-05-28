import Link from "next/link";

type Props = {
  boxes: {
    id: string;
    number: number;
    observation: string | null;
  }[];
};

export function BoxTable({ boxes }: Props) {
  if (!boxes.length) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        Nenhuma caixa cadastrada
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Número</th>

            <th className="text-left p-3">Observação</th>
          </tr>
        </thead>

        <tbody>
          {boxes.map((box) => (
            <tr key={box.id} className="border-b">
              <td className="p-3">
                <Link className="text-blue-500 hover:underline" href={`/boxes/${box.id}`}>
                  {box.number}
                </Link>
              </td>

              <td className="p-3">{box.observation || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
