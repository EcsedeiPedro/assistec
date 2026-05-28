import Link from "next/link";

type Props = {
  box: {
    id: string;
    number: number;
    observation: string | null;

    company: {
      name: string;
    };
  };
};

export function BoxCard({ box }: Props) {
  return (
    <Link href={`/boxes/${box.id}`}>
      <div className="border rounded-xl p-4 hover:bg-muted/50 transition cursor-pointer">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Caixa {box.number}</h2>
          </div>

          <p className="text-sm text-muted-foreground">{box.company.name}</p>

          {box.observation && <p className="text-sm">{box.observation}</p>}
        </div>
      </div>
    </Link>
  );
}
