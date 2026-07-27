"use client";

import { useState } from "react";

import { createDocumentAction } from "@/actions/document-actions";
import type { CreateDocumentSchema } from "@/schemas/document-schema";

export function useDocumentFormViewModel(boxId: string) {
  const [loading, setLoading] = useState(false);

  async function submit(data: CreateDocumentSchema) {
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
