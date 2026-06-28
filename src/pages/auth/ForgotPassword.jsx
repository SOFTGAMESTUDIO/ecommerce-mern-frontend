/**
 * ============================================================
 * FORGOT PASSWORD
 * ============================================================
 */

import { useState } from "react";

import { Link } from "react-router-dom";

import {
  Mail,
  Smartphone,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  forgotPassword,
} from "../../api/auth.api";

/**
 * ============================================================
 * Validation
 * ============================================================
 */

const schema = z.object({

  identifier: z
    .string()
    .trim()
    .min(
      3,
      "Enter Email or Phone Number"
    ),

});

function ForgotPassword() {

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
      zodResolver(schema),

    defaultValues: {

      identifier: "",

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
        await forgotPassword(
          formData
        );

      toast.success(

        data.message ||

        "Password reset instructions have been sent."

      );

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Request Failed"

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

            Forgot Password

          </h1>

          <p className="text-slate-500 mt-2">

            Enter your registered Email Address or Phone Number.

          </p>

        </div>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="space-y-5"

        >

          <Input

            label="Email or Phone"

            required

            autoComplete="username"

            placeholder="Email or Phone Number"

            icon={<Mail size={18} />}

            error={
              errors.identifier?.message
            }

            {...register("identifier")}

          />

          <Button

            type="submit"

            loading={loading}

            disabled={loading}

            fullWidth

          >

            Send Reset Link

          </Button>

        </form>

        <div className="flex items-center justify-between text-sm">

          <Link

            to="/login"

            className="font-medium text-blue-600 hover:underline"

          >

            Back to Login

          </Link>

          <Link

            to="/recovery-request"

            className="font-medium text-blue-600 hover:underline"

          >

            Need Help?

          </Link>

        </div>

      </div>

    </Card>

  );

}

export default ForgotPassword;

