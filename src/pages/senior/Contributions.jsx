import { useState } from 'react';
import { CheckCircle2, CreditCard, Loader2, ReceiptText, X } from 'lucide-react';
import { getContributionFunds, getPayments, recordPayment } from '../../data/contributions';
import { useAuth } from '../../context/AuthContext';

const statusStyle = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Overdue: 'bg-red-50 text-red-700',
};

export default function SeniorContributions() {
  const { user } = useAuth();
  const seniorName = user?.name || 'Kwame Mensah';
  const [selected, setSelected] = useState(null);
  const [funds, setFunds] = useState(() => getContributionFunds());
  const [payments, setPayments] = useState(() => getPayments().filter((payment) => payment.senior === seniorName));

  const refresh = () => {
    setFunds(getContributionFunds());
    setPayments(getPayments().filter((payment) => payment.senior === seniorName));
  };

  const completePayment = (fund, method) => {
    recordPayment({
      senior: seniorName,
      fundId: fund.id,
      fund: fund.name,
      amount: fund.amount,
      method,
      date: new Date().toISOString().slice(0, 10),
      reference: `${method.replace(/\s/g, '').toUpperCase()}-${Date.now().toString().slice(-6)}`,
      status: 'Completed',
    });
    refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Contributions</h2>
        <p className="text-gray-500 mt-1">Track dues, funds, support payments, and receipts.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {funds.map((fund) => (
          <article key={fund.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{fund.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Due {new Date(fund.dueDate).toLocaleDateString()}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[fund.status]}`}>
                {fund.status}
              </span>
            </div>
            <div className="mt-5 text-2xl font-bold text-gray-900">{fund.amount}</div>
            <button
              onClick={() => setSelected(fund)}
              disabled={fund.status === 'Paid'}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
            >
              <CreditCard size={16} /> {fund.status === 'Paid' ? 'Paid' : 'Pay Now'}
            </button>
          </article>
        ))}
      </div>

      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <ReceiptText size={18} /> Receipt History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="text-left text-gray-500">
              <tr>
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
                  <td className="px-5 py-4">{payment.fund}</td>
                  <td className="px-5 py-4">{payment.amount}</td>
                  <td className="px-5 py-4">{payment.method}</td>
                  <td className="px-5 py-4">{payment.date}</td>
                  <td className="px-5 py-4">{payment.reference}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 size={13} /> {payment.status || 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <PaymentModal
          fund={selected}
          onClose={() => setSelected(null)}
          onComplete={(method) => completePayment(selected, method)}
        />
      )}
    </div>
  );
}

function PaymentModal({ fund, onClose, onComplete }) {
  const [state, setState] = useState('selecting');
  const [method, setMethod] = useState('');

  const startPayment = (selectedMethod) => {
    setMethod(selectedMethod);
    setState('processing');
    window.setTimeout(() => {
      onComplete(selectedMethod);
      setState('completed');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Pay {fund.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{fund.amount} due by {new Date(fund.dueDate).toLocaleDateString()}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {state === 'selecting' && (
          <div className="mt-5 space-y-3">
            {['MTN MoMo', 'Paystack', 'Hubtel'].map((item) => (
              <button
                key={item}
                onClick={() => startPayment(item)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium hover:bg-gray-50"
              >
                {item}
                <span className="text-xs text-gray-500">Pay securely</span>
              </button>
            ))}
          </div>
        )}

        {state === 'processing' && (
          <div className="mt-6 rounded-lg bg-gray-50 p-5 text-center">
            <Loader2 className="mx-auto animate-spin text-brand" size={28} />
            <h4 className="mt-3 font-semibold text-gray-900">Processing {method}</h4>
            <p className="mt-1 text-sm text-gray-500">Confirming payment and generating receipt.</p>
          </div>
        )}

        {state === 'completed' && (
          <div className="mt-6 rounded-lg bg-emerald-50 p-5 text-center">
            <CheckCircle2 className="mx-auto text-emerald-600" size={32} />
            <h4 className="mt-3 font-semibold text-emerald-900">Payment Completed</h4>
            <p className="mt-1 text-sm text-emerald-700">Your receipt has been added to payment history.</p>
            <button onClick={onClose} className="mt-4 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

