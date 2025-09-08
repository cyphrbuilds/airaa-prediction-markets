export enum Sentiment {
  BULLISH = 'Bullish',
  BEARISH = 'Bearish',
  NEUTRAL = 'Neutral'
}

export enum Impact {
  HIGH = 'High Impact',
  MEDIUM = 'Medium Impact',
  LOW = 'Low Impact'
}

// Type guards for better type safety
export const isSentiment = (value: string): value is Sentiment => {
  return Object.values(Sentiment).includes(value as Sentiment);
};

export const isImpact = (value: string): value is Impact => {
  return Object.values(Impact).includes(value as Impact);
};

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  time: string;
  thumbnail: string;
  category: string;
  eventLogo?: string;
  sentiment: Sentiment;
  impact: Impact;
  events: PredictionEvent[];
}

export interface PredictionEvent {
  id: string;
  title: string;
  logo: string;
  markets: PredictionMarket[];
  totalVolume: string;
}

export interface PredictionMarket {
  id: string;
  title: string;
  yesPrice: number;
  noPrice: number;
  expiryDate: string;
  link: string;
}

export const categories = [
  'All',
  'Technology',
  'Business',
  'Politics',
  'Sports',
  'Entertainment',
  'Science',
  'Health'
];

export const mockNewsData: NewsItem[] = [
  {
    id: '1',
    headline: 'Bitcoin Surges Past $100K as Institutional Adoption Accelerates',
    summary: 'Major corporations announce Bitcoin treasury allocations, driving cryptocurrency to new all-time highs with increased mainstream acceptance.',
    source: 'CoinDesk',
    time: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
    eventLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&q=80',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_1',
        title: 'Next US Presidential Election Winner?',
        logo: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop&q=80',
        totalVolume: '$12,23,23,2',
        markets: [
          {
            id: 'market_1',
            title: 'Biden wins',
            yesPrice: 0.28,
            noPrice: 0.72,
            expiryDate: 'Sep 9, 2027',
            link: '#'
          },
          {
            id: 'market_2',
            title: 'Trump wins',
            yesPrice: 0.67,
            noPrice: 0.33,
            expiryDate: 'Sep 9, 2027',
            link: '#'
          }
        ]
      },
      {
        id: 'event_2',
        title: 'What will Trump say in September?',
        logo: 'https://images.unsplash.com/photo-1551524164-6cf2ac5313c4?w=100&h=100&fit=crop&q=80',
        totalVolume: '$8,45,67,1',
        markets: [
          {
            id: 'market_3',
            title: 'Mentions Bitcoin',
            yesPrice: 0.42,
            noPrice: 0.58,
            expiryDate: 'Dec 31, 2024',
            link: '#'
          },
          {
            id: 'market_4',
            title: 'Criticizes crypto',
            yesPrice: 0.78,
            noPrice: 0.22,
            expiryDate: 'Dec 31, 2024',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    headline: 'Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty',
    summary: 'Central bank officials hint at monetary policy shift as inflation data shows signs of cooling, sparking market optimism.',
    source: 'Reuters',
    time: '4 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80',
    category: 'Business',
    sentiment: Sentiment.BEARISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_3',
        title: 'Federal Reserve Policy Changes',
        logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop&q=80',
        totalVolume: '$15,67,89,3',
        markets: [
          {
            id: 'market_5',
            title: 'Rate cut 0.5%',
            yesPrice: 0.63,
            noPrice: 0.37,
            expiryDate: 'Mar 15, 2025',
            link: '#'
          },
          {
            id: 'market_6',
            title: 'Inflation < 2%',
            yesPrice: 0.45,
            noPrice: 0.55,
            expiryDate: 'Jun 30, 2025',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    headline: 'AI Breakthrough: New Model Achieves Human-Level Reasoning',
    summary: 'Researchers develop advanced AI system capable of complex problem-solving, raising questions about artificial general intelligence timeline.',
    source: 'MIT Technology Review',
    time: '6 hours ago',
    sentiment: Sentiment.NEUTRAL,
    impact: Impact.LOW,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
    events: [
      {
        id: 'event_4',
        title: 'AI Development Timeline',
        logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&q=80',
        totalVolume: '$9,34,56,7',
        markets: [
          {
            id: 'market_7',
            title: 'AGI by 2030',
            yesPrice: 0.35,
            noPrice: 0.65,
            expiryDate: 'Jan 1, 2030',
            link: '#'
          },
          {
            id: 'market_8',
            title: 'AI regulation passed',
            yesPrice: 0.82,
            noPrice: 0.18,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          }
        ]
      }
    ]
  }
];