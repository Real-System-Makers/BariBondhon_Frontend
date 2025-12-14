"use client";

import { useState, useEffect } from "react";
import { getNoticePeriodAction, setNoticePeriodAction } from "@/lib/actions/move-out.actions";

interface NoticePeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoticePeriodModal = ({ isOpen, onClose }: NoticePeriodModalProps) => {
  const [period, setPeriod] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPeriod();
    }
  }, [isOpen]);

  const fetchPeriod = async () => {
    setIsLoading(true);
    // Assuming we have an action to get the period, creating placeholder now
    // Actually I implemented one in move-out.actions.ts
    const data = await getNoticePeriodAction();
    if (data) {
      setPeriod(data.minimumNoticePeriod);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await setNoticePeriodAction(period);
    setIsSaving(false);
    if (result.success) {
      onClose();
    } else {
      alert(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-[24px] w-full max-w-md shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Notice Period Settings
            </h2>
            <p className="text-slate-500 mt-1">
              Set the minimum notice period required for tenants to move out.
            </p>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Notice (Months)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPeriod(Math.max(1, period - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-bold text-2xl text-slate-800">
                    {period} {period === 1 ? "Month" : "Months"}
                  </div>
                  <button
                    onClick={() => setPeriod(period + 1)}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-100">
                ⚠️ Changing this will only affect new move-out requests.
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePeriodModal;
