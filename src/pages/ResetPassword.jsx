import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import AuthShell from '../components/AuthShell';

function Rule({ ok, text }) {
  return (
    <li className={`flex items-center gap-2 text-xs ${ok ? 'text-emerald-600' : 'text-gray-500'}`}>
      {ok ? <Check size={14} /> : <X size={14} />} {text}
    </li>
  );
}

export default function ResetPassword() {
  const nav = useNavigate();
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const rules = {
    len: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    num: /\d/.test(pw),
    match: pw && pw === confirm,
  };

  return (
    <AuthShell
      title="Reset Your Password"
      subtitle="Create a strong new password to secure your Amanfoɔ '97 account."
      back="/verify-otp"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(rules).every(Boolean)) nav('/reset-success');
        }}
      >
        <label className="text-sm font-medium text-gray-800 block mb-2">New Password</label>
        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={show ? 'text' : 'password'}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter new password"
            className="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="text-sm font-medium text-gray-800 block mb-2 mt-5">Confirm Password</label>
        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={show2 ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="button"
            onClick={() => setShow2((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <ul className="mt-4 space-y-1.5">
          <Rule ok={rules.len} text="At least 8 characters" />
          <Rule ok={rules.upper} text="One uppercase letter" />
          <Rule ok={rules.num} text="One number" />
          <Rule ok={rules.match} text="Passwords match" />
        </ul>

        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </AuthShell>
  );
}
