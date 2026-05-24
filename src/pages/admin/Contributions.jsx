import { useState } from 'react';
import { getContributionFunds, setFundStatus, VALID_STATUSES } from '../../data/contributions';

const statusStyle = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Overdue: 'bg-red-50 text-red-700',
};

export default function AdminContributions() {
  const [funds, setFunds] = useState(() => getContributionFunds());

  const update = (id, status) => {
    setFundStatus(id, status);
    setFunds(getContributionFunds());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Contributions</h2>
        <p className="text-gray-500 mt-1">
          Manage Annual Dues, Hero Fund, Building Fund, Lalasulala and Ayie Support — mark each fund as Paid, Pending or Overdue.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white">
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
                      onChange={(e) => update(fund.id, e.target.value)}
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
      </section>
    </div>
  );
}
