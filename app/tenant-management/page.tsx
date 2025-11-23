"use client";

import { deleteTenantAction, getTenantsAction, Tenant } from "@/lib/actions/tenant.actions";
import { useEffect, useState } from "react";
import Header from "../_components/Header";
import TenantModal from "./_components/TenantModal";
import TenantList from "./_components/TenantList";

const TenantManagement = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const fetchTenants = async () => {
    try {
      const data = await getTenantsAction();
      setTenants(data);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tenant? This will also unassign them from any flat.")) return;
    try {
      const result = await deleteTenantAction(id);
      if (result.success) {
        fetchTenants();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Failed to delete tenant:", error);
      alert("Failed to delete tenant");
    }
  };

  const handleCreate = () => {
    setSelectedTenant(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen">
      <Header title="Tenant Management" />
      
      <div className="max-w-7xl mx-auto w-full p-6">
          <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Tenant Management</h1>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
              >
                + Add Tenant
              </button>
          </div>
          
          <TenantList 
            tenants={tenants}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
      </div>

      <TenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTenants}
        tenant={selectedTenant}
      />
    </div>
  );
};

export default TenantManagement;
