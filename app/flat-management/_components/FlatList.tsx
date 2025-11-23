import { Flat } from "@/lib/types/flat";
import FlatCard from "./FlatCard";

interface FlatListProps {
  flats: Flat[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (flat: Flat) => void;
  onAssign: (flatId: string) => void;
}

const FlatList = ({ flats, isLoading, onDelete, onEdit, onAssign }: FlatListProps) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 pb-24 max-w-3xl mx-auto w-full">
      {flats.map((flat) => (
        <FlatCard
          key={flat._id}
          flat={flat}
          onDelete={onDelete}
          onEdit={onEdit}
          onAssign={onAssign}
        />
      ))}
      {flats.length === 0 && (
        <div className="text-center py-10 text-slate-400 col-span-full">
          No flats found. Add one to get started!
        </div>
      )}
    </div>
  );
};

export default FlatList;
