import { Users, Clock, CheckCircle2 } from 'lucide-react';

export default function StatCards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {data.map((d) => (
        <div key={d.label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${d.bg}`}>{d.icon}</div>
          <div>
            <div className="text-sm text-gray-500">{d.label}</div>
            <div className="text-2xl font-bold text-gray-900">{d.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const defaultStats = [
  { label: 'Total Seniors', value: '312', icon: <Users className="text-blue-500" size={22} />, bg: 'bg-blue-50' },
  { label: 'Pending Requests', value: '12', icon: <Clock className="text-amber-500" size={22} />, bg: 'bg-amber-50' },
  { label: 'Active Seniors', value: '254', icon: <CheckCircle2 className="text-emerald-500" size={22} />, bg: 'bg-emerald-50' },
];
