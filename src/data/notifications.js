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
    id: 'n3',
    type: 'community',
    title: 'Your post was approved',
    message: 'Your community post "Memories from the old assembly hall" has been approved and is now visible in the feed.',
    read: false,
    createdAt: '2026-05-22T10:15:00.000Z',
    link: '/senior/community',
  },
  {
    id: 'n4',
    type: 'survey',
    title: 'New Survey: Senior Engagement',
    message: 'A new survey has been published. Your input helps shape the future of the community.',
    read: true,
    createdAt: '2026-05-21T09:00:00.000Z',
    link: '/senior/surveys',
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
  {
    id: 'n7',
    type: 'community',
    title: 'New comment on your post',
    message: 'Akosua Boateng commented: "These photos bring back great energy. Please share more."',
    read: true,
    createdAt: '2026-05-18T13:45:00.000Z',
    link: '/senior/community',
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
