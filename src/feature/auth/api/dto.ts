import { z } from "zod";

import { loginSchema } from "@/feature/auth/model/schema";

export type LoginReqDto = z.infer<typeof loginSchema>;

export const loginResDtoSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  updatedAt: z.string(),
});

export type LoginResDto = z.infer<typeof loginResDtoSchema>;

export type LogoutReqDto = void;
export type LogoutResDto = { ok: true } | { ok: false; message?: string };
