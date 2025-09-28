import { LoginReqDto } from "@/feature/auth/api/dto";

import { hashPassword } from "@/shared/lib/auth/crypto";
import { getServerClient } from "@/shared/config/supabase/server";

/** 유저 조회
 * @param email 이메일
 * @returns 유저 정보
 * @description 이메일로 유저 정보를 조회합니다. 결과가 없다면 createUser 진행
 */
export const findUserByEmail = async (email: string) => {
  const supabase = await getServerClient();

  const { data } = await supabase
    .schema("public")
    .from("users")
    .select("id, email, name, role, updated_at")
    .eq("email", email)
    .maybeSingle();
  return data;
};

/**
 * 유저 생성
 * @param params
 * @returns 유저 정보(이름, 이메일, 비밀번호)
 * @description 유저 정보를 생성, 비밀번호는 단방향 암호화
 */
export const createUser = async (params: LoginReqDto) => {
  const supabase = await getServerClient();

  const hashedPassword = await hashPassword(params.password);
  const newUser = {
    id: crypto.randomUUID(),
    name: params.name,
    email: params.email,
    password: hashedPassword,
    role: "USER",
  };

  const { data } = await supabase
    .schema("public")
    .from("users")
    .insert(newUser)
    .select("id, email, name, role, updated_at")
    .single();

  return data;
};
