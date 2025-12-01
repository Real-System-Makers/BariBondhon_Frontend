"use client";

import { Control, Controller, FieldError } from "react-hook-form";

interface FormToggleProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  error?: FieldError;
}

export const FormToggle = ({
  name,
  control,
  label,
  disabled = false,
  error,
}: FormToggleProps) => {
  return (
    <div className="mb-5">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-base text-slate-800 font-medium">
                {label}
              </label>
            )}
            <button
              type="button"
              onClick={() => {
                if (!disabled) {
                  field.onChange(
                    (field.value || "postpaid") === "prepaid" ? "postpaid" : "prepaid"
                  );
                }
              }}
              disabled={disabled}
              className={`
                relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2
                ${
                  (field.value || "postpaid") === "postpaid"
                    ? "bg-[#4a90e2]"
                    : "bg-slate-300"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <span
                className={`
                  inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300
                  ${
                    (field.value || "postpaid") === "postpaid"
                      ? "translate-x-9"
                      : "translate-x-1"
                  }
                `}
              />
            </button>
          </div>
        )}
      />
      <div className="flex justify-between mt-2 text-xs text-slate-500 px-1">
        <span>Prepaid</span>
        <span>Postpaid</span>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 pl-5">{error.message}</p>
      )}
    </div>
  );
};

