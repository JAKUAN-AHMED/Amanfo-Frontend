import { useRef, useState } from 'react';
import { Pencil, Trash2, Send, ImagePlus, X, Plus } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';

const TYPES = [
  'Lalasula Contribution',
  'Legacy Project',
  'Hero Fund',
  'Ayie Announcement',
  'Annual Dues',
  'Executive Announcement',
  'Custom Announcement',
];

const CUSTOM_FIELD_TYPES = ['Text', 'Number', 'Date', 'Long Text', 'URL'];

const AUDIENCES = ['All Members', 'Seniors Only', 'Admins Only', 'Specific Class', 'Specific House'];
const PRIORITIES = ['Low', 'Normal', 'High', 'Urgent'];
const CLASSES = ['A1', 'A2', 'A3', 'AV', 'B1', 'B2', 'M1', 'M2', 'M3', 'M4'];
const HOUSES = ['Amanfoɔ', 'Aggrey', 'Butler', 'Ramseyer', 'Riis', 'Slessor', 'Freeman'];
const RELATIVES = ['Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Son', 'Daughter', 'Uncle', 'Aunt', 'Self'];
const PAYMENT_METHODS = ['Mobile Money', 'Bank Transfer', 'Cash', 'Cheque'];
const CURRENCIES = ['GHS', 'USD', 'GBP', 'EUR', 'NGN'];

const TYPE_STYLES = {
  'Lalasula Contribution': 'bg-pink-100 text-pink-700',
  'Legacy Project': 'bg-purple-100 text-purple-700',
  'Hero Fund': 'bg-amber-100 text-amber-700',
  'Ayie Announcement': 'bg-blue-100 text-blue-700',
  'Annual Dues': 'bg-emerald-100 text-emerald-700',
  'Executive Announcement': 'bg-red-100 text-red-700',
  'Custom Announcement': 'bg-indigo-100 text-indigo-700',
};

const PRIORITY_STYLES = {
  Low: 'bg-gray-100 text-gray-600',
  Normal: 'bg-blue-100 text-blue-700',
  High: 'bg-amber-100 text-amber-700',
  Urgent: 'bg-red-100 text-red-700',
};

const initialRecent = [
  {
    title: 'Class of 97 -30th Anniversary Homecoming',
    desc: 'Save the date. Three days of celebration on Campus',
    day: '20', month: 'Jun',
    type: 'Executive Announcement', audience: 'All Members', priority: 'High',
  },
  {
    title: 'Q2 Lalasula Drive Opens',
    desc: 'Contribute toward the welfare fund for current students.',
    day: '01', month: 'Aug',
    type: 'Lalasula Contribution', audience: 'Seniors Only', priority: 'Normal',
  },
];

function Field({ label, value, onChange, type = 'text', placeholder, textarea, required }) {
  const props = {
    value: value || '',
    placeholder,
    required,
    onChange: (e) => onChange?.(e.target.value),
    className:
      'w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30',
  };
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? <textarea rows={3} {...props} /> : <input type={type} {...props} />}
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ImageUpload({ images, onAdd, onRemove }) {
  const inputRef = useRef(null);
  const handleFiles = (files) => {
    const list = Array.from(files || []).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    if (list.length) onAdd(list);
  };
  return (
    <div className="col-span-2">
      <label className="text-sm font-medium text-gray-700 block mb-1.5">
        Cover Images <span className="text-gray-400 text-xs font-normal">(optional)</span>
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50 hover:border-brand cursor-pointer text-center"
      >
        <ImagePlus size={28} className="mx-auto text-gray-400" />
        <div className="text-sm text-gray-700 mt-2 font-medium">
          Click to upload or drag & drop
        </div>
        <div className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF up to 5MB</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TypeFields({ form, update }) {
  switch (form.type) {
    case 'Lalasula Contribution':
      return (
        <>
          <Field label="Beneficiary / Senior" value={form.beneficiary} onChange={update('beneficiary')} placeholder="e.g. Kwame Mensah" required />
          <Select label="Relation" value={form.relative} onChange={update('relative')} options={RELATIVES} />
          <Field label="Target Amount" type="number" value={form.amount} onChange={update('amount')} placeholder="2000" required />
          <Select label="Currency" value={form.currency} onChange={update('currency')} options={CURRENCIES} required />
          <Field label="Contribution Deadline" type="date" value={form.deadline} onChange={update('deadline')} required />
          <Select label="Payment Method" value={form.paymentMethod} onChange={update('paymentMethod')} options={PAYMENT_METHODS} />
          <div className="col-span-2">
            <Field label="Payment Instructions" value={form.instructions} onChange={update('instructions')} textarea placeholder="MoMo number, bank details, etc." />
          </div>
        </>
      );
    case 'Legacy Project':
      return (
        <>
          <Field label="Project Name" value={form.projectName} onChange={update('projectName')} placeholder="e.g. New Library Wing" required />
          <Field label="Project Lead" value={form.projectLead} onChange={update('projectLead')} placeholder="Coordinator name" />
          <Field label="Budget Goal" type="number" value={form.amount} onChange={update('amount')} placeholder="50000" required />
          <Select label="Currency" value={form.currency} onChange={update('currency')} options={CURRENCIES} required />
          <Field label="Start Date" type="date" value={form.startDate} onChange={update('startDate')} />
          <Field label="Target Completion" type="date" value={form.deadline} onChange={update('deadline')} required />
          <div className="col-span-2">
            <Field label="Project Objectives" value={form.objectives} onChange={update('objectives')} textarea placeholder="What this project aims to achieve…" />
          </div>
        </>
      );
    case 'Hero Fund':
      return (
        <>
          <Field label="Honoree Name" value={form.honoree} onChange={update('honoree')} placeholder="Who is being honored" required />
          <Field label="Achievement / Reason" value={form.reason} onChange={update('reason')} placeholder="e.g. Outstanding Service Award" />
          <Field label="Fund Goal" type="number" value={form.amount} onChange={update('amount')} placeholder="5000" required />
          <Select label="Currency" value={form.currency} onChange={update('currency')} options={CURRENCIES} required />
          <Field label="Contribution Deadline" type="date" value={form.deadline} onChange={update('deadline')} required />
          <Select label="Payment Method" value={form.paymentMethod} onChange={update('paymentMethod')} options={PAYMENT_METHODS} />
        </>
      );
    case 'Ayie Announcement':
      return (
        <>
          <Field label="Name of Deceased" value={form.deceased} onChange={update('deceased')} placeholder="Full name" required />
          <Select label="Relation to Senior" value={form.relative} onChange={update('relative')} options={RELATIVES} required />
          <Field label="Senior Affected" value={form.beneficiary} onChange={update('beneficiary')} placeholder="e.g. Kwame Mensah" required />
          <Field label="Funeral Date" type="date" value={form.funeralDate} onChange={update('funeralDate')} required />
          <Field label="Funeral Location" value={form.funeralLocation} onChange={update('funeralLocation')} placeholder="Town / venue" required />
          <Field label="Family Contact" value={form.contact} onChange={update('contact')} placeholder="Phone or email" />
          <div className="col-span-2">
            <Field label="Funeral Programme" value={form.programme} onChange={update('programme')} textarea placeholder="Wake-keeping, burial, thanksgiving service timings…" />
          </div>
        </>
      );
    case 'Annual Dues':
      return (
        <>
          <Field label="Dues Year" type="number" value={form.year} onChange={update('year')} placeholder="2027" required />
          <Field label="Amount per Senior" type="number" value={form.amount} onChange={update('amount')} placeholder="200" required />
          <Select label="Currency" value={form.currency} onChange={update('currency')} options={CURRENCIES} required />
          <Field label="Payment Deadline" type="date" value={form.deadline} onChange={update('deadline')} required />
          <Select label="Payment Method" value={form.paymentMethod} onChange={update('paymentMethod')} options={PAYMENT_METHODS} />
          <Field label="Late Penalty" value={form.penalty} onChange={update('penalty')} placeholder="e.g. 10% after deadline" />
          <div className="col-span-2">
            <Field label="Payment Instructions" value={form.instructions} onChange={update('instructions')} textarea placeholder="Bank account, MoMo, etc." />
          </div>
        </>
      );
    case 'Executive Announcement':
      return (
        <>
          <Field label="Issued By" value={form.issuedBy} onChange={update('issuedBy')} placeholder="e.g. Executive Committee" />
          <Field label="Effective Date" type="date" value={form.effectiveDate} onChange={update('effectiveDate')} />
        </>
      );
    case 'Custom Announcement':
    default:
      return <CustomFields form={form} update={update} />;
  }
}

function CustomFields({ form, update }) {
  const fields = form.customFields || [];
  const setFields = (next) => update('customFields')(next);
  const addField = () =>
    setFields([...fields, { id: Date.now() + Math.random(), label: '', type: 'Text', value: '' }]);
  const updateField = (id, patch) =>
    setFields(fields.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const removeField = (id) => setFields(fields.filter((f) => f.id !== id));

  return (
    <div className="col-span-2 space-y-3">
      <p className="text-sm text-gray-500">
        Add any fields you need for this custom announcement (e.g. Venue, Speaker, RSVP link).
      </p>
      {fields.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400">
          No custom fields yet — click "Add Field" below to create one.
        </div>
      )}
      {fields.map((f) => (
        <div key={f.id} className="grid grid-cols-12 gap-3 items-start bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="col-span-4">
            <input
              value={f.label}
              onChange={(e) => updateField(f.id, { label: e.target.value })}
              placeholder="Field label"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="col-span-3">
            <select
              value={f.type}
              onChange={(e) => updateField(f.id, { type: e.target.value, value: '' })}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {CUSTOM_FIELD_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="col-span-4">
            {f.type === 'Long Text' ? (
              <textarea
                rows={2}
                value={f.value}
                onChange={(e) => updateField(f.id, { value: e.target.value })}
                placeholder="Value"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            ) : (
              <input
                type={f.type === 'Number' ? 'number' : f.type === 'Date' ? 'date' : f.type === 'URL' ? 'url' : 'text'}
                value={f.value}
                onChange={(e) => updateField(f.id, { value: e.target.value })}
                placeholder="Value"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => removeField(f.id)}
            className="col-span-1 h-9 w-9 mx-auto flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
            title="Remove field"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addField}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand"
      >
        <Plus size={16} /> Add Field
      </button>
    </div>
  );
}

export default function AnnouncementForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    type: 'Lalasula Contribution',
    audience: 'All Members',
    priority: 'Normal',
    targetClass: '',
    targetHouse: '',
    pinned: false,
    images: [],
    // type-specific
    beneficiary: '', relative: '', amount: '', currency: 'GHS', deadline: '',
    paymentMethod: '', instructions: '', projectName: '', projectLead: '',
    startDate: '', objectives: '', honoree: '', reason: '', deceased: '',
    funeralDate: '', funeralLocation: '', contact: '', programme: '',
    year: '', penalty: '', issuedBy: '', effectiveDate: '',
    customFields: [],
  });
  const [recent, setRecent] = useState(initialRecent);

  const update = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const setImages = (next) => setForm((f) => ({ ...f, images: next }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    const d = form.date ? new Date(form.date) : new Date();
    const month = d.toLocaleString('en', { month: 'short' });
    const day = String(d.getDate()).padStart(2, '0');
    setRecent([
      {
        title: form.title,
        desc: form.description,
        day, month,
        type: form.type,
        audience: form.audience,
        priority: form.priority,
        cover: form.images[0]?.url,
      },
      ...recent,
    ]);
    setForm((f) => ({ ...f, title: '', description: '', date: '', images: [] }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-7">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Announcements</h2>
        <div className="grid grid-cols-2 gap-5">
          <Select label="Announcement Type" value={form.type} onChange={update('type')} options={TYPES} required />
          <Field label="Announcement Date" type="date" value={form.date} onChange={update('date')} />

          <div className="col-span-2">
            <Field label="Announcement Title" value={form.title} onChange={update('title')} placeholder="e.g. Class of 97 - 30th Anniversary" required />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Announcement Description</label>
            <RichTextEditor
              value={form.description}
              onChange={update('description')}
              placeholder="Provide details — format with headings, bold, lists, links…"
            />
          </div>

          {/* type-specific fields */}
          <div className="col-span-2 mt-1 mb-1">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              {form.type} details
            </div>
            <div className="h-px bg-gray-100 mt-1.5" />
          </div>
          <TypeFields form={form} update={update} />

          {/* delivery */}
          <div className="col-span-2 mt-2">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Delivery</div>
            <div className="h-px bg-gray-100 mt-1.5" />
          </div>
          <Select
            label="Audience"
            value={form.audience}
            onChange={(v) => setForm((f) => ({ ...f, audience: v, targetClass: '', targetHouse: '' }))}
            options={AUDIENCES}
          />
          <Select label="Priority" value={form.priority} onChange={update('priority')} options={PRIORITIES} />
          {form.audience === 'Specific Class' && (
            <Select label="Target Class" value={form.targetClass} onChange={update('targetClass')} options={CLASSES} />
          )}
          {form.audience === 'Specific House' && (
            <Select label="Target House" value={form.targetHouse} onChange={update('targetHouse')} options={HOUSES} />
          )}

          <ImageUpload
            images={form.images}
            onAdd={(list) => setImages([...form.images, ...list])}
            onRemove={(i) => setImages(form.images.filter((_, idx) => idx !== i))}
          />
        </div>

        <label className="flex items-center gap-2 mt-5 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.pinned}
            onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
            className="w-4 h-4 accent-brand"
          />
          Pin this announcement to top
        </label>

        <button
          type="submit"
          className="mt-6 bg-brand-dark hover:bg-brand text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Send size={16} /> Submit Announcement
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Announcement</h3>
        <div className="space-y-3">
          {recent.map((it, i) => (
            <div key={i} className="bg-white rounded-xl px-5 py-4 flex items-center gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              {it.cover ? (
                <img src={it.cover} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs text-gray-500">{it.month}</span>
                  <span className="text-lg font-bold text-gray-900 leading-none">{it.day}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold text-gray-900">{it.title}</div>
                  {it.type && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TYPE_STYLES[it.type] || 'bg-gray-100 text-gray-700'}`}>
                      {it.type}
                    </span>
                  )}
                  {it.priority && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[it.priority] || 'bg-gray-100 text-gray-700'}`}>
                      {it.priority}
                    </span>
                  )}
                </div>
                <div
                  className="text-sm text-gray-500 mt-0.5 line-clamp-2 rte-preview"
                  dangerouslySetInnerHTML={{ __html: it.desc }}
                />
                {it.audience && <div className="text-xs text-gray-400 mt-1">Audience: {it.audience}</div>}
              </div>
              <div className="flex gap-3 shrink-0">
                <Pencil size={16} className="cursor-pointer text-gray-600 hover:text-gray-900" />
                <Trash2
                  size={16}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => setRecent(recent.filter((_, idx) => idx !== i))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
