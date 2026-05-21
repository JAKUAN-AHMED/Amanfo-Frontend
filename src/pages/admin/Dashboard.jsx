import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, UserMinus, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import StatCards, { defaultStats } from '../../components/StatCards';

const pending = [
  {
    name: 'Yaw Owusu',
    email: 'yaw.owusu@email.com',
    phone: '+233 244 765 432',
    class: 'A3',
    location: 'Accra, Ghana',
    houseGroup: 'Butler',
    house: 'Ramseyer',
  },
];

const active = [
  { id: 'AM97001', name: 'Kwame Mensah', email: 'kwame.mensah@email.com', house: 'Amanfoɔ', location: 'Accra, Ghana' },
  { id: 'AM97002', name: 'Kofi Asante', email: 'kofi.asante@email.com', house: 'Amanfoɔ', location: 'New York, United States' },
  { id: 'AM97003', name: 'Yaw Boateng', email: 'yaw.boateng@email.com', house: 'Amanfoɔ', location: 'London, United Kingdom' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('pending');
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand">Welcome back, Admin</h2>
          <p className="text-gray-500 mt-1">Here's what's happening across Amanfoɔ '97.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">
            Export CSV
          </button>
          <Link
            to="/admin/seniors/new"
            className="bg-brand-dark hover:bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Senior
          </Link>
        </div>
      </div>

      <StatCards data={defaultStats} />

      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-2 border-b border-gray-100">
          {[
            ['pending', `Pending Requests (${pending.length})`],
            ['active', `Active Seniors (${active.length})`],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`py-4 font-semibold text-xs sm:text-sm px-2 ${
                tab === k ? 'bg-brand-dark text-white' : 'text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'pending' ? (
          <div className="p-5 space-y-4">
            {pending.map((p) => (
              <div key={p.email} className="border border-gray-200 rounded-xl p-5">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-brand font-semibold">{p.name}</h3>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1 mt-3 text-sm text-gray-700">
                      <div className="break-all">Email: {p.email}</div>
                      <div>Phone: {p.phone}</div>
                      <div>Class: {p.class}</div>
                      <div>Location: {p.location}</div>
                      <div>House/Group: {p.houseGroup}</div>
                      <div>House: {p.house}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="bg-brand-dark hover:bg-brand text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1.5">
                      <UserPlus size={16} /> Approve
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1.5">
                      <UserMinus size={16} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SeniorsTable rows={active} />
        )}
      </div>
    </div>
  );
}

export function SeniorsTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[720px]">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-100">
            <th className="px-6 py-4 font-medium">Senior ID</th>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">House</th>
            <th className="px-6 py-4 font-medium">Location</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-gray-50 last:border-0">
              <td className="px-6 py-4 text-gray-700">{r.id}</td>
              <td className="px-6 py-4 text-gray-900">{r.name}</td>
              <td className="px-6 py-4 text-gray-700">{r.email}</td>
              <td className="px-6 py-4 text-gray-700">{r.house}</td>
              <td className="px-6 py-4 text-gray-700">{r.location}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full">
                  ✓ Active
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3 text-gray-500">
                  <Link to={`/admin/seniors/${r.id}`}>
                    <Eye size={16} className="cursor-pointer hover:text-gray-800" />
                  </Link>
                  <Link to={`/admin/seniors/${r.id}/edit`}>
                    <Pencil size={16} className="cursor-pointer hover:text-gray-800" />
                  </Link>
                  <Trash2 size={16} className="cursor-pointer text-red-500 hover:text-red-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Backwards compatible export so other files still importing MembersTable keep working.
export const MembersTable = SeniorsTable;
