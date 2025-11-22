import { Flat } from "@/lib/types/flat";
import FlatCard from "./FlatCard";

interface FlatListProps {
  flats: Flat[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (flat: Flat) => void;
}

const FlatList = ({ flats, isLoading, onDelete, onEdit }: FlatListProps) => {
  return (
    <div className="flex-1 p-5 px-6 overflow-y-auto relative">
      <div className="text-base text-slate-500 mb-5 font-medium">
        You are managing {flats.length} flats in total.
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-slate-500">Loading...</div>
      ) : (
        <div className="flex flex-col gap-4 pb-20">
          {flats.map((flat) => (
            <FlatCard
              key={flat._id}
              flat={flat}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          {flats.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No flats found. Add one to get started!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlatList;
