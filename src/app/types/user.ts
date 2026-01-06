export type UserStatus = "active" | "suspended" | "pending";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "support";
  status: UserStatus;
  createdAt: string;
  lastActiveAt: string | null;
}
