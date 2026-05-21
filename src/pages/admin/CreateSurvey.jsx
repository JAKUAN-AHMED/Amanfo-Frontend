import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

function Field({ label, defaultValue, type = 'text', placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800 block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}

export default function CreateSurvey() {
  const nav = useNavigate();
  const [options, setOptions] = useState(['Active', 'Inactive']);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => nav(-1)} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-brand">Create Survey</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav('/admin/survey');
        }}
        className="bg-white border border-gray-200 rounded-2xl p-7 space-y-5"
      >
        <Field label="Survey Title" placeholder="e.g. Active Status Survey" />
        <div>
          <label className="text-sm font-medium text-gray-800 block mb-1.5">Description</label>
          <textarea
            rows={3}
            placeholder="What is this survey about?"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Start Date" type="date" />
          <Field label="End Date" type="date" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 block mb-2">Survey Type</label>
          <div className="flex gap-3 flex-wrap">
            {['Single Choice', 'Multiple Choice', 'Text Response', 'Rating'].map((t, i) => (
              <label key={t} className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg cursor-pointer">
                <input type="radio" name="type" defaultChecked={i === 0} className="accent-brand" />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 block mb-2">Options</label>
          <div className="space-y-2">
            {options.map((o, i) => (
              <div key={i} className="flex gap-2">
                <input
                  defaultValue={o}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
                <button
                  type="button"
                  onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
                  className="text-red-500 hover:bg-red-50 px-3 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setOptions([...options, ''])}
              className="text-brand text-sm font-medium flex items-center gap-1.5"
            >
              <Plus size={16} /> Add Option
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand" />
          Make survey anonymous
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-brand-dark hover:bg-brand text-white font-semibold px-6 py-2.5 rounded-lg"
          >
            Publish Survey
          </button>
          <button
            type="button"
            onClick={() => nav(-1)}
            className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
