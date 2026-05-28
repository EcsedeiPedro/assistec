"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BoxCreateModal } from "./box-create-modal";
import { BoxWithCompany } from "@/types/box";
import { BoxCard } from "./box-card";
import { Company } from "@/types/company";

type Props = {
  boxes: BoxWithCompany[];
  companies: Company[];
};

export function BoxesView({ boxes, companies }: Props) {
  const [search, setSearch] = useState("");

  const [companyId, setCompanyId] = useState("all");

  const filteredBoxes = useMemo(() => {
    return boxes.filter((box) => {
      const matchesSearch =
        box.number.toString().includes(search) ||
        box.observation?.toLowerCase().includes(search.toLowerCase());

      const matchesCompany =
        companyId === "all" ? true : box.companyId === companyId;

      return matchesSearch && matchesCompany;
    });
  }, [boxes, search, companyId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Caixas</h1>

          <p className="text-muted-foreground">Gerencie as caixas</p>
        </div>

        <BoxCreateModal companies={companies} />
      </div>

      <div className="flex justify-end items-end gap-4">
        <Input
          className="w-max"
          placeholder="Buscar caixa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <SelectGroup className="p-0">
          <SelectLabel className="">Filtrar por empresa</SelectLabel>

          <Select value={companyId} onValueChange={setCompanyId}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Empresa" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todas empresas</SelectItem>

              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBoxes.map((box) => (
          <BoxCard key={box.id} box={box} />
        ))}
      </div>
    </div>
  );
}
