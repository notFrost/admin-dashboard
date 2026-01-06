import { users } from "../mocks/users";
import type { User } from "../types/user";

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise(r => setTimeout(r, 600));
  return users;
};
