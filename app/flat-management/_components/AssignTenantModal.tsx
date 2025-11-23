"use client";

import { assignTenantAction, createTenantAction, getTenantsAction, Tenant } from "@/lib/actions/tenant.actions";
import { useEffect, useState } from "react";

interface AssignTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  flatId: string;
}

const AssignTenantModal = ({ isOpen, onClose, onSuccess, flatId }: AssignTenantModalProps) => {
  const [mode, setMode] = useState<"select" | "create">("select");
  const [isLoading, setIsLoading] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenantId, setSelectedTenantId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isOpen && mode === "select") {
      const fetchTenants = async () => {
        const data = await getTenantsAction();
        setTenants(data);
      };
      fetchTenants();
    }
  }, [isOpen, mode]);

  const handleAssign = async () => {
    if (!selectedTenantId) return;
    setIsLoading(true);
    try {
      const result = await assignTenantAction(selectedTenantId, flatId);
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Failed to assign tenant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAndAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const createResult = await createTenantAction({ ...formData, flatId: "" });
      if (!createResult.success) {
        alert(createResult.error);
        setIsLoading(false);
        return;
      }
      
      const updatedTenants = await getTenantsAction();
      const newTenant = updatedTenants.find(t => t.email === formData.email);
      
      if (newTenant) {
          const assignResult = await assignTenantAction(newTenant._id, flatId);
          if (assignResult.success) {
              onSuccess();
              onClose();
          } else {
              alert(assignResult.error);
          }
      } else {
          alert("Tenant created but could not be found for assignment.");
      }

    } catch (error) {
      console.error("Failed to create and assign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Tenant</h2>
        
        <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
            <button 
                onClick={() => setMode("select")}
                className={`pb-2 text-sm font-medium transition-colors ${mode === "select" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
                Select Existing
            </button>
            <button 
                onClick={() => setMode("create")}
                className={`pb-2 text-sm font-medium transition-colors ${mode === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
                Create New
            </button>
        </div>

        {mode === "select" ? (
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Tenant</label>
                    <select 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        value={selectedTenantId}
                        onChange={(e) => setSelectedTenantId(e.target.value)}
                    >
                        <option value="">Choose a tenant...</option>
                        {tenants.map(t => (
                            <option key={t._id} value={t._id}>{t.name} ({t.email})</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleAssign}
                    disabled={isLoading || !selectedTenantId}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Assigning..." : "Assign Tenant"}
                </button>
            </div>
        ) : (
            <form onSubmit={handleCreateAndAssign} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Creating & Assigning..." : "Create & Assign"}
                </button>
            </form>
        )}

        <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
            Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignTenantModal;
