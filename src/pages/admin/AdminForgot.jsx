import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Shield } from 'lucide-react';
import Logo from '../../components/Logo';

export default function AdminForgot() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center mb-8 text-center">
        <Logo size={64} />
        <span className="mt-3 inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full">
          <Shield size={12} /> Admin Access
        </span>
        <h1 className="mt-3 text-3xl font-bold text-brand">Forgot Password?</h1>
        <p className="mt-2 text-gray-500 max-w-md">
          Enter your admin email. We'll send a verification code to reset your password.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav('/admin/verify-otp', { state: { email } });
        }}
        className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white"
      >
        <label className="text-sm font-medium text-gray-800 block mb-2">Admin Email</label>
        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@amanfo97.org"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
        >
          Send Verification Code
        </button>
        <div className="mt-5 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/admin/login" className="text-brand font-medium">
            Admin Login
          </Link>
        </div>
      </form>
    </div>
  );
}
