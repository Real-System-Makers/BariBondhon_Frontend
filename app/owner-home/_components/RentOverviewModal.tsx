"use client";

import { useEffect, useState } from "react";
import { getRentsAction } from "@/lib/actions/rent.actions";
import { Rent, RentStatus } from "@/lib/types/rent";

interface RentOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  month: string;
  year: number;
}

const RentOverviewModal = ({ isOpen, onClose, month, year }: RentOverviewModalProps) => {
  const [rents, setRents] = useState<Rent[]>([]);
  const [filter, setFilter] = useState<"all" | RentStatus>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRents();
    }
  }, [isOpen, month, year]);

  const fetchRents = async () => {
    setLoading(true);
    const data = await getRentsAction({ month, year });
    setRents(data);
    setLoading(false);
  };

  const filteredRents = rents.filter((rent) =>
    filter === "all" ? true : rent.status === filter
  );

  const getStatusColor = (status: RentStatus) => {
    switch (status) {
      case RentStatus.PAID:
        return "bg-green-100 text-green-700 border border-green-300";
      case RentStatus.PENDING:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case RentStatus.PARTIAL:
        return "bg-orange-100 text-orange-700 border border-orange-300";
      case RentStatus.OVERDUE:
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Rent Overview - {month}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filter === "all"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({rents.length})
            </button>
            <button
              onClick={() => setFilter(RentStatus.PAID)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filter === RentStatus.PAID
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Paid ({rents.filter((r) => r.status === RentStatus.PAID).length})
            </button>
            <button
              onClick={() => setFilter(RentStatus.PENDING)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filter === RentStatus.PENDING
                  ? "bg-yellow-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Pending ({rents.filter((r) => r.status === RentStatus.PENDING).length})
            </button>
            <button
              onClick={() => setFilter(RentStatus.OVERDUE)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filter === RentStatus.OVERDUE
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Overdue ({rents.filter((r) => r.status === RentStatus.OVERDUE).length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-8 text-slate-500">Loading...</div>
          ) : filteredRents.length === 0 ? (
            <div className="text-center py-8 text-slate-500">No rents found</div>
          ) : (
            <div className="space-y-3">
              {filteredRents.map((rent) => (
                <div
                  key={rent._id}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-slate-800 text-lg">
                        {rent.flat.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {rent.tenant.name}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(
                        rent.status
                      )}`}
                    >
                      {rent.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">Base Rent:</span>
                      <span className="ml-2 font-semibold">৳{rent.baseRent.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Electricity:</span>
                      <span className="ml-2 font-semibold">৳{rent.electricityBill.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Water:</span>
                      <span className="ml-2 font-semibold">৳{rent.waterBill.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Gas:</span>
                      <span className="ml-2 font-semibold">৳{rent.gasBill.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-slate-600 text-sm">Total:</span>
                      <span className="ml-2 font-bold text-lg text-slate-800">
                        ৳{rent.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    {rent.status !== RentStatus.PAID && (
                      <div className="text-sm">
                        <span className="text-slate-500">Due:</span>
                        <span className="ml-1 font-semibold text-red-600">
                          ৳{rent.dueAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentOverviewModal;
