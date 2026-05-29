"use client";

import { BoxCard } from "./box-card";
import { BoxListItem } from "@/types/box";

type Props = {
  boxes: BoxListItem[];

  showCompany?: boolean;
};

export function BoxTable({ boxes, showCompany = true }: Props) {
  if (!boxes.length) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        Nenhuma caixa cadastrada
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {boxes.map((box) => (
        <BoxCard key={box.id} box={box} showCompany={showCompany} />
      ))}
    </div>
  );
}
