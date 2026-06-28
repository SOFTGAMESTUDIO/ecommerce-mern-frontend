/**
 * ============================================================
 * PROFILE CARD
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Calendar,
  BadgeCheck,
  ShieldCheck,
  ShieldOff,
  Pencil,
  AlertTriangle,
  RefreshCw,
  Lock,
} from "lucide-react";

import { toast } from "react-hot-toast";

import Button from "../ui/Button";

import { resendVerification } from "../../api/auth.api";

function ProfileCard({ profile }) {

  const navigate = useNavigate();

  const auth = profile?.auth || {};
  const user = profile?.profile || {};

  const [sending, setSending] = useState(false);

  const avatar =
    auth.googleAvatar ||
    auth.name?.charAt(0)?.toUpperCase();

  /**
   * Resend verification email from profile card
   */
  const handleVerifyEmail = async () => {
    if (!auth.email) return;

    try {
      setSending(true);
      await resendVerification({ email: auth.email });
      toast.success("Verification email sent! Check your inbox.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send verification email");
    } finally {
      setSending(false);
    }
  };

  return (

    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Profile</h2>
        <button
          onClick={() => navigate("/account")}
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium"
        >
          <Lock size={13} />
          Security
        </button>
      </div>

      <div className="p-6">

        {/* Avatar */}
        <div className="flex flex-col items-center">

          {auth.googleAvatar ? (
            <img
              src={auth.googleAvatar}
              alt={auth.name}
              className="h-24 w-24 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
              {avatar}
            </div>
          )}

          <h3 className="mt-4 text-xl font-semibold">
            {auth.name}
          </h3>

          <p className="text-sm text-slate-500">
            {auth.role || "Customer"}
          </p>

        </div>

        {/* Info */}
        <div className="mt-6 space-y-4 text-sm">

          <div className="flex items-center gap-3">
            <Mail size={18} className="text-blue-600" />
            <span className="text-slate-700">{auth.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} className="text-blue-600" />
            <span className="text-slate-700">{auth.phone || "Not Added"}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-blue-600" />
            <span className="text-slate-700">
              {user.dob
                ? new Date(user.dob).toLocaleDateString()
                : "Not Added"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <User size={18} className="text-blue-600" />
            <span className="text-slate-700">{user.gender || "Not Specified"}</span>
          </div>

        </div>

        {/* Status Badges */}
        <div className="mt-6 space-y-2">

          <div className={`flex items-center gap-2 ${user.isProfileCompleted ? "text-green-600" : "text-amber-600"}`}>
            <BadgeCheck size={18} />
            <span className="text-sm font-medium">
              {user.isProfileCompleted ? "Profile Completed" : "Profile Incomplete"}
            </span>
          </div>

          {/* Email Verification Status */}
          <div className={`flex items-center gap-2 ${auth.isEmailVerified ? "text-green-600" : "text-amber-600"}`}>
            {auth.isEmailVerified
              ? <ShieldCheck size={18} />
              : <AlertTriangle size={18} />
            }
            <span className="text-sm font-medium">
              {auth.isEmailVerified ? "Email Verified" : "Email Not Verified"}
            </span>
          </div>

          {/* 2FA Status */}
          <div className={`flex items-center gap-2 ${auth.isTwoFactorEnabled ? "text-blue-600" : "text-slate-400"}`}>
            {auth.isTwoFactorEnabled
              ? <ShieldCheck size={18} />
              : <ShieldOff size={18} />
            }
            <span className="text-sm font-medium">
              2FA {auth.isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-6 space-y-2">

          {/* Verify Email button if not verified */}
          {!auth.isEmailVerified && (
            <button
              onClick={handleVerifyEmail}
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-50 border border-amber-200 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
            >
              <RefreshCw size={15} className={sending ? "animate-spin" : ""} />
              {sending ? "Sending..." : "Send Verification Email"}
            </button>
          )}

          {/* Edit Profile */}
          <Button
            fullWidth
            onClick={() => navigate("/profile")}
          >
            <Pencil size={18} className="mr-2" />
            Edit Profile
          </Button>

          {/* Manage Security */}
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate("/account")}
          >
            <ShieldCheck size={18} className="mr-2" />
            Manage Security
          </Button>

        </div>

      </div>

    </div>

  );

}

export default ProfileCard;
