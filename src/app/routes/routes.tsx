import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "./Dashboard";
import Users from "./Users";
import UserDetail from "./UserDetail";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/users", element: <Users /> },
      { path: "/users/:id", element: <UserDetail /> },
    ],
  },
]);
