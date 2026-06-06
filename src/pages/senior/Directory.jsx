import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Briefcase, BadgeCheck, ChevronDown } from 'lucide-react';
import { seniors, PERSON_PHOTO } from '../../data/seniors';

const uniqueSorted = (key) => [...new Set(seniors.map((s) => s[key]))].sort();

const FILTER_OPTIONS = {
  Class: uniqueSorted('cls'),
  House: uniqueSorted('group'),
  Country: uniqueSorted('country'),
  Industry: uniqueSorted('industry'),
};

const FILTER_KEYS = { Class: 'cls', House: 'group', Country: 'country', Industry: 'industry' };

function SelectField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1.5 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
        >
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

function SeniorCard({ senior }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start gap-3">
        <img
          src={senior.avatar}
          alt={senior.name}
          onError={(e) => { e.currentTarget.src = PERSON_PHOTO; }}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-brand font-semibold">{senior.name}</h3>
          <div className="text-xs text-gray-500">"{senior.nick}"</div>
          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700">
            {senior.id}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="inline-block bg-gold-light text-gold-dark text-xs px-2.5 py-0.5 rounded">
          {senior.group}
        </span>
        {senior.cls && (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded">
            Class {senior.cls}
          </span>
        )}
        <span className="inline-flex items-center gap-1 bg-brand/5 text-brand text-xs px-2.5 py-0.5 rounded">
          <BadgeCheck size={12} /> {senior.role}
        </span>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-3 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-brand shrink-0" /> {senior.city}, {senior.country}
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase size={14} className="text-brand shrink-0" /> {senior.industry}
        </div>
      </div>
    </div>
  );
}

export default function Directory() {
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ Class: '', House: '', Country: '', Industry: '' });

  const updateFilter = (key) => (value) => setFilters((f) => ({ ...f, [key]: value }));
  const clearFilters = () => setFilters({ Class: '', House: '', Country: '', Industry: '' });

  const filtered = useMemo(() => {
    return seniors.filter((s) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || `${s.name} ${s.nick} ${s.role} ${s.industry}`.toLowerCase().includes(q);
      return (
        matchesQuery &&
        Object.entries(filters).every(([label, value]) => !value || s[FILTER_KEYS[label]] === value)
      );
    });
  }, [query, filters]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Senior Directory</h2>
        <p className="text-gray-500 mt-1">Browse and connect with verified Amanfo '97 Seniors.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, nickname, role, or industry"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`whitespace-nowrap px-5 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 border ${
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
            <SelectField label="Class" value={filters.Class} onChange={updateFilter('Class')} />
            <SelectField label="House" value={filters.House} onChange={updateFilter('House')} />
            <SelectField label="Country" value={filters.Country} onChange={updateFilter('Country')} />
            <SelectField label="Industry" value={filters.Industry} onChange={updateFilter('Industry')} />
          </div>
          <button onClick={clearFilters} className="text-brand text-sm font-medium mt-4">Clear all filters</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <SeniorCard key={s.id} senior={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No seniors match your search or filters.
        </div>
      )}
    </div>
  );
}
