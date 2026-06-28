/**
 * ============================================================
 * ACCOUNT SECURITY PAGE
 * ============================================================
 *
 * Shows user account details and two key security options:
 *  1. Email Verification status + action
 *  2. Two-Step Verification toggle (enable / disable 2FA)
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  ShieldOff,
  Mail,
  MailCheck,
  User,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RefreshCw,
  Lock,
  Unlock,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import { getProfile } from "../../api/user.api";
import { resendVerification, toggleTwoFactor } from "../../api/auth.api";
import useAuthStore from "../../store/auth.store";

function Account() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [auth, setAuth] = useState(null);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [twoFaLoading, setTwoFaLoading] = useState(false);

  /**
   * ============================================================
   * Load Profile Data
   * ============================================================
   */
  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCooldown]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getProfile();
      setAuth(data.data.auth);
      setProfile(data.data.profile);
    } catch (err) {
      toast.error("Failed to load account details");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================
   * Resend Verification Email
   * ============================================================
   */
  const handleResendVerification = async () => {
    if (!auth?.email) return;

    try {
      setResendLoading(true);
      await resendVerification({ email: auth.email });
      toast.success("Verification email sent! Check your inbox.");
      setResendCooldown(60);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send verification email");
    } finally {
      setResendLoading(false);
    }
  };

  /**
   * ============================================================
   * Toggle Two-Factor Authentication
   * ============================================================
   */
  const handleToggle2FA = async () => {
    const newState = !auth?.isTwoFactorEnabled;

    try {
      setTwoFaLoading(true);
      const { data } = await toggleTwoFactor({ enable: newState });

      // Update local state
      setAuth((prev) => ({ ...prev, isTwoFactorEnabled: data.data.isTwoFactorEnabled }));
      updateUser({ isTwoFactorEnabled: data.data.isTwoFactorEnabled });

      toast.success(data.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update 2FA setting");
    } finally {
      setTwoFaLoading(false);
    }
  };

  /**
   * ============================================================
   * Loading Skeleton
   * ============================================================
   */
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border bg-white shadow-sm p-6 animate-pulse space-y-4">
            <div className="h-5 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-100 rounded w-2/3" />
            <div className="h-10 bg-slate-100 rounded-xl w-40" />
          </div>
        ))}
      </div>
    );
  }

  const isEmailVerified = auth?.isEmailVerified;
  const isTwoFaEnabled = auth?.isTwoFactorEnabled;

  const avatar =
    auth?.googleAvatar ||
    auth?.name?.charAt(0)?.toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Account Security</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your email verification and two-step login security.
        </p>
      </div>

      {/* ======================================================
          Profile Summary Card
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-20 relative" />

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-5">
            {auth?.googleAvatar ? (
              <img
                src={auth.googleAvatar}
                alt={auth.name}
                className="w-20 h-20 rounded-2xl border-4 border-white object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl border-4 border-white bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {avatar}
              </div>
            )}
            <div className="pb-1">
              <h2 className="text-xl font-bold text-slate-800">{auth?.name}</h2>
              <span className="text-xs bg-slate-100 text-slate-600 rounded-full px-3 py-1 font-medium">
                {auth?.role || "Customer"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Mail size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="font-medium text-slate-700">{auth?.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Phone size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Phone</p>
                <p className="font-medium text-slate-700">{auth?.phone || "Not Added"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Member Since</p>
                <p className="font-medium text-slate-700">
                  {auth?.createdAt
                    ? new Date(auth.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <BadgeCheck size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Profile Status</p>
                <p className="font-medium text-slate-700">
                  {profile?.isProfileCompleted ? "Complete" : "Incomplete"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          Option 1 — Email Verification
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      >
        <div className="flex items-center gap-4 p-6 border-b">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isEmailVerified ? "bg-green-100" : "bg-amber-100"
          }`}>
            {isEmailVerified
              ? <MailCheck size={24} className="text-green-600" />
              : <Mail size={24} className="text-amber-600" />
            }
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">Email Verification</h3>
            <p className="text-sm text-slate-500">
              Verify your email to secure your account
            </p>
          </div>
          {/* Status badge */}
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
            isEmailVerified
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}>
            {isEmailVerified
              ? <><CheckCircle2 size={13} /> Verified</>
              : <><AlertTriangle size={13} /> Not Verified</>
            }
          </span>
        </div>

        <div className="p-6">
          {isEmailVerified ? (
            <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-xl p-4">
              <CheckCircle2 size={22} className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Your email is verified</p>
                <p className="text-sm text-green-600 mt-1">
                  <span className="font-semibold">{auth?.email}</span> has been
                  verified. Your account is fully secured.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <AlertTriangle size={22} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Email not verified</p>
                  <p className="text-sm text-amber-600 mt-1">
                    Please verify <span className="font-semibold">{auth?.email}</span>.
                    Without verification you may not be able to log in or recover your account.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResendVerification}
                disabled={resendLoading || resendCooldown > 0}
                className={`
                  flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm
                  transition-all duration-200
                  ${resendCooldown > 0 || resendLoading
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md"
                  }
                `}
              >
                <RefreshCw size={16} className={resendLoading ? "animate-spin" : ""} />
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : resendLoading
                  ? "Sending..."
                  : "Send Verification Email"}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* ======================================================
          Option 2 — Two-Step Verification Toggle
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      >
        <div className="flex items-center gap-4 p-6 border-b">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isTwoFaEnabled ? "bg-blue-100" : "bg-slate-100"
          }`}>
            {isTwoFaEnabled
              ? <ShieldCheck size={24} className="text-blue-600" />
              : <ShieldOff size={24} className="text-slate-500" />
            }
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">Two-Step Verification</h3>
            <p className="text-sm text-slate-500">
              Require an OTP code after password at login
            </p>
          </div>
          {/* Status badge */}
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
            isTwoFaEnabled
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-600"
          }`}>
            {isTwoFaEnabled
              ? <><Lock size={12} /> Enabled</>
              : <><Unlock size={12} /> Disabled</>
            }
          </span>
        </div>

        <div className="p-6 space-y-5">

          {/* Description */}
          <div className={`rounded-xl p-4 border text-sm ${
            isTwoFaEnabled
              ? "bg-blue-50 border-blue-200"
              : "bg-slate-50 border-slate-200"
          }`}>
            {isTwoFaEnabled ? (
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">2-Step Verification is ON</p>
                  <p className="text-blue-600 mt-1">
                    After entering your password, you'll receive a 6-digit OTP code on your
                    email that you must enter to complete login. This adds an extra layer of security.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <Unlock size={18} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-700">2-Step Verification is OFF</p>
                  <p className="text-slate-500 mt-1">
                    You only need your email/phone and password to log in.
                    Enable this for stronger account protection — a one-time code
                    will be required at every login.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Login flow illustration */}
          <div className="text-xs text-slate-400 space-y-1.5 pl-1">
            <p className="font-semibold text-slate-500 text-sm mb-2">Current login flow:</p>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
              Email / Phone + Password
            </div>
            {isTwoFaEnabled && (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                OTP Code sent to your email
              </div>
            )}
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {isTwoFaEnabled ? "3" : "2"}
              </span>
              Access granted ✓
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={handleToggle2FA}
            disabled={twoFaLoading}
            className={`
              flex items-center gap-2.5 rounded-xl px-5 py-3 font-semibold text-sm
              transition-all duration-200 shadow-sm hover:shadow-md
              ${twoFaLoading ? "opacity-60 cursor-not-allowed" : ""}
              ${isTwoFaEnabled
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            {twoFaLoading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : isTwoFaEnabled ? (
              <ShieldOff size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
            {twoFaLoading
              ? "Updating..."
              : isTwoFaEnabled
              ? "Disable 2-Step Verification"
              : "Enable 2-Step Verification"}
          </button>

        </div>
      </motion.div>

    </div>
  );
}

export default Account;
