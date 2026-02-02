import { users } from "../../app/mocks/users";
import type { User } from "./users.types";

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise(r => setTimeout(r, 600));
  return users;
};
