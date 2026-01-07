import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../app/lib/api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
