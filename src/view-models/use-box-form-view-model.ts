"use client";

import { useState } from "react";

import { createBoxAction } from "@/actions/box-actions";
import { BoxSchema } from "@/schemas/box-schema";

export function useBoxFormViewModel(companyId: string) {
  const [loading, setLoading] = useState(false);

  async function submit(data: BoxSchema) {
    try {
      setLoading(true);

      await createBoxAction(companyId, data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    submit,
  };
}
