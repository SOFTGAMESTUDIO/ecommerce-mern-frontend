/**
 * ============================================================
 * AUTH LAYOUT
 * ============================================================
 *
 * Purpose:
 * --------
 * Shared layout for all authentication pages.
 *
 * Used By:
 * --------
 * ✓ Login
 * ✓ Register
 * ✓ Forgot Password
 * ✓ Reset Password
 * ✓ Verify Email
 * ✓ Verify OTP
 *
 * ============================================================
 */

import { Outlet } from "react-router-dom";

import {
  ShieldCheck,
  ShoppingBag,
  Truck,
  CreditCard
} from "lucide-react";

function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      {/* ======================================================
          Left Side
      ====================================================== */}

      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white p-14">

        <div>

          <h1 className="text-4xl font-bold">
            Soft Game Studio
          </h1>

          <p className="mt-4 text-lg opacity-90">
            Production Ready MERN E-Commerce Template
          </p>

        </div>

        <div className="space-y-8">

          <div className="flex items-center gap-4">

            <ShoppingBag size={28} />

            <div>

              <h3 className="font-semibold">
                Complete Store
              </h3>

              <p className="opacity-80">
                Products, Orders, Cart & Wishlist
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <ShieldCheck size={28} />

            <div>

              <h3 className="font-semibold">
                Secure Authentication
              </h3>

              <p className="opacity-80">
                JWT, Email Verification & OTP
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Truck size={28} />

            <div>

              <h3 className="font-semibold">
                Fast Delivery
              </h3>

              <p className="opacity-80">
                Order Tracking & Shipping
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <CreditCard size={28} />

            <div>

              <h3 className="font-semibold">
                Secure Payments
              </h3>

              <p className="opacity-80">
                Razorpay, Stripe & PayPal Ready
              </p>

            </div>

          </div>

        </div>

        <div className="text-sm opacity-70">
          © {new Date().getFullYear()} Soft Game Studio
        </div>

      </div>

      {/* ======================================================
          Right Side
      ====================================================== */}

      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;