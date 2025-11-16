import Image from "next/image";

const FILTER_BUTTONS = [
  { id: "all", label: "All", isActive: true },
  { id: "pending", label: "Pending", isActive: false },
  { id: "progress", label: "In Progress", isActive: false },
  { id: "resolved", label: "Resolved", isActive: false },
];

const ViewIssue = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-5 text-white relative">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all duration-300 hover:bg-white/20">
              ←
            </div>
            <div className="flex-1">
              <div className="text-[22px] font-bold mb-1">
                Maintenance Requests
              </div>
              <div className="text-sm opacity-85">
                Manage tenant complaints & requests
              </div>
            </div>
          </div>

          <div className="flex bg-white/10 rounded-xl p-1 gap-1">
            {FILTER_BUTTONS.map((button) => (
              <button
                key={button.id}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300 ${
                  button.isActive
                    ? "bg-white/20 text-white"
                    : "bg-transparent text-white/80 border-none hover:bg-white/20 hover:text-white"
                }`}
                data-filter={button.id}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 px-6 h-[calc(100%-160px)] overflow-y-auto">
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white p-3 rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[rgba(226,232,240,0.8)]">
              <div className="text-xl font-bold text-[#dc2626] mb-1">8</div>
              <div className="text-xs text-slate-500 font-medium">Pending</div>
            </div>
            <div className="bg-white p-3 rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[rgba(226,232,240,0.8)]">
              <div className="text-xl font-bold text-[#f59e0b] mb-1">4</div>
              <div className="text-xs text-slate-500 font-medium">
                In Progress
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[rgba(226,232,240,0.8)]">
              <div className="text-xl font-bold text-[#10b981] mb-1">4</div>
              <div className="text-xs text-slate-500 font-medium">Resolved</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[rgba(226,232,240,0.8)] transition-all duration-300 cursor-pointer relative hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-[slideInUp_0.4s_ease_forwards]"
              data-status="pending"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-800 mb-1">
                    Fatima Khatun
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Apartment 4B
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600">
                  <span className="text-base">💧</span>
                  Water Issue
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-slate-500 leading-[1.4] mb-3 line-clamp-2">
                  Kitchen tap has been leaking continuously for 3 days. Water
                  pressure is also very low in the bathroom...
                </div>
                <div className="flex justify-between items-center mb-4">
                  <Image
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iOCIgZmlsbD0iI2Y4ZmFmYyIvPgo8cGF0aCBkPSJNMTUgMjBIMzVWMzVIMTVWMjBaIiBmaWxsPSIjZTJlOGYwIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMjciIHI9IjMiIGZpbGw9IiM0YTkwZTIiLz4KPC9zdmc+"
                    alt="Photo"
                    width={50}
                    height={50}
                    unoptimized
                    className="w-[50px] h-[50px] rounded-lg object-cover border-2 border-slate-200"
                  />
                  <div className="text-xs text-slate-400">2 hours ago</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl text-xs font-semibold text-center bg-red-100 text-red-900">
                  Pending
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 border-[1.5px] border-[#f59e0b] text-[#f59e0b] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#f59e0b] hover:text-white">
                  Mark In Progress
                </button>
                <button className="px-3 py-2 border-[1.5px] border-[#10b981] text-[#10b981] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#10b981] hover:text-white">
                  Resolve
                </button>
                <button className="px-3 py-2 border-[1.5px] border-[#4a90e2] text-[#4a90e2] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#4a90e2] hover:text-white">
                  Reply
                </button>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[rgba(226,232,240,0.8)] transition-all duration-300 cursor-pointer relative hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-[slideInUp_0.4s_ease_forwards_0.1s]"
              data-status="progress"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-800 mb-1">
                    Ahmed Rahman
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Apartment 2A
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600">
                  <span className="text-base">⚡</span>
                  Electricity
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-slate-500 leading-[1.4] mb-3 line-clamp-2">
                  Power outage in the master bedroom. Circuit breaker keeps
                  tripping when AC is turned on...
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs text-slate-400">5 hours ago</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl text-xs font-semibold text-center bg-amber-100 text-amber-900">
                  In Progress
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 border-[1.5px] border-[#10b981] text-[#10b981] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#10b981] hover:text-white">
                  Resolve
                </button>
                <button className="px-3 py-2 border-[1.5px] border-[#4a90e2] text-[#4a90e2] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#4a90e2] hover:text-white">
                  Reply
                </button>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[rgba(226,232,240,0.8)] transition-all duration-300 cursor-pointer relative hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-[slideInUp_0.4s_ease_forwards_0.2s]"
              data-status="pending"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-800 mb-1">
                    Rashid Ali
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Apartment 1C
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600">
                  <span className="text-base">🛗</span>
                  Lift
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-slate-500 leading-[1.4] mb-3 line-clamp-2">
                  Elevator making loud grinding noises and stops between floors.
                  Very concerning for safety...
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs text-slate-400">1 day ago</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl text-xs font-semibold text-center bg-red-100 text-red-900">
                  Pending
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 border-[1.5px] border-[#f59e0b] text-[#f59e0b] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#f59e0b] hover:text-white">
                  Mark In Progress
                </button>
                <button className="px-3 py-2 border-[1.5px] border-[#10b981] text-[#10b981] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#10b981] hover:text-white">
                  Resolve
                </button>
                <button className="px-3 py-2 border-[1.5px] border-[#4a90e2] text-[#4a90e2] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#4a90e2] hover:text-white">
                  Reply
                </button>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[rgba(226,232,240,0.8)] transition-all duration-300 cursor-pointer relative hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-[slideInUp_0.4s_ease_forwards_0.3s]"
              data-status="resolved"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-800 mb-1">
                    Nadia Begum
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Apartment 3B
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600">
                  <span className="text-base">🔧</span>
                  Others
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-slate-500 leading-[1.4] mb-3 line-clamp-2">
                  Door lock is not working properly. Key gets stuck and
                  sometimes door won't open...
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs text-slate-400">3 days ago</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl text-xs font-semibold text-center bg-green-100 text-green-900">
                  Resolved
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 border-[1.5px] border-[#4a90e2] text-[#4a90e2] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#4a90e2] hover:text-white">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black/60 hidden items-center justify-center z-[1000] p-5"
        id="modalOverlay"
      >
        <div className="bg-white rounded-[20px] w-full max-w-[350px] max-h-[90vh] overflow-y-auto shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
          <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white p-6 pb-5 rounded-t-[20px] relative">
            <button
              className="absolute top-5 right-5 w-8 h-8 border-none bg-white/20 text-white rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              id="closeModal"
            >
              ×
            </button>
            <div className="text-xl font-bold mb-1">Fatima Khatun</div>
            <div className="text-sm opacity-90">
              💧 Water Issue - Apartment 4B
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                📋 Full Description
              </div>
              <div className="text-sm text-slate-600 leading-[1.5] bg-slate-50 p-4 rounded-xl border-l-4 border-[#4a90e2]">
                Kitchen tap has been leaking continuously for 3 days. Water
                pressure is also very low in the bathroom. The leak is getting
                worse and causing water damage to the cabinet below. Please
                arrange for urgent repair as it's affecting daily activities and
                wasting a lot of water.
              </div>
            </div>
            <div className="mb-6">
              <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                📷 Attached Photo
              </div>
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiByeD0iMTIiIGZpbGw9IiNmOGZhZmMiLz4KPHBhdGggZD0iTTUwIDEwMEgyNTBWMTUwSDUwVjEwMFoiIGZpbGw9IiNlMmU4ZjAiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTI1IiByPSIxMCIgZmlsbD0iIzRhOTBlMiIvPgo8dGV4dCB4PSIxNTAiIHk9IjY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LXNpemU9IjE0Ij5UYXAgTGVha2FnZSBQaG90bzwvdGV4dD4KPC9zdmc+"
                alt="Complaint Photo"
                width={300}
                height={200}
                unoptimized
                className="w-full max-h-[200px] object-cover rounded-xl border-2 border-slate-200"
              />
            </div>
            <div className="mb-6">
              <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                ⏰ Status Timeline
              </div>
              <div className="relative pl-8 before:content-[''] before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
                <div className="relative mb-5 pl-2">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-green-500 text-white">
                    ✓
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mb-1">
                    Request Submitted
                  </div>
                  <div className="text-xs text-slate-400">
                    Oct 11, 2025 - 12:30 AM
                  </div>
                </div>
                <div className="relative mb-5 pl-2">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-slate-200 text-slate-400">
                    ⏳
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mb-1">
                    In Progress
                  </div>
                  <div className="text-xs text-slate-400">Pending</div>
                </div>
                <div className="relative mb-5 pl-2">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-slate-200 text-slate-400">
                    ⭕
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mb-1">
                    Resolved
                  </div>
                  <div className="text-xs text-slate-400">Pending</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                💬 Send Reply to Tenant
              </div>
              <textarea
                className="w-full min-h-[80px] bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 resize-y font-inherit mb-3 focus:border-[#4a90e2] focus:bg-white"
                placeholder="Type your message to the tenant..."
              ></textarea>
              <button className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white border-none rounded-[10px] px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,144,226,0.3)]">
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIssue;
