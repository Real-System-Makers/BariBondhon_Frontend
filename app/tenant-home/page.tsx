"use client";

import { useState } from "react";
import TenantHeader from "./_components/TenantHeader";
import MonthlyRentCard from "./_components/MonthlyRentCard";
import DigitalReceiptCard from "./_components/DigitalReceiptCard";
import QuickActions from "./_components/QuickActions";
import NoticesList from "./_components/NoticesList";
import RentBreakdownModal from "./_components/RentBreakdownModal";

const TenantHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full">
        <TenantHeader />

        <div className="p-5 px-6 pb-[100px] flex-1 overflow-y-auto">
          <MonthlyRentCard onOpenModal={() => setIsModalOpen(true)} />

          <DigitalReceiptCard />

          <QuickActions />

          <NoticesList />
        </div>
      </div>

      <RentBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TenantHome;
