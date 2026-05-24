const STORAGE_KEY = 'amanfo97_survey_responses';

export const surveys = [
  {
    id: '1',
    title: 'Active Status Survey',
    description: `Help us understand current engagement levels in the Amanfo '97 community.`,
    type: 'Single Choice',
    startDate: '2027-06-01',
    endDate: '2027-12-31',
    anonymous: true,
    questions: [
      {
        id: 'q1',
        text: `How would you describe your current involvement with Amanfo '97?`,
        type: 'Single Choice',
        options: ['Very Active', 'Active', 'Occasionally Active', 'Inactive'],
      },
      {
        id: 'q2',
        text: 'Which activities are you most interested in?',
        type: 'Multiple Choice',
        options: ['Annual Homecoming', 'Welfare / Lalasulala', 'Legacy Projects', 'Mentorship', 'Sports / Social'],
      },
      {
        id: 'q3',
        text: 'Any suggestions for the Executive?',
        type: 'Text Response',
      },
    ],
    results: { Active: 60, Inactive: 40 },
  },
  {
    id: '2',
    title: '30th Anniversary Homecoming Attendance',
    description: 'Please indicate whether you plan to attend the 30th Anniversary Homecoming on campus.',
    type: 'Single Choice',
    startDate: '2027-04-01',
    endDate: '2027-06-15',
    anonymous: false,
    questions: [
      {
        id: 'q1',
        text: 'Will you be attending the 30th Anniversary Homecoming?',
        type: 'Single Choice',
        options: ['Yes — all three days', 'Yes — partial attendance', 'Unsure', 'No, I cannot attend'],
      },
      {
        id: 'q2',
        text: 'How many guests will accompany you?',
        type: 'Rating',
        options: ['0', '1', '2', '3', '4+'],
      },
    ],
    results: { Yes: 72, No: 28 },
  },
];

export function findSurvey(id) {
  return surveys.find((s) => s.id === id);
}

export function loadResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    return {};
  }
  return {};
}

export function saveResponse(surveyId, answers) {
  const all = loadResponses();
  all[surveyId] = { answers, submittedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    return false;
  }
  return true;
}

export function hasResponded(surveyId) {
  return !!loadResponses()[surveyId];
}
