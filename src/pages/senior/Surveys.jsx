import { Link } from 'react-router-dom';
import { ClipboardEdit, CheckCircle2, Clock } from 'lucide-react';
import { surveys, hasResponded } from '../../data/surveys';

export default function SeniorSurveys() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand">Surveys</h2>
        <p className="text-gray-500 mt-1">Share your voice — help shape Amanfoɔ '97.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {surveys.map((s) => {
          const done = hasResponded(s.id);
          const open = new Date(s.endDate) >= new Date();
          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                  <ClipboardEdit size={22} />
                </div>
                {done ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} /> Submitted
                  </span>
                ) : open ? (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full">
                    <Clock size={12} /> Open
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                    Closed
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-1 flex-1">{s.description}</p>
              <div className="text-xs text-gray-400 mt-3">
                {s.questions.length} question{s.questions.length === 1 ? '' : 's'} · Closes {s.endDate}
              </div>
              <Link
                to={`/senior/surveys/${s.id}`}
                className={`mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                  done
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-brand-dark text-white hover:bg-brand'
                }`}
              >
                {done ? 'View My Response' : open ? 'Participate' : 'View Survey'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
