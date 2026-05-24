import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Logo from '../../components/Logo';
import NoIndex from '../../components/NoIndex';

export default function AdminOtp() {
  const nav = useNavigate();
  const loc = useLocation();
  const email = loc.state?.email || 'your admin email';
  const [digits, setDigits] = useState(Array(6).fill(''));
  const refs = useRef([]);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handle = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...digits];
    n[i] = v;
    setDigits(n);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <NoIndex />
      <div className="flex flex-col items-center mb-8 text-center">
        <Logo size={64} />
        <span className="mt-3 inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full">
          <Shield size={12} /> Admin Access
        </span>
        <h1 className="mt-3 text-3xl font-bold text-brand">Verify Your Code</h1>
        <p className="mt-2 text-gray-500 max-w-md">
          We sent a 6-digit verification code to {email}. Enter it below to continue.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav('/admin/reset-password');
        }}
        className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white"
      >
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => handle(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
              }}
              maxLength={1}
              inputMode="numeric"
              className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
        >
          Verify Code
        </button>
        <div className="mt-5 text-center text-sm text-gray-600">
          Didn't receive the code?{' '}
          {seconds > 0 ? (
            <span className="text-gray-400">Resend in {seconds}s</span>
          ) : (
            <button onClick={() => setSeconds(60)} className="text-brand font-medium">
              Resend Code
            </button>
          )}
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          <Link to="/admin/login" className="text-brand font-medium">
            Back to Admin Login
          </Link>
        </div>
      </form>
    </div>
  );
}
