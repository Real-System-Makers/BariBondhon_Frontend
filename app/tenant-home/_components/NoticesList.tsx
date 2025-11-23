const NoticesList = () => {
  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        📢 Notices from Owner
      </div>
      <div className="flex flex-col gap-3">
        <div className="p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 transition-colors duration-300 cursor-pointer hover:bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[15px] font-semibold text-gray-800">
              Water Supply Maintenance
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap ml-3">
              2 days ago
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Water supply will be stopped tomorrow from 10 AM to 2 PM.
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 transition-colors duration-300 cursor-pointer hover:bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[15px] font-semibold text-gray-800">
              Building Security Update
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap ml-3">
              1 week ago
            </div>
          </div>
          <div className="text-sm text-gray-600">
            A new security guard has been appointed for the night shift.
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticesList;
