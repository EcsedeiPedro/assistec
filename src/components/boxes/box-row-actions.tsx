"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function BoxRowActions({ onEdit, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 min-w-40">
        <DropdownMenuItem onClick={onEdit}>Editar caixa</DropdownMenuItem>

        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          Excluir caixa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
