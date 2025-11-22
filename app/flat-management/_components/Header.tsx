import Link from "next/link";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#4a90e2] to-[#50e3c2] pt-[50px] px-6 pb-[30px] text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:bg-white after:rounded-t-[30px]">
      <div className="flex items-center gap-4 relative z-[2]">
        <Link
          href="/"
          className="w-10 h-10 border-2 border-white/30 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0 text-lg transition-all duration-300 hover:bg-white/20 no-underline"
        >
          ←
        </Link>
        <div className="text-[22px] font-bold">Flat Management</div>
      </div>
    </div>
  );
};

export default Header;
