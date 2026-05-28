"use client";

import { useState } from "react";

import { createBoxAction } from "@/actions/box-actions";

export function useBoxFormViewModel(companyId: string) {
  const [loading, setLoading] = useState(false);

  async function submit(data: { number: number; observation?: string }) {
    try {
      setLoading(true);

      await createBoxAction(companyId, data);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    submit,
  };
}
