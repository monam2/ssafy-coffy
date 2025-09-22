import { atom } from "jotai";

import { DateString } from "@/shared/types";

export type LoginUser = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  discordWebhookUrl?: string;
  createdAt?: DateString;
  updatedAt?: DateString;
} | null;

export const loginUserAtom = atom<LoginUser>(null);
