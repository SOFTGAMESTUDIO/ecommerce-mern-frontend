/**
 * ============================================================
 * LOGIN PAGE
 * ============================================================
 */

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AtSign, Lock } from "lucide-react";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import Card from "../../components/ui/Card";
import GoogleButton from "../../components/auth/GoogleButton";

import { loginSchema } from "../../validations/auth.validation";

import { loginUser, googleLogin } from "../../api/auth.api";

import useAuthStore from "../../store/auth.store";

function Login() {
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
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
      remember: true,
    },
  });

  /**
   * ============================================================
   * LOGIN
   * ============================================================
   */

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        login: formData.login.trim(),
        password: formData.password,
      };

      const { data } = await loginUser(payload);

      const response = data.data;

      /**
       * Two-Factor Authentication Required
       */
      if (response.twoFactorRequired) {
        toast.success("Verification code sent to your email");

        navigate("/verify-login", {
          state: {
            email: response.email,
          },
        });

        return;
      }

      /**
       * Save User Session (both tokens)
       */
      login(response.user, response.accessToken, response.refreshToken);

      /**
       * Check Profile Completion
       */
      if (!response.user.profile?.isProfileCompleted) {
        navigate("/complete-profile");
        return;
      }

      toast.success(data.message || "Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================
   * GOOGLE LOGIN
   * ============================================================
   */

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      const { data } = await googleLogin({
        idToken: credentialResponse.credential,
      });

      login(data.data.user, data.data.accessToken, data.data.refreshToken);

      if (!data.data.user.isProfileCompleted) {
        navigate("/complete-profile");
        return;
      }

      toast.success("Welcome Back");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================
   * GOOGLE ERROR
   * ============================================================
   */

  const handleGoogleError = () => {
    toast.error("Google Authentication Failed");
  };

  return (
    <Card>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 mt-2">
            Sign in with your Email, Phone Number, or Google Account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <Input
            label="Email or Phone"
            required
            autoComplete="username"
            placeholder="Enter email or phone number"
            icon={<AtSign size={18} />}
            error={errors.login?.message}
            {...register("login")}
          />

          <PasswordInput
            label="Password"
            required
            autoComplete="current-password"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              checked={watch("remember")}
              onChange={(e) => setValue("remember", e.target.checked)}
              label="Remember Me"
            />

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" fullWidth loading={loading} disabled={loading}>
            Sign In
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
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </Link>
        </div>

      </div>
    </Card>
  );
}

export default Login;
