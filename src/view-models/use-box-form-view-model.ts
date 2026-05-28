"use client";

import { useState } from "react";

import { createBoxAction } from "@/actions/box-actions";

import type { BoxSchema } from "@/schemas/box-schema";

export function useBoxFormViewModel() {
  const [loading, setLoading] = useState(false);

  async function submit(data: BoxSchema) {
    try {
      setLoading(true);

      await createBoxAction(data);
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
