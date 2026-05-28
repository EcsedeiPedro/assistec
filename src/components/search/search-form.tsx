"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSearch() {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Buscar documentos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button onClick={handleSearch}>
        <Search />
      </Button>
    </div>
  );
}
