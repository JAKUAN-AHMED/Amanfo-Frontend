import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { announcements, TYPE_STYLES, PRIORITY_STYLES } from '../../data/announcements';

export default function AdminAnnouncement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Community Updates</h2>
        <Link
          to="/admin/announcement/new"
          className="bg-brand-dark hover:bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold inline-block w-fit"
        >
          Create updates
        </Link>
      </div>

      <div className="space-y-4">
        {announcements.map((it) => (
          <div
            key={it.id}
            className="bg-white rounded-xl px-5 py-4 flex items-center gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {it.cover ? (
              <img src={it.cover} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-gray-500">{it.month}</span>
                <span className="text-lg font-bold text-gray-900 leading-none">{it.day}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="font-semibold text-gray-900">{it.title}</div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TYPE_STYLES[it.type]}`}>
                  {it.type}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[it.priority]}`}>
                  {it.priority}
                </span>
              </div>
              <div
                className="text-sm text-gray-500 mt-0.5 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: it.desc }}
              />
              <div className="text-xs text-gray-400 mt-1">Audience: {it.audience}</div>
            </div>
            <div className="flex gap-3 shrink-0 text-gray-600">
              <Link to={`/senior/announcements/${it.id}`} title="Preview">
                <Eye size={16} className="hover:text-gray-900" />
              </Link>
              <Pencil size={16} className="cursor-pointer hover:text-gray-900" />
              <Trash2 size={16} className="cursor-pointer text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
