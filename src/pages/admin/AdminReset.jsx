import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check, X, Shield, CheckCircle2 } from 'lucide-react';
import Logo from '../../components/Logo';
import NoIndex from '../../components/NoIndex';

function Rule({ ok, text }) {
  return (
    <li className={`flex items-center gap-2 text-xs ${ok ? 'text-emerald-600' : 'text-gray-500'}`}>
      {ok ? <Check size={14} /> : <X size={14} />} {text}
    </li>
  );
}

export default function AdminReset() {
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [done, setDone] = useState(false);

  const rules = {
    len: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    num: /\d/.test(pw),
    special: /[^a-zA-Z0-9]/.test(pw),
    match: pw && pw === confirm,
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <NoIndex />
        <div className="flex flex-col items-center mb-6 text-center">
          <Logo size={64} />
          <h1 className="mt-5 text-3xl font-bold text-brand">Password Reset Successful</h1>
        </div>
        <div className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 size={36} />
          </div>
          <p className="text-gray-600">
            Your executive password has been updated. You can now log in with your new credentials.
          </p>
          <Link
            to="/executive/login"
            className="mt-6 inline-block w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
          >
            Back to Executive Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <NoIndex />
      <div className="flex flex-col items-center mb-8 text-center">
        <Logo size={64} />
        <span className="mt-3 inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full">
          <Shield size={12} /> Executive Access
        </span>
        <h1 className="mt-3 text-3xl font-bold text-brand">Reset Executive Password</h1>
        <p className="mt-2 text-gray-500 max-w-md">
          Choose a strong new password to secure your executive account.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(rules).every(Boolean)) setDone(true);
        }}
        className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white"
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
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
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
          <button type="button" onClick={() => setShow2((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <ul className="mt-4 space-y-1.5">
          <Rule ok={rules.len} text="At least 8 characters" />
          <Rule ok={rules.upper} text="One uppercase letter" />
          <Rule ok={rules.num} text="One number" />
          <Rule ok={rules.special} text="One special character" />
          <Rule ok={rules.match} text="Passwords match" />
        </ul>

        <button
          type="submit"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
