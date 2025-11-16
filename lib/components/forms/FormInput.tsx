"use client";

import { Control, Controller, FieldError } from "react-hook-form";
import { ReactNode } from "react";

interface FormInputProps {
  name: string;
  control: Control<any>;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
  error?: FieldError;
}

export const FormInput = ({
  name,
  control,
  type = "text",
  placeholder,
  icon,
  disabled = false,
  error,
}: FormInputProps) => {
  return (
    <div className="mb-5">
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
              type={type}
              className={`w-full h-14 bg-slate-50/80 border-2 ${
                error ? "border-red-400" : "border-slate-200"
              } rounded-2xl px-5 ${
                icon ? "pl-[55px]" : ""
              } text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
        )}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 pl-5">{error.message}</p>
      )}
    </div>
  );
};
