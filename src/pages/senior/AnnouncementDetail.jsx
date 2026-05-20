import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Megaphone, AlertCircle, MapPin, Phone, CreditCard, Target, Flag, User } from 'lucide-react';
import { findAnnouncement, TYPE_STYLES, PRIORITY_STYLES } from '../../data/announcements';

function Row({ icon, label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="text-brand mt-0.5">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-gray-900 font-medium break-words">{value}</div>
      </div>
    </div>
  );
}

function TypeDetails({ a }) {
  const money = (amt) => (amt ? `${a.currency || ''} ${Number(amt).toLocaleString()}`.trim() : null);
  switch (a.type) {
    case 'Lalasula Contribution':
      return (
        <>
          <Row icon={<User size={16} />} label="Beneficiary" value={a.beneficiary} />
          <Row icon={<Target size={16} />} label="Target Amount" value={money(a.amount)} />
          <Row icon={<Calendar size={16} />} label="Contribution Deadline" value={a.deadline} />
          <Row icon={<CreditCard size={16} />} label="Payment Method" value={a.paymentMethod} />
          <Row icon={<AlertCircle size={16} />} label="Instructions" value={a.instructions} />
        </>
      );
    case 'Legacy Project':
      return (
        <>
          <Row icon={<Megaphone size={16} />} label="Project Name" value={a.projectName} />
          <Row icon={<User size={16} />} label="Project Lead" value={a.projectLead} />
          <Row icon={<Target size={16} />} label="Budget Goal" value={money(a.amount)} />
          <Row icon={<Calendar size={16} />} label="Start Date" value={a.startDate} />
          <Row icon={<Calendar size={16} />} label="Target Completion" value={a.deadline} />
          <Row icon={<Flag size={16} />} label="Objectives" value={a.objectives} />
        </>
      );
    case 'Hero Fund':
      return (
        <>
          <Row icon={<User size={16} />} label="Honoree" value={a.honoree} />
          <Row icon={<Megaphone size={16} />} label="Achievement" value={a.reason} />
          <Row icon={<Target size={16} />} label="Fund Goal" value={money(a.amount)} />
          <Row icon={<Calendar size={16} />} label="Contribution Deadline" value={a.deadline} />
          <Row icon={<CreditCard size={16} />} label="Payment Method" value={a.paymentMethod} />
        </>
      );
    case 'Ayie Announcement':
      return (
        <>
          <Row icon={<User size={16} />} label="Deceased" value={a.deceased} />
          <Row icon={<User size={16} />} label="Relation" value={a.relative} />
          <Row icon={<User size={16} />} label="Senior Affected" value={a.beneficiary} />
          <Row icon={<Calendar size={16} />} label="Funeral Date" value={a.funeralDate} />
          <Row icon={<MapPin size={16} />} label="Funeral Location" value={a.funeralLocation} />
          <Row icon={<Phone size={16} />} label="Family Contact" value={a.contact} />
          <Row icon={<AlertCircle size={16} />} label="Programme" value={a.programme} />
        </>
      );
    case 'Annual Dues':
      return (
        <>
          <Row icon={<Calendar size={16} />} label="Year" value={a.year || a.year === 0 ? a.year : null} />
          <Row icon={<Target size={16} />} label="Amount per Senior" value={money(a.amount)} />
          <Row icon={<Calendar size={16} />} label="Payment Deadline" value={a.deadline} />
          <Row icon={<CreditCard size={16} />} label="Payment Method" value={a.paymentMethod} />
          <Row icon={<AlertCircle size={16} />} label="Late Penalty" value={a.penalty} />
          <Row icon={<AlertCircle size={16} />} label="Instructions" value={a.instructions} />
        </>
      );
    case 'Executive Announcement':
      return (
        <>
          <Row icon={<User size={16} />} label="Issued By" value={a.issuedBy} />
          <Row icon={<Calendar size={16} />} label="Effective Date" value={a.effectiveDate} />
        </>
      );
    case 'Custom Announcement':
    default:
      return (a.customFields || []).map((f) => (
        <Row
          key={f.id}
          icon={<Megaphone size={16} />}
          label={f.label || 'Untitled field'}
          value={
            f.type === 'URL' && f.value ? (
              <a href={f.value} target="_blank" rel="noreferrer" className="text-brand underline break-all">
                {f.value}
              </a>
            ) : (
              f.value
            )
          }
        />
      ));
  }
}

export default function SeniorAnnouncementDetail() {
  const nav = useNavigate();
  const { id } = useParams();
  const a = findAnnouncement(id);

  if (!a) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Announcement not found.</p>
        <Link to="/senior/announcements" className="text-brand font-medium mt-3 inline-block">
          ← Back to announcements
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <button onClick={() => nav(-1)} className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm">
        <ArrowLeft size={18} /> Back
      </button>

      {a.cover && (
        <div className="rounded-2xl overflow-hidden h-64 bg-gray-100">
          <img src={a.cover} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-7">
        <div className="flex items-start gap-3 flex-wrap">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${TYPE_STYLES[a.type]}`}>
            {a.type}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${PRIORITY_STYLES[a.priority]}`}>
            {a.priority} priority
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-700 inline-flex items-center gap-1">
            <Users size={12} /> {a.audience}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{a.title}</h1>
        <div className="text-sm text-gray-500 mt-1">
          {a.month} {a.day}, {a.year} · Posted {a.ago}
        </div>

        <div
          className="prose prose-sm max-w-none mt-6 text-gray-700 rte-preview"
          dangerouslySetInnerHTML={{ __html: a.desc }}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-7">
        <h3 className="text-brand font-semibold mb-3">{a.type} details</h3>
        <TypeDetails a={a} />
      </div>
    </div>
  );
}
