import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react';

const items = Array(2).fill({
  title: 'Active Status Survey',
  desc: 'Save the date. Three days of celebration on Campus',
  day: '20',
  month: 'Jun',
});

export default function Survey() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold">Recent Survey</h2>
        <Link
          to="/admin/survey/new"
          className="bg-brand-dark hover:bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 w-fit"
        >
          <Plus size={16} /> Create Survey
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((it, i) => (
          <Link
            to={`/admin/survey/${i}`}
            key={i}
            className="bg-white rounded-xl px-5 py-4 flex items-center gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] block"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <span className="text-xs text-gray-500">{it.month}</span>
              <span className="text-lg font-bold text-gray-900 leading-none">{it.day}</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{it.title}</div>
              <div className="text-sm text-gray-500 mt-0.5">{it.desc}</div>
            </div>
            <div className="flex gap-3">
              <Pencil size={16} className="cursor-pointer text-gray-600" />
              <Trash2 size={16} className="cursor-pointer text-red-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
