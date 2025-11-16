"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Role } from "@/lib/constants/role";
import RoleButton from "./_components/RoleButton";
import { loginAction } from "@/lib/actions/auth.actions";
import { useAuthStore } from "@/lib/stores/auth.store";
import { loginSchema, LoginFormData } from "@/lib/schemas";
import { FormInput } from "@/lib/components/forms";
import { LoginCredentials } from "@/lib/types/auth.types";

const Login = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [role, setRole] = useState<Role>(Role.OWNER);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleRoleChange = (role: Role) => {
    setRole(role);
  };

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      const response = await loginAction(data as LoginCredentials);

      if (response.success && response.data) {
        setUser(response.data);
        router.push(role === Role.OWNER ? "/owner-home" : "/tenant-home");
      } else {
        setError(response.error || "Login failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <div className="absolute w-[200px] h-[200px] top-[-50px] left-[-50px] rounded-full opacity-50 blur-[80px] transition-all duration-400 z-0 bg-primary-start"></div>
      <div className="absolute w-[250px] h-[250px] bottom-[-80px] right-[-80px] rounded-full opacity-50 blur-[80px] transition-all duration-400 z-0 bg-primary-end"></div>

      <div className="h-full flex flex-col relative z-10">
        <div className="text-center mb-10 animate-[fadeInUp_0.6s_ease_forwards]">
          <div
            className="w-[70px] h-[70px] rounded-[20px] mx-auto mb-5 flex items-center justify-center text-[28px] font-bold text-white shadow-primary"
            style={{
              background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
            }}
          >
            BB
          </div>
          <h1 className="text-[28px] font-bold text-slate-800 mb-2">
            BariBondhon
          </h1>
          <p className="text-base text-slate-500">
            Housing Management Made Easy
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col animate-[fadeInUp_0.6s_ease_forwards_0.1s] opacity-0 [animation-fill-mode:forwards]"
        >
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <FormInput
            name="email"
            control={control}
            type="email"
            placeholder="Email"
            disabled={isSubmitting}
            error={errors.email}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            }
          />

          <FormInput
            name="password"
            control={control}
            type="password"
            placeholder="Password"
            disabled={isSubmitting}
            error={errors.password}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" />
              </svg>
            }
          />

          <div className="my-2.5 mb-5 animate-[fadeInUp_0.6s_ease_forwards_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <label className="text-base text-slate-800 mb-3 block font-medium">
              Login as
            </label>
            <div className="flex bg-slate-100 rounded-2xl p-1">
              <RoleButton
                label="Owner"
                role={Role.OWNER}
                currentRole={role}
                onClick={handleRoleChange}
              />
              <RoleButton
                label="Tenant"
                role={Role.TENANT}
                currentRole={role}
                onClick={handleRoleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 border-none rounded-2xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 mt-5 hover:-translate-y-0.5 animate-[fadeInUp_0.6s_ease_forwards_0.3s] opacity-0 [animation-fill-mode:forwards] shadow-primary-md hover:shadow-primary-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
            }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="mt-auto pt-5 text-center animate-[fadeInUp_0.6s_ease_forwards_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <Link
              href="/forgot-password"
              className="text-[#4a90e2] no-underline text-base font-medium block mb-5 hover:opacity-80 transition-opacity"
            >
              Forgot Password?
            </Link>
            {role === Role.OWNER && (
              <p className="text-slate-500 text-base">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#4a90e2] no-underline font-semibold hover:opacity-80 transition-opacity"
                >
                  Register
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
