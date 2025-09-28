import { cookies } from "next/headers";
import { LoginUser } from "@/entities/user/model/atom";

export const setUserSnapshot = async (key: string, user: LoginUser) => {
  const cookieStore = await cookies();
  cookieStore.set(key, JSON.stringify(user), {
    httpOnly: true,
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
