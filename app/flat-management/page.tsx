"use client";

import { deleteFlatAction, getFlatsAction } from "@/lib/actions/flat.actions";
import { Flat } from "@/lib/types/flat";
import { useEffect, useState } from "react";
import CreateFlatModal from "./_components/CreateFlatModal";
import FlatList from "./_components/FlatList";
import Header from "../_components/Header";
import AssignTenantModal from "./_components/AssignTenantModal";

const FlatManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedFlatId, setSelectedFlatId] = useState("");

  const fetchFlats = async () => {
    try {
      const data = await getFlatsAction();
      setFlats(data);
    } catch (error) {
      console.error("Failed to fetch flats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flat?")) return;
    try {
      await deleteFlatAction(id);
      fetchFlats();
    } catch (error) {
      console.error("Failed to delete flat:", error);
      alert("Failed to delete flat");
    }
  };

  const handleEdit = (flat: Flat) => {
    setSelectedFlat(flat);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedFlat(null);
    setIsModalOpen(true);
  };

  const handleAssign = (flatId: string) => {
    setSelectedFlatId(flatId);
    setIsAssignModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <Header title="Flat Management" />
        <FlatList
          flats={flats}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAssign={handleAssign}
        />

        <button
          onClick={handleCreate}
          className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] border-none rounded-full text-white text-[28px] cursor-pointer shadow-[0_8px_30px_rgba(74,144,226,0.4)] transition-all duration-300 flex items-center justify-center z-50 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_12px_40px_rgba(74,144,226,0.5)]"
          title="Add New Flat"
        >
          +
        </button>
      </div>

      <CreateFlatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFlats}
        flat={selectedFlat}
      />

      <AssignTenantModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSuccess={fetchFlats}
        flatId={selectedFlatId}
      />
    </>
  );
};

export default FlatManagement;
