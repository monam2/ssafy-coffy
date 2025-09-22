"use client";

import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { loginUserAtom, LoginUser } from "./atom";

interface AuthHydratorProps {
  initialUser: LoginUser;
  children?: React.ReactNode;
}

const AuthHydrator = ({ initialUser, children }: AuthHydratorProps) => {
  const setUser = useSetAtom(loginUserAtom);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(initialUser);
    setHydrated(true);
  }, [initialUser, setUser]);

  if (!hydrated) return null;

  return <>{children}</>;
};

export default AuthHydrator;
