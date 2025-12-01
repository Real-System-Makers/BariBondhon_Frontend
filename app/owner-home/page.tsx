"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OwnerInfo from "./_components/OwnerInfo";
import { getMonthlyStatsAction } from "@/lib/actions/rent.actions";
import { RentStats } from "@/lib/types/rent";
import { getHouseAction } from "@/lib/actions/house.actions";
import { House } from "@/lib/types/house";
import WaterUtilityModal from "./_components/WaterUtilityModal";
import GasUtilityModal from "./_components/GasUtilityModal";
import RentOverviewModal from "./_components/RentOverviewModal";

const OwnerHome = () => {
  const router = useRouter();
  const [stats, setStats] = useState<RentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState<House | null>(null);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);
  const [isRentOverviewOpen, setIsRentOverviewOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const month = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const year = currentDate.getFullYear();

      setCurrentMonth(month);
      setCurrentYear(year);

      const [statsData, houseData] = await Promise.all([
        getMonthlyStatsAction(month, year),
        getHouseAction(),
      ]);

      setStats(statsData);
      setHouse(houseData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleHouseUpdate = async () => {
    const houseData = await getHouseAction();
    setHouse(houseData);
  };

  return (
    <div className="flex flex-col h-full">
      <OwnerInfo house={house} />

      <div className="p-5 px-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-slate-800">
            Monthly Overview
          </div>
          <button
            onClick={() => setIsRentOverviewOpen(true)}
            className="px-4 py-2 bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition"
          >
            View Details
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ) : (
              <>
                <div className="text-[28px] font-extrabold text-slate-800 mb-2">
                  ৳{stats?.totalCollected.toLocaleString() || "0"}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  Rent Collected
                </div>
                <div className="text-xs mt-2 flex items-center gap-1 text-green-500">
                  {stats?.paidCount || 0} tenant
                  {stats?.paidCount !== 1 ? "s" : ""} paid the rent
                </div>
              </>
            )}
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-red-200 rounded mb-2"></div>
                <div className="h-4 bg-red-200 rounded w-2/3"></div>
              </div>
            ) : (
              <>
                <div className="text-[28px] font-extrabold text-red-600 mb-2">
                  ৳
                  {(
                    (stats?.totalPending || 0) + (stats?.totalOverdue || 0)
                  ).toLocaleString() || "0"}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  Pending Rent
                </div>
                <div className="text-xs mt-2 flex items-center gap-1 text-red-500">
                  {(stats?.pendingCount || 0) +
                    (stats?.partialCount || 0) +
                    (stats?.overdueCount || 0)}{" "}
                  tenant
                  {(stats?.pendingCount || 0) +
                    (stats?.partialCount || 0) +
                    (stats?.overdueCount || 0) !==
                  1
                    ? "s"
                    : ""}{" "}
                  pending
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xl font-bold text-slate-800 mb-4">
            Utility Section
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => router.push("/electrcity-entry")}
              className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#4a90e2]"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl bg-gradient-to-br from-amber-400 to-amber-600">
                ⚡
              </div>
              <div className="text-base font-bold text-slate-800 mb-1">
                Manage
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Electricity
              </div>
            </div>
            <div
              onClick={() => setIsWaterModalOpen(true)}
              className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#4a90e2]"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl bg-gradient-to-br from-blue-500 to-blue-700">
                💧
              </div>
              <div className="text-base font-bold text-slate-800 mb-1">
                {house && house.waterBill > 0
                  ? `৳${house.waterBill.toLocaleString()}`
                  : "Set Amount"}
              </div>
              <div className="text-xs text-slate-500 font-medium">Water</div>
            </div>
            <div
              onClick={() => setIsGasModalOpen(true)}
              className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#4a90e2]"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl bg-gradient-to-br from-violet-500 to-violet-600">
                🔥
              </div>
              <div className="text-base font-bold text-slate-800 mb-1">
                {house && house.gasBill > 0
                  ? `৳${house.gasBill.toLocaleString()}`
                  : "Set Amount"}
              </div>
              <div className="text-xs text-slate-500 font-medium">Gas</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xl font-bold text-slate-800 mb-4">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/tenant-management"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                👥
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Tenant Management
              </div>
            </Link>
            <Link
              href="/upload-notice"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                📋
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Upload Notice
              </div>
            </Link>
            <Link
              href="/complain/view"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px relative"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                📞
              </div>
              <div className="text-sm font-semibold text-slate-800">
                View Complaints
              </div>
            </Link>
            <Link
              href="/flat-management"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                🏢
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Flat Management
              </div>
            </Link>
          </div>
        </div>
      </div>

      <WaterUtilityModal
        isOpen={isWaterModalOpen}
        onClose={() => setIsWaterModalOpen(false)}
        currentValue={house?.waterBill || 0}
        onUpdate={handleHouseUpdate}
      />

      <GasUtilityModal
        isOpen={isGasModalOpen}
        onClose={() => setIsGasModalOpen(false)}
        currentValue={house?.gasBill || 0}
        onUpdate={handleHouseUpdate}
      />

      <RentOverviewModal
        isOpen={isRentOverviewOpen}
        onClose={() => setIsRentOverviewOpen(false)}
        month={currentMonth}
        year={currentYear}
      />
    </div>
  );
};

export default OwnerHome;
