import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Home, Menu, Megaphone, WalletCards, MessageSquareHeart, ClipboardEdit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../data/notifications';

const typeIcon = {
  announcement: <Megaphone size={16} className="text-red-500" />,
  contribution: <WalletCards size={16} className="text-emerald-600" />,
  community: <MessageSquareHeart size={16} className="text-blue-500" />,
  survey: <ClipboardEdit size={16} className="text-amber-600" />,
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function TopBar({ title, onMenuClick }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => getNotifications());
  const unread = notifications.filter((n) => !n.read).length;

  const refresh = () => setNotifications(getNotifications());

  const handleClick = (notif) => {
    markAsRead(notif.id);
    refresh();
    setOpen(false);
    if (notif.link) navigate(notif.link);
  };

  const handleMarkAll = () => {
    markAllAsRead();
    refresh();
  };

  const initials = (user?.name || 'AD').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

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

        <div className="relative">
          <button
            onClick={() => { setOpen((v) => !v); refresh(); }}
            className="relative text-gray-700 hover:text-gray-900 p-1"
            aria-label="Notifications"
          >
            <Bell size={22} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-80 sm:w-96 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unread > 0 && (
                    <button
                      onClick={handleMarkAll}
                      className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:text-brand-dark"
                    >
                      <CheckCheck size={14} /> Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-400">No notifications yet.</div>
                  ) : (
                    notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => handleClick(notif)}
                        className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 transition ${
                          !notif.read ? 'bg-brand/5' : ''
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {typeIcon[notif.type] || <Bell size={16} className="text-gray-400" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-sm font-medium leading-snug ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notif.title}
                            </span>
                            {!notif.read && (
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-brand shrink-0" />
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                          <span className="mt-1 text-[11px] text-gray-400">{timeAgo(notif.createdAt)}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-brand text-white font-semibold text-sm flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="text-sm font-semibold">{user?.name || 'Senior'}</div>
            <div className="text-xs text-gray-500">{user?.email || ''}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
