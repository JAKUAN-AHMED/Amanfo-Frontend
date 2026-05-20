import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { LayoutGrid, Users, Clock, ClipboardEdit } from 'lucide-react';

const items = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
  { to: '/admin/seniors', label: 'Seniors', icon: <Users size={18} /> },
  { to: '/admin/announcement', label: 'Announcement', icon: <Clock size={18} /> },
  { to: '/admin/survey', label: 'Survey', icon: <ClipboardEdit size={18} /> },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} profileLink="/admin/profile" logoutTo="/admin/login" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Admin Portal" />
        <main className="flex-1 p-8 bg-[#F7F8FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
