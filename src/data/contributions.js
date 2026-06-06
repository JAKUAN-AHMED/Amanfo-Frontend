const STATUS_STORAGE_KEY = 'amanfo97_contribution_statuses';

export const VALID_STATUSES = ['Paid', 'Pending', 'Overdue'];

export const contributionFunds = [
  {
    id: 'annual-dues',
    name: 'Annual Dues',
    amount: 'GHS 300',
    status: 'Pending',
    dueDate: '2026-06-30',
    description: 'Yearly Seniors association dues.',
  },
  {
    id: 'hero-fund',
    name: 'Hero Fund',
    amount: 'GHS 150',
    status: 'Paid',
    dueDate: '2026-05-15',
    description: 'Honouring distinguished Seniors.',
  },
  {
    id: 'building-fund',
    name: 'Building Fund',
    amount: 'GHS 500',
    status: 'Overdue',
    dueDate: '2026-04-30',
    description: 'Capital projects on campus.',
  },
  {
    id: 'lalasulala',
    name: 'Lalasulala',
    amount: 'GHS 100',
    status: 'Pending',
    dueDate: '2026-07-10',
    description: 'Welfare contribution drive.',
  },
  {
    id: 'ayie-support',
    name: 'Ayie Support',
    amount: 'GHS 200',
    status: 'Pending',
    dueDate: '2026-08-01',
    description: 'Bereavement support for Seniors and families.',
  },
];

function getOverrides() {
  try {
    const raw = localStorage.getItem(STATUS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides) {
  try {
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Ignore storage errors in this prototype
  }
}

export function getContributionFunds() {
  const overrides = getOverrides();
  return contributionFunds.map((fund) => ({
    ...fund,
    status: overrides[fund.id] || fund.status,
  }));
}

export function setFundStatus(fundId, status) {
  if (!VALID_STATUSES.includes(status)) return;
  const overrides = getOverrides();
  saveOverrides({ ...overrides, [fundId]: status });
}

/* ------------------------------------------------------------------ */
/*  Payment records & receipts                                         */
/* ------------------------------------------------------------------ */

const PAYMENTS_STORAGE_KEY = 'amanfo97_payments_v2';

// Contribution categories a payment can be recorded against.
export const CONTRIBUTION_TYPES = contributionFunds.map((f) => f.name);

const seedPayments = [
  { id: 'PMT-1008', seniorId: 'AMFO97001', seniorName: 'Aboagye Kwarteng', type: 'Hero Fund', amount: 'GHS 150', date: '2026-05-12', reference: 'MOMO-7741920', notes: 'Mobile Money transfer.' },
  { id: 'PMT-1007', seniorId: 'AMFO97001', seniorName: 'Aboagye Kwarteng', type: 'Building Fund', amount: 'GHS 500', date: '2026-03-04', reference: 'BANK-2210564', notes: 'Capital project pledge.' },
  { id: 'PMT-1006', seniorId: 'AMFO97001', seniorName: 'Aboagye Kwarteng', type: 'Annual Dues', amount: 'GHS 300', date: '2026-01-18', reference: 'MOMO-7418833', notes: '2026 dues settled in full.' },
  { id: 'PMT-1005', seniorId: 'AMFO97002', seniorName: 'Yaw Okyere', type: 'Annual Dues', amount: 'GHS 300', date: '2026-02-02', reference: 'BANK-5530021', notes: 'Bank transfer from Virginia.' },
  { id: 'PMT-1004', seniorId: 'AMFO97002', seniorName: 'Yaw Okyere', type: 'Hero Fund', amount: 'GHS 150', date: '2026-04-21', reference: 'MOMO-9920184', notes: '' },
  { id: 'PMT-1003', seniorId: 'AMFO97003', seniorName: 'Solomon Owusu', type: 'Lalasulala', amount: 'GHS 100', date: '2026-04-30', reference: 'MOMO-3310027', notes: 'Q2 welfare drive.' },
  { id: 'PMT-1002', seniorId: 'AMFO97004', seniorName: 'Kofi Karikari', type: 'Annual Dues', amount: 'GHS 300', date: '2026-02-15', reference: 'BANK-4480915', notes: 'Paid from Manchester.' },
  { id: 'PMT-1001', seniorId: 'AMFO97005', seniorName: 'Akwasi Afrifa Acheampong', type: 'Building Fund', amount: 'GHS 500', date: '2026-03-09', reference: 'MOMO-1180233', notes: '' },
];

function readPayments() {
  try {
    const raw = localStorage.getItem(PAYMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedPayments;
  } catch {
    return seedPayments;
  }
}

function writePayments(payments) {
  try {
    localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(payments));
  } catch {
    // Ignore storage errors in this prototype
  }
}

export function getPayments() {
  return readPayments()
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPaymentsForSenior(seniorId) {
  return getPayments().filter((p) => p.seniorId === seniorId);
}

export function addPayment({ seniorId, seniorName, type, amount, date, reference, notes }) {
  const payments = readPayments();
  const seq = payments.length + 1001;
  const payment = {
    id: `PMT-${seq}`,
    seniorId: seniorId?.trim() || '',
    seniorName: seniorName?.trim() || '',
    type,
    amount: amount?.trim() || '',
    date: date || new Date().toISOString().slice(0, 10),
    reference: reference?.trim() || `REF-${Date.now().toString().slice(-7)}`,
    notes: notes?.trim() || '',
  };
  writePayments([payment, ...payments]);
  return payment;
}

/* ------------------------------------------------------------------ */
/*  Payment totals                                                     */
/* ------------------------------------------------------------------ */

const CURRENCY = 'GHS';

// Extracts the numeric value from an amount string like "GHS 300".
export function parseAmount(amount) {
  const n = parseFloat(String(amount).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function formatAmount(n) {
  return `${CURRENCY} ${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

// Total a single senior has paid, as a number.
export function getSeniorPaymentTotal(seniorId) {
  return getPaymentsForSenior(seniorId).reduce((sum, p) => sum + parseAmount(p.amount), 0);
}

// One row per senior: { seniorId, seniorName, count, total } sorted by total desc.
export function getPaymentTotalsBySenior() {
  const map = new Map();
  for (const p of getPayments()) {
    const key = p.seniorId || '—';
    const row = map.get(key) || { seniorId: p.seniorId, seniorName: p.seniorName, count: 0, total: 0 };
    row.count += 1;
    row.total += parseAmount(p.amount);
    if (!row.seniorName && p.seniorName) row.seniorName = p.seniorName;
    map.set(key, row);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}

// Grand total across all recorded payments, as a number.
export function getPaymentsGrandTotal() {
  return getPayments().reduce((sum, p) => sum + parseAmount(p.amount), 0);
}
