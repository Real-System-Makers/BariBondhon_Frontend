import Link from "next/link";
import OwnerInfo from "./_components/OwnerInfo";

const OwnerHome = () => {
  return (
    <div className="flex flex-col h-full">
      <OwnerInfo />

      <div className="p-5 px-6 flex-1 overflow-y-auto">
        <div className="text-xl font-bold text-slate-800 mb-4">
          Monthly Overview
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="text-[28px] font-extrabold text-slate-800 mb-2">
              ৳2,10,000
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Rent Collected
            </div>
            <div className="text-xs mt-2 flex items-center gap-1 text-green-500">
              12 tenants paid the rent
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
            <div className="text-[28px] font-extrabold text-red-600 mb-2">
              ৳45,000
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Pending Rent
            </div>
            <div className="text-xs mt-2 flex items-center gap-1 text-red-500">
              3 tenants overdue
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xl font-bold text-slate-800 mb-4">
            Utility Section
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#4a90e2]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl bg-gradient-to-br from-amber-400 to-amber-600">
                ⚡
              </div>
              <div className="text-base font-bold text-slate-800 mb-1">
                ৳18,500
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Electricity
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#4a90e2]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl bg-gradient-to-br from-blue-500 to-blue-700">
                💧
              </div>
              <div className="text-base font-bold text-slate-800 mb-1">
                ৳8,200
              </div>
              <div className="text-xs text-slate-500 font-medium">Water</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#4a90e2]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl bg-gradient-to-br from-violet-500 to-violet-600">
                🔥
              </div>
              <div className="text-base font-bold text-slate-800 mb-1">
                ৳12,300
              </div>
              <div className="text-xs text-slate-500 font-medium">Gas</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xl font-bold text-slate-800 mb-4">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/tenant-management"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                👥
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Tenant Management
              </div>
            </Link>
            <Link
              href="/notice/upload"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                📋
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Upload Notice
              </div>
            </Link>
            <Link
              href="/complain/view"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px relative"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                📞
              </div>
              <div className="text-sm font-semibold text-slate-800">
                View Complaints
              </div>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold py-0.5 px-1.5 rounded-lg min-w-4 text-center">
                5
              </div>
            </Link>
            <Link
              href="/flat-list"
              className="bg-white border-2 border-slate-200 rounded-2xl py-5 px-4 text-center cursor-pointer transition-all duration-300 ease-in-out no-underline text-inherit hover:border-[#4a90e2] hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:-translate-y-px"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                🏢
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Flat Management
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
