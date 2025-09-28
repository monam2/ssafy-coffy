import { User } from "@/entities/user/model/types";
import { LoginReqDto, LoginResDto } from "@/feature/auth/api/dto";

import { hashPassword } from "@/shared/lib/auth/crypto";
import { getServerClient } from "@/shared/config/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/** 유저 조회
 * @param email 이메일
 * @returns 유저 정보 or null
 * @description 이메일로 유저 정보를 조회합니다. 결과가 없다면 createUser 진행
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const supabase = await getServerClient();

  const normalizedEmail = email.trim().toLowerCase();
  const { data, error } = await supabase
    .schema("public")
    .from("users")
    .select("id, email, name, role, updated_at")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ?? null;
};

/**
 * 유저 생성
 * @param params
 * @returns 유저 정보(id, email, name, role, updated_at)
 * @description 유저 정보를 생성, 비밀번호는 단방향 해시 적용
 */
export const createUser = async (params: LoginReqDto): Promise<User> => {
  const supabase = await getServerClient();

  const hashedPassword = await hashPassword(params.password);
  const newUser = {
    id: crypto.randomUUID(),
    name: params.name,
    email: params.email,
    password: hashedPassword,
    role: "USER",
  };

  const { data, error } = await supabase
    .schema("public")
    .from("users")
    .insert(newUser)
    .select("id, email, name, role, updated_at")
    .single();

  if (error) {
    throw error;
  }

  return data;
};
