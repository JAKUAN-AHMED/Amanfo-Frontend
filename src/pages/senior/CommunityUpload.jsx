import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, Film, Send, Info, X } from 'lucide-react';
import { POST_TYPES, createCommunityPost } from '../../data/community';
import { useAuth } from '../../context/AuthContext';

export default function CommunityUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    type: 'Photo',
    caption: '',
    file: null,
    preview: '',
  });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, file, preview }));
  };

  const clearFile = () => {
    if (form.preview) URL.revokeObjectURL(form.preview);
    setForm((f) => ({ ...f, file: null, preview: '' }));
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = (event) => {
    event.preventDefault();
    createCommunityPost({
      ...form,
      mediaUrl: form.preview,
      author: user?.name,
      authorId: user?.id,
    });
    navigate('/senior/community');
  };

  const isVideo = form.type === 'Video';
  const acceptTypes = isVideo ? 'video/mp4,video/webm,video/quicktime' : 'image/*';

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
            onChange={(event) => {
              setForm({ ...form, type: event.target.value, file: null, preview: '' });
              if (fileRef.current) fileRef.current.value = '';
            }}
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

        {form.type !== 'Memory' && (
          <div>
            <span className="text-sm font-medium text-gray-800 block mb-2">
              {isVideo ? 'Upload Video' : 'Upload Image'} <span className="text-gray-400 font-normal">(optional)</span>
            </span>

            {!form.preview ? (
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (!file) return;
                  const preview = URL.createObjectURL(file);
                  setForm((f) => ({ ...f, file, preview }));
                }}
                className="border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50 hover:border-brand cursor-pointer text-center transition"
              >
                {isVideo ? (
                  <Film size={32} className="mx-auto text-gray-400" />
                ) : (
                  <ImagePlus size={32} className="mx-auto text-gray-400" />
                )}
                <div className="text-sm text-gray-700 mt-3 font-medium">
                  Click to upload or drag & drop
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {isVideo ? 'MP4, WebM, MOV — up to 50 MB' : 'PNG, JPG, GIF — up to 5 MB'}
                </div>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                {isVideo ? (
                  <video src={form.preview} controls className="w-full max-h-64 object-contain bg-black" />
                ) : (
                  <img src={form.preview} alt="Preview" className="w-full max-h-64 object-contain bg-gray-50" />
                )}
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept={acceptTypes}
              onChange={handleFile}
              className="hidden"
            />
          </div>
        )}

        <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand">
          <Send size={16} /> Submit for Review
        </button>
      </form>
    </div>
  );
}
