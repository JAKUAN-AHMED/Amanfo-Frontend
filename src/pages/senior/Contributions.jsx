import { useEffect, useState } from 'react';
import { Info, Download, ReceiptText } from 'lucide-react';
import { getContributionFunds, getPaymentsForSenior, parseAmount, formatAmount } from '../../data/contributions';
import { downloadReceipt } from '../../utils/receipt';
import { useAuth } from '../../context/AuthContext';

const statusStyle = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Overdue: 'bg-red-50 text-red-700',
};

export default function SeniorContributions() {
  const { user } = useAuth();
  const seniorId = user?.id || 'AM97001';
  const [funds, setFunds] = useState(() => getContributionFunds());
  const [payments, setPayments] = useState(() => getPaymentsForSenior(seniorId));

  useEffect(() => {
    const refresh = () => {
      setFunds(getContributionFunds());
      setPayments(getPaymentsForSenior(seniorId));
    };
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, [seniorId]);

  const totals = funds.reduce(
    (acc, fund) => {
      acc[fund.status] = (acc[fund.status] || 0) + 1;
      return acc;
    },
    { Paid: 0, Pending: 0, Overdue: 0 },
  );

  const totalPaid = payments.reduce((sum, p) => sum + parseAmount(p.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Contributions</h2>
        <p className="text-gray-500 mt-1">Track your dues and contribution status with the Executive.</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-brand-dark to-brand text-white p-5 md:p-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide opacity-80">Total Contributions Paid</div>
          <div className="text-3xl md:text-4xl font-bold mt-1">{formatAmount(totalPaid)}</div>
        </div>
        <div className="text-right text-sm text-white/80">
          {payments.length} payment{payments.length === 1 ? '' : 's'}
        </div>
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

      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Payment History</h3>
        <div className="rounded-xl border border-gray-200 bg-white">
          {payments.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">
              <ReceiptText size={28} className="mx-auto mb-2 text-gray-300" />
              No payments recorded yet. Receipts appear here once the Executive records a payment.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Contribution</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                    <th className="px-5 py-4 font-medium">Reference</th>
                    <th className="px-5 py-4 font-medium text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{new Date(p.date).toLocaleDateString()}</td>
                      <td className="px-5 py-4 text-gray-900">{p.type}</td>
                      <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{p.amount}</td>
                      <td className="px-5 py-4 text-gray-500">{p.reference}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => downloadReceipt(p)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <Download size={14} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

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
