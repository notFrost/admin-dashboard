import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  url: string;
  icon: ReactElement;
  end?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    url: "/",
    end: true,
    icon: <DashboardOutlinedIcon className="w-5 h-5" />,
  },
  {
    name: "Users",
    url: "/users",
    icon: <PeopleOutlinedIcon className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  return (
    <aside className="h-full w-64 shrink-0 bg-slate-50 border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Admin Portal</h1>
      </div>

      <nav className="px-4 py-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.url}>
              <NavLink
                to={item.url}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors border",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium border-blue-200"
                      : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-gray-200",
                  ].join(" ")
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
