"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth.actions";

export default function LogoutButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await logoutAction();
      if (response.success) {
        router.push("/login");
        router.refresh();
      } else {
        console.error("Logout failed:", response.error);
        // Optionally show a toast or alert here
      }
    } catch (error) {
      console.error("An unexpected error occurred during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-200 z-50 flex items-center gap-2"
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      )}
      <span className="hidden md:inline">Logout</span>
    </button>
  );
}
