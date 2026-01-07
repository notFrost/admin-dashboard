import { useParams } from "react-router-dom";
import { users } from "../mocks/users";
import type { User } from "../types/user";

export default function UserDetail() {
  const { id } = useParams();
  const user = users.find((u: User) => u.id === id);

  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{user.name}</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Role:</strong> {user.role}
        </div>
        <div>
          <strong>Status:</strong> {user.status}
        </div>
        <div>
          <strong>Created:</strong> {user.createdAt}
        </div>
      </div>
    </div>
  );
}
