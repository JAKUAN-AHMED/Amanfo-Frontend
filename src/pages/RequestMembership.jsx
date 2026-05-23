import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';

const CLASSES = ['A1', 'A2', 'A3', 'AV', 'B1', 'B2', 'M1', 'M2', 'M3', 'M4'];
const HOUSES = ['Amanfoɔ', 'Aggrey', 'Butler', 'Ramseyer', 'Riis', 'Slessor', 'Freeman'];
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
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Boston'],
  Canada: ['Toronto', 'Montreal', 'Vancouver', 'Calgary'],
  Germany: ['Berlin', 'Hamburg', 'Munich', 'Frankfurt'],
  Netherlands: ['Amsterdam', 'Rotterdam', 'The Hague'],
};

function Input({ label, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
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
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function RequestMembership() {
  const nav = useNavigate();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo size={36} />
            <span className="font-semibold">Amanfoɔ '97</span>
          </Link>
          <Link to="/login" className="text-sm font-medium text-gray-800">Login</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-brand">Request Membership</h1>
        <p className="text-gray-500 mt-1">
          Fill out the form and our admin team will verify your details.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            nav('/request-success');
          }}
          className="mt-6 bg-white border border-gray-200 rounded-2xl p-7 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="First Name" placeholder="Kwame" required />
            <Input label="Last Name" placeholder="Mensah" required />
            <Input label="Nickname" placeholder="KM" />
            <Input label="Email Address" type="email" placeholder="you@email.com" required />
            <Input label="Phone Number" placeholder="+233244123456" required />
            <Select label="Class" options={CLASSES} required />
            <Select label="House / Group" options={HOUSES} required />
            <Select label="Industry" options={INDUSTRIES} />
            <Select
              label="Country"
              options={Object.keys(COUNTRY_CITIES)}
              value={country}
              onChange={(v) => { setCountry(v); setCity(''); }}
              required
            />
            <Select
              label="City"
              options={COUNTRY_CITIES[country] || []}
              value={city}
              onChange={setCity}
              disabled={!country}
              placeholder={country ? 'Select City' : 'Select Country first'}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800 block mb-1.5">
              Why do you want to join? <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tell us briefly about yourself..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1 w-4 h-4 accent-brand" required />
            I confirm that the information provided is accurate and I agree to the privacy policy.
          </label>

          <button
            type="submit"
            className="w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
