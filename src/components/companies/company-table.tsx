"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CompanyRowActions } from "./company-row-actions";
import { EditCompanyDialog } from "./edit-company-dialog";
import { DeleteCompanyDialog } from "./delete-company-dialog";

type Company = {
  id: string;
  name: string;
};

type Props = {
  companies: Company[];
};

export function CompanyTable({ companies }: Props) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleEdit(company: Company) {
    setSelectedCompany(company);
    setEditOpen(true);
  }

  function handleDelete(company: Company) {
    setSelectedCompany(company);
    setDeleteOpen(true);
  }

  if (!companies.length) {
    return (
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        Nenhuma empresa cadastrada
      </div>
    );
  }

  console.log(companies.map((c) => c.id));

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Nome</TableHead>

              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {companies.map((company, index) => (
              <TableRow key={`${company.id}-${index}`}>
                <TableCell>
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-primary-brand font-bold hover:underline"
                  >
                    {company.name}
                  </Link>
                </TableCell>

                <TableCell>
                  <CompanyRowActions
                    onEdit={() => handleEdit(company)}
                    onDelete={() => handleDelete(company)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedCompany && (
        <>
          <EditCompanyDialog
            key={`edit-${selectedCompany.id}`}
            company={selectedCompany}
            open={editOpen}
            onOpenChange={setEditOpen}
          />

          <DeleteCompanyDialog
            key={`delete-${selectedCompany.id}`}
            companyId={selectedCompany.id}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        </>
      )}
    </>
  );
}
