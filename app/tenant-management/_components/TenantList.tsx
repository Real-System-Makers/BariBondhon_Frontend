import { Tenant } from "@/lib/actions/tenant.actions";

interface TenantListProps {
  tenants: Tenant[];
  isLoading: boolean;
  onEdit: (tenant: Tenant) => void;
  onDelete: (id: string) => void;
}

const TenantList = ({ tenants, isLoading, onEdit, onDelete }: TenantListProps) => {
  if (isLoading) {
    return <div className="text-center py-10">Loading tenants...</div>;
  }

  if (tenants.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tenants found. Add a tenant to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {tenants.map((tenant) => (
        <div
          key={tenant._id}
          className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200 transition-all duration-300 relative group w-full"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {tenant.name}
              </h3>
              <p className="text-sm text-slate-500">{tenant.email}</p>
            </div>
            <div className="relative h-8 flex items-center justify-end">
                {tenant.flat ? (
                    <div className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-100 text-blue-800 transition-transform duration-300 ease-out group-hover:-translate-x-[84px]">
                        {tenant.flat.name}
                    </div>
                ) : (
                    <div className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-600 transition-transform duration-300 ease-out group-hover:-translate-x-[84px]">
                        No Flat
                    </div>
                )}
              
              <div className="absolute right-0 top-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <button
                  onClick={() => onEdit(tenant)}
                  className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                  title="Edit Tenant"
                >
                  ✎
                </button>
                <button
                  onClick={() => onDelete(tenant._id)}
                  className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                  title="Delete Tenant"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center text-slate-600 text-sm">
              <span className="w-20 text-slate-400 font-medium">Phone:</span>
              <span className="font-medium">{tenant.phone}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenantList;
