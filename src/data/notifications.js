const STORAGE_KEY = 'amanfo97_notifications';

const seedNotifications = [
  {
    id: 'n1',
    type: 'announcement',
    title: 'New Announcement: 30th Anniversary Homecoming',
    message: 'The Executive Committee has posted details about the Class of 97 Homecoming celebration.',
    read: false,
    createdAt: '2026-05-24T08:00:00.000Z',
    link: '/senior/announcements/1',
  },
  {
    id: 'n2',
    type: 'contribution',
    title: 'Annual Dues Reminder',
    message: 'Your 2027 Annual Dues (GHS 200) are due by July 31. Please settle to keep your membership active.',
    read: false,
    createdAt: '2026-05-23T14:30:00.000Z',
    link: '/senior/contributions',
  },
  {
    id: 'n5',
    type: 'announcement',
    title: 'Ayie: Senior Kofi Asante (Mother)',
    message: 'Funeral arrangements for the late Mrs. Akua Asante have been shared. Please show your support.',
    read: true,
    createdAt: '2026-05-20T16:00:00.000Z',
    link: '/senior/announcements/4',
  },
  {
    id: 'n6',
    type: 'contribution',
    title: 'Lalasulala Contribution Drive Open',
    message: 'The Q2 Lalasulala welfare fund drive is now open. Contribute toward supporting current students.',
    read: true,
    createdAt: '2026-05-19T11:00:00.000Z',
    link: '/senior/contributions',
  },
];

function readNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedNotifications;
  } catch {
    return seedNotifications;
  }
}

function writeNotifications(notifications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch {
    // ignore
  }
}

export function getNotifications() {
  return readNotifications().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getUnreadCount() {
  return readNotifications().filter((n) => !n.read).length;
}

export function markAsRead(id) {
  const notifications = readNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
  writeNotifications(notifications);
  return notifications;
}

export function markAllAsRead() {
  const notifications = readNotifications().map((n) => ({ ...n, read: true }));
  writeNotifications(notifications);
  return notifications;
}
