import { Link } from 'react-router-dom';
import { Bell, Home, Menu } from 'lucide-react';

export default function TopBar({ title, onMenuClick }) {
  return (
    <header className="h-[64px] md:h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-brand p-1 -ml-1"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base md:text-lg font-medium text-gray-800 truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <Link
          to="/"
          title="Go to home"
          className="text-gray-700 hover:text-brand transition flex items-center gap-1.5 text-sm font-medium"
        >
          <Home size={20} /> <span className="hidden md:inline">Home</span>
        </Link>
        <button className="text-gray-700 hover:text-gray-900">
          <Bell size={22} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-brand text-white font-semibold text-sm flex items-center justify-center shrink-0">
            AD
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="text-sm font-semibold">Kwame Mensah</div>
            <div className="text-xs text-gray-500">kwame.mensah@amanfo97.org</div>
          </div>
        </div>
      </div>
    </header>
  );
}
