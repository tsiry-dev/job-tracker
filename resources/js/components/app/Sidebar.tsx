import { FC } from "react";
import { ChartNoAxesCombined, Component, Gauge, Users, X } from "lucide-react";
import { Link } from "@inertiajs/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-4 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed md:static z-5 w-64 bg-primary text-white shadow-lg min-h-[100vh] transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-cyan-600">
          <h2 className="text-lg font-bold">Job Tracker</h2>
          <button className="md:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href={route("admin.dashboard")} className="px-3 py-2 rounded hover:bg-cyan-600 flex items-start gap-2">
            <span className=""><ChartNoAxesCombined size={15}/></span>
            <span>Dashboard</span>
          </Link>
          <Link href={route("admin.vagues.index")} className="px-3 py-2 rounded hover:bg-cyan-600 flex items-start gap-2">
            <span className=""><Users size={15}/></span>
            <span>Vagues</span>
          </Link>
          <Link href={route("admin.levels.index")} className="px-3 py-2 rounded hover:bg-cyan-600 flex items-start gap-2">
            <span className=""><Gauge size={15} /></span>
            <span>Niveaux</span>
          </Link>
          <Link href={route("admin.modules.index")} className="px-3 py-2 rounded hover:bg-cyan-600 flex items-start gap-2">
            <span className=""><Component size={15} /></span>
            <span>Modules</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
