import { User, Post } from './types';

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'alice',
    name: 'Alice Johnson',
    image: 'https://example.com/alice.jpg',
    bio: 'Loves coding and technology.'
  },
  {
    id: '2',
    username: 'bob',
    name: 'Bob Smith',
    image: 'https://example.com/bob.jpg',
    bio: 'Tech enthusiast and gamer.'
  },
  {
    id: '3',
    username: 'charlie',
    name: 'Charlie Brown',
    image: 'https://example.com/charlie.jpg',
    bio: 'Designer and artist.'
  },
  {
    id: '4',
    username: 'diana',
    name: 'Diana Prince',
    image: 'https://example.com/diana.jpg',
    bio: 'Wonder woman and adventurer.'
  },
  {
    id: '5',
    username: 'eve',
    name: 'Eve Adams',
    image: 'https://example.com/eve.jpg',
    bio: 'Traveler and photographer.'
  }
];

export const dummyPosts: Post[] = [
  {
    id: '1',
    createdAt: '2023-01-01T10:00:00Z',
    content: 'Just started learning React Native. Exciting times!',
    user_id: '1',
    user: dummyUsers[0],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '2',
    createdAt: '2023-01-02T11:00:00Z',
    content: 'Anyone up for a game of chess?',
    user_id: '2',
    user: dummyUsers[1],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '3',
    createdAt: '2023-01-03T12:00:00Z',
    content: 'Designing a new UI for my app. Feedback welcome!',
    user_id: '3',
    user: dummyUsers[2],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '4',
    createdAt: '2023-01-04T13:00:00Z',
    content: 'Exploring the Amazon rainforest. Nature is amazing!',
    user_id: '4',
    user: dummyUsers[3],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '5',
    createdAt: '2023-01-05T14:00:00Z',
    content: 'Captured some stunning sunset photos today.',
    user_id: '5',
    user: dummyUsers[4],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '6',
    createdAt: '2023-01-06T15:00:00Z',
    content: 'Working on a new TypeScript project. Loving the type safety!',
    user_id: '1',
    user: dummyUsers[0],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '7',
    createdAt: '2023-01-07T16:00:00Z',
    content: 'Just finished reading a great book on AI.',
    user_id: '2',
    user: dummyUsers[1],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '8',
    createdAt: '2023-01-08T17:00:00Z',
    content: 'Sketching ideas for a new logo design.',
    user_id: '3',
    user: dummyUsers[2],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '9',
    createdAt: '2023-01-09T18:00:00Z',
    content: 'Planning my next adventure to the mountains.',
    user_id: '4',
    user: dummyUsers[3],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '10',
    createdAt: '2023-01-10T19:00:00Z',
    content: 'Editing photos from my recent trip.',
    user_id: '5',
    user: dummyUsers[4],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '11',
    createdAt: '2023-01-01T11:00:00Z',
    content: 'React Native is awesome! Have you tried Expo?',
    user_id: '2',
    user: dummyUsers[1],
    parent_id: '1',
    parent: null,
    replies: []
  },
  {
    id: '12',
    createdAt: '2023-01-02T12:00:00Z',
    content: 'I\'m in! Let\'s play online.',
    user_id: '3',
    user: dummyUsers[2],
    parent_id: '2',
    parent: null,
    replies: []
  },
  {
    id: '13',
    createdAt: '2023-01-03T13:00:00Z',
    content: 'Looks great! Maybe add some gradients?',
    user_id: '4',
    user: dummyUsers[3],
    parent_id: '3',
    parent: null,
    replies: []
  },
  {
    id: '14',
    createdAt: '2023-01-04T14:00:00Z',
    content: 'Sounds incredible! Share some pics?',
    user_id: '5',
    user: dummyUsers[4],
    parent_id: '4',
    parent: null,
    replies: []
  },
  {
    id: '15',
    createdAt: '2023-01-05T15:00:00Z',
    content: 'Beautiful! What camera did you use?',
    user_id: '1',
    user: dummyUsers[0],
    parent_id: '5',
    parent: null,
    replies: []
  }
];

// Now set parents and replies
dummyPosts.forEach(post => {
  if (post.parent_id) {
    const parentPost = dummyPosts.find(p => p.id === post.parent_id);
    if (parentPost) {
      post.parent = parentPost;
      parentPost.replies.push(post);
    }
  }
});