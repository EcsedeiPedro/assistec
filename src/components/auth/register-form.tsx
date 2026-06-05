"use client";

import { useState, useTransition, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { UserAvatar } from "@/components/auth/user-avatar";
import {
  checkAuthorizedUserAction,
  registerAction,
} from "@/actions/auth-actions";

type Step = "cpf" | "profile";

type PreAuthorizedData = {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<Step>("cpf");
  const [cpf, setCpf] = useState("");
  const [preAuthorized, setPreAuthorized] = useState<PreAuthorizedData | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCpfChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 9) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
    } else if (digits.length > 6) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3)}`;
    }
    setCpf(formatted);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A foto deve ter no máximo 5MB");
      return;
    }
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ─── Step 1: Check CPF ────────────────────────────────────────────────────────
  const handleCheckCpf = () => {
    startTransition(async () => {
      const result = await checkAuthorizedUserAction(cpf);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      setPreAuthorized(result.data);
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
      setEmail(result.data.email);
      setStep("profile");
    });
  };

  // ─── Step 2: Register ─────────────────────────────────────────────────────────
  const handleRegister = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("cpf", preAuthorized!.cpf);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      if (photo) formData.append("photo", photo);

      const result = await registerAction(formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      if (result.data.confirmed) {
        toast.success("Cadastro concluído! Bem-vindo ao Assistec.");
        router.push("/");
        router.refresh();
      } else {
        toast.info(
          "Cadastro realizado! Verifique seu e-mail para ativar sua conta.",
          { duration: 8000 },
        );
        router.push("/login");
      }
    });
  };

  const canSubmit =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    password.length >= 8 &&
    confirmPassword.length > 0;

  // ─── Step: CPF ────────────────────────────────────────────────────────────────
  if (step === "cpf") {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-green-dark">Criar conta</h1>
          <p className="text-sm text-gray">
            Informe seu CPF para verificar se você tem acesso autorizado
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => handleCpfChange(e.target.value)}
              disabled={isPending}
              className="h-11"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                cpf.replace(/\D/g, "").length === 11 &&
                handleCheckCpf()
              }
            />
          </div>

          <Button
            className="w-full bg-green-base hover:bg-green-dark text-white h-11"
            disabled={cpf.replace(/\D/g, "").length !== 11 || isPending}
            onClick={handleCheckCpf}
          >
            {isPending ? "Verificando..." : "Verificar CPF"}
          </Button>
        </div>

        <p className="text-center text-sm text-gray">
          Já tem conta?{" "}
          <a href="/login" className="font-medium text-green-base hover:underline">
            Entrar
          </a>
        </p>
      </div>
    );
  }

  // ─── Step: Profile + Password ─────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-green-dark">Seus dados</h1>
        <p className="text-sm text-gray">
          Confirme suas informações e crie uma senha
        </p>
      </div>

      <div className="space-y-4">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative"
            title="Clique para adicionar foto"
          >
            {photoPreview ? (
              <UserAvatar
                firstName={firstName || "?"}
                lastName={lastName || ""}
                avatarUrl={photoPreview}
                className="size-20! ring-4! group-hover:opacity-80 transition-opacity"
              />
            ) : (
              <span className="inline-flex size-20 items-center justify-center rounded-full bg-green-base/10 ring-4 ring-green-base/20 group-hover:bg-green-base/20 transition-colors">
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            )}
          </button>
          <span className="text-xs text-gray">Foto de perfil (opcional)</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Nome *</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isPending}
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Sobrenome *</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isPending}
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label>CPF</Label>
          <Input
            value={
              preAuthorized?.cpf.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                "$1.$2.$3-$4",
              ) ?? ""
            }
            disabled
            className="h-11 opacity-60"
          />
        </div>

        <div className="border-t border-gray-light pt-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha *</Label>
            <PasswordInput
              id="password"
              placeholder="Mín. 8 caracteres, 1 maiúscula, 1 número"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirmar senha *</Label>
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
        </div>

        <Button
          className="w-full bg-green-base hover:bg-green-dark text-white h-11"
          disabled={!canSubmit || isPending}
          onClick={handleRegister}
        >
          {isPending ? "Criando conta..." : "Criar conta"}
        </Button>
      </div>

      <button
        type="button"
        className="w-full text-sm text-gray hover:text-green-base transition-colors"
        onClick={() => setStep("cpf")}
      >
        ← Voltar
      </button>
    </div>
  );
}

