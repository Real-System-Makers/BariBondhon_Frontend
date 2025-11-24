"use client";

import { useEffect, useState } from "react";
import { getTenantRentsAction } from "@/lib/actions/rent.actions";
import { Rent } from "@/lib/types/rent";

interface RentBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: (rent: Rent) => void;
}

const RentBreakdownModal = ({
  isOpen,
  onClose,
  onPay,
}: RentBreakdownModalProps) => {
  const [currentRent, setCurrentRent] = useState<Rent | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchRents = async () => {
        const rents = await getTenantRentsAction();
        if (rents.length > 0) {
          setCurrentRent(rents[0]);
        }
      };
      fetchRents();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getMonthName = (monthStr?: string) => {
    if (!monthStr) return "Current Month";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[30px] w-full max-w-lg max-h-[90vh] flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Rent Breakdown</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl w-7 h-7 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {!currentRent ? (
            <div className="text-center text-slate-500 py-6 text-sm">
              No rent data available
            </div>
          ) : (
            <>
              <div className="text-xs text-gray-600 mb-1">
                {getMonthName(currentRent.month)}
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-4">
                ৳{currentRent.totalAmount.toLocaleString()}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700 font-medium">
                    Base Rent
                  </span>
                  <span className="text-sm text-gray-900 font-semibold">
                    ৳{currentRent.baseRent.toLocaleString()}
                  </span>
                </div>

                {currentRent.electricityBill > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5">
                      <span>⚡</span> Electricity
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">
                      ৳{currentRent.electricityBill.toLocaleString()}
                    </span>
                  </div>
                )}

                {currentRent.gasBill > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5">
                      <span>🔥</span> Gas
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">
                      ৳{currentRent.gasBill.toLocaleString()}
                    </span>
                  </div>
                )}

                {currentRent.waterBill > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5">
                      <span>💧</span> Water
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">
                      ৳{currentRent.waterBill.toLocaleString()}
                    </span>
                  </div>
                )}

                {currentRent.serviceBill > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5">
                      <span>🔧</span> Service Charge
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">
                      ৳{currentRent.serviceBill.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {currentRent.paidAmount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-green-700 font-medium">
                      Paid Amount
                    </span>
                    <span className="text-sm text-green-900 font-bold">
                      ৳{currentRent.paidAmount.toLocaleString()}
                    </span>
                  </div>
                  {currentRent.paymentMethod && (
                    <div className="text-xs text-green-600">
                      via {currentRent.paymentMethod}
                    </div>
                  )}
                </div>
              )}

              {currentRent.dueAmount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-red-700 font-medium">
                      Remaining Balance
                    </span>
                    <span className="text-sm text-red-900 font-bold">
                      ৳{currentRent.dueAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {currentRent.note && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 font-medium mb-1">
                    Note:
                  </div>
                  <div className="text-sm text-slate-700">
                    {currentRent.note}
                  </div>
                </div>
              )}

              {currentRent.status !== "Paid" && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      onClose();
                      onPay(currentRent);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Pay Now ৳{currentRent.dueAmount.toLocaleString()}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentBreakdownModal;
