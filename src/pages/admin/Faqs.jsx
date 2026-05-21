import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Save, X, Eye, EyeOff, Search, HelpCircle } from 'lucide-react';
import { loadFaqs, saveFaqs } from '../../data/faqs';

function FaqEditor({ initial, onSave, onCancel }) {
  const [q, setQ] = useState(initial?.question || '');
  const [a, setA] = useState(initial?.answer || '');
  const [published, setPublished] = useState(initial?.published ?? true);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Question</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. Who can join the platform?"
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Answer</label>
        <textarea
          rows={4}
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Provide a clear answer..."
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 accent-brand"
        />
        Show this FAQ on the public landing page
      </label>
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => {
            if (!q.trim()) return;
            onSave({ question: q.trim(), answer: a.trim(), published });
          }}
          className="bg-brand-dark hover:bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Save size={16} /> Save FAQ
        </button>
        <button
          onClick={onCancel}
          className="border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
        >
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState(() => loadFaqs());
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    saveFaqs(faqs);
  }, [faqs]);

  const sorted = [...faqs].sort((a, b) => a.order - b.order);
  const visible = sorted.filter(
    (f) =>
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase())
  );

  const addFaq = (data) => {
    const maxOrder = faqs.reduce((m, f) => Math.max(m, f.order || 0), 0);
    setFaqs([...faqs, { ...data, id: String(Date.now()), order: maxOrder + 1 }]);
    setCreating(false);
  };

  const updateFaq = (id, data) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, ...data } : f)));
    setEditingId(null);
  };

  const remove = (id) => {
    if (!confirm('Delete this FAQ?')) return;
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const togglePublish = (id) =>
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, published: !f.published } : f)));

  const move = (id, dir) => {
    const list = [...sorted];
    const idx = list.findIndex((f) => f.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= list.length) return;
    const a = list[idx];
    const b = list[swap];
    setFaqs(faqs.map((f) => (f.id === a.id ? { ...f, order: b.order } : f.id === b.id ? { ...f, order: a.order } : f)));
  };

  const publishedCount = faqs.filter((f) => f.published).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand">Manage FAQs</h2>
          <p className="text-gray-500 mt-1">
            Add, edit, reorder and publish FAQs that appear on the public landing page.
          </p>
        </div>
        <button
          onClick={() => {
            setCreating(true);
            setEditingId(null);
          }}
          className="bg-brand-dark hover:bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Total FAQs', value: faqs.length, bg: 'bg-blue-50', text: 'text-blue-500' },
          { label: 'Published', value: publishedCount, bg: 'bg-emerald-50', text: 'text-emerald-500' },
          { label: 'Hidden', value: faqs.length - publishedCount, bg: 'bg-amber-50', text: 'text-amber-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg}`}>
              <HelpCircle className={s.text} size={22} />
            </div>
            <div>
              <div className="text-sm text-gray-500">{s.label}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions or answers..."
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {creating && (
        <FaqEditor onSave={addFaq} onCancel={() => setCreating(false)} />
      )}

      <div className="space-y-3">
        {visible.map((f, i) => {
          if (editingId === f.id) {
            return (
              <FaqEditor
                key={f.id}
                initial={f}
                onSave={(data) => updateFaq(f.id, data)}
                onCancel={() => setEditingId(null)}
              />
            );
          }
          return (
            <div
              key={f.id}
              className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-start gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="flex flex-col gap-1 text-gray-400 pt-0.5">
                <button
                  onClick={() => move(f.id, -1)}
                  disabled={i === 0}
                  className="hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => move(f.id, 1)}
                  disabled={i === visible.length - 1}
                  className="hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{f.question}</h3>
                  {f.published ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700">
                      Published
                    </span>
                  ) : (
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{f.answer}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => togglePublish(f.id)}
                  title={f.published ? 'Hide' : 'Publish'}
                  className="text-gray-500 hover:text-gray-900 p-1.5"
                >
                  {f.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => {
                    setEditingId(f.id);
                    setCreating(false);
                  }}
                  title="Edit"
                  className="text-gray-500 hover:text-gray-900 p-1.5"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => remove(f.id)}
                  title="Delete"
                  className="text-red-500 hover:text-red-700 p-1.5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-dashed border-gray-200">
            {query ? 'No FAQs match your search.' : 'No FAQs yet — click "Add FAQ" to create one.'}
          </div>
        )}
      </div>
    </div>
  );
}
