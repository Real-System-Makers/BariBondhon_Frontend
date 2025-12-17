"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Rent, RentStatus } from "@/lib/types/rent";
import { getPaymentHistoryAction } from "@/lib/actions/rent.actions";
import PaymentHistoryCard from "./_components/PaymentHistoryCard";

const PaymentHistoryPage = () => {
  const router = useRouter();
  const [paymentHistory, setPaymentHistory] = useState<Rent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setIsLoading(true);
      const result = await getPaymentHistoryAction();
      setPaymentHistory(result.data);
      setTotal(result.total);
      setIsLoading(false);
    };

    fetchPaymentHistory();
  }, []);

  // Separate pending and completed payments
  const pendingPayments = paymentHistory.filter(
    (rent) =>
      rent.status === RentStatus.PENDING ||
      rent.status === RentStatus.PARTIAL ||
      rent.status === RentStatus.OVERDUE
  );

  const completedPayments = paymentHistory.filter(
    (rent) => rent.status === RentStatus.PAID
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#e8f5f1] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white p-6 pb-8">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold">Payment History</h1>
            <p className="text-sm text-white/90">
              {total} {total === 1 ? "record" : "records"} found
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-[100px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981]"></div>
          </div>
        ) : paymentHistory.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Payment History
            </h3>
            <p className="text-sm text-gray-500">
              Your payment records will appear here
            </p>
          </div>
        ) : (
          <>
            {/* Pending Payments Section */}
            {pendingPayments.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Pending Payments
                  </h2>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {pendingPayments.length}
                  </span>
                </div>
                {pendingPayments.map((rent) => (
                  <PaymentHistoryCard key={rent._id} rent={rent} />
                ))}
              </div>
            )}

            {/* Payment History Section */}
            {completedPayments.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Completed Payments
                  </h2>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {completedPayments.length}
                  </span>
                </div>
                {completedPayments.map((rent) => (
                  <PaymentHistoryCard key={rent._id} rent={rent} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
