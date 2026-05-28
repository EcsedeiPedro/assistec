"use client";

import { useState } from "react";
import { createCompanyAction } from "@/actions/company-actions";

export function useCompanyFormViewModel() {
  const [loading, setLoading] = useState(false);

  async function submit(data: { name: string }) {
    try {
      setLoading(true);

      await createCompanyAction(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    submit,
  };
}
