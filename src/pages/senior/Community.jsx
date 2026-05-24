import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Heart, MessageCircle, MoreVertical, Pencil, Plus, Reply, Search, Send, Trash2, X } from 'lucide-react';
import {
  POST_TYPES,
  addCommentReply,
  addPostComment,
  countComments,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  getPublishedPosts,
  togglePostLike,
} from '../../data/community';
import { useAuth } from '../../context/AuthContext';

const filters = ['All', ...POST_TYPES];

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(() => getPublishedPosts());
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [commentDrafts, setCommentDrafts] = useState({});

  const currentUser = {
    id: user?.id || user?.email || 'senior-demo',
    name: user?.name || 'Senior Member',
    role: user?.role || 'senior',
  };

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesFilter = filter === 'All' || post.type === filter;
      const text = `${post.caption} ${post.author} ${post.type}`.toLowerCase();
      return matchesFilter && text.includes(query.toLowerCase());
    });
  }, [filter, posts, query]);

  const refreshPosts = () => setPosts(getPublishedPosts());

  const handleLike = (id) => {
    togglePostLike(id, currentUser.id);
    refreshPosts();
  };

  const submitComment = (event, postId) => {
    event.preventDefault();
    const text = (commentDrafts[postId] || '').trim();
    if (!text) return;

    addPostComment(postId, {
      text,
      author: currentUser.name,
      authorId: currentUser.id,
      authorRole: currentUser.role,
    });
    setCommentDrafts((drafts) => ({ ...drafts, [postId]: '' }));
    refreshPosts();
  };

  const submitReply = (postId, commentId, text) => {
    addCommentReply(postId, commentId, {
      text,
      author: currentUser.name,
      authorId: currentUser.id,
      authorRole: currentUser.role,
    });
    refreshPosts();
  };

  const submitEdit = (postId, commentId, text) => {
    editComment(postId, commentId, text);
    refreshPosts();
  };

  const removeComment = (postId, commentId) => {
    deleteComment(postId, commentId);
    refreshPosts();
  };

  const handleEditPost = (postId, caption) => {
    editPost(postId, { caption });
    refreshPosts();
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
    refreshPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand">Community Feed</h2>
          <p className="text-gray-500 mt-1">Approved photos, videos and memories shared by Amanfoɔ '97 Seniors.</p>
        </div>
        <Link
          to="/senior/community/upload"
          className="inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
        >
          <Plus size={16} /> Submit Post
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                filter === item ? 'bg-brand-dark text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search community"
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {visiblePosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            commentDraft={commentDrafts[post.id] || ''}
            onCommentDraftChange={(value) => setCommentDrafts((drafts) => ({ ...drafts, [post.id]: value }))}
            onLike={handleLike}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onSubmitComment={submitComment}
            onReply={submitReply}
            onEditComment={submitEdit}
            onDeleteComment={removeComment}
          />
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No approved posts match this view yet.
        </div>
      )}
    </div>
  );
}

function PostCard({ post, currentUser, commentDraft, onCommentDraftChange, onLike, onEditPost, onDeletePost, onSubmitComment, onReply, onEditComment, onDeleteComment }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(post.caption);
  const ownPost = post.authorId === currentUser.id;
  const liked = (post.likedBy || []).includes(currentUser.id);
  const comments = post.comments || [];

  const saveEdit = (e) => {
    e.preventDefault();
    const text = editCaption.trim();
    if (!text) return;
    onEditPost(post.id, text);
    setEditing(false);
  };

  return (
    <article className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {post.mediaUrl && (
        <img src={post.mediaUrl} alt="" className="h-56 w-full object-cover" />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-gray-900">{post.author}</div>
            <div className="mt-1 text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
              {post.updatedAt && <span className="ml-1 text-gray-400">(edited)</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
              {post.type}
            </span>
            {ownPost && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  aria-label="Post options"
                >
                  <MoreVertical size={16} />
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-8 z-20 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      <button
                        onClick={() => { setEditing(true); setEditCaption(post.caption); setMenuOpen(false); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil size={14} /> Edit Post
                      </button>
                      <button
                        onClick={() => { onDeletePost(post.id); setMenuOpen(false); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} /> Delete Post
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {editing ? (
          <form onSubmit={saveEdit} className="mt-4 space-y-2">
            <textarea
              value={editCaption}
              onChange={(e) => setEditCaption(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-brand">
                <Check size={15} /> Save
              </button>
              <button type="button" onClick={() => setEditing(false)} className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-4 text-sm leading-6 text-gray-700">{post.caption}</p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <button
            onClick={() => onLike(post.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 ${
              liked ? 'border-brand bg-brand/5 text-brand' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {post.likes || 0}
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2">
            <MessageCircle size={16} /> {countComments(comments)} comments
          </span>
        </div>

        <div className="mt-5 space-y-4 border-t border-gray-100 pt-4">
          {comments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              postId={post.id}
              currentUser={currentUser}
              onReply={onReply}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
            />
          ))}
          <form onSubmit={(event) => onSubmitComment(event, post.id)} className="flex flex-col sm:flex-row gap-2">
            <input
              value={commentDraft}
              onChange={(event) => onCommentDraftChange(event.target.value)}
              placeholder="Write a comment"
              className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand">
              <Send size={15} /> Comment
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

function CommentThread({ comment, postId, currentUser, onReply, onEdit, onDelete, depth = 0 }) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(comment.text);
  const ownComment = comment.authorId === currentUser.id;
  const isAdmin = comment.authorRole === 'admin';

  const submitReply = (event) => {
    event.preventDefault();
    const text = replyText.trim();
    if (!text) return;
    onReply(postId, comment.id, text);
    setReplyText('');
    setReplying(false);
  };

  const submitEdit = (event) => {
    event.preventDefault();
    const text = editText.trim();
    if (!text) return;
    onEdit(postId, comment.id, text);
    setEditing(false);
  };

  return (
    <div className={depth > 0 ? 'ml-4 border-l border-gray-200 pl-3 sm:ml-6 sm:pl-4' : ''}>
      <div className="rounded-lg bg-gray-50 px-3 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-900">{comment.author}</span>
            {isAdmin && (
              <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Admin
              </span>
            )}
            {comment.updatedAt && <span className="text-[11px] text-gray-400">edited</span>}
          </div>
          <span className="text-[11px] text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>

        {editing ? (
          <form onSubmit={submitEdit} className="mt-2 flex flex-col sm:flex-row gap-2">
            <input
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-lg bg-brand-dark px-3 py-2 text-white hover:bg-brand" aria-label="Save edit">
                <Check size={15} />
              </button>
              <button type="button" onClick={() => setEditing(false)} className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-gray-600 hover:bg-white" aria-label="Cancel edit">
                <X size={15} />
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-1 text-sm leading-5 text-gray-700">{comment.text}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500">
          <button onClick={() => setReplying((value) => !value)} className="inline-flex items-center gap-1 hover:text-brand">
            <Reply size={13} /> Reply
          </button>
          {ownComment && !editing && (
            <>
              <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1 hover:text-brand">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => onDelete(postId, comment.id)} className="inline-flex items-center gap-1 hover:text-red-600">
                <Trash2 size={13} /> Delete
              </button>
            </>
          )}
        </div>

        {replying && (
          <form onSubmit={submitReply} className="mt-3 flex flex-col sm:flex-row gap-2">
            <input
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              placeholder={`Reply to ${comment.author}`}
              className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-dark px-3 py-2 text-sm font-semibold text-white hover:bg-brand">
              <Send size={14} /> Reply
            </button>
          </form>
        )}
      </div>

      {(comment.replies || []).length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              postId={postId}
              currentUser={currentUser}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
