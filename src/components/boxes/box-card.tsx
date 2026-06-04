import Link from "next/link";

import { BoxListItem } from "@/types/box";

type Props = {
  box: BoxListItem;

  showCompany?: boolean;
};

export function BoxCard({ box, showCompany = true }: Props) {
  return (
    <Link className="block" href={`/boxes/${box.id}`}>
      <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-lg transform-gpu translate-y-0 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer will-change-transform">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-dark">
              Caixa {box.number}
            </span>

            {showCompany && <p className="text-sm text-green-dark font-medium">-</p>}

            {showCompany && box.company?.name && (
              <p className="text-sm text-green-dark font-medium">{box.company.name}</p>
            )}
          </div>

          {box.observation && (
            <p className="text-sm text-gray-dark">{box.observation}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
