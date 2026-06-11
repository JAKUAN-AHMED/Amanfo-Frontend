import StatCards from '../../components/StatCards';
import { defaultStats } from '../../data/statCardsData';
import { SeniorsTable } from './Dashboard';

const rows = [
  { id: 'AM97001', name: 'Kwame Mensah', email: 'kwame.mensah@email.com', house: 'Amanfo', location: 'Accra, Ghana' },
  { id: 'AM97002', name: 'Kofi Asante', email: 'kofi.asante@email.com', house: 'Amanfo', location: 'New York, United States' },
  { id: 'AM97003', name: 'Yaw Boateng', email: 'yaw.boateng@email.com', house: 'Amanfo', location: 'London, United Kingdom' },
];

export default function AdminSeniors() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Seniors</h2>
        <p className="text-gray-500 mt-1">Manage verified Amanfoɔ '97 Seniors.</p>
      </div>
      <StatCards data={defaultStats} />
      <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <SeniorsTable rows={rows} />
      </div>
    </div>
  );
}

