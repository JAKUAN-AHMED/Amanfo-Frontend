import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Lock, Unlock, ChevronDown, Mail, Phone } from 'lucide-react';

const PERSON_PHOTO = '/Person.jpeg';

const seniors = [
  { name: 'Kwame Mensah', nick: 'KM', id: 'AM97-0001', group: 'Aggrey', cls: 'A1', location: 'Accra, Ghana', email: 'kwame.mensah@email.com', phone: '+233 24 123 4567', industry: 'Finance', avatar: PERSON_PHOTO },
  { name: 'Kofi Asante', nick: 'KA', id: 'AM97-0002', group: 'Amanfo', cls: 'B1', location: 'New York, United States', email: 'kofi.asante@email.com', phone: '+1 212 555 0190', industry: 'Technology', avatar: PERSON_PHOTO },
  { name: 'Yaw Boateng', nick: 'YB', id: 'AM97-0003', group: 'Freeman', cls: 'A2', location: 'London, United Kingdom', email: 'yaw.boateng@email.com', phone: '+44 20 7946 0958', industry: 'Healthcare', avatar: PERSON_PHOTO },
  { name: 'Akosua Boateng', nick: 'AB', id: 'AM97-0021', group: 'Butler', cls: 'M1', location: 'Kumasi, Ghana', email: 'akosua.b@email.com', phone: '+233 20 987 6543', industry: 'Education', avatar: PERSON_PHOTO },
  { name: 'Nana Osei', nick: 'NO', id: 'AM97-0042', group: 'Ramseyer', cls: 'A3', location: 'Toronto, Canada', email: 'nana.osei@email.com', phone: '+1 416 555 0147', industry: 'Business / Entrepreneurship', avatar: PERSON_PHOTO },
  { name: 'Ama Darko', nick: 'AD', id: 'AM97-0055', group: 'Serwaa', cls: 'B2', location: 'Berlin, Germany', email: 'ama.darko@email.com', phone: '+49 30 1234 5678', industry: 'Legal / Law', avatar: PERSON_PHOTO },
  { name: 'Kweku Frimpong', nick: 'KF', id: 'AM97-0061', group: 'Pearson', cls: 'AV', location: 'Johannesburg, South Africa', email: 'kweku.f@email.com', phone: '+27 11 555 0199', industry: 'Construction / Real Estate', avatar: PERSON_PHOTO },
  { name: 'Abena Owusu', nick: 'AO', id: 'AM97-0078', group: 'OT', cls: 'M2', location: 'Amsterdam, Netherlands', email: 'abena.owusu@email.com', phone: '+31 20 555 0134', industry: 'Media / Communications', avatar: PERSON_PHOTO },
  { name: 'Kojo Appiah', nick: 'KApp', id: 'AM97-0099', group: 'Gberg', cls: 'M3', location: 'Takoradi, Ghana', email: 'kojo.appiah@email.com', phone: '+233 31 222 3344', industry: 'Energy / Utilities', avatar: PERSON_PHOTO },
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

function mask(text) {
  if (!text) return '••••••';
  if (text.includes('@')) {
    const [local, domain] = text.split('@');
    return local.slice(0, 2) + '•••@' + domain;
  }
  return text.slice(0, 6) + '•••••';
}

function SeniorCard({ senior }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start gap-3">
        <img src={senior.avatar} alt={senior.name} className="w-14 h-14 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="text-brand font-semibold">{senior.name}</h3>
          <div className="text-xs text-gray-500">"{senior.nick}"</div>
          <button
            onClick={() => setUnlocked((v) => !v)}
            className={`mt-1.5 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium transition ${
              unlocked
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
            title={unlocked ? 'Click to hide details' : 'Click to reveal details'}
          >
            {unlocked ? <Unlock size={10} /> : <Lock size={10} />}
            {unlocked ? senior.id : '••••••••'}
          </button>
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
      </div>

      <div className="flex items-center gap-1.5 text-sm text-brand mt-3">
        <MapPin size={14} /> {senior.location}
      </div>

      <div className="border-t border-gray-100 mt-4 pt-3 space-y-2">
        <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
          unlocked ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
        }`}>
          <Mail size={11} />
          {unlocked ? senior.email : mask(senior.email)}
        </div>
        <br />
        <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
          unlocked ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
        }`}>
          <Phone size={11} />
          {unlocked ? senior.phone : mask(senior.phone)}
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
      const matchesQuery = !q || `${s.name} ${s.nick} ${s.industry}`.toLowerCase().includes(q);
      const matchesClass = !filters.Class || s.cls === filters.Class;
      const matchesHouse = !filters.House || s.group === filters.House;
      const matchesCountry = !filters.Country || s.location.includes(filters.Country);
      const matchesIndustry = !filters.Industry || s.industry === filters.Industry;
      return matchesQuery && matchesClass && matchesHouse && matchesCountry && matchesIndustry;
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
            placeholder="Search by name, nickname, or profession"
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
