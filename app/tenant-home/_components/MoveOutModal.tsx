"use client";

import { useState, useEffect } from "react";
import { getNoticePeriodAction, createMoveOutRequestAction } from "@/lib/actions/move-out.actions";
import MonthPicker from "@/app/_components/MonthPicker";

interface MoveOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRequestStatus?: any;
}

const MoveOutModal = ({ isOpen, onClose, activeRequestStatus }: MoveOutModalProps) => {
  const [noticePeriod, setNoticePeriod] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minMonthStr, setMinMonthStr] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      initialize();
    }
  }, [isOpen]);

  const initialize = async () => {
    setIsLoading(true);
    const data = await getNoticePeriodAction();
    const period = data?.minimumNoticePeriod || 1;
    setNoticePeriod(period);

    // Calculate Min Month
    const now = new Date();
    const day = now.getDate();
    
    // Start count logic
    // If <= 7th, include current month. So start = now
    // If > 7th, exclude current month. So start = next month
    let startMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
    if (day > 7) {
      startMonth.setMonth(startMonth.getMonth() + 1);
    }

    // Earliest Allowed = Start + Period - 1 (Because if notice is 1 month, and start is Jan, move out is end of Jan? 
    // Wait, typical "1 month notice" means 1 full month.
    // Prompt: "let's say if he submits on 7 of december it will include december [as notice month] ... if 12 dec, it will exclude december"
    // Prompt: "minimum notice period is set 2 month ... leave within 1 month gap [emergency]"
    // If notice is 1 month. Submit Dec 5. Period = Dec. Move out = End of Dec? Or End of Jan?
    // Usually 1 month notice given in Dec means leaving End of Jan (if excluding current).
    // Prompt says: "total notice peiord will include the current monty"
    // So if Notice = 1. Submit Dec 5 -> Includes Dec. Notice fulfilled by End of Dec.
    // If Notice = 2. Submit Dec 5 -> Includes Dec, Jan. Move out End of Jan. 
    
    // Logic:
    // Count = noticePeriod
    // StartMonth = Dec (if <= 7th)
    // TargetMonth = StartMonth + (Count - 1) months.
    // e.g. Count=1. Start=Dec. Target=Dec + 0 = Dec.
    // e.g. Count=2. Start=Dec. Target=Dec + 1 = Jan.
    
    const targetDate = new Date(startMonth);
    targetDate.setMonth(targetDate.getMonth() + (period - 1));
    
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const minStr = `${yyyy}-${mm}`;
    setMinMonthStr(minStr);
    
    // Default select min
    setSelectedMonth(minStr);
    
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!selectedMonth) return;

    setIsSubmitting(true);
    const result = await createMoveOutRequestAction({
      moveOutMonth: `${selectedMonth}-01`, // Send 1st of the month
      note,
    });
    setIsSubmitting(false);

    if (result.success) {
      alert("Request submitted successfully!");
      onClose();
    } else {
      alert(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-[24px] w-full max-w-md shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {activeRequestStatus ? (
             <div className="text-center py-6">
               <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                 ℹ️
               </div>
               <h2 className="text-2xl font-bold text-slate-800 mb-2">
                 Active Request Found
               </h2>
               <p className="text-slate-500 mb-6">
                 You already have a move-out request with status: 
                 <span className={`font-bold ml-1 ${activeRequestStatus.status === 'APPROVED' ? 'text-green-600' : 'text-amber-500'}`}>
                   {activeRequestStatus.status}
                 </span>
               </p>
               
               <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100 mb-6">
                 <div className="mb-2 text-sm text-slate-600">
                   <strong>Requested Month:</strong> {new Date(activeRequestStatus.moveOutMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                 </div>
                 {activeRequestStatus.note && (
                   <div className="text-sm text-slate-600">
                     <strong>Note:</strong> {activeRequestStatus.note}
                   </div>
                 )}
               </div>

               <button
                 onClick={onClose}
                 className="w-full px-4 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition"
               >
                 Close
               </button>
             </div>
          ) : (
          <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Move Out Request
            </h2>
            <p className="text-slate-500 mt-1">
              Submit your notice to vacate the flat.
            </p>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          ) : (
            <div className="space-y-4">
               
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100 mb-4">
                <strong>Notice Period:</strong> {noticePeriod} month(s).<br/>
                Based on today's date, the earliest you can move out is: 
                <span className="font-bold ml-1">
                   {new Date(minMonthStr + '-01').toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <div>
                <MonthPicker 
                    label="Select Move Out Month"
                    selectedMonth={selectedMonth}
                    minMonth={minMonthStr}
                    onChange={setSelectedMonth}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Note (Optional / Emergency)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="If you have an emergency or special request, please explain here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition h-32 resize-none"
                />
                <p className="text-xs text-slate-400 mt-2">
                  If you need to leave earlier than the allowed date, select the earliest date above and explain your emergency here. The owner may review and adjust logic.
                </p>
              </div>
            </div>
          )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition disabled:opacity-50"
                disabled={isSubmitting || !selectedMonth}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
            </>
          )} 
        </div>
      </div>
    </div>
  );
};

export default MoveOutModal;
