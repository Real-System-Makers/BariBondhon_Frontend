import Link from "next/link";

const QuickActions = () => {
  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🔧 Quick Actions
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link
          href="/complain/issue"
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
          target="_blank"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            📞
          </div>
          <div className="text-sm font-semibold text-gray-800">Complaint</div>
        </Link>
        <Link
          href="/payment"
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            💳
          </div>
          <div className="text-sm font-semibold text-gray-800">Payment</div>
        </Link>
        <Link
          href="/technician"
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            👨‍🔧
          </div>
          <div className="text-sm font-semibold text-gray-800">Technician</div>
        </Link>
        <Link
          href="/moveout/submission"
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 no-underline text-inherit hover:border-[#10b981] hover:bg-[#f0fdf4] hover:-translate-y-0.5"
          target="_blank"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-3 text-xl text-white">
            🚶
          </div>
          <div className="text-sm font-semibold text-gray-800">Move Out</div>
        </Link>
      </div>
    </>
  );
};

export default QuickActions;
