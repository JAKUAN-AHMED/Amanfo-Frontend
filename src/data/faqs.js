const STORAGE_KEY = 'amanfo97_faqs';

const defaultFaqs = [
  { id: '1', question: 'Who can Join ?', answer: 'Verified Seniors of the Class of 1997 at Prempeh College.', published: true, order: 1 },
  { id: '2', question: 'Is this Platform Public ?', answer: 'No. The directory is private and only visible to verified Amanfoɔ ’97 Seniors.', published: true, order: 2 },
  { id: '3', question: 'How long does approval take?', answer: 'Typically 1–3 business days after submitting your request.', published: true, order: 3 },
  { id: '4', question: 'Can I Control my data?', answer: 'Yes. You can change your privacy settings any time from your profile.', published: true, order: 4 },
  { id: '5', question: 'How do I get help?', answer: 'Email support@amanfo97.org. We reply within 24 hours.', published: true, order: 5 },
];

export function loadFaqs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultFaqs;
}

export function saveFaqs(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('faqs-updated'));
  } catch {}
}
