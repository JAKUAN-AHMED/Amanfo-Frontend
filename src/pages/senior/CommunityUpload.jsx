import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, Send } from 'lucide-react';
import { COMMUNITY_CATEGORIES, createCommunityPost } from '../../data/community';
import { useAuth } from '../../context/AuthContext';

const postTypes = ['Photo', 'Video', 'Memory'];

export default function CommunityUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: 'Photo',
    category: 'General',
    caption: '',
    mediaUrl: '',
  });

  const submit = (event) => {
    event.preventDefault();
    createCommunityPost({ ...form, author: user?.name });
    navigate('/senior/community');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Submit Community Post</h2>
        <p className="text-gray-500 mt-1">Posts go to admin moderation before they appear in the feed.</p>
      </div>

      <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-5 md:p-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Post Type</span>
            <select
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {postTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Category</span>
            <select
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {COMMUNITY_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Caption</span>
          <textarea
            required
            value={form.caption}
            onChange={(event) => setForm({ ...form, caption: event.target.value })}
            rows={5}
            placeholder="Share the memory, milestone, or update."
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Media URL</span>
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
