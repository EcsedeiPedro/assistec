"use client";

import { useState } from "react";

import { createDocumentAction } from "@/actions/document-actions";

export function useDocumentFormViewModel(boxId: string) {
  const [loading, setLoading] = useState(false);

  async function submit(data: {
    name: string;
    dateFrom: string;
    dateTo: string;
    observation?: string;
  }) {
    try {
      setLoading(true);

      await createDocumentAction(boxId, data);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    submit,
  };
}
