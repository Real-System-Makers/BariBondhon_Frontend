"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MoveOutModal from "./MoveOutModal";
import { getNoticePeriodAction } from "@/lib/actions/move-out.actions";

const QuickActions = () => {
  const [isMoveOutModalOpen, setIsMoveOutModalOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<any>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const data = await getNoticePeriodAction();
      if (data?.activeRequest) {
        setActiveRequest(data.activeRequest);
      } else {
        setActiveRequest(null);
      }
    };
    checkStatus();
  }, [isMoveOutModalOpen]);

  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🔧 Quick Actions
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link
          href="/complain/issue"
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            📞
          </div>
          <div className="text-sm font-semibold text-gray-800">Complaint</div>
        </Link>
        <div
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            💳
          </div>
          <div className="text-sm font-semibold text-gray-800">Payment</div>
        </div>

        <div
          onClick={() => setIsMoveOutModalOpen(true)}
          className="col-span-2 bg-white border-2 border-slate-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            🚶
          </div>
          <div className="text-sm font-semibold text-gray-800">
            Move Out
          </div>
        </div>
      </div>

      <MoveOutModal
        isOpen={isMoveOutModalOpen}
        onClose={() => setIsMoveOutModalOpen(false)}
        activeRequestStatus={activeRequest}
      />
    </>
  );
};

export default QuickActions;
