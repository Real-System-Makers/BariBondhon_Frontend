"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
   getOwnerMoveOutRequestsAction,
   getNoticePeriodAction,
   setNoticePeriodAction
} from "@/lib/actions/move-out.actions";
import RequestCard from "./_components/RequestCard";

const MoveOutRequestsPage = () => {
   const [requests, setRequests] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [noticePeriod, setNoticePeriod] = useState(1);
   const [isEditingPeriod, setIsEditingPeriod] = useState(false);
   const [savingPeriod, setSavingPeriod] = useState(false);

   const fetchData = async () => {
      setLoading(true);
      const [reqData, periodData] = await Promise.all([
         getOwnerMoveOutRequestsAction(),
         getNoticePeriodAction()
      ]);
      setRequests(reqData || []);
      if (periodData) {
         setNoticePeriod(periodData.minimumNoticePeriod);
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleSavePeriod = async () => {
      setSavingPeriod(true);
      const result = await setNoticePeriodAction(noticePeriod);
      setSavingPeriod(false);
      if (result.success) {
         setIsEditingPeriod(false);
      } else {
         alert(result.error);
      }
   };

   return (
      <div className="flex flex-col h-full bg-[#f8f9fc]">
         <div className="p-5 px-6 flex justify-between items-center bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
            <div className="flex items-center gap-3">
               <Link href="/owner-home" className="no-underline">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  </div>
               </Link>
               <h1 className="text-xl font-bold text-slate-800">Move Out Requests</h1>
            </div>
         </div>

         <div className="p-6 flex-1 overflow-y-auto">

            {/* Notice Period Settings Card */}
            <div className="bg-white rounded-[24px] p-6 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl">
                        📆
                     </div>
                     <div>
                        <div className="text-lg font-bold text-slate-800">Notice Period</div>
                        <div className="text-sm text-slate-500">Minimum notice required for tenants</div>
                     </div>
                  </div>
                  {!isEditingPeriod ? (
                     <button
                        onClick={() => setIsEditingPeriod(true)}
                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                     >
                        Edit
                     </button>
                  ) : (
                     <div className="flex gap-2">
                        <button
                           onClick={() => setIsEditingPeriod(false)}
                           className="px-4 py-2 text-slate-500 text-sm font-semibold hover:bg-slate-50 rounded-xl transition-colors"
                           disabled={savingPeriod}
                        >
                           Cancel
                        </button>
                        <button
                           onClick={handleSavePeriod}
                           disabled={savingPeriod}
                           className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
                        >
                           {savingPeriod ? "Saving..." : "Save"}
                        </button>
                     </div>
                  )}
               </div>

               {isEditingPeriod ? (
                  <div className="bg-slate-50 rounded-xl p-4 animate-in fade-in zoom-in duration-200">
                     <div className="flex items-center gap-4">
                        <button
                           onClick={() => setNoticePeriod(Math.max(1, noticePeriod - 1))}
                           className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition shadow-sm"
                        >
                           -
                        </button>
                        <div className="flex-1 text-center font-bold text-xl text-slate-800">
                           {noticePeriod} {noticePeriod === 1 ? "Month" : "Months"}
                        </div>
                        <button
                           onClick={() => setNoticePeriod(noticePeriod + 1)}
                           className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition shadow-sm"
                        >
                           +
                        </button>
                     </div>
                     <div className="mt-3 text-xs text-amber-600 flex items-center gap-1 bg-amber-50 p-2 rounded-lg border border-amber-100">
                        ⚠️ Applies to new requests only.
                     </div>
                  </div>
               ) : (
                  <div className="text-3xl font-extrabold text-slate-800 pl-2">
                     {loading ? "..." : `${noticePeriod} ${noticePeriod === 1 ? "Month" : "Months"}`}
                  </div>
               )}
            </div>

            <div className="mb-4 text-sm font-bold text-slate-500 uppercase tracking-wider pl-2">Requests List</div>

            {loading ? (
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="h-40 bg-white rounded-[24px] shadow-sm animate-pulse border border-slate-100" />
                  ))}
               </div>
            ) : requests.length === 0 ? (
               <div className="bg-white rounded-[24px] p-10 text-center shadow-sm border border-slate-100">
                  <div className="text-5xl mb-4 opacity-50">📭</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No Requests</h3>
                  <p className="text-slate-500">There are no pending move-out requests.</p>
               </div>
            ) : (
               <div className="space-y-4">
                  {requests.map((req) => (
                     <RequestCard key={req._id} request={req} onUpdate={fetchData} />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default MoveOutRequestsPage;
