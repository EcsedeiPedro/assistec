"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pagination } from "@/components/ui/pagination";
import { CompanyRowActions } from "./company-row-actions";
import { EditCompanyDialog } from "./edit-company-dialog";
import { DeleteCompanyDialog } from "./delete-company-dialog";

type Company = {
  id: string;
  name: string;
};

type Props = {
  allCompanies: Company[];
  currentPage: number;
};

export function CompanyTable({ allCompanies, currentPage }: Props) {
  const router = useRouter();
  const pageSize = 20;
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

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const totalPages = Math.ceil(allCompanies.length / pageSize);

  const paginatedCompanies = useMemo(() => {
    const skip = (currentPage - 1) * pageSize;
    return allCompanies.slice(skip, skip + pageSize);
  }, [allCompanies, currentPage]);

  if (!allCompanies.length) {
    return (
      <div className="border rounded-md p-8 text-center text-gray-dark">
        Nenhuma empresa cadastrada
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table variant="brand">
          <TableHeader variant="brand">
            <TableRow>
              <TableHead>Nome</TableHead>

              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>

          <TableBody variant="brand">
            {paginatedCompanies.map((company, index) => (
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

      <div className="flex justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
