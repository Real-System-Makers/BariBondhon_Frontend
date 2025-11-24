"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createMaintenanceRequestAction,
  getMaintenanceRequestsAction,
  getMaintenanceRequestByIdAction,
  addMaintenanceReplyAction,
} from "@/lib/actions/maintenance.actions";
import {
  MaintenanceRequest,
  MaintenanceIssueType,
  MaintenanceStatus,
} from "@/lib/types/maintenance";

const ComplaintIssue = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState<MaintenanceIssueType | "">("");
  const [selectedIcon, setSelectedIcon] = useState("📝");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousRequests, setPreviousRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  useEffect(() => {
    const fetchPreviousRequests = async () => {
      try {
        const requests = await getMaintenanceRequestsAction();
        setPreviousRequests(requests);
      } catch (error) {
        console.error("Failed to fetch previous requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreviousRequests();
  }, []);

  const handleIssueTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.selectedOptions[0];
    const icon = selected.getAttribute("data-icon") || "📝";
    setSelectedIcon(icon);
    setIssueType(e.target.value as MaintenanceIssueType);
  };

  const getStatusBadgeClass = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.RESOLVED:
        return "bg-green-100 text-green-800";
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

  const getIssueTypeIcon = (type: MaintenanceIssueType) => {
    switch (type) {
      case MaintenanceIssueType.WATER:
        return "💧";
      case MaintenanceIssueType.ELECTRICITY:
        return "⚡";
      case MaintenanceIssueType.LIFT:
        return "🛗";
      case MaintenanceIssueType.OTHERS:
        return "🔧";
      default:
        return "📝";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueType || !description.trim()) {
      alert("Please select an issue type and provide a description");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createMaintenanceRequestAction({
        issueType: issueType as MaintenanceIssueType,
        description: description.trim(),
      });

      if (result.success) {
        setDescription("");
        setIssueType("");
        setSelectedIcon("📝");
        const requests = await getMaintenanceRequestsAction();
        setPreviousRequests(requests);
      } else {
        alert(result.error || "Failed to submit maintenance request");
      }
    } catch (error) {
      console.error("Failed to submit request:", error);
      alert("Failed to submit maintenance request");
    } finally {
      setIsSubmitting(false);
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

  const handleSubmitReply = async () => {
    if (!selectedRequest || !replyMessage.trim()) return;

    setIsSubmittingReply(true);
    try {
      const result = await addMaintenanceReplyAction(selectedRequest._id, {
        message: replyMessage.trim(),
      });

      if (result.success) {
        setReplyMessage("");
        const requests = await getMaintenanceRequestsAction();
        setPreviousRequests(requests);
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
      });
    }
  };

  const isSubmitDisabled = !issueType || !description.trim() || isSubmitting;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 pt-12 pb-5 px-6 text-white relative">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all hover:bg-white/20"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="text-[22px] font-bold mb-1">
              Maintenance Request
            </div>
            <div className="text-sm opacity-85">
              Report issues and track progress
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 h-[calc(100%-110px)] overflow-y-auto">
        <form onSubmit={handleSubmit} className="mb-8 animate-[fadeInUp_0.6s_ease_forwards]">
          <div className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            🛠️ New Request
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Issue Type
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl pointer-events-none transition-all">
                {selectedIcon}
              </div>
              <select
                className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl pl-[60px] pr-5 text-base text-gray-700 cursor-pointer outline-none transition-all appearance-none focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px center",
                  backgroundSize: "20px",
                }}
                id="issueType"
                value={issueType}
                onChange={handleIssueTypeChange}
                required
              >
                <option value="">Select issue type</option>
                <option value={MaintenanceIssueType.WATER} data-icon="💧">
                  Water Issue
                </option>
                <option value={MaintenanceIssueType.ELECTRICITY} data-icon="⚡">
                  Electricity Problem
                </option>
                <option value={MaintenanceIssueType.LIFT} data-icon="🛗">
                  Lift/Elevator
                </option>
                <option value={MaintenanceIssueType.OTHERS} data-icon="🔧">
                  Others
                </option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                className="w-full min-h-[120px] bg-white border-2 border-gray-200 rounded-2xl p-4 text-base text-gray-700 outline-none transition-all resize-y font-[inherit] leading-6 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                id="description"
                placeholder="Please describe the issue in detail. Include location, severity, and any relevant information..."
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="absolute bottom-3 right-4 text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded-md">
                {description.length}/500
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none rounded-2xl text-lg font-semibold cursor-pointer transition-all shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_12px_40px_rgba(16,185,129,0.4)] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={isSubmitDisabled}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading previous requests...</div>
        ) : previousRequests.length > 0 ? (
          <div>
            <div className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
              📋 Previous Requests
            </div>
            <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-200 animate-[fadeInUp_0.6s_ease_forwards] [animation-delay:0.2s]">
              {previousRequests.map((request) => {
                const hasReplies = request.replies && request.replies.length > 0;
                return (
                  <div
                    key={request._id}
                    className={`p-4 border-b border-gray-100 last:border-b-0 transition-colors cursor-pointer hover:bg-gray-50 ${
                      hasReplies ? "border-l-4 border-l-blue-500" : ""
                    }`}
                    onClick={() => handleOpenModal(request)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[15px] font-semibold text-gray-800 flex items-center gap-2">
                        <span>{getIssueTypeIcon(request.issueType)}</span>
                        <span>
                          {request.issueType.charAt(0).toUpperCase() +
                            request.issueType.slice(1).replace("_", " ")}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(request.createdAt)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 leading-snug mb-2">
                      {request.description}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold ${getStatusBadgeClass(
                          request.status
                        )}`}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                      {hasReplies && (
                        <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                          <span>💬</span>
                          <span>
                            {request.replies.length}{" "}
                            {request.replies.length === 1 ? "reply" : "replies"}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No previous requests found
          </div>
        )}
      </div>

      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5"
          onClick={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
            setReplyMessage("");
          }}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[350px] max-h-[90vh] overflow-y-auto shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 pb-5 rounded-t-[20px] relative">
              <button
                className="absolute top-5 right-5 w-8 h-8 border-none bg-white/20 text-white rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRequest(null);
                  setReplyMessage("");
                }}
              >
                ×
              </button>
              <div className="text-xl font-bold mb-1">
                {getIssueTypeIcon(selectedRequest.issueType)}{" "}
                {selectedRequest.issueType.charAt(0).toUpperCase() +
                  selectedRequest.issueType.slice(1).replace("_", " ")}
              </div>
              <div className="text-sm opacity-90">
                {selectedRequest.flat.name}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  📋 Description
                </div>
                <div className="text-sm text-slate-600 leading-[1.5] bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-500">
                  {selectedRequest.description}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  ⏰ Status
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${getStatusBadgeClass(
                      selectedRequest.status
                    )}`}
                  >
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatDate(selectedRequest.createdAt)}
                  </span>
                </div>
              </div>

              {selectedRequest.replies && selectedRequest.replies.length > 0 && (
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
                  className="w-full min-h-[80px] bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 resize-y font-inherit mb-3 focus:border-emerald-500 focus:bg-white"
                  placeholder="Type your message..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyMessage.trim() || isSubmittingReply}
                  className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none rounded-[10px] px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingReply ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintIssue;
