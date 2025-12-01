"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupAction } from "@/lib/actions/auth.actions";
import { useAuthStore } from "@/lib/stores/auth.store";
import { signupSchema, SignupFormData } from "@/lib/schemas";
import { FormInput } from "@/lib/components/forms";
import { SignUpData } from "@/lib/types/auth.types";
import { Role } from "@/lib/constants/role";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setError("");

    try {
      const signupData: SignUpData = {
        ...data,
        role: Role.OWNER,
      };

      const response = await signupAction(signupData);

      if (response.success && response.data) {
        setUser(response.data);
        router.push("/house-settings");
      } else {
        setError(response.error || "Signup failed. Please try again.");
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
          <Link href="/">
            <div
              className="w-[70px] h-[70px] rounded-[20px] mx-auto mb-5 flex items-center justify-center text-[28px] font-bold text-white shadow-primary cursor-pointer transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
              }}
            >
              <Image src="/logo.png" alt="BariBondhon" width={70} height={70} />
            </div>
          </Link>
          <h1 className="text-[28px] font-bold text-slate-800 mb-2">
            Create Account
          </h1>
          <p className="text-base text-slate-500">Join BariBondhon Community</p>
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
            name="name"
            control={control}
            type="text"
            placeholder="Full Name"
            disabled={isSubmitting}
            error={errors.name}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            }
          />

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

          <FormInput
            name="confirmPassword"
            control={control}
            type="password"
            placeholder="Confirm Password"
            disabled={isSubmitting}
            error={errors.confirmPassword}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            }
          />

          <FormInput
            name="phone"
            control={control}
            type="tel"
            placeholder="Phone Number"
            disabled={isSubmitting}
            error={errors.phone}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            }
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 border-none rounded-2xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 mt-5 hover:-translate-y-0.5 animate-[fadeInUp_0.6s_ease_forwards_0.3s] opacity-0 [animation-fill-mode:forwards] shadow-primary-md hover:shadow-primary-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
            }}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <div className="mt-auto pt-5 text-center animate-[fadeInUp_0.6s_ease_forwards_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <p className="text-slate-500 text-base">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#4a90e2] no-underline font-semibold hover:opacity-80 transition-opacity"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
