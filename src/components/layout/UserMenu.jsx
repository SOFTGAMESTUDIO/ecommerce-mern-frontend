/**
 * ============================================================
 * USER MENU
 * ============================================================
 */

import { useState, useRef, useEffect } from "react";

import {
  User,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import useAuthStore from "../../store/auth.store";

import { logout } from "../../api/auth.api";

function UserMenu() {

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  const {

    user,

    logout: logoutStore

  } = useAuthStore();

  /**
   * ============================================================
   * Outside Click
   * ============================================================
   */

  useEffect(() => {

    const handleClick = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>

      document.removeEventListener(
        "mousedown",
        handleClick
      );

  }, []);

  /**
   * ============================================================
   * Logout
   * ============================================================
   */

  const handleLogout = async () => {

    try {

      await logout();

    }

    catch (error) {

      console.log(error);

    }

    logoutStore();

    toast.success("Logged out successfully.");

    navigate("/login");

  };

  return (

    <div
      ref={menuRef}
      className="relative"
    >

      <button

        onClick={() =>
          setOpen(!open)
        }

        className="flex items-center gap-3"

      >

        <img

          src={
            user?.avatar ||

            "https://ui-avatars.com/api/?background=2563eb&color=fff&name=" +
            encodeURIComponent(user?.name || "User")
          }

          alt="avatar"

          className="w-10 h-10 rounded-full"

        />

        <div className="hidden md:block text-left">

          <h4 className="font-semibold">

            {user?.name}

          </h4>

          <p className="text-xs text-slate-500">

            {user?.role}

          </p>

        </div>

        <ChevronDown size={18} />

      </button>

      {

        open && (

          <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl border shadow-xl overflow-hidden z-50">

            <div className="px-5 py-4 border-b">

              <h3 className="font-semibold">

                {user?.name}

              </h3>

              <p className="text-sm text-slate-500">

                {user?.email}

              </p>

            </div>

            <Link

              to="/profile"

              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"

            >

              <User size={18} />

              Profile

            </Link>

            <Link

              to="/settings"

              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"

            >

              <Settings size={18} />

              Settings

            </Link>

            <button

              onClick={handleLogout}

              className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left"

            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        )

      }

    </div>

  );

}

export default UserMenu;