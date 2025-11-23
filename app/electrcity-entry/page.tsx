"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFlatsAction, batchUpdateElectricityAction } from "@/lib/actions/flat.actions";
import { Flat } from "@/lib/types/flat";

const ElectricityEntry = () => {
  const router = useRouter();
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [readings, setReadings] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchFlats = async () => {
      const data = await getFlatsAction();
      setFlats(data);
      setLoading(false);
    };
    fetchFlats();
  }, []);

  const handleReadingChange = (flatId: string, value: string) => {
    setReadings({
      ...readings,
      [flatId]: parseFloat(value) || 0,
    });
  };

  const calculateConsumption = (flat: Flat): number => {
    const currentReading = readings[flat._id] || flat.currentElectricityReading || 0;
    const previousReading = flat.currentElectricityReading || 0;
    return Math.max(0, currentReading - previousReading);
  };

  const calculateBill = (flat: Flat): number => {
    const consumption = calculateConsumption(flat);
    const rate = flat.electricityRatePerUnit || 8;
    return consumption * rate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const updates = Object.entries(readings)
        .filter(([flatId, reading]) => {
          const flat = flats.find(f => f._id === flatId);
          return flat && reading > (flat.currentElectricityReading || 0);
        })
        .map(([flatId, currentReading]) => ({
          flatId,
          currentReading,
        }));

      if (updates.length === 0) {
        alert("Please enter new readings that are higher than current readings");
        setSubmitting(false);
        return;
      }

      const result = await batchUpdateElectricityAction({ updates });

      if (result.failed.length > 0) {
        alert(
          `Updated ${result.updated} flats. Failed to update ${result.failed.length} flats.`
        );
      } else {
        alert(`Successfully updated ${result.updated} flats!`);
      }

      router.push("/owner-home");
    } catch (error) {
      console.error("Failed to update electricity:", error);
      alert("Failed to update electricity readings. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white relative shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
        <div className="flex items-center gap-4 relative z-[2]">
          <Link
            href="/owner-home"
            className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg no-underline"
          >
            ←
          </Link>
          <div className="text-[22px] font-bold">Electricity Bill</div>
        </div>
      </div>

      <div className="p-5 px-6 flex-1 overflow-y-auto flex flex-col">
        <form onSubmit={handleSubmit} className="flex-grow">
          <div className="bg-slate-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-500 leading-relaxed">
              Enter the current meter reading for each flat to calculate this
              month's bill.
            </p>
          </div>

          {flats.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No flats found. Please add flats first.
            </div>
          ) : (
            <>
              <div className="flex justify-between px-2 pb-3 border-b border-slate-200 mb-3">
                <span className="text-xs font-semibold text-slate-500 flex-[1.5] text-left">
                  Flat
                </span>
                <span className="text-xs font-semibold text-slate-500 text-center flex-[2]">
                  Previous
                </span>
                <span className="text-xs font-semibold text-slate-500 text-center flex-[2]">
                  Current
                </span>
                <span className="text-xs font-semibold text-slate-500 text-center flex-[1.5]">
                  Bill
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {flats.map((flat, index) => (
                  <div
                    key={flat._id}
                    className="flex items-center gap-2 animate-slideInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-[1.5] text-base font-bold text-slate-800 bg-slate-50 py-3.5 px-3 rounded-xl text-center">
                      {flat.name}
                    </div>
                    <input
                      type="number"
                      className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-slate-500 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 bg-slate-100 cursor-not-allowed"
                      value={flat.currentElectricityReading || 0}
                      readOnly
                    />
                    <input
                      type="number"
                      className="flex-[2] w-full border-2 border-slate-200 rounded-xl py-3.5 px-3.5 text-base font-semibold text-gray-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 focus:outline-none focus:border-[#4a90e2]"
                      placeholder="Enter"
                      value={readings[flat._id] || ""}
                      onChange={(e) =>
                        handleReadingChange(flat._id, e.target.value)
                      }
                      min={flat.currentElectricityReading || 0}
                      required
                    />
                    <div className="flex-[1.5] text-sm font-bold text-green-600 bg-green-50 py-3.5 px-2 rounded-xl text-center">
                      ৳{calculateBill(flat).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </form>

        {flats.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-4 px-4 text-white text-base font-bold cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Readings"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectricityEntry;
