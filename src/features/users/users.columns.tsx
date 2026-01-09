import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../app/types/user"; // adjust path to your actual User type
import { formatDate } from "../../app/lib/formatDate";

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
  {
    header: "Created",
    accessorKey: "createdAt",
    cell: ({ getValue }) => formatDate(getValue<string>(), { withTime: true }),
  },
  {
    header: "Last active",
    accessorKey: "lastActiveAt",
    cell: ({ getValue }) =>
      formatDate(getValue<string | null>(), { withTime: true }),
  },
];
