"use client";

import { useEffect, useState } from "react";
import { getTenantRentsAction } from "@/lib/actions/rent.actions";
import { Rent } from "@/lib/types/rent";

interface MonthlyRentCardProps {
  onOpenModal: () => void;
}

const MonthlyRentCard = ({ onOpenModal }: MonthlyRentCardProps) => {
  const [currentRent, setCurrentRent] = useState<Rent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRents = async () => {
      const rents = await getTenantRentsAction();
      if (rents.length > 0) {
        // Get the most recent rent
        setCurrentRent(rents[0]);
      }
      setLoading(false);
    };
    fetchRents();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-slate-200 mb-4 animate-pulse">
        <div className="h-24"></div>
      </div>
    );
  }

  if (!currentRent) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-slate-200 mb-4">
        <div className="text-center text-slate-500">No rent data available</div>
      </div>
    );
  }

  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return {
          bg: "bg-[#dcfce7]",
          text: "text-[#166534]",
          border: "border-[#10b981]",
          icon: "✓",
        };
      case "Partial":
        return {
          bg: "bg-[#fef3c7]",
          text: "text-[#92400e]",
          border: "border-[#f59e0b]",
          icon: "⏳",
        };
      case "Pending":
        return {
          bg: "bg-[#fee2e2]",
          text: "text-[#991b1b]",
          border: "border-[#ef4444]",
          icon: "⏰",
        };
      case "Overdue":
        return {
          bg: "bg-[#fecaca]",
          text: "text-[#7f1d1d]",
          border: "border-[#dc2626]",
          icon: "❌",
        };
      default:
        return {
          bg: "bg-slate-100",
          text: "text-slate-700",
          border: "border-slate-300",
          icon: "○",
        };
    }
  };

  const statusStyle = getStatusColor(currentRent.status);

  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏠 Monthly Rent
      </div>
      <div
        className={`bg-gradient-to-br from-white to-slate-50 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 ${statusStyle.border} mb-4 relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]`}
        id="rentCard"
        onClick={onOpenModal}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[32px] font-extrabold text-gray-800 leading-none">
              ৳{currentRent.totalAmount.toLocaleString()}
            </div>
            <div className="text-gray-600 text-base mb-2">
              {getMonthName(currentRent.month)}
            </div>
          </div>
          <div
            className={`${statusStyle.bg} ${statusStyle.text} px-4 py-2 rounded-[20px] text-sm font-semibold flex items-center gap-1.5`}
          >
            {statusStyle.icon} {currentRent.status}
          </div>
        </div>
        {currentRent.status !== "Paid" && (
          <div className="text-gray-700 text-sm font-medium">
            Due: {new Date(currentRent.dueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {currentRent.dueAmount > 0 && (
              <span className="ml-2 text-red-600">
                (৳{currentRent.dueAmount.toLocaleString()} remaining)
              </span>
            )}
          </div>
        )}
        {currentRent.status === "Paid" && currentRent.paidDate && (
          <div className="text-green-700 text-sm font-medium">
            Paid on:{" "}
            {new Date(currentRent.paidDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MonthlyRentCard;

