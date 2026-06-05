import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import NoIndex from '../components/NoIndex';
import { LayoutGrid, Users, Clock, HelpCircle, WalletCards } from 'lucide-react';

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const items = [
    { to: '/executive/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
    { to: '/executive/seniors', label: 'Seniors', icon: <Users size={18} /> },
    { to: '/executive/announcement', label: 'Announcement', icon: <Clock size={18} /> },
    { to: '/executive/contributions', label: 'Contributions', icon: <WalletCards size={18} /> },
    { to: '/executive/faqs', label: 'FAQs', icon: <HelpCircle size={18} /> },
  ];
  return (
    <div className="flex min-h-screen">
      <NoIndex />
      <Sidebar
        items={items}
        profileLink="/executive/profile"
        logoutTo="/executive/login"
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Executive Portal" onMenuClick={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
