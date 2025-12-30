import { User, Post } from './types';

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'alice',
    name: 'Alice Johnson',
    avatar_url: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Loves coding and technology.'
  },
  {
    id: '2',
    username: 'bob',
    name: 'Bob Smith',
    avatar_url: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Tech enthusiast and gamer.'
  },
  {
    id: '3',
    username: 'charlie',
    name: 'Charlie Brown',
    avatar_url: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Designer and artist.'
  },
  {
    id: '4',
    username: 'diana',
    name: 'Diana Prince',
    avatar_url: 'https://randomuser.me/api/portraits/women/4.jpg',
    bio: 'Wonder woman and adventurer.'
  },
  {
    id: '5',
    username: 'eve',
    name: 'Eve Adams',
    avatar_url: 'https://randomuser.me/api/portraits/women/5.jpg',
    bio: 'Traveler and photographer.'
  }
];

export const dummyPosts: Post[] = [
  {
    id: '1',
    created_at: '2025-12-29T10:00:00Z',
    content: 'Hey everyone! 🚀 Just started learning React Native and it\'s absolutely mind-blowing! The way components come together is so elegant. Excited to build my first cross-platform app! Who\'s been using RN for a while? Any tips? #ReactNative #MobileDev #Coding',
    user_id: '1',
    user: dummyUsers[0],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '2',
    created_at: '2025-12-29T11:00:00Z',
    content: 'Chess anyone? ♟️ I\'m feeling strategic today. Online or in-person? Let\'s set up a match! Been practicing my openings lately. What\'s your favorite chess variant? #Chess #StrategyGames #WeekendVibes',
    user_id: '2',
    user: dummyUsers[1],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '3',
    created_at: '2025-12-29T12:00:00Z',
    content: 'Working on a fresh UI design for my latest project! 🎨 Loving the minimalist approach with some bold accents. Feedback appreciated! Should I go with more gradients or keep it clean? Swipe for before/after. #UIDesign #UX #DesignCommunity',
    user_id: '3',
    user: dummyUsers[2],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '4',
    created_at: '2025-12-29T13:00:00Z',
    content: 'Back from an incredible trip to the Amazon! 🌿 The biodiversity there is unreal. Saw so many exotic birds and wildlife. Nature truly is the best artist. Grateful for these adventures! #Travel #Nature #AmazonRainforest',
    user_id: '4',
    user: dummyUsers[3],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '5',
    created_at: '2025-12-29T14:00:00Z',
    content: 'Sunset magic today! 🌅 Captured this golden hour shot that just hits different. Photography is my therapy. What\'s your favorite time of day to shoot? #Photography #Sunset #NaturePhotography',
    user_id: '5',
    user: dummyUsers[4],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '6',
    created_at: '2025-12-29T15:00:00Z',
    content: 'Diving deep into TypeScript for my new project! 💻 The type safety is a game-changer. No more runtime surprises! Loving how it scales. TS devs, what\'s your favorite feature? #TypeScript #JavaScript #WebDev',
    user_id: '1',
    user: dummyUsers[0],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '7',
    created_at: '2025-12-29T16:00:00Z',
    content: 'Just finished \'The Master Algorithm\' by Pedro Domingos! 📖 Mind-expanding read on AI and machine learning. The quest for the universal learner is fascinating. Highly recommend to anyone interested in tech\'s future! #AI #MachineLearning #Books',
    user_id: '2',
    user: dummyUsers[1],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '8',
    created_at: '2025-12-29T17:00:00Z',
    content: 'Sketching logo concepts for a client! ✏️ Going for something modern and memorable. Clean lines, bold colors. Which one speaks to you? A, B, or C? #LogoDesign #Branding #GraphicDesign',
    user_id: '3',
    user: dummyUsers[2],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '9',
    created_at: '2025-12-29T18:00:00Z',
    content: 'Planning my next mountain adventure! 🏔️ The Rockies are calling. Hiking boots ready, backpack packed. Anyone have trail recommendations? Safety first, but adventure always! #Hiking #Mountains #OutdoorLife',
    user_id: '4',
    user: dummyUsers[3],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '10',
    created_at: '2025-12-29T19:00:00Z',
    content: 'Editing photos from my recent European trip! 📸 Paris, Rome, Barcelona - each city has its own magic. Loving the street photography vibe. What\'s your go-to editing app? #TravelPhotography #PhotoEditing #Wanderlust',
    user_id: '5',
    user: dummyUsers[4],
    parent_id: null,
    parent: null,
    replies: []
  },
  {
    id: '11',
    created_at: '2025-12-29T11:00:00Z',
    content: 'React Native is amazing! Have you tried Expo? It makes setup so much easier. Plus, the hot reload is a lifesaver! 🚀 #Expo #ReactNative',
    user_id: '2',
    user: dummyUsers[1],
    parent_id: '1',
    parent: null,
    replies: []
  },
  {
    id: '12',
    created_at: '2025-12-29T12:00:00Z',
    content: 'I\'m down! Let\'s do online. What\'s your preferred platform? Chess.com or Lichess? I can play tonight after work. ♟️ #Chess #GameNight',
    user_id: '3',
    user: dummyUsers[2],
    parent_id: '2',
    parent: null,
    replies: []
  },
  {
    id: '13',
    created_at: '2025-12-29T13:00:00Z',
    content: 'Looks fantastic! Maybe add some subtle gradients for depth? The current design is already clean though. Loving the color palette! 🎨 #DesignFeedback #UI',
    user_id: '4',
    user: dummyUsers[3],
    parent_id: '3',
    parent: null,
    replies: []
  },
  {
    id: '14',
    created_at: '2025-12-29T14:00:00Z',
    content: 'That sounds epic! Please share some pics when you can. The Amazon has always been on my bucket list. 🌿 #TravelEnvy #Adventure',
    user_id: '5',
    user: dummyUsers[4],
    parent_id: '4',
    parent: null,
    replies: []
  },
  {
    id: '15',
    created_at: '2025-12-29T15:00:00Z',
    content: 'Stunning shot! The colors are incredible. I used a Canon EOS R5 for my recent shoots. What\'s your setup? 📷 #Photography #GearTalk',
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