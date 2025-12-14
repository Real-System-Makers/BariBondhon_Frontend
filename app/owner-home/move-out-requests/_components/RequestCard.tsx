"use client";

import { useState } from "react";
import { updateMoveOutRequestAction } from "@/lib/actions/move-out.actions";
import MonthPicker from "@/app/_components/MonthPicker";

interface RequestCardProps {
  request: any; // Using any for speed, ideally interface
  onUpdate: () => void;
}

const RequestCard = ({ request, onUpdate }: RequestCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newMonth, setNewMonth] = useState(request.moveOutMonth ? request.moveOutMonth.substring(0, 7) : "");

  const handleAction = async (status: "APPROVED" | "REJECTED", month?: string) => {
    if (confirm(`Are you sure you want to ${status} this request?`)) {
      setIsProcessing(true);
      const payload: any = { status };
      if (month) payload.moveOutMonth = month + '-01'; // Backend expects YYYY-MM-DD or similar Date string
      
      const result = await updateMoveOutRequestAction(request._id, payload);
      setIsProcessing(false);
      
      if (result.success) {
         // UI updates via revalidatePath (server), but callback updates client state
         onUpdate();
         if (status === 'APPROVED' && month) setIsEditMode(false);
      } else {
        alert(result.error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-700 border-green-200";
      case "REJECTED": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{request.tenant?.name || "Unknown Tenant"}</h3>
          <p className="text-slate-500 text-sm">{request.tenant?.phone}</p>
          <p className="text-slate-500 text-xs mt-1">Flat: {request.flat?.name}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(request.status)}`}>
          {request.status}
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 mb-4 text-sm">
        <div className="flex justify-between mb-2">
            <span className="text-slate-500">Requested Move Out:</span>
            <span className="font-semibold text-slate-700">
                {new Date(request.moveOutMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
            </span>
        </div>
        {request.note && (
            <div className="mt-2 border-t border-slate-200 pt-2">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Note / Emergency</p>
                <p className="text-slate-600 italic">"{request.note}"</p>
            </div>
        )}
      </div>

      <div className="flex gap-2">
        {request.status === 'PENDING' && (
            <>
                <button
                    onClick={() => handleAction('APPROVED')}
                    disabled={isProcessing}
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl font-semibold text-sm hover:bg-green-600 transition disabled:opacity-50"
                >
                    Approve
                </button>
                <button
                    onClick={() => handleAction('REJECTED')}
                    disabled={isProcessing}
                    className="flex-1 bg-white border border-red-200 text-red-500 py-2 rounded-xl font-semibold text-sm hover:bg-red-50 transition disabled:opacity-50"
                >
                    Reject
                </button>
            </>
        )}
        {(request.status === 'PENDING' || request.status === 'APPROVED') && (
            <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition"
            >
                {isEditMode ? 'Cancel Edit' : 'Edit Month'}
            </button>
        )}
      </div>

      {isEditMode && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
              <label className="block text-xs font-bold text-blue-700 mb-2 uppercase">Override Move Out Month</label>
              <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <MonthPicker 
                        selectedMonth={newMonth}
                        onChange={setNewMonth}
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('APPROVED', newMonth)}
                    className="w-full bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition shadow-sm"
                  >
                    Save & Approve Override
                  </button>
              </div>
              <p className="text-xs text-blue-400 mt-2">Changing the month will automatically APPROVE the request with the new date.</p>
          </div>
      )}
    </div>
  );
};

export default RequestCard;
