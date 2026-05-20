import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, Clock, ClipboardEdit, LogOut, Home } from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ items, profileLink, logoutTo = '/login' }) {
  const navigate = useNavigate();
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
        title="Go to home"
      >
        <Logo size={36} />
        <span className="font-semibold text-base">Amanfoɔ -97</span>
      </Link>
      <Link
        to="/"
        className="mx-4 mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        <Home size={18} /> Home
      </Link>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'text-brand bg-brand/5'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            {it.icon}
            <span>{it.label}</span>
          </NavLink>
        ))}
        {profileLink && (
          <NavLink
            to={profileLink}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive ? 'text-brand bg-brand/5' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <span
              className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-bold text-white ${
                window.location.pathname === profileLink ? 'bg-brand' : 'bg-gray-400'
              }`}
            >
              AD
            </span>
            <span>My Profile</span>
          </NavLink>
        )}
      </nav>
      <button
        onClick={() => navigate(logoutTo)}
        className="m-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}

export { LayoutGrid, Users, Clock, ClipboardEdit };
