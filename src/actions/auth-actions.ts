"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { registerStep1Schema, registerStep2Schema, resetPasswordSchema } from "@/schemas/auth-schema";

type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── Registration ──────────────────────────────────────────────────────────────

/**
 * Step 1: Verify CPF is in the authorized_users table and not yet registered.
 */
export async function checkAuthorizedUserAction(
  rawCpf: string,
): Promise<
  ActionResult<{
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
  }>
> {
  const result = registerStep1Schema.safeParse({ cpf: rawCpf });
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const cpf = result.data.cpf;

  try {
    const authorizedUser = await prisma.authorizedUser.findUnique({
      where: { cpf },
    });

    if (!authorizedUser) {
      return {
        success: false,
        error: "CPF não encontrado. Solicite acesso ao administrador.",
      };
    }

    if (!authorizedUser.active) {
      return {
        success: false,
        error: "Seu acesso está inativo. Entre em contato com o administrador.",
      };
    }

    if (authorizedUser.isRegistered) {
      return {
        success: false,
        error: "Este CPF já possui cadastro. Acesse a página de login.",
      };
    }

    return {
      success: true,
      data: {
        firstName: authorizedUser.firstName,
        lastName: authorizedUser.lastName,
        email: authorizedUser.email,
        cpf,
      },
    };
  } catch {
    return { success: false, error: "Erro ao verificar CPF. Tente novamente." };
  }
}

/**
 * Step 2: Create Supabase auth user, upload avatar, create Profile in DB.
 * Returns `confirmed: true` when the session is established immediately
 * (Supabase "Confirm email" is disabled), or `confirmed: false` when an
 * email confirmation is required before the user can log in.
 */
export async function registerAction(
  formData: FormData,
): Promise<ActionResult<{ confirmed: boolean }>> {
  const raw = {
    cpf: formData.get("cpf") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = registerStep2Schema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const supabase = await createClient();

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
    });

    if (signUpError || !authData.user) {
      if (signUpError?.code === "user_already_exists") {
        return {
          success: false,
          error: "E-mail já cadastrado. Tente fazer login.",
        };
      }
      return {
        success: false,
        error: signUpError?.message ?? "Erro ao criar conta. Tente novamente.",
      };
    }

    const userId = authData.user.id;

    // Upload avatar using admin client (bypasses storage RLS)
    let avatarUrl: string | null = null;
    const photo = formData.get("photo") as File | null;
    if (photo && photo.size > 0) {
      const adminClient = createAdminClient();
      const ext = photo.name.split(".").pop() ?? "jpg";
      const bytes = await photo.arrayBuffer();
      const { data: storageData, error: storageError } = await adminClient.storage
        .from("avatars")
        .upload(`${userId}/avatar.${ext}`, bytes, {
          contentType: photo.type,
          upsert: true,
        });

      if (!storageError && storageData) {
        const { data: urlData } = adminClient.storage
          .from("avatars")
          .getPublicUrl(storageData.path);
        avatarUrl = urlData.publicUrl;
      }
    }

    const authorizedUser = await prisma.authorizedUser.findUnique({
      where: { cpf: result.data.cpf },
      select: { id: true },
    });

    if (!authorizedUser) {
      return { success: false, error: "Usuário autorizado não encontrado." };
    }

    await prisma.$transaction([
      prisma.profile.create({
        data: {
          id: userId,
          authorizedUserId: authorizedUser.id,
          cpf: result.data.cpf,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          avatarUrl,
        },
      }),
      prisma.authorizedUser.update({
        where: { cpf: result.data.cpf },
        data: { isRegistered: true },
      }),
    ]);

    return { success: true, data: { confirmed: !!authData.session } };
  } catch {
    return {
      success: false,
      error: "Erro ao finalizar cadastro. Tente novamente.",
    };
  }
}

// ─── Login ─────────────────────────────────────────────────────────────────────

/**
 * Accepts CPF or email + password and establishes a session.
 */
export async function loginAction(
  identifier: string,
  password: string,
): Promise<ActionResult> {
  try {
    let email: string;

    if (identifier.includes("@")) {
      email = identifier.trim();
    } else {
      const cpf = identifier.replace(/\D/g, "");
      const profile = await prisma.profile.findUnique({
        where: { cpf },
        select: { email: true },
      });
      if (!profile) {
        return { success: false, error: "CPF não encontrado." };
      }
      email = profile.email;
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: "CPF/e-mail ou senha inválidos." };
    }

    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Erro ao realizar login. Tente novamente." };
  }
}

// ─── Forgot Password ───────────────────────────────────────────────────────────

/**
 * Resolves CPF or email, then sends a password reset link via Supabase.
 */
export async function forgotPasswordAction(
  identifier: string,
): Promise<ActionResult> {
  const clean = identifier.trim();

  try {
    let email: string;

    if (clean.includes("@")) {
      const profile = await prisma.profile.findUnique({
        where: { email: clean },
        select: { email: true },
      });
      if (!profile) {
        return { success: false, error: "E-mail não encontrado." };
      }
      email = profile.email;
    } else {
      const cpf = clean.replace(/\D/g, "");
      const profile = await prisma.profile.findUnique({
        where: { cpf },
        select: { email: true },
      });
      if (!profile) {
        return { success: false, error: "CPF não encontrado." };
      }
      email = profile.email;
    }

    const headersList = await headers();
    const origin =
      headersList.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: "Erro ao enviar e-mail. Tente novamente.",
      };
    }

    return { success: true, data: undefined };
  } catch {
    return {
      success: false,
      error: "Erro ao processar solicitação. Tente novamente.",
    };
  }
}

// ─── Reset Password ────────────────────────────────────────────────────────────

/**
 * Updates the authenticated user's password after a reset flow.
 * The session must already be established via the /auth/callback route.
 */
export async function resetPasswordAction(
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = resetPasswordSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: result.data.password,
    });

    if (error) {
      return {
        success: false,
        error: "Erro ao atualizar senha. O link pode ter expirado.",
      };
    }

    return { success: true, data: undefined };
  } catch {
    return {
      success: false,
      error: "Erro ao atualizar senha. Tente novamente.",
    };
  }
}

// ─── Logout ────────────────────────────────────────────────────────────────────

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

