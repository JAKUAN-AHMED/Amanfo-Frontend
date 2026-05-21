import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { LayoutGrid, Users, Megaphone, ClipboardEdit } from 'lucide-react';

const items = [
  { to: '/senior/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
  { to: '/senior/directory', label: 'Senior Directory', icon: <Users size={18} /> },
  { to: '/senior/announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
  { to: '/senior/surveys', label: 'Surveys', icon: <ClipboardEdit size={18} /> },
];

export default function SeniorLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={items}
        profileLink="/senior/profile"
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Senior Portal" onMenuClick={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
