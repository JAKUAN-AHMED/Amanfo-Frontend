import { Link } from 'react-router-dom';
import { Users, Search, Lock, Globe, Check, Star, Mail, ChevronDown, IdCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { loadFaqs } from '../data/faqs';
import { seniors, PERSON_PHOTO } from '../data/seniors';

function Step({ n, title, body }) {
  return (
    <div className="flex flex-col items-center text-center px-2 relative z-10">
      <div className="w-10 h-10 rounded-md bg-gold text-white font-bold flex items-center justify-center shadow">
        {n}
      </div>
      <h4 className="mt-4 font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm text-white/80 max-w-[180px]">{body}</p>
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

function useFaqs() {
  const [faqs, setFaqs] = useState(() => loadFaqs());
  useEffect(() => {
    const reload = () => setFaqs(loadFaqs());
    window.addEventListener('faqs-updated', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('faqs-updated', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);
  return faqs
    .filter((f) => f.published)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

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
  const faqs = useFaqs();
  return (
    <div className="bg-white">
      {/* nav */}
      <header className="bg-brand-dark">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size={36} />
          <div className="flex items-center gap-5">
            <Link to="/login" className="text-sm font-medium text-white hover:text-gold">
              Login
            </Link>
            <Link
              to="/request-membership"
              className="bg-gold hover:bg-gold-dark text-brand-dark text-sm font-semibold px-4 py-2 rounded-full"
            >
              Request Membership
            </Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="text-center px-6 py-16 max-w-5xl mx-auto">
        <span className="inline-flex items-center gap-1 bg-brand/10 text-brand text-xs font-medium px-3 py-1.5 rounded-full">
          <Star size={12} /> Prempeh College Class of 1997
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
          <span className="block">
            Stay Connected with Verified{' '}
            <span className="text-brand">Amanfo '97</span>
          </span>
          <span className="block">Seniors Worldwide</span>
        </h1>
        <p className="mt-5 text-gray-600 max-w-xl mx-auto">
          A secure platform exclusively for Prempeh College Class of 1997 to connect, discover, and stay engaged.
        </p>
        <Link
          to="/request-membership"
          className="inline-block mt-6 bg-brand-dark hover:bg-brand text-white font-medium px-6 py-3 rounded-full"
        >
          Request Membership
        </Link>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="flex -space-x-2">
            {seniors.map((s) => (
              <img
                key={s.id}
                src={s.avatar}
                alt={s.name}
                title={s.name}
                onError={(e) => { e.currentTarget.src = PERSON_PHOTO; }}
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span>250+ Verified Seniors Already Joined</span>
        </div>
      </section>

      {/* exclusive */}
      <section className="bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold">
            Exclusively for Verified <br />
            <span className="text-gold">Amanfo '97</span> Seniors
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            We take verification seriously so every Senior can trust who they're connected with.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="bg-gold rounded-lg py-2.5 px-4 text-sm text-black font-medium inline-flex items-center gap-2 whitespace-nowrap shadow-sm">
              <div className="flex -space-x-2">
                {seniors.map((s) => (
                  <img
                    key={s.id}
                    src={s.avatar}
                    alt={s.name}
                    title={s.name}
                    onError={(e) => { e.currentTarget.src = PERSON_PHOTO; }}
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              Verified Seniors can join
            </div>
            <div className="bg-gold rounded-lg py-2.5 px-4 text-sm text-black font-medium inline-flex items-center gap-2 whitespace-nowrap shadow-sm">
              <Lock size={16} className="text-black" />
              Fully Private
            </div>
            <div className="bg-gold rounded-lg py-2.5 px-4 text-sm text-black font-medium inline-flex items-center gap-2 whitespace-nowrap shadow-sm">
              <IdCard size={16} className="text-black" />
              Unique Senior ID
            </div>
          </div>
        </div>
      </section>

      {/* why */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Join Amanfo '97?</h2>
          <p className="mt-2 text-gray-600">
            Everything you need to stay meaningfully connected
            <br />
            with fellow Amanfo '97 Seniors
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <Feature icon={<Users size={20} />} title="Reconnect with fellow Amanfo '97 Seniors and strengthen old friendships." body="Rediscover classmates from your Prempeh College days and rekindle old friendships." />
          <Feature icon={<Search size={20} />} title="Smart Search" body="Find any Senior quickly with our intelligent directory search." />
          <Feature icon={<Lock size={20} />} title="Privacy Control" body="Decide exactly what information you share and with whom." />
          <Feature icon={<Globe size={20} />} title="Stay Connected" body="Stay engaged with your Amanfo '97 Senior network no matter where in the world you are." />
        </div>
      </section>

      {/* how it works */}
      <section className="bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-white/80">Four simple steps to becoming a verified Amanfo '97 Senior.</p>
          </div>
          <div className="relative mt-12">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gold" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
              <Step n="1" title="Submit Request" body="Fill out a short membership request form with your details." />
              <Step n="2" title="Executive Verification" body="Our executive team verifies your identity as a Class of 1997 alumnus." />
              <Step n="3" title="Receive Senior ID" body="Get your unique Senior ID after approval." />
              <Step n="4" title="Access Portal" body="Log in and access the private Senior Portal." />
            </div>
          </div>
        </div>
      </section>

      {/* what you get */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">What You Get</h2>
        <p className="mt-2 text-gray-600">
          As a verified Amanfo '97 Senior, you gain access to features designed around privacy, trust, and community.
        </p>
        <ul className="mt-6 text-left max-w-md mx-auto space-y-2 text-gray-700">
          {[
            'Private Senior Directory',
            'Personal profile management',
            'Secure login access',
            'Contribution tracking & receipts',
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
          <h2 className="text-3xl font-bold">Ready to Join Amanfo '97?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Submit your request and become part of a trusted Senior community built on verification, privacy, and brotherhood.
          </p>
          <Link
            to="/request-membership"
            className="inline-block mt-6 bg-white text-brand-dark font-semibold px-6 py-3 rounded-full"
          >
            Request Membership
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
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-10">
        <div>
          <div className="w-12 h-12 bg-brand/10 rounded-xl mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Need help? <br />Explore our FAQs
          </h2>
        </div>
        <div>
          {faqs.length === 0 ? (
            <p className="text-sm text-gray-500">No FAQs available right now.</p>
          ) : (
            faqs.map((f) => <Faq key={f.id} q={f.question} a={f.answer} />)
          )}
        </div>
      </section>

      <footer className="bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
          <span className="text-gold font-semibold">Amanfo '97</span>
          <span className="text-white flex items-center gap-1">
            Contact: <Mail size={14} className="text-gold" /> support@amanfo97.org
          </span>
        </div>
      </footer>
    </div>
  );
}
