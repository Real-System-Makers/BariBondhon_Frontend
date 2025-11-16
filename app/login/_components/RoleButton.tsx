import { Role } from "@/lib/constants/role";

interface RoleButtonProps {
  label: string;
  role: Role;
  currentRole: Role;
  onClick: (role: Role) => void;
}

const RoleButton = ({ label, role, currentRole, onClick }: RoleButtonProps) => {
  const isActive = currentRole === role;

  return (
    <div
      onClick={() => onClick(role)}
      className={`flex-1 py-3.5 text-center rounded-xl cursor-pointer text-base font-semibold transition-all duration-[400ms] ${
        isActive ? "text-white shadow-primary-sm" : "text-slate-600"
      }`}
      style={
        isActive
          ? {
              background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
            }
          : {}
      }
      data-role={role}
    >
      {label}
    </div>
  );
};

export default RoleButton;
