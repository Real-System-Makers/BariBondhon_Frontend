"use client";

import Link from "next/link";
import { useState } from "react";

const UploadNotice = () => {
  const [selectedType, setSelectedType] = useState("Maintenance");
  const [isUrgent, setIsUrgent] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-5 text-white flex items-center gap-4">
        <Link
          href="/"
          className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all duration-300 hover:bg-white/20 no-underline"
        >
          ←
        </Link>
        <div className="text-[22px] font-bold">Post a New Notice</div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <form id="notice-form">
          <div className="mb-6">
            <label
              htmlFor="notice-title"
              className="block text-base font-semibold text-slate-800 mb-3"
            >
              Notice Title
            </label>
            <input
              type="text"
              id="notice-title"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base text-gray-700 transition-all duration-300 font-inherit focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10"
              placeholder="e.g., Lift Maintenance Schedule"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="notice-details"
              className="block text-base font-semibold text-slate-800 mb-3"
            >
              Details
            </label>
            <textarea
              id="notice-details"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base text-gray-700 transition-all duration-300 font-inherit focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10 min-h-[120px] resize-y"
              placeholder="Write the full notice content here..."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-slate-800 mb-3">
              Notice Type
            </label>
            <div className="flex gap-2 flex-wrap">
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === "Maintenance"
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Maintenance"
                onClick={() => setSelectedType("Maintenance")}
              >
                Maintenance
              </div>
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === "Urgent"
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Urgent"
                onClick={() => setSelectedType("Urgent")}
              >
                Urgent
              </div>
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === "Information"
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Information"
                onClick={() => setSelectedType("Information")}
              >
                Information
              </div>
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === "Meeting"
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Meeting"
                onClick={() => setSelectedType("Meeting")}
              >
                Meeting
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3">
              <label
                htmlFor="is-urgent"
                className="block text-base font-semibold text-slate-800 mb-0"
              >
                Mark as Urgent
              </label>
              <label className="relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  id="is-urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[24px] transition-all duration-[400ms] ${
                    isUrgent ? "bg-[#4a90e2]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute h-[18px] w-[18px] left-[3px] bottom-[3px] bg-white rounded-full transition-all duration-[400ms] ${
                      isUrgent ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-slate-800 mb-3">
              Attach File (Optional)
            </label>
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-6 text-center cursor-pointer transition-all duration-300 hover:border-[#4a90e2] hover:bg-slate-50"
            >
              <span
                id="file-upload-text"
                className="text-sm text-slate-500 font-medium"
              >
                📎 Click to upload a file
              </span>
            </label>
            <input type="file" id="file-upload" className="hidden" />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-4 text-white text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgba(74,144,226,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(74,144,226,0.4)]"
          >
            Post Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNotice;
