import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, Lock } from 'lucide-react';
import { findSurvey, saveResponse, loadResponses, hasResponded } from '../../data/surveys';

export default function SurveyParticipate() {
  const { id } = useParams();
  const nav = useNavigate();
  const survey = findSurvey(id);
  const existing = loadResponses()[id];
  const [answers, setAnswers] = useState(existing?.answers || {});
  const [submitted, setSubmitted] = useState(hasResponded(id));

  if (!survey) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Survey not found.</p>
        <Link to="/senior/surveys" className="text-brand font-medium mt-3 inline-block">
          ← Back to surveys
        </Link>
      </div>
    );
  }

  const setAnswer = (qid, value) => setAnswers((a) => ({ ...a, [qid]: value }));

  const toggleMulti = (qid, opt) => {
    const list = Array.isArray(answers[qid]) ? answers[qid] : [];
    setAnswer(qid, list.includes(opt) ? list.filter((x) => x !== opt) : [...list, opt]);
  };

  const submit = (e) => {
    e.preventDefault();
    saveResponse(id, answers);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl space-y-6">
        <button onClick={() => nav(-1)} className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Thank you for your response!</h2>
          <p className="text-gray-500 mt-2">
            Your input helps shape the future of the Amanfo '97 community.
          </p>
          <Link
            to="/senior/surveys"
            className="mt-6 inline-block bg-brand-dark hover:bg-brand text-white font-semibold px-6 py-2.5 rounded-lg"
          >
            Back to Surveys
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Response</h3>
          {survey.questions.map((q, i) => {
            const a = answers[q.id];
            return (
              <div key={q.id} className="py-3 border-b border-gray-100 last:border-0">
                <div className="text-xs text-gray-500">Question {i + 1}</div>
                <div className="text-sm font-medium text-gray-900">{q.text}</div>
                <div className="text-sm text-gray-700 mt-1">
                  {Array.isArray(a) ? a.join(', ') : a || <span className="text-gray-400">No answer</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <button onClick={() => nav(-1)} className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-7">
        <h2 className="text-2xl font-bold text-gray-900">{survey.title}</h2>
        <p className="text-gray-500 mt-1">{survey.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500 flex-wrap">
          <span>Closes {survey.endDate}</span>
          <span>·</span>
          <span>{survey.questions.length} questions</span>
          {survey.anonymous && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              <Lock size={11} /> Anonymous
            </span>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="space-y-5">
        {survey.questions.map((q, i) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="text-xs text-gray-500">Question {i + 1} of {survey.questions.length}</div>
            <h3 className="font-semibold text-gray-900 mt-1">{q.text}</h3>

            {q.type === 'Single Choice' && (
              <div className="mt-4 space-y-2">
                {q.options.map((o) => (
                  <label
                    key={o}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                      answers[q.id] === o ? 'border-brand bg-brand/5' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === o}
                      onChange={() => setAnswer(q.id, o)}
                      className="accent-brand"
                    />
                    <span className="text-sm text-gray-800">{o}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'Multiple Choice' && (
              <div className="mt-4 space-y-2">
                {q.options.map((o) => {
                  const picked = Array.isArray(answers[q.id]) && answers[q.id].includes(o);
                  return (
                    <label
                      key={o}
                      className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                        picked ? 'border-brand bg-brand/5' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={picked}
                        onChange={() => toggleMulti(q.id, o)}
                        className="w-4 h-4 accent-brand"
                      />
                      <span className="text-sm text-gray-800">{o}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {q.type === 'Rating' && (
              <div className="mt-4 flex gap-2 flex-wrap">
                {q.options.map((o) => (
                  <button
                    type="button"
                    key={o}
                    onClick={() => setAnswer(q.id, o)}
                    className={`px-4 py-2 rounded-lg text-sm border transition ${
                      answers[q.id] === o
                        ? 'bg-brand-dark text-white border-brand-dark'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'Text Response' && (
              <textarea
                rows={3}
                value={answers[q.id] || ''}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                placeholder="Share your thoughts..."
                className="mt-4 w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Send size={18} /> Submit Response
        </button>
      </form>
    </div>
  );
}
