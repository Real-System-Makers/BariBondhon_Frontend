const Tolet = () => {
  return (
    <div className="h-[812px] overflow-hidden relative">
      <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] pt-[50px] px-6 text-white relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center font-bold text-base">
              BB
            </div>
            <div className="text-xl font-bold">BariBondhon</div>
          </div>
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

      <div className="bg-white mx-6 mb-5 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] relative z-10 -mt-2.5">
        <div className="flex items-center bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl px-4 mb-4 h-12 focus-within:border-[#667eea] focus-within:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]">
          <div className="text-[#9ca3af] mr-3 text-lg">🔍</div>
          <input
            type="text"
            className="flex-1 border-none outline-none bg-transparent text-base text-[#374151] placeholder:text-[#9ca3af]"
            placeholder="Search location, area, or property..."
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <div
            className="bg-[#667eea] border-2 border-[#667eea] rounded-[20px] px-4 py-2 text-sm font-medium text-white whitespace-nowrap cursor-pointer transition-all duration-300 hover:border-[#667eea]"
            data-filter="all"
          >
            All
          </div>
          <div
            className="bg-[#f1f5f9] border-2 border-[#e2e8f0] rounded-[20px] px-4 py-2 text-sm font-medium text-[#64748b] whitespace-nowrap cursor-pointer transition-all duration-300 hover:border-[#667eea]"
            data-filter="price-15-25k"
          >
            ৳15-25K
          </div>
          <div
            className="bg-[#f1f5f9] border-2 border-[#e2e8f0] rounded-[20px] px-4 py-2 text-sm font-medium text-[#64748b] whitespace-nowrap cursor-pointer transition-all duration-300 hover:border-[#667eea]"
            data-filter="rooms-2-3"
          >
            2-3 Rooms
          </div>
          <div
            className="bg-[#f1f5f9] border-2 border-[#e2e8f0] rounded-[20px] px-4 py-2 text-sm font-medium text-[#64748b] whitespace-nowrap cursor-pointer transition-all duration-300 hover:border-[#667eea]"
            data-filter="gulshan"
          >
            Gulshan
          </div>
          <div
            className="bg-[#f1f5f9] border-2 border-[#e2e8f0] rounded-[20px] px-4 py-2 text-sm font-medium text-[#64748b] whitespace-nowrap cursor-pointer transition-all duration-300 hover:border-[#667eea]"
            data-filter="furnished"
          >
            Furnished
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="text-base font-semibold text-[#1f2937]">
          5 properties found
        </div>
      </div>

      <div className="px-6 h-[calc(100%-255px)] overflow-y-auto scrollbar-thin">
        <div
          className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-2 border-[#fbbf24] relative animate-[slideInUp_0.6s_ease_forwards] before:content-['⭐_Premium'] before:absolute before:-top-px before:right-5 before:bg-[#fbbf24] before:text-[#92400e] before:text-xs before:font-bold before:px-3 before:py-1 before:rounded-none before:rounded-b-lg before:z-[1]"
          data-category="rooms-2-3 gulshan"
        >
          <div className="relative h-[200px] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center text-5xl text-[#0ea5e9] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%27http://www.w3.org/2000/svg%27_viewBox=%270_0_400_300%27%3e%3crect_width=%27400%27_height=%27300%27_fill=%27%23f0f9ff%27/%3e%3cpath_d=%27M50_250_L150_150_L200_200_L350_100_L350_250_Z%27_fill=%27%23e0f2fe%27/%3e%3ccircle_cx=%27320%27_cy=%2780%27_r=%2730%27_fill=%27%23fbbf24%27/%3e%3crect_x=%2780%27_y=%27180%27_width=%2760%27_height=%2740%27_fill=%27%23374151%27/%3e%3crect_x=%27200%27_y=%27160%27_width=%2740%27_height=%2760%27_fill=%27%23374151%27/%3e%3c/svg%3e')] before:bg-center before:bg-cover">
            🏠
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 border-none rounded-full flex items-center justify-center cursor-pointer text-lg text-[#ef4444] transition-all duration-300 backdrop-blur-[10px] hover:bg-white hover:scale-110">
              🤍
            </button>
            <div className="absolute top-4 left-4 bg-[#10b981] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
              ✓ Verified Owner
            </div>
          </div>
          <div className="p-5">
            <div className="text-2xl font-extrabold text-[#1f2937] mb-1">
              ৳28,000
            </div>
            <div className="text-sm text-[#6b7280] mb-3">per month</div>
            <div className="text-lg font-semibold text-[#1f2937] mb-2 leading-tight">
              Luxurious 3BHK Apartment
            </div>
            <div className="text-sm text-[#6b7280] mb-4 flex items-center gap-1.5">
              📍 Gulshan, Dhaka
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="text-base">🛏️</span> 3 Bedrooms
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="text-base">🛁</span> 2 Baths
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="text-base">📏</span> 1200 sq ft
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#f3f4f6]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  MR
                </div>
                <div className="text-sm font-medium text-[#374151]">
                  Mr. Rahman
                </div>
              </div>
              <button className="bg-[#667eea] text-white border-none rounded-[10px] px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#5a6fd8] hover:-translate-y-0.5">
                Contact
              </button>
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-[slideInUp_0.6s_ease_forwards] [animation-delay:0.1s]"
          data-category="rooms-2-3 price-15-25k"
        >
          <div className="relative h-[200px] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center text-5xl text-[#0ea5e9] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%27http://www.w3.org/2000/svg%27_viewBox=%270_0_400_300%27%3e%3crect_width=%27400%27_height=%27300%27_fill=%27%23f0f9ff%27/%3e%3cpath_d=%27M50_250_L150_150_L200_200_L350_100_L350_250_Z%27_fill=%27%23e0f2fe%27/%3e%3ccircle_cx=%27320%27_cy=%2780%27_r=%2730%27_fill=%27%23fbbf24%27/%3e%3crect_x=%2780%27_y=%27180%27_width=%2760%27_height=%2740%27_fill=%27%23374151%27/%3e%3crect_x=%27200%27_y=%27160%27_width=%2740%27_height=%2760%27_fill=%27%23374151%27/%3e%3c/svg%3e')] before:bg-center before:bg-cover">
            🏢
            <button className="absolute top-4 right-4 w-10 h-10 bg-[#ef4444] border-none rounded-full flex items-center justify-center cursor-pointer text-lg text-white transition-all duration-300 backdrop-blur-[10px] hover:bg-white hover:scale-110">
              ❤️
            </button>
            <div className="absolute top-4 left-4 bg-[#10b981] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
              ✓ Verified Owner
            </div>
          </div>
          <div className="p-5">
            <div className="text-2xl font-extrabold text-[#1f2937] mb-1">
              ৳22,000
            </div>
            <div className="text-sm text-[#6b7280] mb-3">per month</div>
            <div className="text-lg font-semibold text-[#1f2937] mb-2 leading-tight">
              Modern 2BHK with Balcony
            </div>
            <div className="text-sm text-[#6b7280] mb-4 flex items-center gap-1.5">
              📍 Dhanmondi, Dhaka
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="text-base">🛏️</span> 2 Bedrooms
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="text-base">🛁</span> 2 Baths
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="text-base">📏</span> 900 sq ft
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#f3f4f6]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  SA
                </div>
                <div className="text-sm font-medium text-[#374151]">
                  S. Ahmed
                </div>
              </div>
              <button className="bg-[#667eea] text-white border-none rounded-[10px] px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#5a6fd8] hover:-translate-y-0.5">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tolet;
