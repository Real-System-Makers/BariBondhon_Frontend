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

interface OwnerInfoProps {
  house?: House | null;
}

const OwnerInfo = ({ house }: OwnerInfoProps) => {
  const { user } = useCurrentUser();
  const greeting = getGreeting();

  const address = house?.address || user?.address;

  return (
    <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
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
