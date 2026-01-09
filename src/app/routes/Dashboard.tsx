import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../features/users/useUsers";
import {
  TableSkeleton,
  ErrorState,
  EmptyState,
} from "../../features/ui/TableStates";

type ActivityStatus = "completed" | "pending" | "failed";

type ActivityItem = {
  id: string;
  userName: string;
  action: string;
  timeLabel: string;
  status: ActivityStatus;
};

function formatPercent(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

function StatCard({
  title,
  value,
  deltaPct,
  icon,
}: {
  title: string;
  value: string;
  deltaPct: number;
  icon?: React.ReactNode;
}) {
  const isPositive = deltaPct >= 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-700">{title}</p>
        {icon ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-gray-600">
            {icon}
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>

      <p className="mt-2 text-sm text-gray-500">
        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {formatPercent(deltaPct)}
        </span>{" "}
        from last month
      </p>
    </div>
  );
}

function ActivityStatusPill({ status }: { status: ActivityStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";

  if (status === "completed")
    return <span className={`${base} bg-gray-900 text-white`}>completed</span>;
  if (status === "pending")
    return <span className={`${base} bg-gray-100 text-gray-700`}>pending</span>;
  return <span className={`${base} bg-red-600 text-white`}>failed</span>;
}

export default function Dashboard() {
  const { data, isLoading, error } = useUsers();
  const navigate = useNavigate();

  const users = data ?? [];

  const metrics = useMemo(() => {
    const totalUsers = users.length;

    const activeUsers = users.filter((u) => u.status === "active").length;
    const pendingUsers = users.filter((u) => u.status === "pending").length;
    const suspendedUsers = users.filter((u) => u.status === "suspended").length;

    // These deltas are mock signals (deterministic-ish), just to look alive.
    // Keeps the dashboard "intentional" without inventing backend logic.
    const deltaTotal = totalUsers ? ((totalUsers % 17) - 8) * 1.7 : 0; // approx [-13.6..+13.6]
    const deltaActive = activeUsers ? ((activeUsers % 11) - 5) * 1.3 : 0;
    const deltaPending = pendingUsers
      ? -Math.abs(((pendingUsers % 9) - 4) * 1.4)
      : -2.1;
    const deltaResolved = activeUsers
      ? Math.abs(((activeUsers % 13) - 6) * 1.9)
      : 7.2;

    return {
      totalUsers,
      activeUsers,
      pendingUsers,
      suspendedUsers,
      deltaTotal,
      deltaActive,
      deltaPending,
      deltaResolved,
    };
  }, [users]);

  const recentActivity: ActivityItem[] = useMemo(() => {
    const actions = [
      "Updated profile",
      "Created new account",
      "Password reset",
      "Updated permissions",
      "Login failed",
    ] as const;
    const times = [
      "2 minutes ago",
      "15 minutes ago",
      "1 hour ago",
      "2 hours ago",
      "3 hours ago",
    ] as const;
    const statuses: ActivityStatus[] = [
      "completed",
      "completed",
      "pending",
      "completed",
      "failed",
    ];

    // Use the first 5 users as the "actors" if available
    const actors = users.slice(0, 5);

    return Array.from({ length: 5 }).map((_, i) => {
      const u = actors[i];
      return {
        id: u?.id ?? `activity_${i}`,
        userName:
          u?.name ??
          [
            "John Smith",
            "Sarah Johnson",
            "Michael Chen",
            "Emily Davis",
            "Robert Wilson",
          ][i],
        action: actions[i],
        timeLabel: times[i],
        status: statuses[i],
      };
    });
  }, [users]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of key metrics and recent activity
        </p>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <ErrorState />
      ) : users.length === 0 ? (
        <EmptyState
          title="No data yet"
          message="Once users exist, metrics will show here."
        />
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Users"
              value={metrics.totalUsers.toLocaleString()}
              deltaPct={metrics.deltaTotal}
            />
            <StatCard
              title="Active Sessions"
              value={metrics.activeUsers.toLocaleString()}
              deltaPct={metrics.deltaActive}
            />
            <StatCard
              title="Pending Issues"
              value={metrics.pendingUsers.toLocaleString()}
              deltaPct={metrics.deltaPending}
            />
            <StatCard
              title="Resolved Today"
              value={Math.max(
                0,
                metrics.activeUsers - metrics.pendingUsers
              ).toLocaleString()}
              deltaPct={metrics.deltaResolved}
            />
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Recent Activity
              </p>
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View users
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {recentActivity.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate("/users")}
                    >
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {item.userName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.action}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {item.timeLabel}
                      </td>
                      <td className="px-4 py-3">
                        <ActivityStatusPill status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
