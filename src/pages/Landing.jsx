import { Link } from 'react-router-dom';
import { Users, Search, Lock, Globe, Check, Star, Mail, ChevronDown, ShieldCheck, IdCard } from 'lucide-react';
import { useState } from 'react';
import Logo from '../components/Logo';

function Step({ n, title, body }) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="w-10 h-10 rounded-md bg-brand-dark text-white font-bold flex items-center justify-center">
        {n}
      </div>
      <h4 className="mt-4 font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600 max-w-[180px]">{body}</p>
    </div>
  );
}

function Feature({ icon, title, body }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
      <div className="text-brand mb-3">{icon}</div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{body}</p>
    </div>
  );
}

const faqs = [
  ['Who can Join ?', 'Verified members of the Class of 1997 at Prempeh College.'],
  ['Is this Platform Public ?', 'No. The directory is private and only visible to verified Seniors.'],
  ['How long does approval take?', 'Typically 1–3 business days after submitting your request.'],
  ['Can I Control my data?', 'Yes. You can change privacy settings any time from your profile.'],
  ["What if I'd like to cancel my subscription?", 'You can request cancellation via support at any time.'],
  ['Can I get a refund?', 'Refunds are handled case-by-case via support@amanfo97.org.'],
  ['How do I contact customer service?', 'Email support@amanfo97.org. We reply within 24 hours.'],
];

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-gray-800">{q}</span>
        <ChevronDown size={18} className={`text-gray-500 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-2 text-sm text-gray-600">{a}</p>}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="bg-white">
      {/* nav */}
      <header className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size={36} />
          <div className="flex items-center gap-5">
            <Link to="/login" className="text-sm font-medium text-gray-800">
              Login
            </Link>
            <Link
              to="/request-membership"
              className="bg-brand-dark hover:bg-brand text-white text-sm font-medium px-4 py-2 rounded-full"
            >
              Request membership
            </Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="text-center px-6 py-16 max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1 bg-brand/10 text-brand text-xs font-medium px-3 py-1.5 rounded-full">
          <Star size={12} /> Prempeh College Class of 1997
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Stay Connected with Verified <span className="text-brand">Amanfoɔ '97</span>
          <br /> Seniors Worldwide
        </h1>
        <p className="mt-5 text-gray-600 max-w-xl mx-auto">
          A secure platform exclusively for Prempeh College Class of 1997 to connect, discover, and stay engaged.
        </p>
        <Link
          to="/request-membership"
          className="inline-block mt-6 bg-brand-dark hover:bg-brand text-white font-medium px-6 py-3 rounded-full"
        >
          Request membership
        </Link>
        <p className="mt-4 text-sm text-gray-500">500+ Seniors Already Joined</p>
      </section>

      {/* exclusive */}
      <section className="bg-cream">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Exclusively for Verified <span className="text-brand">Amanfoɔ 97</span> Seniors
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            We take verification seriously so every member can trust who they're connected with.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { label: 'Verified Alumni only', icon: <ShieldCheck size={18} /> },
              { label: 'Fully Private', icon: <Lock size={18} /> },
              { label: 'Unique Member ID', icon: <IdCard size={18} /> },
            ].map((p) => (
              <div
                key={p.label}
                className="bg-white rounded-lg py-3 px-4 text-sm text-gray-700 border border-gray-200 flex items-center justify-center gap-2"
              >
                <span className="text-brand">{p.icon}</span>
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Join the Platform?</h2>
          <p className="mt-2 text-gray-600">
            Everything you need to stay meaningfully connected with your classmates.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          <Feature icon={<Users size={20} />} title="Reconnect" body="Rediscover classmates from your Prempeh College days and rekindle old friendships." />
          <Feature icon={<Search size={20} />} title="Smart Search" body="Find any member quickly with our intelligent directory search." />
          <Feature icon={<Lock size={20} />} title="Privacy Control" body="Decide exactly what information you share and with whom." />
          <Feature icon={<Globe size={20} />} title="Stay Connected" body="Stay engaged with your alumni network no matter where in the world you are." />
        </div>
      </section>

      {/* how it works */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-600">Four simple steps to joining your exclusive alumni network.</p>
          </div>
          <div className="relative mt-12">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-brand" />
            <div className="grid md:grid-cols-4 gap-6 relative">
              <Step n="1" title="Submit Request" body="Fill out a short membership request form with your details." />
              <Step n="2" title="Admin Verifies" body="Our admin team verifies your identity as a Class of 1997 alumnus." />
              <Step n="3" title="Receive Senior ID" body="Get your unique Member ID issued upon approval." />
              <Step n="4" title="Access Portal" body="Log in and access the full private member portal." />
            </div>
          </div>
        </div>
      </section>

      {/* what you get */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">What You Get</h2>
        <p className="mt-2 text-gray-600">
          As a verified Amanfoɔ '97 member, you gain access to a suite of features designed around your privacy and community.
        </p>
        <ul className="mt-6 text-left max-w-md mx-auto space-y-2 text-gray-700">
          {[
            'Private member directory',
            'Personal profile management',
            'Secure login access',
            'Senior-only communication space (future-ready)',
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check size={18} className="text-brand" /> {t}
            </li>
          ))}
        </ul>
        <Link
          to="/request-membership"
          className="inline-block mt-7 bg-brand-dark hover:bg-brand text-white font-medium px-6 py-3 rounded-full"
        >
          Get Started
        </Link>
      </section>

      {/* CTA banner */}
      <section className="bg-brand-dark text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to Join Amanfoɔ '97?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Submit your request and become part of a trusted alumni network built on verification, privacy, and community.
          </p>
          <Link
            to="/request-membership"
            className="inline-block mt-6 bg-white text-brand-dark font-semibold px-6 py-3 rounded-full"
          >
            Request Seniorship
          </Link>
          <div className="mt-3 text-sm text-white/80">
            Already a senior?{' '}
            <Link to="/login" className="underline">
              Login here
            </Link>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <div className="w-12 h-12 bg-brand/10 rounded-xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">
            Need help? <br />Explore our FAQs
          </h2>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <Faq key={q} q={q} a={a} />
          ))}
        </div>
      </section>

      <footer className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between text-sm">
          <span className="text-brand font-semibold">Amanfoɔ 97</span>
          <span className="text-gray-600 flex items-center gap-1">
            Contact: <Mail size={14} /> support@amanfo97.org
          </span>
        </div>
      </footer>
    </div>
  );
}
