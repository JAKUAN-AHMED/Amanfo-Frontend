import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, Send, Info } from 'lucide-react';
import { POST_TYPES, createCommunityPost } from '../../data/community';
import { useAuth } from '../../context/AuthContext';

export default function CommunityUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: 'Photo',
    caption: '',
    mediaUrl: '',
  });

  const submit = (event) => {
    event.preventDefault();
    createCommunityPost({ ...form, author: user?.name, authorId: user?.id });
    navigate('/senior/community');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Submit Community Post</h2>
        <p className="text-gray-500 mt-1">Photos, videos and memories go to the Executive for approval before appearing in the feed.</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900">
          Posts are reviewed before they go live. You'll see them appear in the community feed once approved.
        </p>
      </div>

      <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-5 md:p-6 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">Post Type</span>
          <select
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value })}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {POST_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Caption</span>
          <textarea
            required
            value={form.caption}
            onChange={(event) => setForm({ ...form, caption: event.target.value })}
            rows={5}
            placeholder="Share the memory or update."
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Media URL <span className="text-gray-400 font-normal">(optional)</span></span>
          <div className="relative mt-2">
            <ImagePlus size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={form.mediaUrl}
              onChange={(event) => setForm({ ...form, mediaUrl: event.target.value })}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </label>

        <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand">
          <Send size={16} /> Submit for Review
        </button>
      </form>
    </div>
  );
}
