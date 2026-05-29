import Link from "next/link";

import { BoxListItem } from "@/types/box";

type Props = {
  box: BoxListItem;

  showCompany?: boolean;
};

export function BoxCard({ box, showCompany = true }: Props) {
  return (
    <Link href={`/boxes/${box.id}`}>
      <div className="border rounded-xl p-4 hover:bg-muted/50 transition cursor-pointer">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Caixa {box.number}</h2>
          </div>

          {showCompany && box.company?.name && (
            <p className="text-sm text-muted-foreground">{box.company.name}</p>
          )}

          {box.observation && <p className="text-sm">{box.observation}</p>}
        </div>
      </div>
    </Link>
  );
}
