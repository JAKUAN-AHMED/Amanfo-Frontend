import { useState } from 'react';
import { CheckCircle2, MessageSquareWarning, XCircle } from 'lucide-react';
import { getPendingPosts, updatePostStatus } from '../../data/community';

export default function Moderation() {
  const [posts, setPosts] = useState(() => getPendingPosts());

  const review = (id, status) => {
    updatePostStatus(id, status);
    setPosts(getPendingPosts());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand">Community Moderation</h2>
        <p className="text-gray-500 mt-1">Review pending senior uploads before they appear in the community feed.</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Pending
                  </span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {post.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {post.type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-700">{post.caption}</p>
                {post.mediaUrl && (
                  <a className="mt-3 inline-block break-all text-sm font-medium text-brand" href={post.mediaUrl}>
                    {post.mediaUrl}
                  </a>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 shrink-0">
                <button
                  onClick={() => review(post.id, 'published')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-dark px-4 py-2.5 text-sm font-medium text-white hover:bg-brand"
                >
                  <CheckCircle2 size={16} /> Approve
                </button>
                <button
                  onClick={() => review(post.id, 'changes_requested')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-200 px-4 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-50"
                >
                  <MessageSquareWarning size={16} /> Request Changes
                </button>
                <button
                  onClick={() => review(post.id, 'rejected')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No community posts are waiting for review.
        </div>
      )}
    </div>
  );
}
