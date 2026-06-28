/**
 * ============================================================
 * ACCOUNT RECOVERY REQUEST
 * ============================================================
 */

import { useState } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  recoveryRequestSchema,
} from "../../validations/auth.validation";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  recoveryRequest,
} from "../../api/auth.api";

function RecoveryRequest() {

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
        recoveryRequestSchema
      ),

    defaultValues: {

      email: "",

      phone: "",

      name: "",

      dob: "",

      reason: "",

    },

  });

  /**
   * ============================================================
   * SUBMIT
   * ============================================================
   */

  const onSubmit = async (
    formData
  ) => {

    try {

      setLoading(true);

      const { data } =
        await recoveryRequest(
          formData
        );

      toast.success(

        data.message ||

        "Recovery request submitted."

      );

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to submit request."

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

            Account Recovery

          </h1>

          <p className="text-slate-500 mt-2">

            Can't access your email? Submit a recovery request for manual verification.

          </p>

        </div>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="space-y-5"

        >

          <Input

            label="Full Name"

            required

            error={
              errors.name?.message
            }

            {...register("name")}

          />

          <Input

            label="Registered Email"

            type="email"

            required

            error={
              errors.email?.message
            }

            {...register("email")}

          />

          <Input

            label="Phone Number"

            required

            error={
              errors.phone?.message
            }

            {...register("phone")}

          />

          <Input

            type="date"

            label="Date of Birth"

            required

            error={
              errors.dob?.message
            }

            {...register("dob")}

          />

          <div>

            <label className="block text-sm font-medium mb-2">

              Reason

            </label>

            <textarea

              rows={4}

              className="w-full rounded-lg border p-3"

              placeholder="Explain why you cannot access your account."

              {...register("reason")}

            />

            {errors.reason && (

              <p className="text-sm text-red-500 mt-1">

                {errors.reason.message}

              </p>

            )}

          </div>

          <Button

            type="submit"

            loading={loading}

            disabled={loading}

            fullWidth

          >

            Submit Recovery Request

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

export default RecoveryRequest;

