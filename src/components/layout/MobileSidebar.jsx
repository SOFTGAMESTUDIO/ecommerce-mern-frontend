/**
 * ============================================================
 * MOBILE SIDEBAR
 * ============================================================
 */

import { X } from "lucide-react";

import { NavLink } from "react-router-dom";
import navigation from "../../config/navigation";

import {
  LayoutDashboard,
  User,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";

function MobileSidebar({
  open,

  onClose,
}) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />

      <aside className="fixed left-0 top-0 h-screen w-72 bg-white z-50 shadow-xl">
        <div className="h-16 flex items-center justify-between px-5 border-b">
          <h2 className="font-bold text-xl">SGS Commerce</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2">
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
    </>
  );
}

export default MobileSidebar;
