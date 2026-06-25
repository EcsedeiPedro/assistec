"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Company = {
  id: string;
  name: string;
};

type Props = {
  companies: Company[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

export function CompanyMultiSelect({
  companies,
  selectedIds,
  onChange,
}: Props) {
  const [search, setSearch] = useState("");

  const selectedCompanies = useMemo(
    () => companies.filter((company) => selectedIds.includes(company.id)),
    [companies, selectedIds],
  );

  const filteredCompanies = useMemo(() => {
    if (!search.trim()) {
      return [];
    }

    return companies
      .filter(
        (company) =>
          company.name.toLowerCase().includes(search.toLowerCase()) &&
          !selectedIds.includes(company.id),
      )
      .slice(0, 10);
  }, [companies, search, selectedIds]);

  function addCompany(companyId: string) {
    onChange([...selectedIds, companyId]);
    setSearch("");
  }

  function removeCompany(companyId: string) {
    onChange(selectedIds.filter((id) => id !== companyId));
  }

  return (
    <div className="space-y-3">
      <Label>Empresas vinculadas</Label>

      <Input
        placeholder="Buscar empresa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!!selectedCompanies.length && (
        <div className="flex flex-wrap gap-2">
          {selectedCompanies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => removeCompany(company.id)}
              className="rounded-full bg-green-base px-3 py-1 text-sm text-white hover:bg-green-light"
            >
              {company.name} ✕
            </button>
          ))}
        </div>
      )}

      {!!filteredCompanies.length && (
        <div className="rounded-md border">
          {filteredCompanies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => addCompany(company.id)}
              className="block w-full px-3 py-2 text-left hover:bg-neutral-100"
            >
              {company.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
