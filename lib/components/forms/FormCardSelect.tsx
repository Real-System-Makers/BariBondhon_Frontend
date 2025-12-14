"use client";

import { Control, Controller, FieldError } from "react-hook-form";
import { ReactNode } from "react";

interface CardOption {
  value: string;
  label: string;
  description: string;
  icon: ReactNode;
}

interface FormCardSelectProps {
  name: string;
  control: Control<any>;
  options: CardOption[];
  disabled?: boolean;
  error?: FieldError;
}

export const FormCardSelect = ({
  name,
  control,
  options,
  disabled = false,
  error,
}: FormCardSelectProps) => {
  return (
    <div className="mb-5">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => {
              const isSelected = field.value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (!disabled) {
                      field.onChange(option.value);
                    }
                  }}
                  disabled={disabled}
                  className={`
                    bg-white rounded-2xl p-4 text-left shadow-[0_4px_20px_rgba(0,0,0,0.07)] border-2 transition-all duration-300 hover:-translate-y-1
                    ${
                      isSelected
                        ? "border-[#4a90e2] bg-gradient-to-br from-[#4a90e2]/5 to-[#50e3c2]/5"
                        : "border-slate-200 hover:border-[#4a90e2]/50"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div
                      className={`
                        w-12 h-12 rounded-xl text-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                        ${
                          isSelected
                            ? "bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white"
                            : "bg-slate-100 text-[#4a90e2]"
                        }
                      `}
                    >
                      {option.icon}
                    </div>
                    <div>
                      <div
                        className={`
                          text-base font-bold mb-1 transition-colors duration-300
                          ${isSelected ? "text-[#4a90e2]" : "text-slate-800"}
                        `}
                      >
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 pl-5">{error.message}</p>
      )}
    </div>
  );
};
