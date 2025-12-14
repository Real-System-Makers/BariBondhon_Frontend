"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOwnerMoveOutRequestsAction } from "@/lib/actions/move-out.actions";
import RequestCard from "./_components/RequestCard";

const MoveOutRequestsPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const data = await getOwnerMoveOutRequestsAction();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
       {/* Header */}
       <div className="bg-white p-5 sticky top-0 z-10 shadow-sm flex items-center gap-3">
          <Link href="/owner-home" className="text-2xl no-underline">
             ⬅️
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Move Out Requests</h1>
       </div>

       <div className="p-5 flex-1 overflow-y-auto">
          {loading ? (
             <div className="space-y-4">
                 {[1,2,3].map(i => (
                     <div key={i} className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
                 ))}
             </div>
          ) : requests.length === 0 ? (
             <div className="text-center py-20 text-slate-400">
                 <div className="text-4xl mb-4">📭</div>
                 <p>No move out requests found.</p>
             </div>
          ) : (
             requests.map((req) => (
                 <RequestCard key={req._id} request={req} onUpdate={fetchRequests} />
             ))
          )}
       </div>
    </div>
  );
};

export default MoveOutRequestsPage;
