import { Role } from "@/lib/constants/role";
import { primaryStart, primaryEnd, shadowColor } from "../_lib/colors";

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
        isActive ? "text-white" : "text-slate-600"
      }`}
      style={
        isActive
          ? {
              background: `linear-gradient(135deg, ${primaryStart}, ${primaryEnd})`,
              boxShadow: `0 4px 20px ${shadowColor}`,
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
