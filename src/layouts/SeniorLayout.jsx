import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { LayoutGrid, Users, Megaphone } from 'lucide-react';

const items = [
  { to: '/senior/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
  { to: '/senior/directory', label: 'Senior Directory', icon: <Users size={18} /> },
  { to: '/senior/announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
];

export default function SeniorLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} profileLink="/senior/profile" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Senior Portal" />
        <main className="flex-1 p-8 bg-[#F7F8FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
