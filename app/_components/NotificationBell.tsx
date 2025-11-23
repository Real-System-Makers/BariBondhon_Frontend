"use client";

import { useEffect, useState } from "react";
import { getUnreadCountAction } from "@/lib/actions/notification.actions";
import NotificationDropdown from "./NotificationDropdown";
import { Notification } from "@/lib/types/notification";

interface NotificationBellProps {
  onNotificationClick: (notification: Notification) => void;
}

const NotificationBell = ({ onNotificationClick }: NotificationBellProps) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    const count = await getUnreadCountAction();
    setUnreadCount(count);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Refresh count when opening
      fetchUnreadCount();
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setUnreadCount(Math.max(0, unreadCount - 1));
    onNotificationClick(notification);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
        aria-label="Notifications"
      >
        <svg
          className="w-6 h-6 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNotificationClick={handleNotificationClick}
      />
    </div>
  );
};

export default NotificationBell;
