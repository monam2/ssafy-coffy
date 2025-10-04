import { LoginResDto } from "../api/dto";

export type LoginState = {
  ok: boolean;
  message?: string;
  data?: LoginResDto | null;
  fieldErrors?: Record<string, string[]>;
};
