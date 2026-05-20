import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, Pencil, Trash2 } from 'lucide-react';

function Row({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="text-brand mt-0.5">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-gray-900 font-medium">{value}</div>
      </div>
    </div>
  );
}

export default function MemberDetail() {
  const nav = useNavigate();
  const { id = 'AM97001' } = useParams();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => nav(-1)} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-brand">Member Details</h2>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/admin/seniors/${id}/edit`}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <Pencil size={16} /> Edit
          </Link>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <img
            src="https://i.pravatar.cc/200?img=12"
            alt=""
            className="w-28 h-28 rounded-full mx-auto object-cover"
          />
          <h3 className="text-xl font-bold mt-4">Kwame Mensah</h3>
          <p className="text-sm text-gray-500">"KM"</p>
          <span className="mt-3 inline-block bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">
            {id}
          </span>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full">
              ✓ Active
            </span>
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-brand font-semibold mb-3">Contact</h3>
          <Row icon={<Mail size={16} />} label="Email" value="kwame.mensah@email.com" />
          <Row icon={<Phone size={16} />} label="Phone" value="+233 244 123 456" />
          <Row icon={<MapPin size={16} />} label="Location" value="Accra, Ghana" />

          <h3 className="text-brand font-semibold mt-6 mb-3">Alumni</h3>
          <Row icon={<GraduationCap size={16} />} label="Class" value="A3" />
          <Row icon={<GraduationCap size={16} />} label="House / Group" value="Amanfoɔ" />

          <h3 className="text-brand font-semibold mt-6 mb-3">Professional</h3>
          <Row icon={<Briefcase size={16} />} label="Industry" value="Technology" />
          <Row icon={<Briefcase size={16} />} label="Profession" value="Software Engineer" />
        </div>
      </div>
    </div>
  );
}
