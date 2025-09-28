"use client";

import { useSetAtom } from "jotai";
import { loginAction } from "../api/action";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useActionState } from "react";
import { LoginUser, loginUserAtom } from "@/entities/user/model/atom";

import { Loader2 } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { LoginState } from "@/feature/auth/model/types";

const initialState: LoginState = { ok: false };

const LoginForm = ({ header }: { header: React.ReactNode }) => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUser = useSetAtom(loginUserAtom);
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (state?.fieldErrors?.email?.length) emailRef.current?.focus();
    else if (state?.fieldErrors?.password?.length) passwordRef.current?.focus();

    if (state?.ok) {
      setUser(state?.data as LoginUser);
      router.replace("/menu");
    }
  }, [state, router, setUser]);

  const nameInvalid = !!state?.fieldErrors?.name?.length;
  const emailInvalid = !!state?.fieldErrors?.email?.length;
  const passwordInvalid = !!state?.fieldErrors?.password?.length;

  return (
    <>
      {header}
      <form action={formAction} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 w-[220px]">
          <Input
            ref={nameRef}
            name="name"
            type="text"
            placeholder="이름"
            aria-invalid={nameInvalid}
            className={`w-full text-center ${
              nameInvalid ? "focus:ring-red-500" : ""
            }`}
          />
          {nameInvalid && (
            <p className="text-red-500 text-sm mt-1">
              {state?.fieldErrors?.name?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 w-[220px]">
          <Input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="이메일"
            aria-invalid={emailInvalid}
            className={`w-full text-center ${
              emailInvalid ? "focus:ring-red-500" : ""
            }`}
          />
          {emailInvalid && (
            <p className="text-red-500 text-sm mt-1">
              {state?.fieldErrors?.email?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-[220px]">
          <Input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="비밀번호"
            aria-invalid={passwordInvalid}
            className={`w-full text-center ${
              passwordInvalid ? "focus:ring-red-500" : ""
            }`}
          />
          {passwordInvalid && (
            <p className="text-red-500 text-sm mt-1">
              {state?.fieldErrors?.password?.[0]}
            </p>
          )}
          {state?.message && (
            <p className="text-red-500 text-sm">{state?.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {!isPending ? "로그인" : <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
