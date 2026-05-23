import { useState } from 'react';
import { Plus } from 'lucide-react';
import { getContributionFunds, getPayments, recordPayment } from '../../data/contributions';

export default function AdminContributions() {
  const [payments, setPayments] = useState(() => getPayments());
  const [form, setForm] = useState({
    senior: 'Kwame Mensah',
    fund: getContributionFunds()[0].name,
    amount: 'GHS 300',
    method: 'MTN MoMo',
    date: new Date().toISOString().slice(0, 10),
    reference: '',
  });

  const submit = (event) => {
    event.preventDefault();
    recordPayment(form);
    setPayments(getPayments());
    setForm({ ...form, reference: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Contributions</h2>
        <p className="text-gray-500 mt-1">Record and review senior contribution payments.</p>
      </div>

      <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Senior</span>
            <input
              value={form.senior}
              onChange={(event) => setForm({ ...form, senior: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Fund</span>
            <select
              value={form.fund}
              onChange={(event) => setForm({ ...form, fund: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {getContributionFunds().map((fund) => (
                <option key={fund.id}>{fund.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Amount</span>
            <input
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Method</span>
            <select
              value={form.method}
              onChange={(event) => setForm({ ...form, method: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option>MTN MoMo</option>
              <option>Paystack</option>
              <option>Hubtel</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Reference</span>
            <input
              value={form.reference}
              onChange={(event) => setForm({ ...form, reference: event.target.value })}
              placeholder="Optional"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
        <button className="mt-5 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand">
          <Plus size={16} /> Record Payment
        </button>
      </form>

      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900">Payment Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Senior</th>
                <th className="px-5 py-4 font-medium">Fund</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Method</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Reference</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-gray-50">
                  <td className="px-5 py-4">{payment.senior}</td>
                  <td className="px-5 py-4">{payment.fund}</td>
                  <td className="px-5 py-4">{payment.amount}</td>
                  <td className="px-5 py-4">{payment.method}</td>
                  <td className="px-5 py-4">{payment.date}</td>
                  <td className="px-5 py-4">{payment.reference}</td>
                  <td className="px-5 py-4">{payment.status || 'Completed'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}



