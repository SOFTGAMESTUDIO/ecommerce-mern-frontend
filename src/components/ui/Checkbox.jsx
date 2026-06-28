import { Check } from "lucide-react";

function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  error
}) {
  return (
    <div className="space-y-1">

      <label className="flex items-center gap-3 cursor-pointer">

        <div
          className={`
            w-5 h-5
            rounded-md
            border-2
            flex
            items-center
            justify-center
            transition-all

            ${
              checked
                ? "bg-blue-600 border-blue-600"
                : "border-slate-300"
            }
          `}
        >

          {checked && (
            <Check
              size={14}
              className="text-white"
            />
          )}

        </div>

        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
        />

        <span className="text-sm text-slate-700">

          {label}

        </span>

      </label>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}

export default Checkbox;