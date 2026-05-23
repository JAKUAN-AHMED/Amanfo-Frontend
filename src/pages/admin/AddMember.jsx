import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const CLASSES = ['A1', 'A2', 'A3', 'AV', 'B1', 'B2', 'M1', 'M2', 'M3', 'M4'];
const HOUSES = ['Amanfo', 'Aggrey', 'Butler', 'Freeman', 'Gberg', 'OT', 'Pearson', 'Ramseyer', 'Serwaa', 'DAY'];
const INDUSTRIES = [
  'Healthcare', 'Technology', 'Finance', 'Education', 'Government / Public Service',
  'Business / Entrepreneurship', 'Construction / Real Estate', 'Transportation / Logistics',
  'Agriculture / Agribusiness', 'Legal / Law', 'Media / Communications', 'Energy / Utilities',
  'Hospitality / Tourism', 'Manufacturing / Industrial', 'Nonprofit / NGO', 'Military / Security',
  'Arts / Entertainment', 'Religious / Ministry', 'Student / Continuing Education', 'Retired', 'Other',
];
const COUNTRY_CITIES = {
  Ghana: ['Accra', 'Kumasi', 'Takoradi', 'Tema', 'Cape Coast', 'Tamale', 'Sunyani', 'Ho'],
  Nigeria: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Boston'],
  Canada: ['Toronto', 'Montreal', 'Vancouver', 'Calgary'],
};

function Field({ label, defaultValue, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}

function Select({ label, options, required, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:text-gray-400"
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function AddSenior({ mode = 'add' }) {
  const nav = useNavigate();
  const [country, setCountry] = useState(mode === 'edit' ? 'Ghana' : '');
  const [city, setCity] = useState(mode === 'edit' ? 'Accra' : '');
  const editing = mode === 'edit';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => nav(-1)} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-brand">
            {editing ? 'Edit Senior' : 'Add New Senior'}
          </h2>
          <p className="text-gray-500 text-sm">
            {editing ? 'Update Senior details below.' : 'Create a new Senior account in the directory.'}
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav('/admin/seniors');
        }}
        className="bg-white border border-gray-200 rounded-2xl p-7 space-y-6"
      >
        <div>
          <h3 className="text-brand font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="First Name" defaultValue={editing ? 'Kwame' : ''} required />
            <Field label="Last Name" defaultValue={editing ? 'Mensah' : ''} required />
            <Field label="Nickname" defaultValue={editing ? 'KM' : ''} />
            <Field label="Senior ID" defaultValue={editing ? 'AM97001' : 'Auto-generated'} />
          </div>
        </div>

        <div>
          <h3 className="text-brand font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Email Address" type="email" defaultValue={editing ? 'kwame.mensah@email.com' : ''} required />
            <Field label="Phone Number" defaultValue={editing ? '+233244123456' : ''} required />
          </div>
        </div>

        <div>
          <h3 className="text-brand font-semibold mb-4">Class Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select label="Class" options={CLASSES} value={editing ? 'A3' : ''} onChange={() => {}} required />
            <Select label="House" options={HOUSES} value={editing ? 'Amanfo' : ''} onChange={() => {}} required />
          </div>
        </div>

        <div>
          <h3 className="text-brand font-semibold mb-4">Professional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select label="Industry" options={INDUSTRIES} value={editing ? 'Technology' : ''} onChange={() => {}} />
            <Field label="Profession" defaultValue={editing ? 'Software Engineer' : ''} />
          </div>
        </div>

        <div>
          <h3 className="text-brand font-semibold mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="Country"
              options={Object.keys(COUNTRY_CITIES)}
              value={country}
              onChange={(v) => { setCountry(v); setCity(''); }}
              required
            />
            <Select
              label="City / State"
              options={COUNTRY_CITIES[country] || []}
              value={city}
              onChange={setCity}
              disabled={!country}
              placeholder={country ? 'Select City / State' : 'Select Country first'}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-brand font-semibold mb-4">Status</h3>
          <Select label="Account Status" options={['Active', 'Pending', 'Inactive', 'Suspended']} value={editing ? 'Active' : 'Pending'} onChange={() => {}} />
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            className="bg-brand-dark hover:bg-brand text-white font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2"
          >
            <Save size={16} /> {editing ? 'Save Changes' : 'Create Senior'}
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

