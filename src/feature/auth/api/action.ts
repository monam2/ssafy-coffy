"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginResDto } from "@/feature/auth/api/dto";
import { loginSchema } from "@/feature/auth/model/schema";
import { LoginState } from "@/feature/auth/model/types";
import { findUserByEmail, createUser } from "@/feature/auth/api/service";
import { setUserSnapshot } from "@/shared/lib/auth/session";

const COOKIE_NAME = "auth_user";

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
  const parsed = loginSchema.safeParse({ name, email, password });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // 기존 사용자 조회
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    // 유저 생성
    const created = await createUser({
      name,
      email,
      password,
    });

    if (!created)
      return {
        ok: false,
        message: "사용자 생성 실패",
      };

    const safeUser: LoginResDto = {
      id: String(created.id),
      email: String(created.email),
      name: String(created.name),
      role: String(created.role ?? "USER"),
      updatedAt: String(created.updated_at ?? new Date().toISOString()),
    };

    try {
      await setUserSnapshot(COOKIE_NAME, safeUser);
    } catch {
      return { ok: false, message: "사용자 정보 저장 실패" };
    }

    return { ok: true, data: safeUser };
  }

  const safeUser: LoginResDto = {
    id: String(existingUser.id),
    email: String(existingUser.email),
    name: String(existingUser.name),
    role: String(existingUser.role ?? "USER"),
    updatedAt: String(existingUser.updated_at ?? new Date().toISOString()),
  };

  try {
    await setUserSnapshot(COOKIE_NAME, safeUser);
  } catch {
    return { ok: false, message: "사용자 정보 저장 실패" };
  }

  return { ok: true, data: safeUser };
};

export const logoutAction = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
};
