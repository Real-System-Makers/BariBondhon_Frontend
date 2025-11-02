"use client";

import { useState } from "react";
import Link from "next/link";

const TenantHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-gradient-to-br from-[#10b981] to-[#059669] pt-[50px] px-6 pb-[30px] text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
          <div className="relative z-[2]">
            <div>
              <div className="text-base opacity-90 mb-1">Welcome back,</div>
              <div className="text-2xl font-bold mb-2">Fatima Khatun</div>
              <div className="text-sm opacity-85">
                Apartment 4B • Green Valley Complex
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 px-6 pb-[100px] flex-1 overflow-y-auto">
          <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🏠 Monthly Rent
          </div>
          <div
            className="bg-gradient-to-br from-white to-slate-50 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-[#10b981] mb-4 relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
            id="rentCard"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[32px] font-extrabold text-gray-800 leading-none">
                  ৳30,800
                </div>
                <div className="text-gray-600 text-base mb-2">
                  December 2025
                </div>
              </div>
              <div className="bg-[#dcfce7] text-[#166534] px-4 py-2 rounded-[20px] text-sm font-semibold flex items-center gap-1.5">
                ✓ Paid
              </div>
            </div>
            <div className="text-gray-700 text-sm font-medium">
              Next due: January 5, 2026
            </div>
          </div>

          <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            📄 Digital Receipt
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-base font-semibold text-gray-800">
                December 2025 Receipt
              </div>
              <div className="text-sm text-gray-600">Dec 03, 2025</div>
            </div>
            <button className="bg-gradient-to-br from-[#10b981] to-[#059669] text-white border-none rounded-xl px-5 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 w-full justify-center hover:opacity-90">
              📥 Download Receipt
            </button>
          </div>

          <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🔧 Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link
              href="/complain/issue"
              className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
              target="_blank"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
                📞
              </div>
              <div className="text-sm font-semibold text-gray-800">
                Complaint
              </div>
            </Link>
            <Link
              href="/payment"
              className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
                💳
              </div>
              <div className="text-sm font-semibold text-gray-800">Payment</div>
            </Link>
            <Link
              href="/technician"
              className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
                👨‍🔧
              </div>
              <div className="text-sm font-semibold text-gray-800">
                Technician
              </div>
            </Link>
            <Link
              href="/moveout/submission"
              className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
              target="_blank"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
                🚶
              </div>
              <div className="text-sm font-semibold text-gray-800">
                Move Out
              </div>
            </Link>
          </div>

          <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            📢 Notices from Owner
          </div>
          <div className="flex flex-col gap-3">
            <div className="p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 transition-colors duration-300 cursor-pointer hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[15px] font-semibold text-gray-800">
                  Water Supply Maintenance
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-3">
                  2 days ago
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Water supply will be stopped tomorrow from 10 AM to 2 PM.
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 transition-colors duration-300 cursor-pointer hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[15px] font-semibold text-gray-800">
                  Building Security Update
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-3">
                  1 week ago
                </div>
              </div>
              <div className="text-sm text-gray-600">
                A new security guard has been appointed for the night shift.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 transition-all duration-300 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        id="rentModal"
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className={`bg-white rounded-[20px] w-full max-w-[350px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transition-all duration-300 ${
            isModalOpen ? "translate-y-0" : "translate-y-5"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 px-6 flex justify-between items-center border-b border-slate-200">
            <div className="text-lg font-bold text-gray-800">
              Rent Breakdown (December)
            </div>
            <button
              className="w-8 h-8 border-none bg-slate-100 text-slate-500 rounded-full cursor-pointer text-lg hover:bg-slate-200 transition-colors"
              id="closeRentModalBtn"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="px-6 pb-6">
            <ul className="list-none p-0 mt-5">
              <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
                <span className="text-gray-600">Basic Rent</span>
                <span className="font-semibold text-gray-800">৳25,000</span>
              </li>
              <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
                <span className="text-gray-600">Electricity Bill</span>
                <span className="font-semibold text-gray-800">৳2,800</span>
              </li>
              <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
                <span className="text-gray-600">Water Bill</span>
                <span className="font-semibold text-gray-800">৳1,200</span>
              </li>
              <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
                <span className="text-gray-600">Gas Bill</span>
                <span className="font-semibold text-gray-800">৳1,800</span>
              </li>
            </ul>
            <div className="flex justify-between pt-4 mt-2 border-t-2 border-gray-800 text-lg font-extrabold text-gray-800">
              <span>Total Rent</span>
              <span>৳30,800</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantHome;
