/**
 * ============================================================
 * BUTTON COMPONENT
 * ============================================================
 *
 * Production Ready Button
 *
 * Features
 * --------
 * ✓ Primary
 * ✓ Secondary
 * ✓ Outline
 * ✓ Success
 * ✓ Danger
 * ✓ Loading State
 * ✓ Disabled State
 * ✓ Full Width
 * ✓ Left Icon
 * ✓ Right Icon
 * ✓ Framer Motion Animation
 *
 * ============================================================
 */

import { motion } from "framer-motion";

function Button({

  children,

  type = "button",

  variant = "primary",

  size = "md",

  loading = false,

  disabled = false,

  fullWidth = false,

  leftIcon,

  rightIcon,

  onClick,

  className = ""

}) {

  /**
   * ============================================================
   * Variants
   * ============================================================
   */

  const variants = {

    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-900",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    outline:
      "border border-slate-300 bg-white hover:bg-slate-100 text-slate-800"

  };

  /**
   * ============================================================
   * Sizes
   * ============================================================
   */

  const sizes = {

    sm: "px-4 py-2 text-sm",

    md: "px-5 py-3 text-base",

    lg: "px-6 py-4 text-lg"

  };

  return (

    <motion.button

      whileHover={{
        scale: disabled ? 1 : 1.02
      }}

      whileTap={{
        scale: disabled ? 1 : 0.98
      }}

      type={type}

      disabled={disabled || loading}

      onClick={onClick}

      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-xl

        font-semibold

        transition-all

        duration-200

        disabled:opacity-60

        disabled:cursor-not-allowed

        ${variants[variant]}

        ${sizes[size]}

        ${fullWidth ? "w-full" : ""}

        ${className}
      `}
    >

      {/* Left Icon */}

      {!loading && leftIcon}

      {/* Loading */}

      {loading && (

        <svg

          className="animate-spin h-5 w-5"

          xmlns="http://www.w3.org/2000/svg"

          fill="none"

          viewBox="0 0 24 24"
        >

          <circle

            className="opacity-20"

            cx="12"

            cy="12"

            r="10"

            stroke="currentColor"

            strokeWidth="4"

          />

          <path

            className="opacity-90"

            fill="currentColor"

            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"

          />

        </svg>

      )}

      {/* Button Text */}

      <span>

        {loading
          ? "Please wait..."
          : children}

      </span>

      {/* Right Icon */}

      {!loading && rightIcon}

    </motion.button>

  );

}

export default Button;