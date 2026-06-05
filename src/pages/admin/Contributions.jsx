import { useState } from 'react';
import { Plus, Download, X } from 'lucide-react';
import {
  getContributionFunds,
  setFundStatus,
  VALID_STATUSES,
  getPayments,
  addPayment,
  CONTRIBUTION_TYPES,
} from '../../data/contributions';
import { downloadReceipt } from '../../utils/receipt';

const statusStyle = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Overdue: 'bg-red-50 text-red-700',
};

const emptyForm = {
  seniorId: '',
  seniorName: '',
  type: CONTRIBUTION_TYPES[0],
  amount: '',
  date: '',
  reference: '',
  notes: '',
};

export default function AdminContributions() {
  const [funds, setFunds] = useState(() => getContributionFunds());
  const [payments, setPayments] = useState(() => getPayments());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const updateStatus = (id, status) => {
    setFundStatus(id, status);
    setFunds(getContributionFunds());
  };

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.seniorId.trim() || !form.seniorName.trim() || !form.amount.trim()) return;
    const created = addPayment(form);
    setPayments(getPayments());
    setForm(emptyForm);
    setShowForm(false);
    downloadReceipt(created);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand">Contributions</h2>
          <p className="text-gray-500 mt-1">
            Manage contribution categories, record payments, and issue receipts.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-brand-dark hover:bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap self-start"
        >
          <Plus size={16} /> Record Payment
        </button>
      </div>

      {/* Fund categories */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Contribution Categories</h3>
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="px-5 py-4 font-medium">Fund</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Due Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Update</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((fund) => (
                  <tr key={fund.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">{fund.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{fund.description}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{fund.amount}</td>
                    <td className="px-5 py-4 text-gray-700">{new Date(fund.dueDate).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[fund.status]}`}>
                        {fund.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={fund.status}
                        onChange={(e) => updateStatus(fund.id, e.target.value)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                      >
                        {VALID_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payment records */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Payment Records</h3>
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Senior ID</th>
                  <th className="px-5 py-4 font-medium">Member</th>
                  <th className="px-5 py-4 font-medium">Contribution</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Reference</th>
                  <th className="px-5 py-4 font-medium text-right">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                      No payments recorded yet. Use “Record Payment” to add one.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{new Date(p.date).toLocaleDateString()}</td>
                      <td className="px-5 py-4 text-gray-700">{p.seniorId}</td>
                      <td className="px-5 py-4 text-gray-900">{p.seniorName}</td>
                      <td className="px-5 py-4 text-gray-700">{p.type}</td>
                      <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{p.amount}</td>
                      <td className="px-5 py-4 text-gray-500">{p.reference}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => downloadReceipt(p)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <Download size={14} /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Record payment modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Record Payment</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Senior ID" value={form.seniorId} onChange={setField('seniorId')} placeholder="AM97001" required />
                <Field label="Member Name" value={form.seniorName} onChange={setField('seniorName')} placeholder="Kwame Mensah" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-800 block mb-1.5">Contribution Type</label>
                  <select
                    value={form.type}
                    onChange={setField('type')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                  >
                    {CONTRIBUTION_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <Field label="Amount" value={form.amount} onChange={setField('amount')} placeholder="GHS 300" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-800 block mb-1.5">Payment Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={setField('date')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <Field label="Payment Reference" value={form.reference} onChange={setField('reference')} placeholder="MOMO-0000000" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 block mb-1.5">Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={setField('notes')}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-dark hover:bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Download size={16} /> Save & Download Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800 block mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}
