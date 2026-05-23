import { useState } from 'react';
import { Search, Filter, MapPin, Lock, ChevronDown } from 'lucide-react';

const seniors = [
  { name: 'Kwame Mensah', nick: 'KM', id: 'AM97-0042', group: 'Aggrey', location: 'Accra, Ghana', avatar: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Kwame Mensah', nick: 'KM', id: 'AM97-0042', group: 'Aggrey', location: 'Accra, Ghana', avatar: 'https://i.pravatar.cc/120?img=13' },
  { name: 'Kwame Mensah', nick: 'KM', id: 'AM97-0042', group: 'Aggrey', location: 'Accra, Ghana', avatar: 'https://i.pravatar.cc/120?img=14' },
];

const FILTER_OPTIONS = {
  Class: ['A1', 'A2', 'A3', 'AV', 'B1', 'B2', 'M1', 'M2', 'M3', 'M4'],
  House: ['Amanfo', 'Aggrey', 'Butler', 'Freeman', 'Gberg', 'OT', 'Pearson', 'Ramseyer', 'Serwaa', 'DAY'],
  Country: ['Ghana', 'Nigeria', 'United Kingdom', 'United States', 'Canada', 'Germany', 'South Africa', 'Netherlands', 'Australia'],
  Industry: [
    'Healthcare', 'Technology', 'Finance', 'Education', 'Government / Public Service',
    'Business / Entrepreneurship', 'Construction / Real Estate', 'Transportation / Logistics',
    'Agriculture / Agribusiness', 'Legal / Law', 'Media / Communications', 'Energy / Utilities',
    'Hospitality / Tourism', 'Manufacturing / Industrial', 'Nonprofit / NGO', 'Military / Security',
    'Arts / Entertainment', 'Religious / Ministry', 'Student / Continuing Education', 'Retired', 'Other',
  ],
};

function SelectField({ label }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1.5 block">{label}</label>
      <div className="relative">
        <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none">
          <option value="">All {label}</option>
          {FILTER_OPTIONS[label]?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function Directory() {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand">Senior Directory</h2>
        <p className="text-gray-500 mt-1">Here's what's happening in your network</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search by name, nickname, or profession"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 border ${
            showFilters
              ? 'bg-brand-dark text-white border-brand-dark'
              : 'bg-white border-gray-200 text-gray-800'
          }`}
        >
          <Filter size={16} /> Filter Seniors
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectField label="Class" />
            <SelectField label="House" />
            <SelectField label="Country" />
            <SelectField label="Industry" />
          </div>
          <button className="text-brand text-sm font-medium mt-4">Clear all filters</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {seniors.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start gap-3">
              <img src={s.avatar} alt={s.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h3 className="text-brand font-semibold">{s.name}</h3>
                <div className="text-xs text-gray-500">"{s.nick}"</div>
                <span className="mt-1.5 inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[11px] px-2 py-0.5 rounded-full">
                  <Lock size={10} /> {s.id}
                </span>
              </div>
            </div>
            <span className="mt-3 inline-block bg-gold-light text-gold-dark text-xs px-2.5 py-0.5 rounded">
              {s.group}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-brand mt-3">
              <MapPin size={14} /> {s.location}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-3 space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                <Lock size={11} /> Email - Private
              </span>
              <br />
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                <Lock size={11} /> Phone- Private
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
