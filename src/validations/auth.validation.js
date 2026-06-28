/**
 * ============================================================
 * AUTH VALIDATION
 * ============================================================
 */

import { z } from "zod";

/**
 * ============================================================
 * COMMON
 * ============================================================
 */

export const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters")
  .max(100, "Name is too long");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address");

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Invalid phone number")
  .optional()
  .or(z.literal(""));

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

export const otpSchema = z
  .string()
  .length(6, "Enter 6 digit verification code");

/**
 * ============================================================
 * REGISTER
 * ============================================================
 */

export const registerSchema = z
  .object({

    name: nameSchema,

    email: emailSchema,

    phone: phoneSchema,

    password: passwordSchema,

    confirmPassword: z.string(),

    agree: z.literal(true, {
      errorMap: () => ({
        message: "Please accept Terms & Conditions",
      }),
    }),

  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

/**
 * ============================================================
 * LOGIN
 * Accepts email OR phone number in the 'login' field
 * ============================================================
 */

export const loginSchema = z.object({

  login: z
    .string()
    .trim()
    .min(1, 'Email or phone number is required'),

  password: z
    .string()
    .min(1, 'Password is required'),

});

/**
 * ============================================================
 * PHONE LOGIN
 * ============================================================
 */

export const phoneLoginSchema = z.object({

  phone: phoneSchema,

});

/**
 * ============================================================
 * GOOGLE LOGIN
 * ============================================================
 */

export const googleAuthSchema = z.object({

  idToken: z
    .string()
    .min(20, "Invalid Google token"),

});

/**
 * ============================================================
 * VERIFY LOGIN (2FA)
 * ============================================================
 */

export const verifyLoginSchema = z.object({

  email: emailSchema,

  otp: otpSchema,

});

/**
 * ============================================================
 * FORGOT PASSWORD
 * ============================================================
 */

export const forgotPasswordSchema = z.object({

  email: emailSchema,

});

/**
 * ============================================================
 * RESET PASSWORD
 * ============================================================
 */

export const resetPasswordSchema = z
  .object({

    token: z.string(),

    password: passwordSchema,

    confirmPassword: z.string(),

  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

/**
 * ============================================================
 * CHANGE PASSWORD
 * ============================================================
 */

export const changePasswordSchema = z
  .object({

    currentPassword: z.string(),

    newPassword: passwordSchema,

    confirmPassword: z.string(),

  })

  .refine(
    (data) =>
      data.newPassword ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

/**
 * ============================================================
 * CHANGE EMAIL
 * ============================================================
 */

export const changeEmailSchema = z.object({

  email: emailSchema,

});

/**
 * ============================================================
 * COMPLETE PROFILE
 * ============================================================
 */

export const completeProfileSchema = z.object({

  phone: phoneSchema,

  dob: z.string().min(1, "Date of Birth is required"),

  gender: z.enum([
    "male",
    "female",
    "other",
    "prefer_not_to_say",
  ]),

  bio: z
    .string()
    .max(500)
    .optional(),

});

/**
 * ============================================================
 * RECOVERY REQUEST
 * ============================================================
 */

export const recoveryRequestSchema = z.object({

  name: nameSchema,

  email: emailSchema,

  phone: phoneSchema,

  dob: z.string(),

  reason: z
    .string()
    .min(10, "Please explain your reason"),

});

/**
 * ============================================================
 * RESEND EMAIL
 * ============================================================
 */

export const resendVerificationSchema = z.object({

  email: emailSchema,

});

/**
 * ============================================================
 * REFRESH TOKEN
 * ============================================================
 */

export const refreshTokenSchema = z.object({

  refreshToken: z.string().min(20),

});

/**
 * ============================================================
 * LOGOUT
 * ============================================================
 */

export const logoutSchema = z.object({

  refreshToken: z.string().optional(),

});

