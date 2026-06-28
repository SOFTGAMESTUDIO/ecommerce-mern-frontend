/**
 * ============================================================
 * PASSWORD INPUT COMPONENT
 * ============================================================
 *
 * Production Ready Password Input
 *
 * Features
 * --------
 * ✓ Show / Hide Password
 * ✓ React Hook Form Ready
 * ✓ Error Support
 * ✓ Disabled State
 * ✓ Left Icon
 * ✓ Modern UI
 * ✓ Reusable
 *
 * ============================================================
 */

import { useState } from "react";

import {
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

function PasswordInput({

  label,

  error,

  required = false,

  disabled = false,

  placeholder = "Enter password",

  className = "",

  ...props

}) {

  const [showPassword, setShowPassword] =
    useState(false);

  return (

    <div className="space-y-2">

      {/* Label */}

      {label && (

        <label className="block text-sm font-medium text-slate-700">

          {label}

          {required && (

            <span className="ml-1 text-red-500">

              *

            </span>

          )}

        </label>

      )}

      {/* Input */}

      <div
        className={`
          flex
          items-center
          rounded-xl
          border

          ${
            error
              ? "border-red-500"
              : "border-slate-300"
          }

          bg-white

          transition-all

          focus-within:border-blue-600

          focus-within:ring-4

          focus-within:ring-blue-100
        `}
      >

        {/* Lock Icon */}

        <div className="px-4 text-slate-400">

          <Lock size={18} />

        </div>

        {/* Input */}

        <input

          type={
            showPassword
              ? "text"
              : "password"
          }

          placeholder={placeholder}

          disabled={disabled}

          className={`
            flex-1
            bg-transparent
            px-2
            py-3
            outline-none

            ${className}
          `}

          {...props}

        />

        {/* Eye */}

        <button

          type="button"

          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }

          className="
            px-4
            text-slate-500
            hover:text-blue-600
          "

        >

          {showPassword
            ? <EyeOff size={18} />
            : <Eye size={18} />
          }

        </button>

      </div>

      {/* Error */}

      {error && (

        <p className="text-sm text-red-500">

          {error}

        </p>

      )}

    </div>

  );

}

export default PasswordInput;