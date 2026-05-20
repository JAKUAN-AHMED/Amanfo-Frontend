import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function VerifyOtp() {
  const nav = useNavigate();
  const loc = useLocation();
  const email = loc.state?.email || 'your email';
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
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <AuthShell
      title="Verify Your Code"
      subtitle={`We sent a 6-digit verification code to ${email}. Enter it below to continue.`}
      back="/forgot-password"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav('/reset-password');
        }}
      >
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => handle(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
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
      </form>
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
        <Link to="/login" className="text-brand font-medium">
          Back to Login
        </Link>
      </div>
    </AuthShell>
  );
}
