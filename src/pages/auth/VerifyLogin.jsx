/**
 * ============================================================
 * VERIFY LOGIN (EMAIL 2FA)
 * ============================================================
 */

import { useState, useRef } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-hot-toast";

import { ShieldCheck, Mail, RefreshCw } from "lucide-react";

import Button from "../../components/ui/Button";

import { verifyLogin } from "../../api/auth.api";

import useAuthStore from "../../store/auth.store";

function VerifyLogin() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  /**
   * OTP state — 6 individual digit inputs
   */
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  /**
   * ============================================================
   * Handle OTP input changes (auto-advance, paste support)
   * ============================================================
   */

  const handleOtpChange = (index, value) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // Handle paste of full OTP
    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getOtpValue = () => otp.join("");

  /**
   * ============================================================
   * VERIFY LOGIN (FIX: send { token: otp } not { email, otp })
   * ============================================================
   */

  const onSubmit = async (e) => {
    e.preventDefault();

    const token = getOtpValue();

    if (token.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIXED: backend expects { token } (the OTP itself is the token)
      const { data } = await verifyLogin({ token });

      login(
        data.data.user,
        data.data.accessToken,
        data.data.refreshToken
      );

      toast.success("Login Successful");

      if (!data.data.user.profile?.isProfileCompleted) {
        navigate("/complete-profile");
        return;
      }

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid verification code"
      );

      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================
   * RESEND CODE
   * ============================================================
   */

  const handleResend = async () => {

    if (!email) {
      toast.error("Email address not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setSending(true);

      // Resend uses the resend-verification endpoint
      await import("../../api/auth.api").then(({ resendVerification }) =>
        resendVerification({ email })
      );

      toast.success("New verification code sent to your email.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to resend code"
      );
    } finally {
      setSending(false);
    }
  };

  return (

    <div className="space-y-6">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
          <ShieldCheck size={32} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          Two-Factor Verification
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Enter the 6-digit code sent to your email
        </p>
        {email && (
          <div className="flex items-center justify-center gap-2 mt-3 text-sm font-medium text-slate-700 bg-slate-50 rounded-xl py-2 px-4 border">
            <Mail size={15} className="text-blue-500" />
            {email}
          </div>
        )}
      </div>

      {/* OTP Input */}
      <form onSubmit={onSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3 text-center">
            Verification Code
          </label>

          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={`
                  w-12 h-14 text-center text-xl font-bold
                  rounded-xl border-2 outline-none
                  transition-all duration-200
                  ${digit
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-300 bg-white text-slate-700"
                  }
                  focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                `}
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={loading || getOtpValue().length !== 6}
          fullWidth
        >
          Verify &amp; Sign In
        </Button>

      </form>

      {/* Resend */}
      <div className="text-center space-y-3">
        <p className="text-sm text-slate-500">
          Didn't receive the code?
        </p>
        <button
          type="button"
          disabled={sending}
          onClick={handleResend}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
        >
          <RefreshCw size={15} className={sending ? "animate-spin" : ""} />
          {sending ? "Sending..." : "Resend Code"}
        </button>
      </div>

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          ← Back to Login
        </Link>
      </div>

    </div>

  );

}

export default VerifyLogin;
