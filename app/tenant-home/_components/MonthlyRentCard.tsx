interface MonthlyRentCardProps {
  onOpenModal: () => void;
}

const MonthlyRentCard = ({ onOpenModal }: MonthlyRentCardProps) => {
  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏠 Monthly Rent
      </div>
      <div
        className="bg-gradient-to-br from-white to-slate-50 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-[#10b981] mb-4 relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
        id="rentCard"
        onClick={onOpenModal}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[32px] font-extrabold text-gray-800 leading-none">
              ৳30,800
            </div>
            <div className="text-gray-600 text-base mb-2">December 2025</div>
          </div>
          <div className="bg-[#dcfce7] text-[#166534] px-4 py-2 rounded-[20px] text-sm font-semibold flex items-center gap-1.5">
            ✓ Paid
          </div>
        </div>
        <div className="text-gray-700 text-sm font-medium">
          Next due: January 5, 2026
        </div>
      </div>
    </>
  );
};

export default MonthlyRentCard;
