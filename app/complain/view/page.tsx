"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getMaintenanceRequestsAction,
  getMaintenanceStatsAction,
  updateMaintenanceStatusAction,
  addMaintenanceReplyAction,
  getMaintenanceRequestByIdAction,
} from "@/lib/actions/maintenance.actions";
import {
  MaintenanceRequest,
  MaintenanceStatus,
  MaintenanceStats,
} from "@/lib/types/maintenance";

type FilterStatus = "all" | "pending" | "progress" | "resolved";

const FILTER_BUTTONS: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "progress", label: "In Progress" },
  { id: "resolved", label: "Resolved" },
];

const ViewIssue = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeFilter]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const status =
        activeFilter === "all"
          ? undefined
          : activeFilter === "progress"
          ? MaintenanceStatus.IN_PROGRESS
          : activeFilter === "pending"
          ? MaintenanceStatus.PENDING
          : MaintenanceStatus.RESOLVED;

      const [requestsData, statsData] = await Promise.all([
        getMaintenanceRequestsAction(status),
        getMaintenanceStatsAction(),
      ]);

      setRequests(requestsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterId: FilterStatus) => {
    setActiveFilter(filterId);
  };

  const handleStatusUpdate = async (
    requestId: string,
    newStatus: MaintenanceStatus
  ) => {
    if (isUpdatingStatus) return;

    setIsUpdatingStatus(requestId);
    try {
      const result = await updateMaintenanceStatusAction(requestId, {
        status: newStatus,
      });

      if (result.success) {
        await fetchData();
        if (selectedRequest?._id === requestId) {
          const updated = await getMaintenanceRequestByIdAction(requestId);
          if (updated) setSelectedRequest(updated);
        }
      } else {
        alert(result.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSubmitReply = async () => {
    if (!selectedRequest || !replyMessage.trim()) return;

    setIsSubmittingReply(true);
    try {
      const result = await addMaintenanceReplyAction(selectedRequest._id, {
        message: replyMessage.trim(),
      });

      if (result.success) {
        setReplyMessage("");
        await fetchData();
        const updated = await getMaintenanceRequestByIdAction(selectedRequest._id);
        if (updated) setSelectedRequest(updated);
      } else {
        alert(result.error || "Failed to send reply");
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("Failed to send reply");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleOpenModal = async (request: MaintenanceRequest) => {
    try {
      const fullRequest = await getMaintenanceRequestByIdAction(request._id);
      if (fullRequest) {
        setSelectedRequest(fullRequest);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch request details:", error);
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setReplyMessage("");
  };

  const getStatusBadgeClass = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.RESOLVED:
        return "bg-green-100 text-green-900";
      case MaintenanceStatus.IN_PROGRESS:
        return "bg-amber-100 text-amber-900";
      case MaintenanceStatus.PENDING:
        return "bg-red-100 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.RESOLVED:
        return "Resolved";
      case MaintenanceStatus.IN_PROGRESS:
        return "In Progress";
      case MaintenanceStatus.PENDING:
        return "Pending";
      default:
        return status;
    }
  };

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case "water":
        return "💧";
      case "electricity":
        return "⚡";
      case "lift":
        return "🛗";
      case "others":
        return "🔧";
      default:
        return "📝";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-5 text-white relative">
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all duration-300 hover:bg-white/20"
            >
              ←
            </button>
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
                  activeFilter === button.id
                    ? "bg-white/20 text-white"
                    : "bg-transparent text-white/80 border-none hover:bg-white/20 hover:text-white"
                }`}
                onClick={() => handleFilterChange(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 px-6 h-[calc(100%-160px)] overflow-y-auto">
          {stats && (
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-white p-3 rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[rgba(226,232,240,0.8)]">
                <div className="text-xl font-bold text-[#dc2626] mb-1">
                  {stats.pending}
                </div>
                <div className="text-xs text-slate-500 font-medium">Pending</div>
              </div>
              <div className="bg-white p-3 rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[rgba(226,232,240,0.8)]">
                <div className="text-xl font-bold text-[#f59e0b] mb-1">
                  {stats.in_progress}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  In Progress
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[rgba(226,232,240,0.8)]">
                <div className="text-xl font-bold text-[#10b981] mb-1">
                  {stats.resolved}
                </div>
                <div className="text-xs text-slate-500 font-medium">Resolved</div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Loading maintenance requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No maintenance requests found
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[rgba(226,232,240,0.8)] transition-all duration-300 cursor-pointer relative hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                  onClick={() => handleOpenModal(request)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="text-base font-semibold text-slate-800 mb-1">
                        {request.tenant.name}
                      </div>
                      <div className="text-sm text-slate-500 font-medium">
                        {request.flat.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600">
                      <span className="text-base">
                        {getIssueTypeIcon(request.issueType)}
                      </span>
                      <span>
                        {request.issueType.charAt(0).toUpperCase() +
                          request.issueType.slice(1).replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-slate-500 leading-[1.4] mb-3 line-clamp-2">
                      {request.description}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xs text-slate-400">
                        {formatDate(request.createdAt)}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-center ${getStatusBadgeClass(
                        request.status
                      )}`}
                    >
                      {getStatusLabel(request.status)}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {request.status === MaintenanceStatus.PENDING && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(
                            request._id,
                            MaintenanceStatus.IN_PROGRESS
                          );
                        }}
                        disabled={isUpdatingStatus === request._id}
                        className="px-3 py-2 border-[1.5px] border-[#f59e0b] text-[#f59e0b] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#f59e0b] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdatingStatus === request._id
                          ? "Updating..."
                          : "Mark In Progress"}
                      </button>
                    )}
                    {request.status !== MaintenanceStatus.RESOLVED && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(
                            request._id,
                            MaintenanceStatus.RESOLVED
                          );
                        }}
                        disabled={isUpdatingStatus === request._id}
                        className="px-3 py-2 border-[1.5px] border-[#10b981] text-[#10b981] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#10b981] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdatingStatus === request._id
                          ? "Updating..."
                          : "Resolve"}
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(request);
                      }}
                      className="px-3 py-2 border-[1.5px] border-[#4a90e2] text-[#4a90e2] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 bg-white hover:bg-[#4a90e2] hover:text-white"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[350px] max-h-[90vh] overflow-y-auto shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white p-6 pb-5 rounded-t-[20px] relative">
              <button
                className="absolute top-5 right-5 w-8 h-8 border-none bg-white/20 text-white rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={handleCloseModal}
              >
                ×
              </button>
              <div className="text-xl font-bold mb-1">
                {selectedRequest.tenant.name}
              </div>
              <div className="text-sm opacity-90">
                {getIssueTypeIcon(selectedRequest.issueType)}{" "}
                {selectedRequest.issueType.charAt(0).toUpperCase() +
                  selectedRequest.issueType.slice(1).replace("_", " ")}{" "}
                - {selectedRequest.flat.name}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  📋 Full Description
                </div>
                <div className="text-sm text-slate-600 leading-[1.5] bg-slate-50 p-4 rounded-xl border-l-4 border-[#4a90e2]">
                  {selectedRequest.description}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  ⏰ Status Timeline
                </div>
                <div className="relative pl-8 before:content-[''] before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
                  {selectedRequest.statusHistory.map((history, index) => {
                    const isActive =
                      index === selectedRequest.statusHistory.length - 1;
                    const statusColors = {
                      [MaintenanceStatus.PENDING]: "bg-red-500",
                      [MaintenanceStatus.IN_PROGRESS]: "bg-amber-500",
                      [MaintenanceStatus.RESOLVED]: "bg-green-500",
                    };
                    return (
                      <div key={index} className="relative mb-5 pl-2">
                        <div
                          className={`absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] ${
                            isActive
                              ? statusColors[history.status]
                              : "bg-slate-200"
                          } ${isActive ? "text-white" : "text-slate-400"}`}
                        >
                          {isActive ? "✓" : "⏳"}
                        </div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">
                          {getStatusLabel(history.status)}
                        </div>
                        <div className="text-xs text-slate-400">
                          {formatDate(history.changedAt)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedRequest.replies.length > 0 && (
                <div className="mb-6">
                  <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    💬 Conversation
                  </div>
                  <div className="space-y-3">
                    {selectedRequest.replies.map((reply, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl ${
                          reply.senderRole === "owner"
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : "bg-gray-50 border-l-4 border-gray-400"
                        }`}
                      >
                        <div className="text-xs font-semibold text-slate-700 mb-1">
                          {reply.sender.name} ({reply.senderRole === "owner" ? "Owner" : "Tenant"})
                        </div>
                        <div className="text-sm text-slate-600 leading-[1.5]">
                          {reply.message}
                        </div>
                        <div className="text-xs text-slate-400 mt-2">
                          {formatDate(reply.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  💬 Send Reply
                </div>
                <textarea
                  className="w-full min-h-[80px] bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 resize-y font-inherit mb-3 focus:border-[#4a90e2] focus:bg-white"
                  placeholder="Type your message..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyMessage.trim() || isSubmittingReply}
                  className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] text-white border-none rounded-[10px] px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,144,226,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingReply ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewIssue;
