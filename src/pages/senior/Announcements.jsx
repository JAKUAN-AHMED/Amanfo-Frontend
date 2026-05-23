import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { announcements, TYPE_STYLES, PRIORITY_STYLES } from '../../data/announcements';

const TYPES = ['All', ...new Set(announcements.map((a) => a.type))];

export default function SeniorAnnouncements() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');

  const list = announcements.filter(
    (a) =>
      (filter === 'All' || a.type === filter) &&
      (a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.desc.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand">Community Updates</h2>
        <p className="text-gray-500 mt-1">Announcements from the Amanfo '97 executive.</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search announcements..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`text-xs px-3 py-2 rounded-full border ${
                filter === t
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {list.map((a) => (
          <Link
            to={`/senior/announcements/${a.id}`}
            key={a.id}
            className="bg-white rounded-xl px-5 py-4 flex items-center gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition"
          >
            {a.cover ? (
              <img src={a.cover} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-gray-500">{a.month}</span>
                <span className="text-lg font-bold text-gray-900 leading-none">{a.day}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="font-semibold text-gray-900">{a.title}</div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TYPE_STYLES[a.type]}`}>
                  {a.type}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[a.priority]}`}>
                  {a.priority}
                </span>
              </div>
              <div
                className="text-sm text-gray-500 mt-0.5 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: a.desc }}
              />
            </div>
            <div className="text-sm text-gray-400 shrink-0">{a.ago}</div>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="text-center text-gray-500 py-10 bg-white rounded-xl">
            No announcements match your search.
          </div>
        )}
      </div>
    </div>
  );
}
