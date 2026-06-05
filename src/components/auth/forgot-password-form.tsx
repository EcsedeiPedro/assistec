"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordAction } from "@/actions/auth-actions";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [identifier, setIdentifier] = useState("");
  const [sent, setSent] = useState(false);

  const handleIdentifierChange = (value: string) => {
    if (!value.includes("@")) {
      const digits = value.replace(/\D/g, "").slice(0, 11);
      let formatted = digits;
      if (digits.length > 9) {
        formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
      } else if (digits.length > 6) {
        formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      } else if (digits.length > 3) {
        formatted = `${digits.slice(0, 3)}.${digits.slice(3)}`;
      }
      setIdentifier(formatted);
    } else {
      setIdentifier(value);
    }
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await forgotPasswordAction(identifier);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      setSent(true);
    });
  };

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="inline-flex size-16 items-center justify-center rounded-full bg-green-base/10 mx-auto">
          <svg
            className="size-8 text-green-base"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-green-dark">
            E-mail enviado!
          </h1>
          <p className="text-sm text-gray">
            Enviamos um link de redefinição de senha para o e-mail associado à
            sua conta. Verifique também a caixa de spam.
          </p>
        </div>

        <a
          href="/login"
          className="block text-sm font-medium text-green-base hover:underline"
        >
          ← Voltar ao login
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-green-dark">
          Esqueci minha senha
        </h1>
        <p className="text-sm text-gray">
          Informe seu CPF e enviaremos um link para redefinir sua senha
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="identifier">CPF</Label>
          <Input
            id="identifier"
            type="text"
            placeholder="000.000.000-00"
            value={identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            disabled={isPending}
            className="h-11"
            onKeyDown={(e) => e.key === "Enter" && identifier && handleSubmit()}
          />
        </div>

        <Button
          className="w-full bg-green-base hover:bg-green-dark text-white h-11"
          disabled={!identifier.trim() || isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Enviando..." : "Enviar link de redefinição"}
        </Button>
      </div>

      <a
        href="/login"
        className="block text-center text-sm text-gray hover:text-green-base transition-colors"
      >
        ← Voltar ao login
      </a>
    </div>
  );
}
