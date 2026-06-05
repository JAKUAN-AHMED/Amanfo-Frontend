import { Save } from 'lucide-react';

function Field({ label, defaultValue, type = 'text', wide }) {
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <label className="text-sm font-medium text-gray-800 block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
      />
    </div>
  );
}

export default function AdminProfile() {
  return (
    <div className="bg-white rounded-2xl p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
      <div className="flex items-center gap-5 mb-7">
        <div className="w-20 h-20 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg">
          AM
        </div>
        <div>
          <button className="bg-brand-dark hover:bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium">
            Change Avatar
          </button>
          <p className="text-xs text-gray-500 mt-1.5">JPG, PNG or GIF. Max size 2MB</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="First Name" defaultValue="Executive" />
        <Field label="Last Name" defaultValue="User" />
        <Field label="Email Address" defaultValue="admin@business.com" wide />
        <Field label="Password" defaultValue="23434" type="password" wide />
      </div>
      <div className="flex gap-3 mt-7">
        <button className="bg-brand-dark hover:bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
        <button className="border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  );
}
