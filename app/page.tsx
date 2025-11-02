import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col">
      <header className="p-5 px-6 flex justify-between items-center bg-white flex-shrink-0 border-b border-slate-100">
        <div className="text-xl font-extrabold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          BariBondhu
        </div>
        <div className="flex gap-2">
          <Link href="/login">
            <button className="px-4 py-2 border-none rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 bg-slate-100 text-slate-600 hover:bg-slate-200">
              Log In
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 border-none rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600">
              Register
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white pt-10 px-6 pb-[70px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-10 after:bg-slate-100 after:rounded-t-[30px]">
          <div className="text-[28px] font-extrabold mb-2 relative z-[2]">
            Welcome to BariBondhu
          </div>
          <div className="text-base opacity-90 relative z-[2]">
            Your Complete Rental Management Solution!
          </div>
        </div>

        <section className="bg-slate-100 px-6 pb-6 -mt-5 relative z-[5]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[20px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-transform duration-300 hover:-translate-y-1 animate-[popIn_0.5s_ease-out_forwards] [animation-delay:0.1s] opacity-0">
              <div className="text-[28px] mb-3">👤</div>
              <div className="text-xl font-extrabold text-slate-800">800+</div>
              <div className="text-sm text-slate-500 font-medium">Owners</div>
            </div>
            <div className="bg-white rounded-[20px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-transform duration-300 hover:-translate-y-1 animate-[popIn_0.5s_ease-out_forwards] [animation-delay:0.2s] opacity-0">
              <div className="text-[28px] mb-3">👥</div>
              <div className="text-xl font-extrabold text-slate-800">1M+</div>
              <div className="text-sm text-slate-500 font-medium">Tenants</div>
            </div>
            <div className="bg-white rounded-[20px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-transform duration-300 hover:-translate-y-1 animate-[popIn_0.5s_ease-out_forwards] [animation-delay:0.3s] opacity-0">
              <div className="text-[28px] mb-3">🏙️</div>
              <div className="text-xl font-extrabold text-slate-800">250+</div>
              <div className="text-sm text-slate-500 font-medium">Cities</div>
            </div>
            <div className="bg-white rounded-[20px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-transform duration-300 hover:-translate-y-1 animate-[popIn_0.5s_ease-out_forwards] [animation-delay:0.4s] opacity-0">
              <div className="text-[28px] mb-3">🛠️</div>
              <div className="text-xl font-extrabold text-slate-800">500+</div>
              <div className="text-sm text-slate-500 font-medium">Services</div>
            </div>
            <div className="bg-white rounded-[20px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-transform duration-300 hover:-translate-y-1 animate-[popIn_0.5s_ease-out_forwards] [animation-delay:0.5s] opacity-0 col-span-2">
              <div className="text-[28px] mb-3">⭐</div>
              <div className="text-xl font-extrabold text-slate-800">1k+</div>
              <div className="text-sm text-slate-500 font-medium">
                5-Star Reviews
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-[30px] bg-slate-100">
          <div className="text-xl font-bold text-slate-800 text-center mb-5">
            Get Started
          </div>
          <a
            href="#"
            className="bg-white rounded-[20px] p-5 mb-4 flex items-center gap-4 no-underline text-inherit shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500"
          >
            <div className="w-12 h-12 rounded-xl text-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              🔑
            </div>
            <div>
              <div className="text-base font-bold text-slate-800">
                Are you an Owner?
              </div>
              <div className="text-sm text-slate-500">
                Manage your properties, tenants, and bills easily.
              </div>
            </div>
          </a>
          <a
            href="#"
            className="bg-white rounded-[20px] p-5 mb-4 flex items-center gap-4 no-underline text-inherit shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500"
          >
            <div className="w-12 h-12 rounded-xl text-2xl flex items-center justify-center flex-shrink-0 bg-slate-100 text-indigo-500">
              🏠
            </div>
            <div>
              <div className="text-base font-bold text-slate-800">
                Looking for a Home?
              </div>
              <div className="text-sm text-slate-500">
                Find your perfect rental property today.
              </div>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
};

export default Home;
