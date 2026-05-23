const PAYMENT_STORAGE_KEY = 'amanfo97_payments';
const FUND_STATUS_STORAGE_KEY = 'amanfo97_contribution_statuses';

export const contributionFunds = [
  {
    id: 'annual-dues',
    name: 'Annual Dues',
    amount: 'GHS 300',
    status: 'Pending',
    dueDate: '2026-06-30',
  },
  {
    id: 'hero-fund',
    name: 'Hero Fund',
    amount: 'GHS 150',
    status: 'Paid',
    dueDate: '2026-05-15',
  },
  {
    id: 'building-fund',
    name: 'Building Fund',
    amount: 'GHS 500',
    status: 'Overdue',
    dueDate: '2026-04-30',
  },
  {
    id: 'lalasulala',
    name: 'Lalasulala',
    amount: 'GHS 100',
    status: 'Pending',
    dueDate: '2026-07-10',
  },
  {
    id: 'ayie-support',
    name: 'Ayie Support',
    amount: 'GHS 200',
    status: 'Pending',
    dueDate: '2026-08-01',
  },
];

const seedPayments = [
  {
    id: 'pay-001',
    senior: 'Kwame Mensah',
    fundId: 'hero-fund',
    fund: 'Hero Fund',
    amount: 'GHS 150',
    method: 'MTN MoMo',
    date: '2026-05-15',
    reference: 'MOMO-48392',
    status: 'Completed',
  },
  {
    id: 'pay-002',
    senior: 'Kofi Asante',
    fundId: 'annual-dues',
    fund: 'Annual Dues',
    amount: 'GHS 300',
    method: 'Paystack',
    date: '2026-05-18',
    reference: 'PSK-21044',
    status: 'Completed',
  },
];

function getFundStatusOverrides() {
  try {
    const raw = localStorage.getItem(FUND_STATUS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveFundStatusOverrides(overrides) {
  localStorage.setItem(FUND_STATUS_STORAGE_KEY, JSON.stringify(overrides));
}

export function getContributionFunds() {
  const overrides = getFundStatusOverrides();
  return contributionFunds.map((fund) => ({ ...fund, status: overrides[fund.id] || fund.status }));
}

export function markContributionPaid(fundId) {
  const overrides = getFundStatusOverrides();
  saveFundStatusOverrides({ ...overrides, [fundId]: 'Paid' });
}

export function getPayments() {
  try {
    const raw = localStorage.getItem(PAYMENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedPayments;
  } catch {
    return seedPayments;
  }
}

export function recordPayment(input) {
  const payments = getPayments();
  const payment = {
    id: `pay-${Date.now()}`,
    senior: input.senior,
    fundId: input.fundId || '',
    fund: input.fund,
    amount: input.amount,
    method: input.method,
    date: input.date,
    reference: input.reference || `REF-${Date.now()}`,
    status: input.status || 'Completed',
  };
  localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify([payment, ...payments]));
  if (input.fundId) markContributionPaid(input.fundId);
  return payment;
}

