import { Link } from 'react-router-dom';
import { Bell, Home } from 'lucide-react';

export default function TopBar({ title }) {
  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="text-lg font-medium text-gray-800">{title}</h1>
      <div className="flex items-center gap-5">
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
          <div className="w-10 h-10 rounded-full bg-brand text-white font-semibold text-sm flex items-center justify-center">
            AD
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Kwame</div>
            <div className="text-xs text-gray-500">owner@elaundry.com</div>
          </div>
        </div>
      </div>
    </header>
  );
}
