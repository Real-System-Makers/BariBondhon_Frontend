"use client";

import { useState } from "react";
import TenantHeader from "./_components/TenantHeader";
import MonthlyRentCard from "./_components/MonthlyRentCard";
import DigitalReceiptCard from "./_components/DigitalReceiptCard";
import QuickActions from "./_components/QuickActions";
import NoticesList from "./_components/NoticesList";
import RentBreakdownModal from "./_components/RentBreakdownModal";
import PaymentModal from "./_components/PaymentModal";
import NotificationBell from "../_components/NotificationBell";
import { Notification } from "@/lib/types/notification";
import { Rent } from "@/lib/types/rent";
import { getTenantRentsAction, getRentByIdAction } from "@/lib/actions/rent.actions";

const TenantHome = () => {
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRent, setSelectedRent] = useState<Rent | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNotificationClick = async (notification: Notification) => {
    // If notification has related rent, open payment modal
    if (notification.relatedRent?._id) {
      try {
        const rent = await getRentByIdAction(notification.relatedRent._id);
        if (rent && rent.status !== 'Paid') {
          setSelectedRent(rent);
          setIsPaymentModalOpen(true);
        }
      } catch (error) {
        console.error("Failed to load rent:", error);
      }
    }
  };

  const handlePaymentSuccess = () => {
    // Refresh the page data
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="relative">
          <TenantHeader />
          {/* Notification Bell */}
          <div className="absolute top-4 right-4 z-10">
            <NotificationBell onNotificationClick={handleNotificationClick} />
          </div>
        </div>

        <div className="p-5 px-6 pb-[100px] flex-1 overflow-y-auto">
          <MonthlyRentCard 
            key={refreshKey} 
            onOpenModal={() => setIsBreakdownModalOpen(true)} 
          />

          <DigitalReceiptCard />

          <QuickActions />

          <NoticesList />
        </div>
      </div>

      <RentBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
        onPay={(rent) => {
          setSelectedRent(rent);
          setIsPaymentModalOpen(true);
        }}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        rent={selectedRent}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default TenantHome;
