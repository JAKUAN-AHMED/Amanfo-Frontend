import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import AuthShell from '../components/AuthShell';

export default function ForgotPassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  return (
    <AuthShell
      title="Forgot Password?"
      subtitle="Enter your Senior ID or registered email. We'll send a verification code to reset your password."
      back="/login"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav('/verify-otp', { state: { email } });
        }}
      >
        <label className="text-sm font-medium text-gray-800 block mb-2">
          Senior ID or Email
        </label>
        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="AM97001 or you@email.com"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
        >
          Send Verification Code
        </button>
      </form>
      <div className="mt-5 text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link to="/login" className="text-brand font-medium">
          Login
        </Link>
      </div>
    </AuthShell>
  );
}
