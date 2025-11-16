"use client";

import Link from "next/link";
import { useState } from "react";

const TenantManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState("");

  const handleAssignClick = (flatName: string) => {
    setSelectedFlat(flatName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlat("");
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white relative flex-shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
          <div className="flex items-center gap-4 relative z-[2]">
            <Link
              href="/"
              className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all duration-300 flex-shrink-0 no-underline hover:bg-white/20"
            >
              ←
            </Link>
            <div className="text-[22px] font-bold">Tenant Management</div>
          </div>
        </div>

        <div className="p-5 px-6 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4" id="tenantList">
            <div
              className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e2e8f0] transition-all duration-300 animate-[slideInUp_0.5s_ease_forwards] p-5"
              data-flat-id="A-1"
            >
              <div className="text-lg font-bold text-slate-800 mb-4">
                Flat A-1
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xl font-semibold">
                    AM
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-800">
                      Abdullah Al Masud
                    </div>
                    <div className="text-sm text-slate-500">
                      📞 01712-345678
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">October Rent</span>
                  <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-green-100 text-green-800">
                    Paid
                  </span>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e2e8f0] transition-all duration-300 animate-[slideInUp_0.5s_ease_forwards] p-5"
              data-flat-id="A-2"
            >
              <div className="text-lg font-bold text-slate-800 mb-4">
                Flat A-2
              </div>
              <div className="text-center py-5">
                <div className="text-base text-slate-500 mb-4">
                  This flat is vacant.
                </div>
                <button
                  onClick={() => handleAssignClick("Flat A-2")}
                  className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white border-none rounded-xl px-6 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 hover:opacity-90"
                  data-flat-name="Flat A-2"
                >
                  Assign a Tenant
                </button>
              </div>
            </div>

            <div
              className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e2e8f0] transition-all duration-300 animate-[slideInUp_0.5s_ease_forwards] p-5"
              data-flat-id="B-1"
            >
              <div className="text-lg font-bold text-slate-800 mb-4">
                Flat B-1
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xl font-semibold">
                    FK
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-800">
                      Fatima Khan
                    </div>
                    <div className="text-sm text-slate-500">
                      📞 01998-765432
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">October Rent</span>
                  <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-100 text-red-800">
                    Due
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 transition-all duration-300 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        id="assignTenantModal"
      >
        <div
          className={`bg-white rounded-[20px] w-full max-w-[350px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transition-all duration-300 ${
            isModalOpen ? "translate-y-0" : "translate-y-5"
          }`}
        >
          <div className="p-5 px-6 flex justify-between items-center border-b border-[#e2e8f0]">
            <div className="text-lg font-bold text-slate-800">
              Assign Tenant to <span id="modalFlatName">{selectedFlat}</span>
            </div>
            <button
              onClick={handleCloseModal}
              className="w-8 h-8 border-none bg-slate-100 text-slate-500 rounded-full cursor-pointer text-lg hover:bg-slate-200 transition-colors"
              id="closeModalBtn"
            >
              ×
            </button>
          </div>
          <form id="assignTenantForm">
            <div className="p-6">
              <div className="mb-5">
                <label
                  htmlFor="tenantName"
                  className="block text-sm font-semibold text-slate-800 mb-2"
                >
                  Tenant's Full Name
                </label>
                <input
                  type="text"
                  id="tenantName"
                  className="w-full bg-slate-50 border-2 border-[#e2e8f0] rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10"
                  placeholder="e.g., Rahim Ahmed"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-semibold text-slate-800 mb-2"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  className="w-full bg-slate-50 border-2 border-[#e2e8f0] rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10"
                  placeholder="e.g., 01xxxxxxxxx"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="advancePaid"
                  className="block text-sm font-semibold text-slate-800 mb-2"
                >
                  Advance Paid (৳)
                </label>
                <input
                  type="number"
                  id="advancePaid"
                  className="w-full bg-slate-50 border-2 border-[#e2e8f0] rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10"
                  placeholder="e.g., 20000"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="rentStartDate"
                  className="block text-sm font-semibold text-slate-800 mb-2"
                >
                  Rent Start Date
                </label>
                <input
                  type="date"
                  id="rentStartDate"
                  className="w-full bg-slate-50 border-2 border-[#e2e8f0] rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10"
                  required
                />
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-3.5 text-white text-base font-bold cursor-pointer hover:opacity-90 transition-opacity"
              >
                Confirm Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TenantManagement;
