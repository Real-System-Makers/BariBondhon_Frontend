"use client";

import { ChangeEvent, useState } from "react";

const ComplaintIssue = () => {
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("📝");

  const handleIssueTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.selectedOptions[0];
    const icon = selected.getAttribute("data-icon") || "📝";
    setSelectedIcon(icon);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 pt-12 pb-5 px-6 text-white relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all hover:bg-white/20">
            ←
          </div>
          <div className="flex-1">
            <div className="text-[22px] font-bold mb-1">
              Maintenance Request
            </div>
            <div className="text-sm opacity-85">
              Report issues and track progress
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 h-[calc(100%-110px)] overflow-y-auto">
        <div className="mb-8 animate-[fadeInUp_0.6s_ease_forwards]">
          <div className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            🛠️ New Request
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Issue Type
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl pointer-events-none transition-all">
                {selectedIcon}
              </div>
              <select
                className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl pl-[60px] pr-5 text-base text-gray-700 cursor-pointer outline-none transition-all appearance-none focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px center",
                  backgroundSize: "20px",
                }}
                id="issueType"
                onChange={handleIssueTypeChange}
              >
                <option value="">Select issue type</option>
                <option value="water" data-icon="💧">
                  Water Issue
                </option>
                <option value="electricity" data-icon="⚡">
                  Electricity Problem
                </option>
                <option value="lift" data-icon="🛗">
                  Lift/Elevator
                </option>
                <option value="others" data-icon="🔧">
                  Others
                </option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                className="w-full min-h-[120px] bg-white border-2 border-gray-200 rounded-2xl p-4 text-base text-gray-700 outline-none transition-all resize-y font-[inherit] leading-6 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                id="description"
                placeholder="Please describe the issue in detail. Include location, severity, and any relevant information..."
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="absolute bottom-3 right-4 text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded-md">
                {description.length}/500
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Upload Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center transition-all cursor-pointer relative hover:border-emerald-500 hover:bg-emerald-50">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl text-white">
                📷
              </div>
              <div className="text-base font-semibold text-gray-700 mb-1">
                Upload Photo
              </div>
              <div className="text-sm text-gray-500">
                Tap to add image or drag and drop
              </div>
              <input
                type="file"
                className="hidden"
                id="fileInput"
                accept="image/*"
              />
            </div>
          </div>

          <button
            className="w-full h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none rounded-2xl text-lg font-semibold cursor-pointer transition-all shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_12px_40px_rgba(16,185,129,0.4)] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            id="submitBtn"
            disabled
          >
            Submit Request
          </button>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 mb-6 animate-[fadeInUp_0.6s_ease_forwards] [animation-delay:0.1s]">
          <div className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            📊 Current Request Status
          </div>
          <div className="relative pl-10 before:content-[''] before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
            <div className="relative mb-6">
              <div className="absolute -left-7 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-emerald-500 text-white">
                ✓
              </div>
              <div className="pl-2">
                <div className="text-base font-semibold text-emerald-500 mb-1">
                  Request Submitted
                </div>
                <div className="text-sm text-gray-500 leading-snug">
                  Your maintenance request has been received
                </div>
                <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
              </div>
            </div>
            <div className="relative mb-6">
              <div className="absolute -left-7 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-amber-500 text-white animate-[pulse-ring_2s_infinite]">
                ⏳
              </div>
              <div className="pl-2">
                <div className="text-base font-semibold text-amber-500 mb-1">
                  In Progress
                </div>
                <div className="text-sm text-gray-500 leading-snug">
                  Maintenance team has been assigned and working on it
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Started 1 hour ago
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-7 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-gray-200 text-gray-400">
                ⭕
              </div>
              <div className="pl-2">
                <div className="text-base font-semibold text-gray-800 mb-1">
                  Resolved
                </div>
                <div className="text-sm text-gray-500 leading-snug">
                  Issue will be marked as completed
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Estimated completion
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          📋 Previous Requests
        </div>
        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 animate-[fadeInUp_0.6s_ease_forwards] [animation-delay:0.2s]">
          <div className="p-4 border-b border-gray-100 transition-colors cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[15px] font-semibold text-gray-800">
                ⚡ Electricity Problem
              </div>
              <div className="text-xs text-gray-400">Dec 25</div>
            </div>
            <div className="text-sm text-gray-500 leading-snug mb-2">
              Power outage in bedroom, no electricity for 2 days
            </div>
            <span className="inline-block px-3 py-1 rounded-xl text-xs font-semibold bg-green-100 text-green-800">
              Resolved
            </span>
          </div>

          <div className="p-4 border-b border-gray-100 transition-colors cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[15px] font-semibold text-gray-800">
                🛗 Lift Issue
              </div>
              <div className="text-xs text-gray-400">Dec 20</div>
            </div>
            <div className="text-sm text-gray-500 leading-snug mb-2">
              Elevator making strange noises and stopping between floors
            </div>
            <span className="inline-block px-3 py-1 rounded-xl text-xs font-semibold bg-green-100 text-green-800">
              Resolved
            </span>
          </div>

          <div className="p-4 transition-colors cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[15px] font-semibold text-gray-800">
                💧 Water Leakage
              </div>
              <div className="text-xs text-gray-400">Dec 15</div>
            </div>
            <div className="text-sm text-gray-500 leading-snug mb-2">
              Kitchen tap leaking continuously, water wastage
            </div>
            <span className="inline-block px-3 py-1 rounded-xl text-xs font-semibold bg-green-100 text-green-800">
              Resolved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintIssue;
