"use client";

import { Control, Controller, FieldError } from "react-hook-form";
import { ReactNode, useState } from "react";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
  error?: FieldError;
}

export const FormInput = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
  icon,
  disabled = false,
  error,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative group">
            {icon && (
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 w-[22px] h-[22px] group-focus-within:text-[#4a90e2]">
                {icon}
              </span>
            )}
            <input
              {...field}
              type={inputType}
              className={`w-full h-14 bg-slate-50/80 border-2 ${error ? "border-red-400" : "border-slate-200"
                } rounded-2xl px-5 ${icon ? "pl-[55px]" : ""
                } ${isPasswordField ? "pr-[55px]" : ""
                } text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder={placeholder}
              disabled={disabled}
            />
            {isPasswordField && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4a90e2] transition-colors duration-300 w-[22px] h-[22px] flex items-center justify-center focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 pl-5">{error.message}</p>
      )}
    </div>
  );
};
