/**
 * ============================================================
 * REGISTER PAGE
 * ============================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Lock } from "lucide-react";

import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";
import Divider from "../../components/ui/Divider";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import GoogleButton from "../../components/auth/GoogleButton";

import { registerSchema } from "../../validations/auth.validation";
import { registerUser, googleLogin } from "../../api/auth.api";
import useAuthStore from "../../store/auth.store";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  /**
   * ============================================================
   * Register Submission
   * ============================================================
   */
  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      // Only include phone if provided
      if (formData.phone && formData.phone.trim() !== "") {
        payload.phone = formData.phone.trim();
      }

      const { data } = await registerUser(payload);

      toast.success(data.message || "Registration Successful! Check your email.");

      /**
       * Always redirect to verify-email page with email in state
       * If email verification is enabled on backend, user will see "check your email" screen
       */
      navigate("/verify-email", {
        state: {
          email: formData.email,
        },
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================
   * Google Register/Login
   * ============================================================
   */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      const { data } = await googleLogin({
        idToken: credentialResponse.credential,
      });

      login(data.data.user, data.data.accessToken, data.data.refreshToken);

      /**
       * Google user — check if profile completed
       */
      if (!data.data.user.profile?.isProfileCompleted) {
        navigate("/complete-profile");
        return;
      }

      toast.success("Account Created! Welcome.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Authentication Failed");
  };

  return (
    <Card>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 mt-2">
            Join using Email or Google. Phone is optional.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <Input
            label="Full Name"
            required
            autoComplete="name"
            placeholder="Your full name"
            icon={<User size={18} />}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            type="email"
            label="Email Address"
            required
            autoComplete="email"
            placeholder="you@example.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Phone Number (Optional)"
            autoComplete="tel"
            placeholder="10-digit Indian mobile number"
            icon={<Phone size={18} />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          <PasswordInput
            label="Password"
            required
            autoComplete="new-password"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            label="Confirm Password"
            required
            autoComplete="new-password"
            icon={<Lock size={18} />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Checkbox
            checked={watch("agree")}
            onChange={(e) =>
              setValue("agree", e.target.checked, {
                shouldValidate: true,
              })
            }
            error={errors.agree?.message}
            label={
              <>
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </>
            }
          />

          <Button type="submit" loading={loading} disabled={loading} fullWidth>
            Create Account
          </Button>

        </form>

        <Divider text="OR" />

        <GoogleButton
          loading={loading}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        >
          Continue with Google
        </GoogleButton>

        <div className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </div>

      </div>
    </Card>
  );
}

export default Register;