const DigitalReceiptCard = () => {
  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        📄 Digital Receipt
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-semibold text-gray-800">
            December 2025 Receipt
          </div>
          <div className="text-sm text-gray-600">Dec 03, 2025</div>
        </div>
        <button className="bg-gradient-to-br from-[#10b981] to-[#059669] text-white border-none rounded-xl px-5 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 w-full justify-center hover:opacity-90">
          📥 Download Receipt
        </button>
      </div>
    </>
  );
};

export default DigitalReceiptCard;
