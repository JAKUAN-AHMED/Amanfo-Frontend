import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login() {
  const [id, setId] = useState('');
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (id.toLowerCase().includes('admin')) nav('/admin/dashboard');
    else nav('/senior/dashboard');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center mb-8">
        <Logo size={64} />
        <h1 className="mt-5 text-3xl font-bold text-brand">Amanfoɔ '97 Senior Portal</h1>
        <p className="mt-2 text-gray-500">Private access for verified Amanfoɔ '97 Seniors</p>
      </div>
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white"
      >
        <label className="text-sm font-medium text-gray-800 block mb-2">
          Senior ID or Email
        </label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="AM97001"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <label className="text-sm font-medium text-gray-800 block mt-5 mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <LogIn size={18} /> Login
        </button>
        <div className="mt-5 text-center">
          <Link to="/forgot-password" className="text-brand font-medium text-sm">
            Forgot your password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/request-membership" className="text-yellow-600 font-medium text-sm">
            Request Membership
          </Link>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
          Administrator?{' '}
          <Link to="/admin/login" className="text-brand font-medium">
            Admin Login
          </Link>
        </div>
      </form>
    </div>
  );
}
