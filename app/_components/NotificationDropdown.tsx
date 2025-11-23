"use client";

import { useEffect, useState } from "react";
import { getNotificationsAction, markAsReadAction } from "@/lib/actions/notification.actions";
import { Notification } from "@/lib/types/notification";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick: (notification: Notification) => void;
}

const NotificationDropdown = ({ isOpen, onClose, onNotificationClick }: NotificationDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    const data = await getNotificationsAction();
    setNotifications(data.slice(0, 10)); // Show latest 10
    setLoading(false);
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsReadAction(notification._id);
    }
    onNotificationClick(notification);
    onClose();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "Rent Generated":
        return "🏠";
      case "Payment Due":
        return "⏰";
      case "Payment Overdue":
        return "⚠️";
      case "Payment Received":
        return "✅";
      case "Late Fee Applied":
        return "💰";
      default:
        return "📢";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "border-l-red-500";
      case "High":
        return "border-l-orange-500";
      case "Medium":
        return "border-l-blue-500";
      default:
        return "border-l-slate-300";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div className="absolute right-0 top-12 w-80 md:w-96 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-200 z-50 max-h-[500px] overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Notifications</h3>
          {notifications.filter(n => !n.isRead).length > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
              {notifications.filter(n => !n.isRead).length} new
            </span>
          )}
        </div>

        <div className="overflow-y-auto max-h-[400px]">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <div className="text-4xl mb-2">🔔</div>
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-semibold text-slate-800 ${!notification.isRead ? "font-bold" : ""}`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">
                          {formatTime(notification.createdAt)}
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs text-slate-500">
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-slate-200 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown;
