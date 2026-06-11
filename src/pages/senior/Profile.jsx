import { useState } from 'react';
import { Eye, Save } from 'lucide-react';

function Section({ title, children, badge }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        {badge}
        <h3 className="text-brand font-semibold text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, defaultValue, hint, placeholder }) {
  return (
    <div>
      <label className="text-sm text-gray-700 block mb-1.5">{label}</label>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function Select({ label, value, required, options = [], onChange, controlled, disabled, placeholder }) {
  const list = value && !options.includes(value) ? [value, ...options] : options;
  const props = controlled
    ? { value: value || '', onChange: (e) => onChange?.(e.target.value) }
    : { defaultValue: value };
  return (
    <div>
      <label className="text-sm text-gray-700 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        disabled={disabled}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
      >
        {(!value || controlled) && <option value="">{placeholder || `Select ${label}`}</option>}
        {list.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const INDUSTRIES = [
  'Healthcare',
  'Technology',
  'Finance',
  'Education',
  'Government / Public Service',
  'Business / Entrepreneurship',
  'Construction / Real Estate',
  'Transportation / Logistics',
  'Agriculture / Agribusiness',
  'Legal / Law',
  'Media / Communications',
  'Energy / Utilities',
  'Hospitality / Tourism',
  'Manufacturing / Industrial',
  'Nonprofit / NGO',
  'Military / Security',
  'Arts / Entertainment',
  'Religious / Ministry',
  'Student / Continuing Education',
  'Retired',
  'Other',
];
const PROFESSIONS = ['Software Engineer', 'Doctor', 'Lawyer', 'Teacher', 'Accountant', 'Entrepreneur', 'Banker', 'Consultant', 'Pharmacist', 'Civil Engineer', 'Architect', 'Designer', 'Other'];
const CLASSES = ['A1', 'A2', 'A3', 'AV', 'B1', 'B2', 'M1', 'M2', 'M3', 'M4'];
const HOUSES = ['Amanfo', 'Aggrey', 'Butler', 'Freeman', 'Gberg', 'OT', 'Pearson', 'Ramseyer', 'Serwaa', 'DAY'];
const COUNTRY_CITIES = {
  Ghana: ['Accra', 'Kumasi', 'Konongo', 'Takoradi', 'Tema', 'Cape Coast', 'Tamale', 'Sunyani', 'Ho', 'Koforidua', 'Wa', 'Bolgatanga'],
  Nigeria: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Kaduna', 'Enugu'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Glasgow', 'Edinburgh', 'Bristol'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Boston', 'Washington D.C.', 'Atlanta'],
  Canada: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City'],
  Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'DÃ¼sseldorf'],
  'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'],
  Netherlands: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah'],
};
const COUNTRIES = Object.keys(COUNTRY_CITIES);

function PrivacyRow({ label }) {
  return (
    <label className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 cursor-pointer">
      <span className="flex items-center gap-2 text-sm text-gray-800">
        <Eye size={16} className="text-brand" /> {label}
      </span>
      <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand" />
    </label>
  );
}

export default function SeniorProfile() {
  const [country, setCountry] = useState('Ghana');
  const [city, setCity] = useState('Konongo');
  const cityOptions = COUNTRY_CITIES[country] || [];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand">My Profile</h2>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Full Name" defaultValue="Aboagye Kwarteng" hint="Cannot be changed" />
          <Field label="Senior ID" defaultValue="AMFO97001" hint="Cannot be changed" />
          <Field label="Nickname" defaultValue="Paa Slim" />
        </div>
      </Section>

      <Section title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Email Address" defaultValue="aboagye.kwarteng@email.com" />
          <Field label="Phone Number" defaultValue="+233244123456" />
        </div>
      </Section>

      <Section title="Professional Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select label="Industry" value="Events & Property Consult" options={INDUSTRIES} />
          <Select label="Profession" value="Entrepreneur" options={PROFESSIONS} />
        </div>
      </Section>

      <Section
        title="Senior Verification"
        badge={<span className="w-7 h-7 rounded-full bg-brand-dark text-white text-sm font-bold flex items-center justify-center">2</span>}
      >
        <p className="text-xs text-gray-500 -mt-3 mb-4">Confirms you are from Amanfoɔ '97</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select label="Class" value="A3" required options={CLASSES} />
          <Select label="House" value="OT" required options={HOUSES} />
        </div>
      </Section>

      <Section title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            label="Country"
            controlled
            value={country}
            options={COUNTRIES}
            onChange={(v) => {
              setCountry(v);
              setCity('');
            }}
          />
          <Select
            label="City / State"
            controlled
            value={city}
            options={cityOptions}
            onChange={setCity}
            disabled={!country}
            placeholder={country ? 'Select City / State' : 'Select Country first'}
          />
        </div>
      </Section>

      <Section title="Privacy Settings">
        <p className="text-sm text-gray-500 -mt-3 mb-4">
          Control what information is visible to other Seniors.
        </p>
        <div className="space-y-3">
          <PrivacyRow label="Show my phone number to other Seniors" />
          <PrivacyRow label="Show my email address to other Seniors" />
        </div>
      </Section>

      <button className="w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2">
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
}

