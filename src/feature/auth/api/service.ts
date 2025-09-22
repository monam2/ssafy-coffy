import { getServerClient } from "@/shared/config/supabase/server";

import { LoginReqDto } from "./dto";

export async function login(params: LoginReqDto) {
  const supabase = await getServerClient();
  return await supabase
    .schema("public")
    .from("users")
    .upsert(params, { onConflict: "email" }) // email 중복 시 업데이트
    .select("id, email, name, role, updated_at")
    .single();
}

export async function logout() {
  const supabase = await getServerClient();
  return await supabase.auth.signOut();
}
