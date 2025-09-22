import { cookies } from "next/headers";
import { LoginUser } from "@/entities/user/model/atom";

export const setUserSnapshot = async (user: LoginUser) => {
  const cookieStore = await cookies();
  cookieStore.set("auth_user", JSON.stringify(user), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    secure: true,
  });
};

export const getUserSnapshot = async (key: string) => {
  const cookieStore = await cookies();
  const snapShot = cookieStore.get(key)?.value;
  return snapShot ? JSON.parse(snapShot) : null;
};
