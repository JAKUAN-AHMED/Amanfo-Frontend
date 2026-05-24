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
