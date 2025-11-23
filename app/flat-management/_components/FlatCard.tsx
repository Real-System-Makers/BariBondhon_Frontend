import { Flat } from "@/lib/types/flat";

interface FlatCardProps {
  flat: Flat;
  onDelete: (id: string) => void;
  onEdit: (flat: Flat) => void;
  onAssign: (flatId: string) => void;
}

const FlatCard = ({ flat, onDelete, onEdit, onAssign }: FlatCardProps) => {
  return (
    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200 transition-all duration-300 animate-[slideInUp_0.5s_ease_forwards] relative group">
      <div className="flex justify-between items-start mb-3">
        <div className="text-lg font-bold text-slate-800">{flat.name}</div>
        <div className="relative h-8 flex items-center justify-end">
          <div
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-transform duration-300 ease-out group-hover:-translate-x-[84px] ${
              flat.status === "Occupied"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {flat.status}
          </div>
          <div className="absolute right-0 top-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={() => onEdit(flat)}
              className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
              title="Edit Flat"
            >
              ✎
            </button>
            <button
              onClick={() => onDelete(flat._id)}
              className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
              title="Delete Flat"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      <div className="text-[22px] font-extrabold text-slate-800 mb-4">
        ৳{flat.rent.toLocaleString()}{" "}
        <span className="text-sm font-medium text-slate-500">/ month</span>
      </div>
      {flat.note && (
        <div className="text-sm text-slate-500 mb-4 italic">"{flat.note}"</div>
      )}
      <div className="flex gap-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          🛏️ {flat.bedrooms} Beds
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          🛁 {flat.bathrooms} Baths
        </div>
      </div>

      {flat.status === "Occupied" && flat.tenant && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
            Current Tenant
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {flat.tenant.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-700">
                {flat.tenant.name}
              </div>
              <div className="text-xs text-slate-500">{flat.tenant.email}</div>
            </div>
          </div>
        </div>
      )}
      
      {flat.status === "Vacant" && (
        <button
            onClick={() => onAssign(flat._id)}
            className="mt-4 w-full py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm"
        >
            Assign Tenant
        </button>
      )}
    </div>
  );
};

export default FlatCard;
