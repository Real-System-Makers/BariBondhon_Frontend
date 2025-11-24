"use client";

import { useState, useEffect } from "react";
import { updateHouseAction } from "@/lib/actions/house.actions";

interface GasUtilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentValue: number;
  onUpdate: () => void;
}

export default function GasUtilityModal({
  isOpen,
  onClose,
  currentValue,
  onUpdate,
}: GasUtilityModalProps) {
  const [gasBill, setGasBill] = useState(currentValue.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setGasBill(currentValue.toString());
    }
  }, [isOpen, currentValue]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateHouseAction({ gasBill: parseFloat(gasBill) });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update gas bill:", error);
      alert("Failed to update gas bill. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Set Gas Bill
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Monthly Gas Bill (৳)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={gasBill}
              onChange={(e) => setGasBill(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-br from-violet-500 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
