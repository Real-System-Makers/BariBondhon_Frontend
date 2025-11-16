"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "@/lib/actions/auth.actions";
import { useAuthStore } from "@/lib/stores/auth.store";

const SignUp = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await signupAction({
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.success && response.data) {
        setUser(response.data);
        router.push("/owner-home");
      } else {
        setError(response.error || "Signup failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
            Create Account
          </h1>
          <p className="text-base text-slate-500">Join BariBondhon Community</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col animate-[fadeInUp_0.6s_ease_forwards_0.1s] opacity-0 [animation-fill-mode:forwards]"
        >
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5 relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 w-[22px] h-[22px] group-focus-within:text-[#4a90e2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 bg-slate-50/80 border-2 border-slate-200 rounded-2xl px-5 pl-[55px] text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300"
              placeholder="Full Name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-5 relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 w-[22px] h-[22px] group-focus-within:text-[#4a90e2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-slate-50/80 border-2 border-slate-200 rounded-2xl px-5 pl-[55px] text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300"
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-5 relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 w-[22px] h-[22px] group-focus-within:text-[#4a90e2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" />
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-slate-50/80 border-2 border-slate-200 rounded-2xl px-5 pl-[55px] text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300"
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-5 relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 w-[22px] h-[22px] group-focus-within:text-[#4a90e2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 bg-slate-50/80 border-2 border-slate-200 rounded-2xl px-5 pl-[55px] text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300"
              placeholder="Confirm Password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 border-none rounded-2xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 mt-5 hover:-translate-y-0.5 animate-[fadeInUp_0.6s_ease_forwards_0.3s] opacity-0 [animation-fill-mode:forwards] shadow-primary-md hover:shadow-primary-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
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
