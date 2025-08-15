import Sidebar from "@/components/app/Sidebar";
import { ReactNode, useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, usePage } from "@inertiajs/react";

type AppLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function AppLayout({ children , title}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const page = usePage();
  console.log(page);


  const form = useForm();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e: FormEvent) => {
      e.preventDefault();
      form.post(route('logout'));
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>

          {/* Menu utilisateur */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center space-x-2"
            >
              <span className="text-gray-600 hidden sm:block">John Doe</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="Avatar"
                className="rounded-full w-10 h-10 border"
              />
            </button>

            {/* AnimatePresence pour gérer l’entrée/sortie */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-50"
                >
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profil
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Paramètres
                  </a>
                  <form onSubmit={handleLogout}>
                    <button
                      type="submit"
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Déconnexion
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
