import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../features/users/useUsers";
import { formatDate } from "../lib/formatDate";
import { TableSkeleton, ErrorState } from "../../features/ui/TableStates";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        map[status] ?? "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <TableSkeleton />;
  if (error) return <ErrorState />;

  const user = data?.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">User not found</h1>
        <button
          onClick={() => navigate("/users")}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <button
          onClick={() => navigate("/users")}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Role</p>
          <div className="mt-2">
            <Pill>{user.role}</Pill>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Status</p>
          <div className="mt-2">
            <StatusPill status={user.status} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Created at</p>
          <p className="mt-2 text-sm text-gray-900">
            {formatDate(user.createdAt, { withTime: true })}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Last active</p>
          <p className="mt-2 text-sm text-gray-900">
            {formatDate(user.lastActiveAt, { withTime: true })}
          </p>
        </div>
      </div>

      {/* Activity (mock, intentional) */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3">
          <p className="text-sm font-medium text-gray-900">Recent activity</p>
        </div>

        <ul className="divide-y divide-gray-200 text-sm">
          <li className="px-4 py-3 text-gray-700">Account created</li>
          <li className="px-4 py-3 text-gray-700">Profile viewed</li>
          <li className="px-4 py-3 text-gray-700">Status checked</li>
        </ul>
      </div>
    </div>
  );
}
