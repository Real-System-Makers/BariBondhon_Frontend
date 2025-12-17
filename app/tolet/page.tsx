"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublicVacantFlatsAction } from "@/lib/actions/flat.actions";
import { Flat } from "@/lib/types/flat";

const Tolet = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const data = await getPublicVacantFlatsAction();
        setFlats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] pt-[50px] px-6 text-white relative flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <Link href="/" className="flex items-center gap-3 no-underline text-white cursor-pointer">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="BariBondhon Logo" 
                width={36} 
                height={36} 
                className="object-contain"
              />
            </div>
            <div className="text-xl font-bold">BariBondhon</div>
          </Link>
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center cursor-pointer text-lg">
            👤
          </div>
        </div>

        <div className="mb-5">
          <div className="text-2xl font-bold mb-1.5">
            Find Your Perfect Home
          </div>
          <div className="text-base opacity-90">
            Discover amazing rental properties
          </div>
        </div>
      </div>

      <div className="bg-white mx-6 mb-5 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] relative z-10 -mt-2.5 flex-shrink-0">
        <div className="flex items-center bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl px-4 h-12 focus-within:border-[#667eea] focus-within:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]">
          <div className="text-[#9ca3af] mr-3 text-lg">🔍</div>
          <input
            type="text"
            className="flex-1 border-none outline-none bg-transparent text-base text-[#374151] placeholder:text-[#9ca3af]"
            placeholder="Search location, area, or property..."
          />
        </div>
      </div>

      <div className="px-6 pb-4 flex-shrink-0 flex justify-between items-center">
        <div className="text-base font-semibold text-[#1f2937]">
          {loading ? "Loading..." : `${flats.length} properties found`}
        </div>
      </div>

      <div className="px-6 flex-1 overflow-y-auto scrollbar-thin pb-5">
        {!loading && flats.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No vacant properties found at the moment.
          </div>
        )}

        {flats.map((flat, index) => (
          <div
            key={flat._id}
            className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 relative animate-[slideInUp_0.6s_ease_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-[200px] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center text-5xl text-[#0ea5e9] overflow-hidden">
              🏢
              <div className={`absolute top-4 left-4 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 ${flat.status === 'Vacant' ? 'bg-[#10b981]' : 'bg-orange-500'}`}>
                {flat.availabilityStatus || (flat.status === 'Vacant' ? 'Vacant' : 'Verified Owner')}
              </div>
            </div>
            <div className="p-5">
              <div className="text-2xl font-extrabold text-[#1f2937] mb-1">
                {formatCurrency(flat.rent)}
              </div>
              <div className="text-sm text-[#6b7280] mb-3">per month</div>
              <div className="text-lg font-semibold text-[#1f2937] mb-2 leading-tight">
                {flat.name}
              </div>
              {flat.note && (
                <div className="text-sm text-[#6b7280] mb-4">
                  {flat.note}
                </div>
              )}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                  <span className="text-base">🛏️</span> {flat.bedrooms} Bed
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                  <span className="text-base">🛁</span> {flat.bathrooms} Bath
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#f3f4f6]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-sm font-semibold text-white uppercase">
                    {flat.user?.name?.substring(0, 2) || "OW"}
                  </div>
                  <div className="text-sm font-medium text-[#374151]">
                    {flat.user?.name || "Owner"}
                  </div>
                </div>
                <a
                  href={`tel:${flat.user?.phone}`}
                  className="bg-[#667eea] text-white border-none rounded-[10px] px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#5a6fd8] no-underline flex items-center gap-2"
                >
                  📞 Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tolet;
