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
  const columns = useMemo(() => userColumns, []);

  const rows = data ?? [];

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
