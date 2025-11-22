"use client";

import { deleteFlatAction, getFlatsAction } from "@/lib/actions/flat.actions";
import { Flat } from "@/lib/types/flat";
import { useEffect, useState } from "react";
import CreateFlatModal from "./_components/CreateFlatModal";
import FlatList from "./_components/FlatList";
import Header from "./_components/Header";

const FlatManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <div className="flex flex-col h-full">
        <Header />
        <FlatList flats={flats} isLoading={isLoading} onDelete={handleDelete} />

        <button
          onClick={() => setIsModalOpen(true)}
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
      />
    </>
  );
};

export default FlatManagement;
