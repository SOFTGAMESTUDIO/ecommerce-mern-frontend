/**
 * ============================================================
 * WELCOME CARD
 * ============================================================
 */

import { useNavigate } from "react-router-dom";

import {
  Calendar,
  Mail,
  Phone,
  ShieldCheck,
  ShieldOff,
  AlertTriangle,
  Lock,
} from "lucide-react";

function WelcomeCard({ user }) {

  const navigate = useNavigate();

  const avatar =
    user?.displayAvatar ||
    user?.googleAvatar ||
    user?.name?.charAt(0)?.toUpperCase();

  const isEmailVerified = user?.isEmailVerified;
  const isTwoFaEnabled = user?.isTwoFactorEnabled;

  return (

    <div className="rounded-2xl bg-white shadow-sm border overflow-hidden">

      {/* Email not verified — alert banner */}
      {!isEmailVerified && (
        <div
          onClick={() => navigate("/account")}
          className="flex items-center gap-3 px-6 py-3 bg-amber-50 border-b border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
        >
          <AlertTriangle size={18} className="text-amber-600 shrink-0" />
          <p className="text-sm text-amber-700 font-medium">
            Your email is not verified.{" "}
            <span className="underline font-semibold">Click here to verify →</span>
          </p>
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-5">

            {/* Avatar */}
            {user?.googleAvatar ? (
              <img
                src={user.googleAvatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                {avatar}
              </div>
            )}

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                Welcome, {user?.name} 👋
              </h1>

              <p className="text-slate-500 mt-1">
                Glad to see you again.
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-600">

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {user?.email}
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {user?.phone || "Not Added"}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Joined{" "}
                  {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

              </div>

            </div>

          </div>

          {/* Status Badges */}
          <div className="grid gap-3">

            {/* Email Verified */}
            <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
              isEmailVerified
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {isEmailVerified
                ? <ShieldCheck size={18} />
                : <AlertTriangle size={18} />
              }
              {isEmailVerified ? "Email Verified" : "Email Not Verified"}
            </div>

            {/* Profile Completed */}
            <div className="rounded-lg bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
              Profile{" "}
              {user?.isProfileCompleted ? "Completed" : "Incomplete"}
            </div>

            {/* 2FA Status */}
            <div
              onClick={() => navigate("/account")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
                isTwoFaEnabled
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              title="Manage in Account Security"
            >
              {isTwoFaEnabled
                ? <><Lock size={16} /> 2FA Enabled</>
                : <><ShieldOff size={16} /> 2FA Disabled</>
              }
            </div>

            {/* Role */}
            <div className="rounded-lg bg-slate-100 text-slate-600 px-4 py-2 text-sm font-medium">
              Role • {user?.role || "Customer"}
            </div>

          </div>

        </div>
      </div>

    </div>

  );

}

export default WelcomeCard;
