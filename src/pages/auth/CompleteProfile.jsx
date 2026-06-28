/**
 * ============================================================
 * COMPLETE PROFILE
 * ============================================================
 */

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  completeProfileSchema,
} from "../../validations/auth.validation";

import {
  completeProfile,
} from "../../api/auth.api";

function CompleteProfile() {

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
        completeProfileSchema
      ),

    defaultValues: {

      phone: "",

      dob: "",

      gender: "prefer_not_to_say",

      bio: "",

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
        await completeProfile(
          formData
        );

      toast.success(

        data.message ||

        "Profile Completed"

      );

      navigate("/dashboard");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to complete profile."

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

            Complete Your Profile

          </h1>

          <p className="text-slate-500 mt-2">

            Just one more step before you continue.

          </p>

        </div>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="space-y-5"

        >

          <Input

            label="Phone Number"

            required

            autoComplete="tel"

            error={
              errors.phone?.message
            }

            {...register("phone")}

          />

          <Input

            type="date"

            label="Date of Birth"

            required

            autoComplete="bday"

            error={
              errors.dob?.message
            }

            {...register("dob")}

          />

          <div>

            <label className="mb-2 block text-sm font-medium">

              Gender

            </label>

            <select

              className="w-full rounded-lg border p-3"

              {...register("gender")}

            >

              <option value="male">

                Male

              </option>

              <option value="female">

                Female

              </option>

              <option value="other">

                Other

              </option>

              <option value="prefer_not_to_say">

                Prefer Not To Say

              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Bio

            </label>

            <textarea

              rows={4}

              className="w-full rounded-lg border p-3"

              placeholder="Tell us something about yourself..."

              {...register("bio")}

            />

          </div>

          <Button

            type="submit"

            loading={loading}

            disabled={loading}

            fullWidth

          >

            Complete Profile

          </Button>

        </form>

      </div>

    </Card>

  );

}

export default CompleteProfile;
