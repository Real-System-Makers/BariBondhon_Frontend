"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { updateUserAction } from "@/lib/actions/user.actions";

interface Slab {
    from: number;
    to: number;
    rate: number;
}

const ElectricitySettingsPage = () => {
    const router = useRouter();
    const { user, isLoading, refetch } = useCurrentUser();
    const [slabs, setSlabs] = useState<Slab[]>([
        { from: 0, to: 75, rate: 0 },
        { from: 76, to: 200, rate: 0 },
        { from: 201, to: 400, rate: 0 },
        { from: 401, to: 9999, rate: 0 },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user?.electricitySlabs && user.electricitySlabs.length > 0) {
            setSlabs(user.electricitySlabs);
        } else {
            // Default template
            setSlabs([
                { from: 0, to: 75, rate: 5 },
                { from: 76, to: 200, rate: 7 },
                { from: 201, to: 400, rate: 10 },
                { from: 401, to: 1000, rate: 12 },
            ]);
        }
    }, [user]);

    const handleSlabChange = (index: number, field: keyof Slab, value: string) => {
        const newSlabs = [...slabs];
        newSlabs[index] = {
            ...newSlabs[index],
            [field]: parseFloat(value) || 0,
        };
        setSlabs(newSlabs);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?._id) return;

        setIsSubmitting(true);
        const result = await updateUserAction(user._id, {
            electricitySlabs: slabs,
        });
        setIsSubmitting(false);

        if (result.success) {
            alert("Electricity rates updated successfully!");
            refetch(); // Refresh user data
            router.back();
        } else {
            alert("Failed to update rates.");
        }
    };

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
            <div className="bg-white p-5 sticky top-0 z-10 shadow-sm flex items-center gap-3">
                <Link href="/electrcity-entry" className="no-underline">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                        ←
                    </div>
                </Link>
                <h1 className="text-xl font-bold text-slate-800">Electricity Rates</h1>
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        Define your slab-based electricity rates here. The bill will be calculated progressively based on these ranges.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {slabs.map((slab, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-slate-700">Slab {index + 1}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">From</label>
                                    <input
                                        type="number"
                                        value={slab.from}
                                        onChange={(e) => handleSlabChange(index, 'from', e.target.value)}
                                        className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">To</label>
                                    <input
                                        type="number"
                                        value={slab.to}
                                        onChange={(e) => handleSlabChange(index, 'to', e.target.value)}
                                        className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">Rate (৳)</label>
                                    <input
                                        type="number"
                                        value={slab.rate}
                                        onChange={(e) => handleSlabChange(index, 'rate', e.target.value)}
                                        className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all mt-6"
                    >
                        {isSubmitting ? "Saving..." : "Save Rates"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ElectricitySettingsPage;
