/**
 * ============================================================
 * QUICK ACTIONS
 * ============================================================
 */

import { useNavigate } from "react-router-dom";

import {
  User,
  ShoppingBag,
  Heart,
  ShoppingCart,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

import useAuthStore from "../../store/auth.store";

const actions = [
  {
    title: "My Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "My Orders",
    icon: ShoppingBag,
    path: "/orders",
  },
  {
    title: "Wishlist",
    icon: Heart,
    path: "/wishlist",
  },
  {
    title: "Cart",
    icon: ShoppingCart,
    path: "/cart",
  },
  {
    title: "Addresses",
    icon: MapPin,
    path: "/addresses",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  async function handleLogout() {
    await logoutApi();

    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>

      <div className="p-4 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="flex w-full items-center gap-4 rounded-lg border p-3 transition hover:bg-slate-50"
            >
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Icon size={20} />
              </div>

              <span className="font-medium">{action.title}</span>
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-lg border border-red-200 p-3 text-red-600 transition hover:bg-red-50"
        >
          <div className="rounded-lg bg-red-100 p-2">
            <LogOut size={20} />
          </div>

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
