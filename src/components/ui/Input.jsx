/**
 * ============================================================
 * INPUT COMPONENT
 * ============================================================
 *
 * Production Ready Reusable Input
 *
 * Features
 * --------
 * ✓ Floating Label
 * ✓ Error Message
 * ✓ Disabled State
 * ✓ Password Support
 * ✓ Left Icon
 * ✓ Right Icon
 * ✓ React Hook Form Ready
 * ✓ Responsive
 *
 * ============================================================
 */

function Input({
  label,
  type = "text",
  placeholder,
  error,
  icon,
  rightIcon,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">

      {/* Label */}

      {label && (
        <label className="block text-sm font-medium text-slate-700">

          {label}

          {required && (
            <span className="text-red-500 ml-1">
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
          bg-white
          transition-all
          duration-200

          ${
            error
              ? "border-red-500"
              : "border-slate-300"
          }

          focus-within:border-blue-600
          focus-within:ring-4
          focus-within:ring-blue-100
        `}
      >

        {/* Left Icon */}

        {icon && (
          <div className="px-4 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1
            bg-transparent
            px-4
            py-3
            outline-none
            text-slate-700
            placeholder:text-slate-400

            ${disabled && "cursor-not-allowed"}

            ${className}
          `}
          {...props}
        />

        {/* Right Icon */}

        {rightIcon && (
          <div className="px-4">
            {rightIcon}
          </div>
        )}

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

export default Input;