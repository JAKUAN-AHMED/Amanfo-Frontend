import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { LayoutGrid, Users, Clock, ClipboardEdit, HelpCircle } from 'lucide-react';

const items = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
  { to: '/admin/seniors', label: 'Seniors', icon: <Users size={18} /> },
  { to: '/admin/announcement', label: 'Announcement', icon: <Clock size={18} /> },
  { to: '/admin/survey', label: 'Survey', icon: <ClipboardEdit size={18} /> },
  { to: '/admin/faqs', label: 'FAQs', icon: <HelpCircle size={18} /> },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={items}
        profileLink="/admin/profile"
        logoutTo="/admin/login"
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Admin Portal" onMenuClick={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
