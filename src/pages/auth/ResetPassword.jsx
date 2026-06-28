
/**
 * ============================================================
 * RESET PASSWORD PAGE
 * ============================================================
 */

import { useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
} from "../../validations/auth.validation";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PasswordInput from "../../components/ui/PasswordInput";

import {
  resetPassword,
} from "../../api/auth.api";

function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const {

    register,

    handleSubmit,

    formState: {
      errors,
    },

  } = useForm({

    resolver:
      zodResolver(
        resetPasswordSchema
      ),

    defaultValues: {

      password: "",

      confirmPassword: "",

    },

  });

  /**
   * ============================================================
   * Submit
   * ============================================================
   */

  const onSubmit = async (
    formData
  ) => {

    try {

      setLoading(true);

      const { data } =
        await resetPassword({

          token,

          password:
            formData.password,

          confirmPassword:
            formData.confirmPassword,

        });

      toast.success(

        data.message ||

        "Password Updated Successfully"

      );

      navigate("/login");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Password Reset Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Card>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">

            Reset Password

          </h1>

          <p className="text-slate-500 mt-2">

            Create a new secure password for your account.

          </p>

        </div>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="space-y-5"

        >

          <PasswordInput

            label="New Password"

            required

            autoComplete="new-password"

            error={
              errors.password?.message
            }

            {...register("password")}

          />

          <PasswordInput

            label="Confirm Password"

            required

            autoComplete="new-password"

            error={
              errors.confirmPassword?.message
            }

            {...register(
              "confirmPassword"
            )}

          />

          <Button

            type="submit"

            loading={loading}

            disabled={loading}

            fullWidth

          >

            Update Password

          </Button>

        </form>

        <div className="text-center">

          <Link

            to="/login"

            className="font-medium text-blue-600 hover:underline"

          >

            Back to Login

          </Link>

        </div>

      </div>

    </Card>

  );

}

export default ResetPassword;

