import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import { useUsers } from "../../features/users/useUsers";
import { userColumns } from "../../features/users/users.columns";
import { getPaginationRowModel } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import {
  TableSkeleton,
  EmptyState,
  ErrorState,
} from "../../features/ui/TableStates";
import type { User } from "../types/user";

export default function Users() {
  const { data, isLoading, error } = useUsers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "all" | "active" | "pending" | "suspended"
  >("all");
  const [role, setRole] = useState<"all" | "admin" | "support" | "user">("all");

  const hasActiveFilters =
    search.trim().length > 0 || status !== "all" || role !== "all";

  const navigate = useNavigate();

  const columns = useMemo(() => userColumns, []);

  const rows = data ?? [];

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((u) => {
      const name = (u.name ?? "").toLowerCase();
      const email = (u.email ?? "").toLowerCase();

      const matchesSearch = !q || name.includes(q) || email.includes(q);
      const matchesStatus = status === "all" || u.status === status;
      const matchesRole = role === "all" || u.role === role;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [rows, search, status, role]);

  console.log(filteredRows[0]);
  const table = useReactTable({
    data: filteredRows,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  useEffect(() => {
    const pageCount = Math.max(
      1,
      Math.ceil(filteredRows.length / pagination.pageSize)
    );
    const maxPageIndex = pageCount - 1;

    if (pagination.pageIndex > maxPageIndex) {
      setPagination((p) => ({ ...p, pageIndex: maxPageIndex }));
    }
  }, [filteredRows.length, pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-end gap-3">
        <div className="w-full max-w-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
        <div className="w-40">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="support">Support</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="w-44">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <button
          type="button"
          disabled={!hasActiveFilters}
          onClick={() => {
            setSearch("");
            setStatus("all");
            setRole("all");
          }}
          className={`
    inline-flex items-center justify-center
    rounded-lg border px-3 py-2 text-sm
    transition
    ${
      hasActiveFilters
        ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
    }
  `}
        >
          Clear
        </button>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <ErrorState />
      ) : filteredRows.length === 0 ? (
        <EmptyState
          title={
            hasActiveFilters ? "No users match your filters" : "No users found"
          }
          message={
            hasActiveFilters
              ? "Try changing role, status, or search."
              : "Check back later."
          }
        />
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[900px]">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => {
                      const canSort = header.column.getCanSort();
                      const sortDir = header.column.getIsSorted();

                      return (
                        <th
                          key={header.id}
                          className={`px-4 py-3 ${
                            canSort ? "cursor-pointer select-none" : ""
                          }`}
                          onClick={
                            canSort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {sortDir === "asc" && <span>▲</span>}
                            {sortDir === "desc" && <span>▼</span>}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody className="divide-y divide-gray-200">
                {table.getPaginationRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => navigate(`/users/${row.original.id}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-gray-700">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
            <span className="text-gray-500">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <p className="text-sm text-gray-500">
              Showing {filteredRows.length} user
              {filteredRows.length === 1 ? "" : "s"}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
