"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { loginAction } from "@/actions/auth-actions";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    startTransition(async () => {
      const result = await loginAction(identifier, password);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      router.push("/");
      router.refresh();
    });
  };

  const canSubmit = identifier.trim().length > 0 && password.length > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-green-dark">Bem-vindo de volta</h1>
        <p className="text-sm text-gray">Acesse com seu CPF e senha</p>
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
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <a
              href="/forgot-password"
              className="text-xs text-green-base hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            onKeyDown={(e) => e.key === "Enter" && canSubmit && handleLogin()}
          />
        </div>

        <Button
          className="w-full bg-green-base hover:bg-green-dark text-white h-11"
          disabled={!canSubmit || isPending}
          onClick={handleLogin}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </div>

      <p className="text-center text-sm text-gray">
        Não tem conta?{" "}
        <a href="/register" className="font-medium text-green-base hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}
