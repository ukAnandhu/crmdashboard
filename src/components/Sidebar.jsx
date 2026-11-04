
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  X
} from "lucide-react";

function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Customers", icon: Users },
    { name: "Settings", icon: Settings }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-64 flex-col
        bg-slate-900 px-5 py-6 text-white
        transition-transform duration-300 md:static md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        <div className="mb-12 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500 text-xl font-bold">
            C
          </div>

          <h2 className="text-xl font-bold">ClientFlow</h2>

          <button
            className="ml-auto md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <p className="mb-4 px-3 text-xs font-bold tracking-widest text-slate-400">
          MENU
        </p>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center gap-3 rounded-lg px-4 py-3
                  text-sm font-medium transition
                  ${
                    activePage === item.name
                      ? "bg-indigo-500 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="mb-6 rounded-xl bg-slate-800 p-4">
            <HelpCircle className="mb-3 text-indigo-400" size={23} />
            <h4 className="mb-2 text-sm font-semibold">Need help?</h4>
            <p className="text-xs leading-5 text-slate-400">
              Contact our support team for assistance.
            </p>
            <a
              href="mailto:support@example.com"
              className="mt-4 block rounded-lg bg-indigo-500 py-2 text-center text-xs font-semibold hover:bg-indigo-600"
            >
              Contact Support
            </a>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-700 pt-5">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-600">
              A
            </div>
            <div>
              <h4 className="text-sm font-semibold">Admin User</h4>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
