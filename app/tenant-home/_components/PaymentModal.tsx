"use client";

import { useState } from "react";
import { recordPaymentAction } from "@/lib/actions/rent.actions";
import { Rent } from "@/lib/types/rent";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  rent: Rent | null;
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, rent, onPaymentSuccess }: PaymentModalProps) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const paymentMethods = [
    { value: "Cash", label: "Cash", icon: "💵" },
    { value: "bKash", label: "bKash", icon: "📱" },
    { value: "Nagad", label: "Nagad", icon: "📱" },
    { value: "Rocket", label: "Rocket", icon: "🚀" },
    { value: "Bank Transfer", label: "Bank Transfer", icon: "🏦" },
    { value: "Card", label: "Card", icon: "💳" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rent) {
      setError("Internal Error: No rent selected");
      return;
    }

    const paymentAmount = parseFloat(amount);
    console.log("Submitting payment:", { amount: paymentAmount, paymentMethod, note });

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError(`Invalid amount: ${amount}`);
      return;
    }

    const adjustedTotal = rent.adjustedTotalAmount || rent.totalAmount;
    if (paymentAmount > rent.dueAmount) {
      setError(`Amount cannot exceed due amount of ৳${rent.dueAmount.toLocaleString()}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await recordPaymentAction(rent._id, {
        amount: paymentAmount,
        paymentMethod,
        note,
      });

      // Success
      onPaymentSuccess();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error("Payment submission error:", err);
      setError(err.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setPaymentMethod("bKash");
    setNote("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getMonthName = (monthStr?: string) => {
    if (!monthStr) return "Current Month";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (!isOpen || !rent) return null;

  const adjustedTotal = rent.adjustedTotalAmount || rent.totalAmount;
  const suggestedAmount = rent.dueAmount;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[30px] w-full max-w-md p-6 animate-scaleIn relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Pay Rent</h2>

        {/* Rent Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-4 mb-6 border border-blue-100">
          <div className="text-sm text-slate-600 mb-1">{getMonthName(rent.month)}</div>
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-sm text-slate-600">Total Amount:</span>
            <span className="text-xl font-bold text-slate-800">
              ৳{adjustedTotal.toLocaleString()}
            </span>
          </div>
          {rent.lateFee > 0 && (
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-red-600">Late Fee:</span>
              <span className="text-red-600 font-semibold">
                ৳{rent.lateFee.toLocaleString()}
              </span>
            </div>
          )}
          {rent.paidAmount > 0 && (
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-green-600">Already Paid:</span>
              <span className="text-green-600 font-semibold">
                ৳{rent.paidAmount.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-blue-200">
            <span className="text-sm font-semibold text-slate-700">Amount Due:</span>
            <span className="text-lg font-bold text-blue-600">
              ৳{rent.dueAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="paymentAmount" className="block text-sm font-semibold text-slate-700 mb-2">
              Payment Amount
            </label>
            <div className="relative">
              <input
                id="paymentAmount"
                name="paymentAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-semibold"
                required
                step="0.01"
                min="0"
                max={suggestedAmount}
              />
              <button
                type="button"
                onClick={() => setAmount(suggestedAmount.toString())}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 font-medium"
              >
                Pay Full
              </button>
            </div>
            <p className="text-xs text-gray-500 ml-1">
              Enter the amount you want to pay now
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-blue-600 font-medium">
                Total Due
              </span>
              <span className="text-lg font-bold text-blue-700">
                ৳{rent.baseRent + rent.electricityBill + rent.waterBill + rent.gasBill - rent.paidAmount}
              </span>
            </div>
            <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    ((Number(amount) || 0) /
                      (rent.baseRent +
                        rent.electricityBill +
                        rent.waterBill +
                        rent.gasBill -
                        rent.paidAmount)) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === method.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className="text-xs font-medium text-slate-700">
                    {method.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add transaction reference or note..."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
              rows={2}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            id="pay-submit-button"
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Pay ৳{amount || "0"}</span>
                <div className="bg-white/20 p-1 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-4">
          This is a simulated payment. In production, integrate with actual payment gateways.
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
