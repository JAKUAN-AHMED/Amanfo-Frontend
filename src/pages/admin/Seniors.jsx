import StatCards, { defaultStats } from '../../components/StatCards';
import { MembersTable } from './Dashboard';

const rows = [
  { id: 'AM97001', name: 'Kwame Mensah', email: 'kwame.mensah@email.com', house: 'Amanfoɔ', location: 'Accra, Ghana' },
  { id: 'AM97002', name: 'Kofi Asante', email: 'kofi.asante@email.com', house: 'Amanfoɔ', location: 'New York, United States' },
  { id: 'AM97003', name: 'Yaw Boateng', email: 'yaw.boateng@email.com', house: 'Amanfoɔ', location: 'London, United Kingdom' },
];

export default function AdminSeniors() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand">seniors</h2>
        <p className="text-gray-500 mt-1">Here's what's happening in your network</p>
      </div>
      <StatCards data={defaultStats} />
      <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <MembersTable rows={rows} />
      </div>
    </div>
  );
}
