/**
 * ============================================================
 * SIDEBAR
 * ============================================================
 */

import { NavLink } from "react-router-dom";
import navigation from "../../config/navigation";

import {
  LayoutDashboard,
  User,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-72 h-screen bg-white border-r flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-xl">
        SGS Commerce
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path}>
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
