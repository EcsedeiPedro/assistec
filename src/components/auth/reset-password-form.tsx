"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { resetPasswordAction } from "@/actions/auth-actions";

export function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canSubmit =
    password.length >= 8 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const result = await resetPasswordAction(formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Senha atualizada com sucesso!");
      router.push("/");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-green-dark">Nova senha</h1>
        <p className="text-sm text-gray">
          Crie uma nova senha para sua conta
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">Nova senha</Label>
          <PasswordInput
            id="password"
            placeholder="Mín. 8 caracteres, 1 maiúscula, 1 número"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-destructive">Senhas não coincidem</p>
          )}
        </div>

        <Button
          className="w-full bg-green-base hover:bg-green-dark text-white h-11"
          disabled={!canSubmit || isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Salvando..." : "Salvar nova senha"}
        </Button>
      </div>
    </div>
  );
}
