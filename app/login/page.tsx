"use client";

import Link from "next/link";

const Login = () => {
  const primaryStart = "#4a90e2";
  const primaryEnd = "#50e3c2";
  const shadowColor = "rgba(74, 144, 226, 0.4)";

  return (
    <div className="p-5">
      <div
        className="absolute w-[200px] h-[200px] top-[-50px] left-[-50px] rounded-full opacity-50 blur-[80px] transition-all duration-400 z-0"
        style={{ backgroundColor: primaryStart }}
      ></div>
      <div
        className="absolute w-[250px] h-[250px] bottom-[-80px] right-[-80px] rounded-full opacity-50 blur-[80px] transition-all duration-400 z-0"
        style={{ backgroundColor: primaryEnd }}
      ></div>

      <div className="h-full flex flex-col relative z-10">
        <div className="text-center mb-10 animate-[fadeInUp_0.6s_ease_forwards]">
          <div
            className="w-[70px] h-[70px] rounded-[20px] mx-auto mb-5 flex items-center justify-center text-[28px] font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${primaryStart}, ${primaryEnd})`,
              boxShadow: `0 10px 30px ${shadowColor}`,
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

        <div className="flex-1 flex flex-col animate-[fadeInUp_0.6s_ease_forwards_0.1s] opacity-0 [animation-fill-mode:forwards]">
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
              className="w-full h-14 bg-slate-50/80 border-2 border-slate-200 rounded-2xl px-5 pl-[55px] text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300"
              placeholder="Username"
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
              className="w-full h-14 bg-slate-50/80 border-2 border-slate-200 rounded-2xl px-5 pl-[55px] text-base text-slate-800 outline-none backdrop-blur-sm focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.15)] transition-all duration-300"
              placeholder="Password"
            />
          </div>

          <div className="my-2.5 mb-5 animate-[fadeInUp_0.6s_ease_forwards_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <label className="text-base text-slate-800 mb-3 block font-medium">
              Login as
            </label>
            <div className="flex bg-slate-100 rounded-2xl p-1">
              <div
                className="flex-1 py-3.5 text-center rounded-xl cursor-pointer text-base font-semibold transition-all duration-[400ms] text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryStart}, ${primaryEnd})`,
                  boxShadow: `0 4px 20px ${shadowColor}`,
                }}
                data-role="owner"
              >
                Owner
              </div>
              <div
                className="flex-1 py-3.5 text-center rounded-xl cursor-pointer text-base font-semibold transition-all duration-[400ms] text-slate-600"
                data-role="tenant"
              >
                Tenant
              </div>
            </div>
          </div>

          <button
            className="w-full h-14 border-none rounded-2xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 mt-5 hover:-translate-y-0.5 animate-[fadeInUp_0.6s_ease_forwards_0.3s] opacity-0 [animation-fill-mode:forwards]"
            style={{
              background: `linear-gradient(135deg, ${primaryStart}, ${primaryEnd})`,
              boxShadow: `0 8px 30px ${shadowColor}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 40px ${shadowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 30px ${shadowColor}`;
            }}
          >
            Login
          </button>

          <div className="mt-auto pt-5 text-center animate-[fadeInUp_0.6s_ease_forwards_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <Link
              href="/forgot-password"
              className="text-[#4a90e2] no-underline text-base font-medium block mb-5 hover:opacity-80 transition-opacity"
            >
              Forgot Password?
            </Link>
            <p className="text-slate-500 text-base">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#4a90e2] no-underline font-semibold hover:opacity-80 transition-opacity"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
