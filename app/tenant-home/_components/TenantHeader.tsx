'use client';

import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

const TenantHeader = () => {
  const { user } = useCurrentUser();
  
  const houseAddress = user?.owner?.house?.address || user?.owner?.address;
  
  return (
    <div className="bg-gradient-to-br from-[#10b981] to-[#059669] pt-[50px] px-6 pb-[30px] text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
      <div className="relative z-[2]">
        <div>
          <div className="text-base opacity-90 mb-1">Welcome back,</div>
          <div className="text-2xl font-bold mb-2">{user?.name}</div>
          {user?.flat?.name && (
            <div className="text-sm opacity-75 mb-2">
              Flat: {user.flat.name}
            </div>
          )}
          {houseAddress && (
            <div className="text-sm opacity-85 mb-1">
              Address: {houseAddress}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantHeader;
