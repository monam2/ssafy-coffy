import { DateString } from "@/shared/types";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  isActive?: boolean;
  discordWebhookUrl?: string;
  createdAt?: DateString;
  updatedAt?: DateString;
};
