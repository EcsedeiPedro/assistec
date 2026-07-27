"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select";

import { BoxCreateModal } from "./box-create-modal";
import { BoxWithCompany } from "@/types/box";
import { BoxCard } from "./box-card";
import { Company } from "@/types/company";
import { Label } from "../ui/label";
import { PageContainer } from "@/components/layout/page-container";

type Props = {
  allBoxes: BoxWithCompany[];
  companies: Company[];
  currentPage: number;
};

export function BoxesView({ allBoxes, companies, currentPage }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const pageSize = 20;

  const [companyId, setCompanyId] = useState("all");
  const [companySearch, setCompanySearch] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectOpen) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [selectOpen]);

  const filteredBoxes = useMemo(() => {
    return allBoxes.filter((box) => {
      const matchesSearch =
        box.number.toString().includes(search) ||
        box.observation?.toLowerCase().includes(search.toLowerCase());

      const matchesCompany =
        companyId === "all" ? true : box.companies.some((company) => company.id === companyId);

      return matchesSearch && matchesCompany;
    });
  }, [allBoxes, search, companyId]);

  const totalPages = Math.ceil(filteredBoxes.length / pageSize);
  
  const paginatedBoxes = useMemo(() => {
    const skip = (currentPage - 1) * pageSize;
    return filteredBoxes.slice(skip, skip + pageSize);
  }, [filteredBoxes, currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <PageContainer
      className="space-y-6"
      title="Caixas"
      description="Gerencie as caixas"
      actions={<BoxCreateModal companies={companies} />}
    >
      <div className="flex justify-end items-end gap-4">
        <div className="flex flex-col items-start gap-2">
          <Label className="pl-2 text-xs text-neutral-700" htmlFor="search-box">
            Pesquisar por caixa
          </Label>

          <Input
            id="search-box"
            type="number"
            className="w-max border border-green-base bg-white font-medium text-xs placeholder:text-xs text-green-base placeholder:text-green-base"
            placeholder="Buscar caixa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <SelectGroup className="p-0 flex flex-col gap-2">
          <Label
            className="pl-2 text-xs text-neutral-700"
            htmlFor="company-select"
          >
            Filtrar por empresa
          </Label>

          <Select
            value={companyId}
            onValueChange={(v) => {
              setCompanyId(v);
              setSelectOpen(false);
              setCompanySearch("");
            }}
            open={selectOpen}
            onOpenChange={setSelectOpen}
          >
            <SelectTrigger
              id="company-select"
              className="w-60 border border-green-base bg-white font-medium text-xs placeholder:text-xs text-green-base placeholder:text-green-base"
            >
              {companyId === "all"
                ? "Empresa"
                : companies.find((c) => c.id === companyId)?.name}
            </SelectTrigger>
            <SelectContent position="popper" className="w-60">
              <div className="p-1.5">
                <input
                  ref={searchRef}
                  id="company-search"
                  type="text"
                  placeholder="Pesquisar empresa..."
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-7 w-full min-w-0 rounded-lg border border-green-base bg-white px-2 py-0.5 text-xs font-medium placeholder:text-xs text-green-base"
                />
              </div>

              <div className="max-h-48 overflow-auto">
                <button
                  type="button"
                  onClick={() => {
                    setCompanyId("all");
                    setSelectOpen(false);
                    setCompanySearch("");
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-accent"
                >
                  Todas empresas
                </button>

                {companies
                  .filter((c) =>
                    c.name.toLowerCase().includes(companySearch.toLowerCase())
                  )
                  .map((company) => (
                    <button
                      key={company.id}
                      type="button"
                      onClick={() => {
                        setCompanyId(company.id);
                        setSelectOpen(false);
                        setCompanySearch("");
                      }}
                      className="w-full text-left px-2 py-1 text-xs hover:bg-accent"
                    >
                      {company.name}
                    </button>
                  ))}
              </div>
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedBoxes.map((box) => (
          <BoxCard key={box.id} box={box} />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </PageContainer>
  );
}
