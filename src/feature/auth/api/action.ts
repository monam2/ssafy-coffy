"use server";

import { cookies } from "next/headers";
import { login, logout } from "./service";
import { hashPassword } from "@/shared/lib/crypto";

import { LoginState } from "../model/types";
import { loginSchema } from "../model/schema";

export const loginAction = async (
  _: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  // 유효성 검증
  const { success, error } = loginSchema.safeParse({ name, email, password });
  if (!success) {
    const { fieldErrors } = error.flatten();
    return { ok: false, fieldErrors };
  }

  // 로그인
  const hashedPassword = await hashPassword(password);
  const { data, error: loginError } = await login({
    name,
    email,
    password: hashedPassword,
  });

  if (loginError) return { ok: false, message: loginError.message };

  const userSnapshot = {
    id: data.id,
    email: data.email ?? "",
    name: data.name ?? "",
    role: data.role ?? "",
    updatedAt: data.updated_at ?? "",
  };
  try {
    const cookieStore = await cookies();
    cookieStore.set("auth_user", JSON.stringify(userSnapshot), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: true,
    });
  } catch {}

  return {
    ok: true,
    data: userSnapshot,
  };
};

export const logoutAction = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_user");

  const response = await logout();
  if (response.error) throw new Error(response.error.message);

  return;
};
