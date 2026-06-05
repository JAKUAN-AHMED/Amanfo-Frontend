import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/Logo';
import NoIndex from '../../components/NoIndex';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <NoIndex />
      <div className="flex flex-col items-center mb-8">
        <Link to="/" title="Go to home" className="hover:opacity-80 transition">
          <Logo size={64} />
        </Link>
        <span className="mt-3 inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full">
          <Shield size={12} /> Executive Access
        </span>
        <h1 className="mt-3 text-3xl font-bold text-brand">Amanfo '97 Executive Portal</h1>
        <p className="mt-2 text-gray-500">Restricted access for executives only</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ role: 'admin' });
          nav('/admin/dashboard');
        }}
        className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white"
      >
        <label className="text-sm font-medium text-gray-800 block mb-2">Executive Email</label>
        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="admin@amanfo97.org"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <label className="text-sm font-medium text-gray-800 block mt-5 mb-2">Password</label>
        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            className="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
          <input type="checkbox" className="w-4 h-4 accent-brand" />
          Remember me on this device
        </label>

        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <LogIn size={18} /> Login as Executive
        </button>

        <div className="mt-5 text-center">
          <Link to="/admin/forgot-password" className="text-brand font-medium text-sm">
            Forgot your password?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-500">
          Not an executive?{' '}
          <Link to="/login" className="text-brand font-medium">
            Senior Login
          </Link>
        </div>
      </form>
    </div>
  );
}
