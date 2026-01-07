import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../app/types/user"; // adjust path to your actual User type

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "createdAt", header: "Created" },
  {
    accessorKey: "lastActiveAt",
    header: "Last active",
    cell: ({ getValue }) => getValue<string | null>() ?? "Never",
  },
];
