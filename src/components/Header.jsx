
import { Search, Bell, Menu } from "lucide-react";

function Header({ title, setIsOpen }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-8">

      <div className="flex items-center gap-3">
        <button
          className="text-slate-600 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={23} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
            {title}
          </h1>
          <p className="mt-1 hidden text-xs text-slate-400 sm:block">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100">
          <Search size={19} />
        </button>

        <button className="relative grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-slate-500">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-600">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800">
              Admin User
            </p>
            <p className="text-[11px] text-slate-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
