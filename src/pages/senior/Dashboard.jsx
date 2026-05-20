import { Link } from 'react-router-dom';
import { Users, Clock, CheckCircle2 } from 'lucide-react';
import { announcements, TYPE_STYLES } from '../../data/announcements';

const stats = [
  { label: 'Total Senior', value: '200', icon: <Users className="text-blue-500" size={22} />, bg: 'bg-blue-50' },
  { label: 'Pending Seniors', value: '15', icon: <Clock className="text-amber-500" size={22} />, bg: 'bg-amber-50' },
  { label: 'Active Seniors', value: '175', icon: <CheckCircle2 className="text-emerald-500" size={22} />, bg: 'bg-emerald-50' },
];

export default function SeniorDashboard() {
  const updates = announcements.slice(0, 3);
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-bold text-brand">Welcome back, Senior KM</h2>
        <p className="text-gray-500 mt-1">Here's what's happening in your network</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((d) => (
          <div key={d.label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${d.bg}`}>{d.icon}</div>
            <div>
              <div className="text-sm text-gray-500">{d.label}</div>
              <div className="text-2xl font-bold text-gray-900">{d.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Community updates</h3>
          <Link to="/senior/announcements" className="text-brand font-medium text-sm">View all →</Link>
        </div>
        <div className="space-y-3">
          {updates.map((u) => (
            <Link
              to={`/senior/announcements/${u.id}`}
              key={u.id}
              className="bg-white rounded-xl px-5 py-4 flex items-center gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition"
            >
              {u.cover ? (
                <img src={u.cover} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs text-gray-500">{u.month}</span>
                  <span className="text-lg font-bold text-gray-900 leading-none">{u.day}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold text-gray-900">{u.title}</div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TYPE_STYLES[u.type]}`}>
                    {u.type}
                  </span>
                </div>
                <div
                  className="text-sm text-gray-500 mt-0.5 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: u.desc }}
                />
              </div>
              <div className="text-sm text-gray-500 shrink-0">{u.ago}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
