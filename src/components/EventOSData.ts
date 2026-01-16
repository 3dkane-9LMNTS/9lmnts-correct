import { 
  Zap, 
  Users, 
  Music, 
  Crown, 
  Clock, 
  Beer, 
  Star, 
  MessageSquare, 
  TrendingUp,
  Heart,
  Briefcase,
  Gift,
  Mic,
  Coffee
} from 'lucide-react';

// Theme & Data Definitions

export interface EventOSTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string; // Tailwind class for gradient or color
  cardBg: string;
}

export interface EventOSData {
  id: string;
  name: string;
  theme: EventOSTheme;
  labels: {
    appName: string;
    appSubtitle: string;
    battleTitle: string;
    battleSubtitle: string;
    contestantRole: string;
    storeTitle: string;
    vipTitle: string;
    requestTitle: string;
    liveBadge: string;
    ticker: string[];
  };
  contestants: any[];
  vipUsers: any[];
  liveStats: any[];
  storeItems: any[];
  requests: any[];
}

export const SOUND_CLASH_DATA: EventOSData = {
  id: 'nightlife',
  name: 'Sound Clash',
  theme: {
    primary: '#d946ef', // Neon Pink
    secondary: '#06b6d4', // Cyber Cyan
    accent: '#ef4444', // Fire Red
    background: 'bg-[#050505]', // Simplification for demo
    cardBg: 'bg-[#111]',
  },
  labels: {
    appName: 'SOUND CLASH',
    appSubtitle: 'OS',
    battleTitle: 'PITCH BATTLE',
    battleSubtitle: 'Grand Finals',
    contestantRole: 'Genre',
    storeTitle: 'Club Store',
    vipTitle: 'VIP Lounge',
    requestTitle: 'Request Line',
    liveBadge: 'LIVE',
    ticker: [
      '🔥 DJ K-OS JUST DROPPED A NEW TRACK',
      '👑 SARAH J. JOINED THE VIP LOUNGE',
      '⚡ POWER HYPE ACTIVATED BY TABLE 4',
      '🎵 NEXT BATTLE: ROUND 2 STARTS IN 5 MINS',
    ]
  },
  contestants: [
    {
      id: 'k-os',
      name: 'DJ K-OS',
      role: 'Techno / Acid',
      color: '#d946ef',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80',
      initialVotes: 48,
    },
    {
      id: 'vibe',
      name: 'DJ VIBE',
      role: 'House / Bass',
      color: '#06b6d4',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
      initialVotes: 52,
    },
  ],
  liveStats: [
    { label: 'Live Audience', value: '1,247', icon: Users, color: '#d946ef' },
    { label: 'Hype Level', value: '9,420', icon: Zap, color: '#06b6d4' },
    { label: 'Set Time', value: '12:45', icon: Clock, color: '#ef4444' },
  ],
  storeItems: [
    { 
      id: 'power-hype', 
      name: 'Power Hype Pack', 
      price: 10, 
      icon: Zap, 
      desc: 'Boost your vote x50',
      color: '#d946ef',
      popular: true
    },
    { 
      id: 'vip-access', 
      name: 'VIP Access Pass', 
      price: 150, 
      icon: Crown, 
      desc: 'Enter the VIP Lounge',
      color: '#ef4444',
      popular: false
    },
    { 
      id: 'round', 
      name: 'Buy a Round', 
      price: 50, 
      icon: Beer, 
      desc: 'Send drinks to VIPs',
      color: '#06b6d4',
      popular: false
    },
  ],
  requests: [
    { id: 1, song: 'One More Time', artist: 'Daft Punk', votes: 142, user: 'Anon' },
    { id: 2, song: 'Never Be Like You', artist: 'Flume', votes: 89, user: 'Mike' },
    { id: 3, song: 'Summer', artist: 'Calvin Harris', votes: 67, user: 'VIP Table 3' },
  ],
  vipUsers: [
    { id: 1, name: 'Sarah J.', role: 'Influencer', status: 'Online', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 2, name: 'David C.', role: 'Producer', status: 'In Lounge', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 3, name: 'Elena R.', role: 'Artist', status: 'Ordering', img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100' },
    { id: 4, name: 'Marcus', role: 'Promoter', status: 'Online', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
  ],
};

export const CORPORATE_CLASH_DATA: EventOSData = {
  id: 'corporate',
  name: 'Corporate Clash',
  theme: {
    primary: '#3b82f6', // Electric Blue
    secondary: '#06d6a0', // Emerald Green
    accent: '#ef4444', // Alert Red
    background: 'bg-[#0a0f1f]', 
    cardBg: 'bg-[#1a2236]',
  },
  labels: {
    appName: 'CORPORATE CLASH',
    appSubtitle: 'OS',
    battleTitle: 'PITCH COMPETITION',
    battleSubtitle: 'Seed Round',
    contestantRole: 'Vertical',
    storeTitle: 'Investor Rack',
    vipTitle: 'Investors Online',
    requestTitle: 'Live Q&A',
    liveBadge: 'PITCHING',
    ticker: [
      '📈 ALPHA AI SECURES $500K COMMITMENT',
      '💼 ROBERT K. REQUESTED PITCH DECK',
      '🚀 BETA BIO IS TRENDING ON TWITTER',
      '📅 NEXT PITCH: GAMMA TECH AT 2:00 PM',
    ]
  },
  contestants: [
    {
      id: 'alpha',
      name: 'Alpha AI',
      role: 'Artificial Intelligence',
      color: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80',
      initialVotes: 65,
    },
    {
      id: 'beta',
      name: 'Beta Bio',
      role: 'Biotech',
      color: '#06d6a0',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
      initialVotes: 35,
    },
  ],
  liveStats: [
    { label: 'Investors', value: '342', icon: Briefcase, color: '#3b82f6' },
    { label: 'Capital Committed', value: '$1.2M', icon: TrendingUp, color: '#06d6a0' },
    { label: 'Pitch Time', value: '04:12', icon: Clock, color: '#ef4444' },
  ],
  storeItems: [
    { 
      id: 'invest-pack', 
      name: 'Angel Vote Pack', 
      price: 500, 
      icon: TrendingUp, 
      desc: 'Signal strong interest',
      color: '#06d6a0',
      popular: true
    },
    { 
      id: 'vip-meet', 
      name: 'Founder Meeting', 
      price: 1000, 
      icon: Users, 
      desc: 'Book 1:1 post-event',
      color: '#3b82f6',
      popular: false
    },
    { 
      id: 'deck', 
      name: 'Download Deck', 
      price: 50, 
      icon: Briefcase, 
      desc: 'Get full financials',
      color: '#ef4444',
      popular: false
    },
  ],
  requests: [
    { id: 1, song: 'What is your CAC?', artist: 'SaaS Metrics', votes: 42, user: 'VC Fund A' },
    { id: 2, song: 'IP Ownership?', artist: 'Legal', votes: 28, user: 'Angel Group' },
    { id: 3, song: 'Roadmap for Q4', artist: 'Product', votes: 15, user: 'TechCrunch' },
  ],
  vipUsers: [
    { id: 1, name: 'James H.', role: 'Angel Investor', status: 'Looking', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100' },
    { id: 2, name: 'Amanda L.', role: 'VP Marketing', status: 'Online', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' },
    { id: 3, name: 'Robert K.', role: 'Tech Crunch', status: 'Reporting', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 4, name: 'Lisa M.', role: 'Founder @ Zen', status: 'Networking', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100' },
  ],
};

export const RECEPTION_OS_DATA: EventOSData = {
  id: 'wedding',
  name: 'Reception OS',
  theme: {
    primary: '#D4AF37', // Gold
    secondary: '#FF5500', // Party Orange
    accent: '#f4f4f0', // Cream
    background: 'bg-[#1a1a1a]', // Darker for contrast
    cardBg: 'bg-[#2a2a2a]',
  },
  labels: {
    appName: 'ROMEO & JULIET',
    appSubtitle: '2025',
    battleTitle: 'SPEECH BATTLE',
    battleSubtitle: 'Who did it better?',
    contestantRole: 'Role',
    storeTitle: 'Honeymoon Fund',
    vipTitle: 'Family Table',
    requestTitle: 'DJ Requests',
    liveBadge: 'JUST MARRIED',
    ticker: [
      '💍 MERCUTIO JUST ROASTED ROMEO',
      '🎂 CAKE CUTTING IN 15 MINUTES',
      '📸 USE HASHTAG #ROMEOANDJULIET FOREVER',
      '🏖️ HONEYMOON FUND AT 60% GOAL',
    ]
  },
  contestants: [
    {
      id: 'best-man',
      name: 'Mercutio',
      role: 'Best Man',
      color: '#D4AF37',
      image: 'https://images.unsplash.com/photo-1507638940745-b7d3010df637?w=400&q=80',
      initialVotes: 42,
    },
    {
      id: 'moh',
      name: 'The Nurse',
      role: 'Maid of Honor',
      color: '#FF5500',
      image: 'https://images.unsplash.com/photo-1525265935882-70068a834920?w=400&q=80',
      initialVotes: 58,
    },
  ],
  liveStats: [
    { label: 'Guests', value: '156', icon: Users, color: '#D4AF37' },
    { label: 'Love Level', value: 'MAX', icon: Heart, color: '#FF5500' },
    { label: 'Dinner', value: '70%', icon: Coffee, color: '#f4f4f0' },
  ],
  storeItems: [
    { 
      id: 'honeymoon', 
      name: 'Honeymoon Ticket', 
      price: 25, 
      icon: Gift, 
      desc: 'Win a getaway',
      color: '#D4AF37',
      popular: true
    },
    { 
      id: 'drink', 
      name: 'Buy Couple a Drink', 
      price: 15, 
      icon: Beer, 
      desc: 'Cheers!',
      color: '#FF5500',
      popular: false
    },
    { 
      id: 'dj-tip', 
      name: 'Tip the DJ', 
      price: 20, 
      icon: Mic, 
      desc: 'Play my song next',
      color: '#f4f4f0',
      popular: false
    },
  ],
  requests: [
    { id: 1, song: 'Love Story', artist: 'Taylor Swift', votes: 24, user: 'Bridesmaids' },
    { id: 2, song: 'Yeah!', artist: 'Usher', votes: 18, user: 'Groomsmen' },
    { id: 3, song: 'Don\'t Stop Believin\'', artist: 'Journey', votes: 31, user: 'Dad' },
  ],
  vipUsers: [
    { id: 1, name: 'Aunt May', role: 'Family', status: 'Crying', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { id: 2, name: 'Uncle Ben', role: 'Family', status: 'Bar', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 3, name: 'Romeo', role: 'Groom', status: 'Happy', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' },
    { id: 4, name: 'Juliet', role: 'Bride', status: 'Radiant', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  ],
};
