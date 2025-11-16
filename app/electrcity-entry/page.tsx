import Link from "next/link";

const ElectricityEntry = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white relative shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
        <div className="flex items-center gap-4 relative z-[2]">
          <Link
            href="/"
            className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg no-underline"
          >
            ←
          </Link>
          <div className="text-[22px] font-bold">Electricity Bill</div>
        </div>
      </div>

      <div className="p-5 px-6 flex-1 overflow-y-auto flex flex-col">
        <form id="meterReadingForm" className="flex-grow">
          <div className="bg-slate-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-500 leading-relaxed">
              Enter the current meter reading for each flat to calculate this
              month's bill.
            </p>
          </div>

          <div className="flex justify-between px-2 pb-3 border-b border-slate-200 mb-3">
            <span className="text-xs font-semibold text-slate-500 flex-[1.5] text-left">
              Flat
            </span>
            <span className="text-xs font-semibold text-slate-500 text-center flex-[2]">
              Previous Reading
            </span>
            <span className="text-xs font-semibold text-slate-500 text-center flex-[2]">
              Current Reading
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-2 animate-slideInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex-[1.5] text-base font-bold text-slate-800 bg-slate-50 py-3.5 px-3 rounded-xl text-center">
                A-1
              </div>
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-slate-500 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 bg-slate-100 cursor-not-allowed"
                value="5420"
                readOnly
              />
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-gray-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 focus:outline-none focus:border-[#4a90e2]"
                placeholder="Enter"
                required
              />
            </div>
            <div
              className="flex items-center gap-2 animate-slideInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex-[1.5] text-base font-bold text-slate-800 bg-slate-50 py-3.5 px-3 rounded-xl text-center">
                A-2
              </div>
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-slate-500 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 bg-slate-100 cursor-not-allowed"
                value="3155"
                readOnly
              />
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-gray-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 focus:outline-none focus:border-[#4a90e2]"
                placeholder="Enter"
                required
              />
            </div>
            <div
              className="flex items-center gap-2 animate-slideInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex-[1.5] text-base font-bold text-slate-800 bg-slate-50 py-3.5 px-3 rounded-xl text-center">
                B-1
              </div>
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-slate-500 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 bg-slate-100 cursor-not-allowed"
                value="7890"
                readOnly
              />
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-gray-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 focus:outline-none focus:border-[#4a90e2]"
                placeholder="Enter"
                required
              />
            </div>
            <div
              className="flex items-center gap-2 animate-slideInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex-[1.5] text-base font-bold text-slate-800 bg-slate-50 py-3.5 px-3 rounded-xl text-center">
                B-2
              </div>
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-slate-500 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 bg-slate-100 cursor-not-allowed"
                value="4512"
                readOnly
              />
              <input
                type="number"
                className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-gray-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 focus:outline-none focus:border-[#4a90e2]"
                placeholder="Enter"
                required
              />
            </div>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-200">
          <button
            type="submit"
            form="meterReadingForm"
            className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-4 px-4 text-white text-base font-bold cursor-pointer transition-all duration-300"
          >
            Submit Readings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricityEntry;
