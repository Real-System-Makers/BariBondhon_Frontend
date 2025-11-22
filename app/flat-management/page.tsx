"use client";

import {
  createFlatAction,
  deleteFlatAction,
  getFlatsAction,
} from "@/lib/actions/flat.actions";
import { Flat } from "@/lib/types/flat";
import Link from "next/link";
import { useEffect, useState } from "react";

const FlatManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [flatName, setFlatName] = useState("");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [rent, setRent] = useState("");
  const [status, setStatus] = useState<"Vacant" | "Occupied">("Vacant");
  const [note, setNote] = useState("");

  const fetchFlats = async () => {
    try {
      const data = await getFlatsAction();
      setFlats(data);
    } catch (error) {
      console.error("Failed to fetch flats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFlatAction({
        name: flatName,
        bedrooms,
        bathrooms,
        rent: Number(rent),
        status,
        note,
      });
      setIsModalOpen(false);
      // Reset form
      setFlatName("");
      setBedrooms(2);
      setBathrooms(1);
      setRent("");
      setStatus("Vacant");
      setNote("");
      // Refresh list
      fetchFlats();
    } catch (error) {
      console.error("Failed to create flat:", error);
      alert("Failed to create flat");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flat?")) return;
    try {
      await deleteFlatAction(id);
      fetchFlats();
    } catch (error) {
      console.error("Failed to delete flat:", error);
      alert("Failed to delete flat");
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

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="relative bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
          <div className="flex items-center gap-4 relative z-[2]">
            <Link
              href="/"
              className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0 text-lg transition-all duration-300 hover:bg-white/20 no-underline"
            >
              ←
            </Link>
            <div className="text-[22px] font-bold">Flat Management</div>
          </div>
        </div>

        <div className="flex-1 p-5 px-6 overflow-y-auto relative">
          <div className="text-base text-slate-500 mb-5 font-medium">
            You are managing {flats.length} flats in total.
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-slate-500">Loading...</div>
          ) : (
            <div className="flex flex-col gap-4 pb-20">
              {flats.map((flat) => (
                <div
                  key={flat._id}
                  className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200 transition-all duration-300 animate-[slideInUp_0.5s_ease_forwards] relative group"
                >
                  <button
                    onClick={() => handleDelete(flat._id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100"
                    title="Delete Flat"
                  >
                    ×
                  </button>
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-lg font-bold text-slate-800">
                      {flat.name}
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        flat.status === "Occupied"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {flat.status}
                    </div>
                  </div>
                  <div className="text-[22px] font-extrabold text-slate-800 mb-4">
                    ৳{flat.rent.toLocaleString()}{" "}
                    <span className="text-sm font-medium text-slate-500">
                      / month
                    </span>
                  </div>
                  {flat.note && (
                    <div className="text-sm text-slate-500 mb-4 italic">
                      "{flat.note}"
                    </div>
                  )}
                  <div className="flex gap-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      🛏️ {flat.bedrooms} Beds
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      🛁 {flat.bathrooms} Baths
                    </div>
                  </div>
                </div>
              ))}
              {flats.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  No flats found. Add one to get started!
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-full text-white text-[28px] cursor-pointer shadow-[0_8px_30px_rgba(74,144,226,0.4)] transition-all duration-300 flex items-center justify-center z-50 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_12px_40px_rgba(74,144,226,0.5)]"
          title="Add New Flat"
        >
          +
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 opacity-100 visible transition-all duration-300">
          <div className="bg-white rounded-[20px] w-full max-w-[350px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transform translate-y-0 transition-all duration-300">
            <div className="p-5 px-6 flex justify-between items-center border-b border-slate-200">
              <div className="text-lg font-bold text-slate-800">
                Add New Flat
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 border-none bg-slate-100 text-slate-500 rounded-full cursor-pointer text-lg"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6">
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
                      className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer"
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
                      className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer"
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
                      className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer"
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
                      className="w-11 h-11 bg-slate-100 border-2 border-slate-200 rounded-xl text-xl font-semibold text-[#4a90e2] cursor-pointer"
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
              <div className="px-6 pb-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-3.5 text-white text-base font-bold cursor-pointer transition-all duration-300"
                >
                  Save Flat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FlatManagement;
