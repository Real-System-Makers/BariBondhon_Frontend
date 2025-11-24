"use client";

import { useEffect, useState } from "react";
import { getNoticesAction } from "@/lib/actions/notice.actions";
import { Notice } from "@/lib/types/notice";

const NoticesList = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNoticesAction();
        setNotices(data);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <>
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        📢 Notices from Owner
      </div>
      {loading ? (
        <div className="flex flex-col gap-3">
          <div className="p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      ) : notices.length === 0 ? (
        <div className="p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 text-center text-gray-500">
          No notices available
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className={`p-4 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border transition-colors duration-300 cursor-pointer hover:bg-gray-50 ${
                notice.isUrgent
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <div className="text-[15px] font-semibold text-gray-800">
                    {notice.title}
                  </div>
                  {notice.isUrgent && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
                      URGENT
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-3">
                  {formatTimeAgo(notice.createdAt)}
                </div>
              </div>
              <div className="text-sm text-gray-600">{notice.details}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NoticesList;
