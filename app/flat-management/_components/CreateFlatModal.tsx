import { createFlatAction, updateFlatAction } from "@/lib/actions/flat.actions";
import { Flat } from "@/lib/types/flat";
import { useEffect, useState } from "react";

interface FlatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  flat?: Flat | null;
}

const FlatModal = ({
  isOpen,
  onClose,
  onSuccess,
  flat,
}: FlatModalProps) => {
  const [flatName, setFlatName] = useState("");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [rent, setRent] = useState("");
  const [status, setStatus] = useState<"Vacant" | "Occupied">("Vacant");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (flat) {
      setFlatName(flat.name);
      setBedrooms(flat.bedrooms);
      setBathrooms(flat.bathrooms);
      setRent(flat.rent.toString());
      setStatus(flat.status);
      setNote(flat.note || "");
    } else {
      // Reset form for new flat
      setFlatName("");
      setBedrooms(2);
      setBathrooms(1);
      setRent("");
      setStatus("Vacant");
      setNote("");
    }
  }, [flat, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const flatData = {
        name: flatName,
        bedrooms,
        bathrooms,
        rent: Number(rent),
        status,
        note,
      };

      if (flat) {
        await updateFlatAction(flat._id, flatData);
      } else {
        await createFlatAction(flatData);
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save flat:", error);
      alert("Failed to save flat");
    }
  };

  const adjustValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    step: number
  ) => {
    const newValue = currentValue + step;
    if (newValue >= 1) {
      setter(newValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 opacity-100 visible transition-all duration-300">
      <div className="bg-white rounded-[20px] w-full max-w-[350px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transform translate-y-0 transition-all duration-300 flex flex-col max-h-[90vh]">
        <div className="p-5 px-6 flex justify-between items-center border-b border-slate-200 shrink-0">
          <div className="text-lg font-bold text-slate-800">
            {flat ? "Edit Flat" : "Add New Flat"}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-none bg-slate-100 text-slate-500 rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden flex-1">
          <div className="p-6 overflow-y-auto flex-1">
            <div className="mb-5">
              <label
                htmlFor="flatName"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Flat Name / Number
              </label>
              <input
                type="text"
                id="flatName"
                value={flatName}
                onChange={(e) => setFlatName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
                placeholder="e.g. 4C"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Number of Bedrooms
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustValue(setBedrooms, bedrooms, -1)}
                  className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={(e) =>
                    setBedrooms(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)] text-center font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                  required
                />
                <button
                  type="button"
                  onClick={() => adjustValue(setBedrooms, bedrooms, 1)}
                  className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Number of Bathrooms
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustValue(setBathrooms, bathrooms, -1)}
                  className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  id="baths"
                  value={bathrooms}
                  onChange={(e) =>
                    setBathrooms(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)] text-center font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                  required
                />
                <button
                  type="button"
                  onClick={() => adjustValue(setBathrooms, bathrooms, 1)}
                  className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="basicRent"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Basic Rent (Monthly)
              </label>
              <input
                type="number"
                id="basicRent"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
                placeholder="e.g., 20000"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Status
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("Vacant")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    status === "Vacant"
                      ? "bg-green-100 text-green-800 border-2 border-green-200"
                      : "bg-slate-50 text-slate-500 border-2 border-slate-200"
                  }`}
                >
                  Vacant
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("Occupied")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    status === "Occupied"
                      ? "bg-red-100 text-red-800 border-2 border-red-200"
                      : "bg-slate-50 text-slate-500 border-2 border-slate-200"
                  }`}
                >
                  Occupied
                </button>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="note"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Note (Optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)] min-h-[100px] resize-y"
                placeholder="Any additional information..."
              />
            </div>
          </div>
          <div className="px-6 pb-6 pt-4 border-t border-slate-100 shrink-0">
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-3.5 text-white text-base font-bold cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              {flat ? "Update Flat" : "Save Flat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatModal;
