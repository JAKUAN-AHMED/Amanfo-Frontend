import { Pencil, Trash2 } from 'lucide-react';

function Bar({ label, percent, color }) {
  return (
    <div>
      <div className="text-sm text-gray-800 mb-2">{percent}% {label}</div>
      <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function SurveyDetail() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Active Status Survey</h2>
      <div className="bg-white rounded-2xl p-7 space-y-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500">Jun</span>
            <span className="text-lg font-bold text-gray-900 leading-none">20</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Active Status Survey</div>
            <div className="text-sm text-gray-500 mt-0.5">
              Save the date. Three days of celebration on Campus
            </div>
          </div>
          <div className="flex gap-3">
            <Pencil size={16} className="cursor-pointer text-gray-600" />
            <Trash2 size={16} className="cursor-pointer text-red-500" />
          </div>
        </div>
        <div className="space-y-5">
          <Bar label="Active" percent={60} color="bg-brand-dark" />
          <Bar label="Inactive" percent={40} color="bg-red-500" />
        </div>
      </div>
    </div>
  );
}
