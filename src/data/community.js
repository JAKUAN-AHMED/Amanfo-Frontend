const STORAGE_KEY = 'amanfo97_community_posts';

export const COMMUNITY_CATEGORIES = [
  'Homecoming',
  'Throwback',
  'Milestone',
  'Memorial',
  'General',
];

function createComment({ id, author, authorId, authorRole = 'senior', text, createdAt, replies = [] }) {
  return {
    id,
    author,
    authorId,
    authorRole,
    text,
    createdAt,
    updatedAt: null,
    replies,
  };
}

const seedPosts = [
  {
    id: 'post-001',
    author: 'Kwame Mensah',
    authorId: 'AM97001',
    type: 'Photo',
    category: 'Homecoming',
    caption: 'Homecoming planning memories from the old assembly hall.',
    mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    status: 'published',
    likedBy: ['AM97021', 'AM97033'],
    comments: [
      createComment({
        id: 'comment-001',
        author: 'Akosua Boateng',
        authorId: 'AM97021',
        text: 'These photos bring back the planning energy. Please share more from that day.',
        createdAt: '2026-05-13T09:00:00.000Z',
        replies: [
          createComment({
            id: 'reply-001',
            author: 'Admin User',
            authorId: 'ADMIN001',
            authorRole: 'admin',
            text: 'We will keep approved homecoming photos grouped here for everyone.',
            createdAt: '2026-05-13T12:00:00.000Z',
          }),
        ],
      }),
      createComment({
        id: 'comment-002',
        author: 'Yaw Owusu',
        authorId: 'AM97033',
        text: 'Good memories. The homecoming gallery should keep growing.',
        createdAt: '2026-05-14T11:30:00.000Z',
      }),
    ],
    createdAt: '2026-05-12',
  },
  {
    id: 'post-002',
    author: 'Kofi Asante',
    authorId: 'AM97002',
    type: 'Memory',
    category: 'Throwback',
    caption: 'A short note on our 1997 inter-house sports week.',
    mediaUrl: '',
    status: 'published',
    likedBy: ['AM97001'],
    comments: [
      createComment({
        id: 'comment-003',
        author: 'Kwame Mensah',
        authorId: 'AM97001',
        text: 'Inter-house sports week was one of the best memories from our year.',
        createdAt: '2026-05-09T08:15:00.000Z',
      }),
    ],
    createdAt: '2026-05-08',
  },
  {
    id: 'post-003',
    author: 'Admin User',
    authorId: 'ADMIN001',
    type: 'Memory',
    category: 'Memorial',
    caption: 'Remembering departed Seniors and their service to the community.',
    mediaUrl: '',
    status: 'published',
    likedBy: ['AM97001', 'AM97002', 'AM97033'],
    comments: [
      createComment({
        id: 'comment-004',
        author: 'Kwame Mensah',
        authorId: 'AM97001',
        text: 'May their legacy continue to guide the Amanfo family.',
        createdAt: '2026-04-29T10:20:00.000Z',
      }),
    ],
    createdAt: '2026-04-28',
  },
  {
    id: 'post-004',
    author: 'Yaw Boateng',
    authorId: 'AM97033',
    type: 'Photo',
    category: 'Milestone',
    caption: 'Congratulations to Senior Yaw on his new appointment.',
    mediaUrl: '',
    status: 'pending',
    likedBy: [],
    comments: [],
    createdAt: '2026-05-20',
  },
];

function normalizeComment(comment) {
  return {
    ...comment,
    authorRole: comment.authorRole || (String(comment.authorId || '').toLowerCase().includes('admin') ? 'admin' : 'senior'),
    updatedAt: comment.updatedAt || null,
    replies: (comment.replies || []).map(normalizeComment),
  };
}

function normalizePost(post) {
  const likedBy = post.likedBy || [];
  return {
    ...post,
    likedBy,
    likes: likedBy.length || post.likes || 0,
    comments: (post.comments || []).map(normalizeComment),
  };
}

function readPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).map(normalizePost) : seedPosts.map(normalizePost);
  } catch {
    return seedPosts.map(normalizePost);
  }
}

function writePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.map(normalizePost)));
}

function updateComments(comments, targetId, updater) {
  return comments.map((comment) => {
    if (comment.id === targetId) return updater(comment);
    return { ...comment, replies: updateComments(comment.replies || [], targetId, updater) };
  });
}

function removeComment(comments, targetId) {
  return comments
    .filter((comment) => comment.id !== targetId)
    .map((comment) => ({ ...comment, replies: removeComment(comment.replies || [], targetId) }));
}

export function countComments(comments = []) {
  return comments.reduce((total, comment) => total + 1 + countComments(comment.replies || []), 0);
}

export function getCommunityPosts() {
  return readPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getPublishedPosts() {
  return getCommunityPosts().filter((post) => post.status === 'published');
}

export function getPendingPosts() {
  return getCommunityPosts().filter((post) => post.status === 'pending');
}

export function createCommunityPost(input) {
  const posts = readPosts();
  const post = {
    id: `post-${Date.now()}`,
    author: input.author || 'Senior Member',
    authorId: input.authorId || 'senior',
    type: input.type,
    category: input.category,
    caption: input.caption,
    mediaUrl: input.mediaUrl || '',
    status: 'pending',
    likedBy: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };
  writePosts([post, ...posts]);
  return post;
}

export function updatePostStatus(id, status) {
  const posts = readPosts().map((post) =>
    post.id === id ? { ...post, status, reviewedAt: new Date().toISOString() } : post,
  );
  writePosts(posts);
  return posts;
}

export function togglePostLike(id, userId) {
  let didLike = false;
  const posts = readPosts().map((post) => {
    if (post.id !== id) return post;

    const likedBy = post.likedBy || [];
    const alreadyLiked = likedBy.includes(userId);
    didLike = !alreadyLiked;
    const nextLikedBy = alreadyLiked
      ? likedBy.filter((likedUserId) => likedUserId !== userId)
      : [...likedBy, userId];

    return { ...post, likedBy: nextLikedBy, likes: nextLikedBy.length };
  });
  writePosts(posts);
  return { posts, didLike };
}

export function addPostComment(id, input) {
  const comment = createComment({
    id: `comment-${Date.now()}`,
    author: input.author || 'Senior Member',
    authorId: input.authorId || 'senior',
    authorRole: input.authorRole || 'senior',
    text: input.text,
    createdAt: new Date().toISOString(),
  });

  const posts = readPosts().map((post) =>
    post.id === id ? { ...post, comments: [...(post.comments || []), comment] } : post,
  );
  writePosts(posts);
  return comment;
}

export function addCommentReply(postId, parentCommentId, input) {
  const reply = createComment({
    id: `reply-${Date.now()}`,
    author: input.author || 'Senior Member',
    authorId: input.authorId || 'senior',
    authorRole: input.authorRole || 'senior',
    text: input.text,
    createdAt: new Date().toISOString(),
  });

  const posts = readPosts().map((post) => {
    if (post.id !== postId) return post;
    return {
      ...post,
      comments: updateComments(post.comments || [], parentCommentId, (comment) => ({
        ...comment,
        replies: [...(comment.replies || []), reply],
      })),
    };
  });
  writePosts(posts);
  return reply;
}

export function editComment(postId, commentId, text) {
  const posts = readPosts().map((post) => {
    if (post.id !== postId) return post;
    return {
      ...post,
      comments: updateComments(post.comments || [], commentId, (comment) => ({
        ...comment,
        text,
        updatedAt: new Date().toISOString(),
      })),
    };
  });
  writePosts(posts);
  return posts;
}

export function deleteComment(postId, commentId) {
  const posts = readPosts().map((post) => {
    if (post.id !== postId) return post;
    return { ...post, comments: removeComment(post.comments || [], commentId) };
  });
  writePosts(posts);
  return posts;
}

export const birthdaysThisWeek = [
  { name: 'Kwame Mensah', date: 'May 24' },
  { name: 'Akosua Boateng', date: 'May 26' },
  { name: 'Yaw Owusu', date: 'May 28' },
];
