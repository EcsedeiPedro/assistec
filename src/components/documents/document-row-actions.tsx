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

export function DocumentRowActions({ onEdit, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 min-w-40">
        <DropdownMenuItem onClick={onEdit}>Editar documento</DropdownMenuItem>

        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          Excluir documento
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
