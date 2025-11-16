import Link from "next/link";

const MoveOutSubmission = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 pt-[50px] px-6 pb-5 text-white flex items-center gap-4 flex-shrink-0">
          <Link
            href="/"
            className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg no-underline hover:bg-white/20 transition-all duration-300"
          >
            ←
          </Link>
          <div className="text-[22px] font-bold">Submit Move-Out Notice</div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto flex flex-col">
          <form id="moveOutForm">
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4 mb-6 text-sm text-blue-600 leading-relaxed">
              ℹ️ As per your rental agreement, a{" "}
              <strong>2-month notice period</strong> is required.
            </div>
            <div className="mb-6">
              <label
                htmlFor="moveOutDate"
                className="block text-base font-semibold text-gray-800 mb-3"
              >
                Select Move-Out Month & Year
              </label>
              <input
                type="month"
                id="moveOutDate"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 text-base text-gray-700 transition-all duration-300 font-inherit focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-[3px] focus:ring-emerald-500/10"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 border-none rounded-xl py-4 px-4 text-white text-base font-bold cursor-pointer transition-all duration-300 mt-auto hover:shadow-lg hover:scale-[1.02]"
            >
              Submit for Review
            </button>
          </form>

          <div id="pendingMessage" className="hidden text-center m-auto p-5">
            <div className="text-[64px] mb-5">⏳</div>
            <div className="text-[22px] font-bold text-gray-800 mb-3">
              Request is Pending
            </div>
            <div className="text-base text-gray-500 leading-relaxed mb-5">
              Your move-out request for <strong id="submittedDate"></strong> is
              under review.
            </div>
            <div className="bg-amber-50 text-amber-900 py-3 px-3 rounded-xl font-semibold mb-[30px]">
              Auto-submission in <strong id="countdown">7 days</strong>.
            </div>
            <button
              id="cancelBtn"
              className="bg-red-50 text-red-800 border-none rounded-xl py-3.5 px-6 text-base font-semibold cursor-pointer hover:bg-red-100 transition-all duration-300"
            >
              Cancel Move-Out Request
            </button>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 opacity-0 invisible transition-all duration-300 [&.active]:opacity-100 [&.active]:visible [&.active_.modal-content]:scale-100"
        id="confirmationModal"
      >
        <div className="bg-white rounded-[20px] w-full max-w-[320px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] scale-95 transition-all duration-300 text-center p-6 modal-content">
          <h3 className="text-lg font-bold text-gray-800 mb-3" id="modalTitle">
            Modal Title
          </h3>
          <p
            className="text-[15px] text-gray-500 mb-6 leading-relaxed"
            id="modalText"
          >
            Modal message goes here.
          </p>
          <div className="flex gap-3" id="modalFooter"></div>
        </div>
      </div>
    </>
  );
};

export default MoveOutSubmission;
