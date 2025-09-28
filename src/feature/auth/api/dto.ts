import { z } from "zod";

import { loginSchema } from "@/feature/auth/model/schema";

export const loginResDtoSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  updatedAt: z.string(),
});

export type LoginReqDto = z.infer<typeof loginSchema>;
export type LoginResDto = z.infer<typeof loginResDtoSchema>;
