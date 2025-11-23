"use client";

import { createTenantAction, updateTenantAction, Tenant } from "@/lib/actions/tenant.actions";
import { useEffect, useState } from "react";

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tenant?: Tenant | null;
}

const TenantModal = ({ isOpen, onClose, onSuccess, tenant }: TenantModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (tenant) {
        setFormData({
          name: tenant.name,
          email: tenant.email,
          phone: tenant.phone,
        });
      } else {
        setFormData({ name: "", email: "", phone: "" });
      }
    }
  }, [isOpen, tenant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      if (tenant) {
        result = await updateTenantAction(tenant._id, formData);
      } else {
        result = await createTenantAction(formData);
      }

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Failed to save tenant:", error);
      alert("Failed to save tenant");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5 opacity-100 visible transition-all duration-300">
      <div className="bg-white rounded-[20px] w-full max-w-[350px] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transform translate-y-0 transition-all duration-300 flex flex-col max-h-[90vh]">
        <div className="p-5 px-6 flex justify-between items-center border-b border-slate-200 shrink-0">
          <div className="text-lg font-bold text-slate-800">
            {tenant ? "Edit Tenant" : "Add New Tenant"}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-none bg-slate-100 text-slate-500 rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden flex-1">
          <div className="p-6 overflow-y-auto flex-1">
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-3 text-base text-gray-700 transition-all duration-300 focus:outline-none focus:border-[#4a90e2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+880..."
              />
              {!tenant && (
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  This will be used as the initial password.
                </p>
              )}
            </div>
          </div>

          <div className="px-6 pb-6 pt-4 border-t border-slate-100 shrink-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-xl py-3.5 text-white text-base font-bold cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : (tenant ? "Update Tenant" : "Add Tenant")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantModal;
