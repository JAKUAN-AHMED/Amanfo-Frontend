import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';

function Input({ label, defaultValue, type = 'text' }) {
  return (
    <div>
      <label className="text-sm text-gray-700 block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
      />
    </div>
  );
}

function Select({ label, defaultValue, options = [] }) {
  const list = defaultValue && !options.includes(defaultValue) ? [defaultValue, ...options] : options;
  return (
    <div>
      <label className="text-sm text-gray-700 block mb-1.5">{label}</label>
      <select
        defaultValue={defaultValue}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none appearance-none"
      >
        {list.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const UPDATE_TYPES = [
  'Lalasula Contribution',
  'Legacy Project',
  'Hero Fund',
  'Ayie Announcement',
  'Annual Dues',
  'Executive Announcement',
];
const RELATIVES = ['Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Son', 'Daughter', 'Uncle', 'Aunt', 'Self'];
const COUNTS = ['10', '20', '23', '50', '100', '200', '500', '1000'];

export default function CreateUpdate() {
  const [description, setDescription] = useState('<p>Lot of description</p>');
  return (
    <div className="max-w-3xl bg-white border border-gray-200 rounded-2xl p-7 space-y-5">
      <h2 className="text-xl font-semibold">Create Community Updates</h2>
      <Select label="Select Update Type" defaultValue="Lalasula Contribution" options={UPDATE_TYPES} />
      <Input label="Tittle" defaultValue="welfare" />
      <div>
        <label className="text-sm text-gray-700 block mb-1.5">Description</label>
        <RichTextEditor value={description} onChange={setDescription} placeholder="Describe this update…" />
      </div>
      <div>
        <label className="text-sm text-gray-700 block mb-1.5">Image</label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm flex items-center justify-between">
          <span>image.png</span>
          <ImageIcon size={18} className="text-gray-500" />
        </div>
      </div>
      <Input label="Location" defaultValue="Dhaka, Bangladesh" />
      <Input label="Related Person Name" defaultValue="Alayna" />
      <Select label="Choose Relative" defaultValue="Father" options={RELATIVES} />
      <Input label="Contribution Deadline" defaultValue="12-5-26" />
      <Select label="Contribution count" defaultValue="23" options={COUNTS} />
      <Input label="Contribution Instruction" defaultValue="Describe it..." />
      <button className="bg-brand-dark hover:bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold">
        Publish Community Updaters
      </button>
    </div>
  );
}
