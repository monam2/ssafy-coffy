import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.email({ message: "올바른 이메일을 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
