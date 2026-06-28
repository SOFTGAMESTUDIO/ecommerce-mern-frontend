/**
 * ============================================================
 * VERIFY EMAIL PAGE
 * ============================================================
 *
 * Two states:
 * 1. No token in URL  → "Check your email" waiting screen with resend button
 * 2. Token in URL     → Auto-verify, show success/failure, redirect to login
 *
 * ============================================================
 */

import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import {
  CheckCircle,
  XCircle,
  LoaderCircle,
  Mail,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import Button from "../../components/ui/Button";

import {
  verifyEmail,
  resendVerification,
} from "../../api/auth.api";

function VerifyEmail() {

  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  // Token present = auto-verify mode; no token = check-email waiting mode
  const [verifying, setVerifying] = useState(!!token);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  /**
   * Auto-verify when token is present in URL
   */
  useEffect(() => {
    if (token) {
      doVerify();
    }
  }, [token]);

  /**
   * Countdown timer for resend button cooldown
   */
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  /**
   * ============================================================
   * Verify Email (auto via URL token)
   * ============================================================
   */

  const doVerify = async () => {
    try {
      const { data } = await verifyEmail(token);

      setVerified(true);
      setMessage(data.message || "Email verified successfully.");

      // Redirect to login after 3 seconds
      setTimeout(() => navigate("/login"), 3000);

    } catch (error) {
      setFailed(true);
      setMessage(
        error.response?.data?.message || "Verification failed. The link may have expired."
      );
    } finally {
      setVerifying(false);
    }
  };

  /**
   * ============================================================
   * Resend Verification Email
   * ============================================================
   */

  const handleResend = async () => {
    if (!email) {
      navigate("/login");
      return;
    }

    try {
      setSending(true);

      const { data } = await resendVerification({ email });

      setResent(true);
      setCountdown(60); // 60-second cooldown

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to resend email. Try again later."
      );
    } finally {
      setSending(false);
    }
  };

  /**
   * ============================================================
   * RENDER — Token auto-verify mode
   * ============================================================
   */

  if (token) {
    return (
      <div className="space-y-6 text-center">

        {/* Verifying */}
        {verifying && (
          <div className="space-y-4">
            <LoaderCircle
              size={72}
              className="mx-auto animate-spin text-blue-600"
            />
            <h2 className="text-2xl font-bold text-slate-800">
              Verifying Your Email
            </h2>
            <p className="text-slate-500">Please wait a moment...</p>
          </div>
        )}

        {/* Success */}
        {!verifying && verified && (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Email Verified! 🎉
            </h2>
            <p className="text-slate-500">{message}</p>
            <p className="text-sm text-slate-400">
              Redirecting to login in 3 seconds...
            </p>
            <Button
              fullWidth
              onClick={() => navigate("/login")}
              rightIcon={<ArrowRight size={18} />}
            >
              Continue to Login
            </Button>
          </div>
        )}

        {/* Failed */}
        {!verifying && failed && (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mx-auto">
              <XCircle size={48} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Verification Failed
            </h2>
            <p className="text-slate-500">{message}</p>
            {email && (
              <Button
                fullWidth
                loading={sending}
                disabled={sending || countdown > 0}
                onClick={handleResend}
                leftIcon={<RefreshCw size={18} />}
              >
                {countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend Verification Email"}
              </Button>
            )}
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </div>
        )}

      </div>
    );
  }

  /**
   * ============================================================
   * RENDER — Check Email waiting mode (no token in URL)
   * ============================================================
   */

  return (
    <div className="space-y-6 text-center">

      {/* Email icon with animation */}
      <div className="relative inline-block mx-auto">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
          <Mail size={40} className="text-blue-600" />
        </div>
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-blue-200 opacity-40 animate-ping" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">
          Check Your Email
        </h2>
        <p className="text-slate-500">
          We've sent a verification link to:
        </p>
        {email && (
          <div className="inline-block bg-slate-50 border rounded-xl px-5 py-2 font-semibold text-slate-700">
            {email}
          </div>
        )}
        <p className="text-sm text-slate-400 mt-2">
          Click the link in the email to verify your account, then come back to log in.
        </p>
      </div>

      {/* Resent success banner */}
      {resent && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
          <CheckCircle size={18} className="shrink-0" />
          Verification email resent! Check your inbox and spam folder.
        </div>
      )}

      {/* Resend button */}
      {email && (
        <Button
          variant="outline"
          fullWidth
          loading={sending}
          disabled={sending || countdown > 0}
          onClick={handleResend}
          leftIcon={<RefreshCw size={18} className={sending ? "animate-spin" : ""} />}
        >
          {countdown > 0
            ? `Resend available in ${countdown}s`
            : resent
            ? "Resend Again"
            : "Resend Verification Email"}
        </Button>
      )}

      {/* Already verified */}
      <Button
        fullWidth
        onClick={() => navigate("/login")}
        rightIcon={<ArrowRight size={18} />}
      >
        I've Verified — Go to Login
      </Button>

      <p className="text-xs text-slate-400">
        Can't find the email? Check your spam or junk folder.
      </p>

    </div>
  );

}

export default VerifyEmail;
