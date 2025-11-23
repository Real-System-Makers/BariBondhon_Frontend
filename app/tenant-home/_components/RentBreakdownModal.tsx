interface RentBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RentBreakdownModal = ({ isOpen, onClose }: RentBreakdownModalProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      id="rentModal"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-[20px] w-full max-w-[350px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transition-all duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-5"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 px-6 flex justify-between items-center border-b border-slate-200">
          <div className="text-lg font-bold text-gray-800">
            Rent Breakdown (December)
          </div>
          <button
            className="w-8 h-8 border-none bg-slate-100 text-slate-500 rounded-full cursor-pointer text-lg hover:bg-slate-200 transition-colors"
            id="closeRentModalBtn"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="px-6 pb-6">
          <ul className="list-none p-0 mt-5">
            <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
              <span className="text-gray-600">Basic Rent</span>
              <span className="font-semibold text-gray-800">৳25,000</span>
            </li>
            <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
              <span className="text-gray-600">Electricity Bill</span>
              <span className="font-semibold text-gray-800">৳2,800</span>
            </li>
            <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
              <span className="text-gray-600">Water Bill</span>
              <span className="font-semibold text-gray-800">৳1,200</span>
            </li>
            <li className="flex justify-between py-3 text-base border-b border-slate-100 last:border-b-0">
              <span className="text-gray-600">Gas Bill</span>
              <span className="font-semibold text-gray-800">৳1,800</span>
            </li>
          </ul>
          <div className="flex justify-between pt-4 mt-2 border-t-2 border-gray-800 text-lg font-extrabold text-gray-800">
            <span>Total Rent</span>
            <span>৳30,800</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentBreakdownModal;
