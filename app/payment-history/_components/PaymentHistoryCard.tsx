import { Rent, RentStatus } from "@/lib/types/rent";

interface PaymentHistoryCardProps {
  rent: Rent;
}

const PaymentHistoryCard = ({ rent }: PaymentHistoryCardProps) => {
  // Format month/year display
  const monthYear = `${rent.month.split("-")[1]}/${rent.year}`;
  
  // Get status color
  const getStatusColor = (status: RentStatus) => {
    switch (status) {
      case RentStatus.PAID:
        return "bg-green-100 text-green-800 border-green-200";
      case RentStatus.PARTIAL:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case RentStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case RentStatus.OVERDUE:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-4 transition-all duration-300 hover:border-[#10b981] hover:shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Rent for {monthYear}
          </h3>
          <p className="text-sm text-gray-500">{rent.flat?.name}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
            rent.status
          )}`}
        >
          {rent.status}
        </span>
      </div>

      {/* Amount Details */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Total Amount</p>
          <p className="text-sm font-bold text-gray-800">
            {formatCurrency(rent.adjustedTotalAmount || rent.totalAmount)}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Paid</p>
          <p className="text-sm font-bold text-green-600">
            {formatCurrency(rent.paidAmount)}
          </p>
        </div>
        <div className="bg-red-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Due</p>
          <p className="text-sm font-bold text-red-600">
            {formatCurrency(rent.dueAmount)}
          </p>
        </div>
      </div>

      {/* Bill Breakdown */}
      <div className="border-t border-gray-200 pt-3 mb-3">
        <p className="text-xs font-semibold text-gray-600 mb-2">Bill Breakdown</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Base Rent:</span>
            <span className="font-semibold">{formatCurrency(rent.baseRent)}</span>
          </div>
          {rent.electricityBill > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Electricity:</span>
              <span className="font-semibold">
                {formatCurrency(rent.electricityBill)}
              </span>
            </div>
          )}
          {rent.gasBill > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Gas:</span>
              <span className="font-semibold">{formatCurrency(rent.gasBill)}</span>
            </div>
          )}
          {rent.waterBill > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Water:</span>
              <span className="font-semibold">{formatCurrency(rent.waterBill)}</span>
            </div>
          )}
          {rent.serviceBill > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Service:</span>
              <span className="font-semibold">
                {formatCurrency(rent.serviceBill)}
              </span>
            </div>
          )}
          {rent.lateFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Late Fee:</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(rent.lateFee)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Info */}
      {rent.status === RentStatus.PAID && (
        <div className="border-t border-gray-200 pt-3 text-xs">
          <div className="flex justify-between items-center">
            <div>
              {rent.paymentMethod && (
                <p className="text-gray-500">
                  Payment Method:{" "}
                  <span className="font-semibold text-gray-800">
                    {rent.paymentMethod}
                  </span>
                </p>
              )}
              {rent.paidDate && (
                <p className="text-gray-500">
                  Paid on:{" "}
                  <span className="font-semibold text-gray-800">
                    {formatDate(rent.paidDate)}
                  </span>
                </p>
              )}
            </div>
            <div className="text-green-600">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Due Date for Pending */}
      {(rent.status === RentStatus.PENDING || rent.status === RentStatus.PARTIAL || rent.status === RentStatus.OVERDUE) && (
        <div className="border-t border-gray-200 pt-3 text-xs">
          <p className="text-gray-500">
            Due Date:{" "}
            <span className={`font-semibold ${rent.status === RentStatus.OVERDUE ? 'text-red-600' : 'text-gray-800'}`}>
              {formatDate(rent.dueDate)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryCard;
