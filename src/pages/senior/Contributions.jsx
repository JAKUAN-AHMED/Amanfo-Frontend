import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { getContributionFunds } from '../../data/contributions';

const statusStyle = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Overdue: 'bg-red-50 text-red-700',
};

export default function SeniorContributions() {
  const [funds, setFunds] = useState(() => getContributionFunds());

  useEffect(() => {
    const refresh = () => setFunds(getContributionFunds());
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const totals = funds.reduce(
    (acc, fund) => {
      acc[fund.status] = (acc[fund.status] || 0) + 1;
      return acc;
    },
    { Paid: 0, Pending: 0, Overdue: 0 },
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Contributions</h2>
        <p className="text-gray-500 mt-1">Track your dues and contribution status with the Executive.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Paid', 'Pending', 'Overdue'].map((k) => (
          <div key={k} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">{k}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals[k]}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {funds.map((fund) => (
          <article key={fund.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{fund.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{fund.description}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${statusStyle[fund.status]}`}>
                {fund.status}
              </span>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{fund.amount}</div>
                <div className="text-xs text-gray-500 mt-0.5">Due {new Date(fund.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900">
          To settle any outstanding dues or contributions, please contact the Executive Treasurer.
          Online payment options will be available in a future update.
        </p>
      </div>
    </div>
  );
}
