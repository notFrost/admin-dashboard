import { useMemo, useState } from "react";
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

function TableSkeleton() {
  return <div>TableSkeleton</div>;
}
function ErrorState() {
  return <div>ErrorState</div>;
}
function EmptyState() {
  return <div>EmptyState</div>;
}

export default function Users() {
  const { data, isLoading, error } = useUsers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const columns = useMemo(() => userColumns, []);

  const rows = data ?? [];

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <TableSkeleton />;
  if (error) return <ErrorState />;
  if (!rows.length) return <EmptyState />;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500">Manage users and statuses</p>
      </div>

      <div className="overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white">
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => navigate(`/users/${row.original.id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
          <span className="text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

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
    </div>
  );
}
