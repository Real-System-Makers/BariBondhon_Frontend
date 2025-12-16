"use client";

import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { House } from "@/lib/types/house";

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning,";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon,";
  } else if (hour >= 17 && hour < 22) {
    return "Good Evening,";
  } else {
    return "Good Night,";
  }
};

import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

interface OwnerInfoProps {
  house?: House | null;
}

const OwnerInfo = ({ house }: OwnerInfoProps) => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const greeting = getGreeting();

  const address = house?.address || user?.address;

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login"); // Redirect to login
  };

  return (
    <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">

      {/* Header Icons */}
      <div className="absolute top-5 right-5 flex items-center gap-3 z-[10]">
        <Link href="/owner-profile">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition shadow-sm border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition shadow-sm border border-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
        </div>
      </div>

      <div className="relative z-[2]">
        <div className="text-base opacity-90 mb-1">{greeting}</div>
        <div className="text-2xl font-bold mb-2">{user?.name}</div>
        <div className="text-sm opacity-80 mb-2">{user?.phone}</div>
        {address && <div className="text-sm opacity-80 mb-2">{address}</div>}
      </div>
    </div>
  );
};

export default OwnerInfo;
