import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, Clock, ClipboardEdit, LogOut, Home, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ items, profileLink, logoutTo = '/login', open = false, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate(logoutTo, { replace: true });
  };
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          aria-hidden
        />
      )}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col w-64 shrink-0 z-50
          fixed lg:sticky top-0 h-screen
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-4 lg:px-6 py-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80" onClick={onClose}>
            <Logo size={36} />
            <span className="font-semibold text-base">Amanfoɔ '97</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-900 p-1"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <Link
          to="/"
          onClick={onClose}
          className="mx-4 mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Home size={18} /> Home
        </Link>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'text-brand bg-brand/5' : 'text-gray-600 hover:bg-gray-50'
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
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'text-brand bg-brand/5' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-bold text-white bg-gray-400">
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
    </>
  );
}

export { LayoutGrid, Users, Clock, ClipboardEdit };
