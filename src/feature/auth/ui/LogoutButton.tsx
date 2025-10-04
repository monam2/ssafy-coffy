"use client";

import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { loginUserAtom } from "@/entities/user/model/atom";
import { logoutAction } from "@/feature/auth/api/action";
import { Button } from "@/shared/ui";

const LogoutButton = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const setUser = useSetAtom(loginUserAtom);
  const [state, formAction] = useActionState(logoutAction, null);

  useEffect(() => {
    if (state) {
      setUser(null);
      onSuccess?.(); // 팝오버 닫기
      router.replace("/login");
    }
  }, [state, setUser, onSuccess, router]);

  return (
    <form action={formAction}>
      <SubmitButton>
        <LuLogOut className="w-4 h-4" />
      </SubmitButton>
    </form>
  );
};

export default LogoutButton;

function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      size="sm"
      type="submit"
      disabled={disabled || pending}
      className="dark:bg-gray-200 dark:text-gray-500 border-none"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </Button>
  );
}
