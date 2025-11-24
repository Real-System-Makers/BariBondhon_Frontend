"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNoticeAction } from "@/lib/actions/notice.actions";
import { NoticeType } from "@/lib/types/notice";

const UploadNotice = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<NoticeType>(
    NoticeType.MAINTENANCE
  );
  const [isUrgent, setIsUrgent] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await createNoticeAction({
        title,
        details,
        type: selectedType,
        isUrgent,
      });

      if (result.success) {
        router.push("/owner-home");
      } else {
        setError(result.error || "Failed to create notice");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-5 text-white flex items-center gap-4">
        <Link
          href="/owner-home"
          className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center cursor-pointer text-lg transition-all duration-300 hover:bg-white/20 no-underline"
        >
          ←
        </Link>
        <div className="text-[22px] font-bold">Post a New Notice</div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}
        <form id="notice-form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="notice-title"
              className="block text-base font-semibold text-slate-800 mb-3"
            >
              Notice Title
            </label>
            <input
              type="text"
              id="notice-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base text-gray-700 transition-all duration-300 font-inherit focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10"
              placeholder="e.g., Lift Maintenance Schedule"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="notice-details"
              className="block text-base font-semibold text-slate-800 mb-3"
            >
              Details
            </label>
            <textarea
              id="notice-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base text-gray-700 transition-all duration-300 font-inherit focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:ring-[3px] focus:ring-[#4a90e2]/10 min-h-[120px] resize-y"
              placeholder="Write the full notice content here..."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-base font-semibold text-slate-800 mb-3">
              Notice Type
            </label>
            <div className="flex gap-2 flex-wrap">
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === NoticeType.MAINTENANCE
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Maintenance"
                onClick={() => setSelectedType(NoticeType.MAINTENANCE)}
              >
                Maintenance
              </div>
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === NoticeType.URGENT
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Urgent"
                onClick={() => setSelectedType(NoticeType.URGENT)}
              >
                Urgent
              </div>
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === NoticeType.INFORMATION
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Information"
                onClick={() => setSelectedType(NoticeType.INFORMATION)}
              >
                Information
              </div>
              <div
                className={`rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  selectedType === NoticeType.MEETING
                    ? "bg-[#4a90e2] border-2 border-[#4a90e2] text-white"
                    : "bg-slate-100 border-2 border-slate-200 text-slate-500"
                }`}
                data-type="Meeting"
                onClick={() => setSelectedType(NoticeType.MEETING)}
              >
                Meeting
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3">
              <label
                htmlFor="is-urgent"
                className="block text-base font-semibold text-slate-800 mb-0"
              >
                Mark as Urgent
              </label>
              <label className="relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  id="is-urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[24px] transition-all duration-[400ms] ${
                    isUrgent ? "bg-[#4a90e2]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute h-[18px] w-[18px] left-[3px] bottom-[3px] bg-white rounded-full transition-all duration-[400ms] ${
                      isUrgent ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-4 text-white text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgba(74,144,226,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(74,144,226,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNotice;
