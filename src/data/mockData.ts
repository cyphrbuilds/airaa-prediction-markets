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
            link: '#'
          },
          {
            id: 'market_2',
            title: 'Trump wins',
            yesPrice: 0.67,
            noPrice: 0.33,
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
            link: '#'
          },
          {
            id: 'market_4',
            title: 'Criticizes crypto',
            yesPrice: 0.78,
            noPrice: 0.22,
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
            link: '#'
          },
          {
            id: 'market_6',
            title: 'Inflation < 2%',
            yesPrice: 0.45,
            noPrice: 0.55,
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
            yesPrice: 0.28,
            noPrice: 0.72,
            link: '#'
          },
          {
            id: 'market_8',
            title: 'AI regulation',
            yesPrice: 0.67,
            noPrice: 0.33,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    headline: 'Climate Summit Reaches Historic Agreement on Carbon Reduction',
    summary: 'World leaders commit to ambitious new targets for greenhouse gas emissions, marking significant progress in global climate action.',
    source: 'The Guardian',
    time: '8 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop&q=80',
    category: 'Politics',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_5',
        title: 'Climate Policy Implementation',
        logo: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&q=80',
        totalVolume: '$11,45,78,9',
        markets: [
          {
            id: 'market_9',
            title: 'CO2 peaks 2025',
            yesPrice: 0.52,
            noPrice: 0.48,
            link: '#'
          },
          {
            id: 'market_10',
            title: 'Global carbon tax',
            yesPrice: 0.34,
            noPrice: 0.66,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    headline: 'SpaceX Successfully Launches Mars Mission Prototype',
    summary: 'Elon Musk\'s company achieves major milestone in interplanetary travel with successful test of next-generation spacecraft technology.',
    source: 'Space.com',
    time: '12 hours ago',
    sentiment: Sentiment.BULLISH,
    impact: Impact.MEDIUM,
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&q=80',
    category: 'Science',
    events: [
      {
        id: 'event_6',
        title: 'Space Exploration Milestones',
        logo: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=100&h=100&fit=crop&q=80',
        totalVolume: '$7,89,12,4',
        markets: [
          {
            id: 'market_11',
            title: 'Mars landing 2030',
            yesPrice: 0.41,
            noPrice: 0.59,
            link: '#'
          },
          {
            id: 'market_12',
            title: 'SpaceX IPO',
            yesPrice: 0.23,
            noPrice: 0.77,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    headline: 'Major Streaming Platform Announces Original Content Expansion',
    summary: 'Leading entertainment company reveals plans to invest billions in new original programming, intensifying competition in streaming wars.',
    source: 'Variety',
    time: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop&q=80',
    category: 'Entertainment',
    sentiment: Sentiment.BULLISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_7',
        title: 'Streaming Industry Evolution',
        logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop&q=80',
        totalVolume: '$13,56,78,2',
        markets: [
          {
            id: 'market_13',
            title: '2B+ subscribers',
            yesPrice: 0.71,
            noPrice: 0.29,
            link: '#'
          },
          {
            id: 'market_14',
            title: 'TV obsolete 2030',
            yesPrice: 0.38,
            noPrice: 0.62,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    headline: 'Tesla Unveils Revolutionary Battery Technology Breakthrough',
    summary: 'New solid-state battery design promises 50% longer range and faster charging, potentially revolutionizing electric vehicle industry.',
    source: 'TechCrunch',
    time: '3 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_8',
        title: 'Electric Vehicle Innovation',
        logo: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=100&h=100&fit=crop&q=80',
        totalVolume: '$16,78,90,5',
        markets: [
          {
            id: 'market_15',
            title: 'Tesla $500+',
            yesPrice: 0.55,
            noPrice: 0.45,
            link: '#'
          },
          {
            id: 'market_16',
            title: 'Solid-state batteries',
            yesPrice: 0.72,
            noPrice: 0.28,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '8',
    headline: 'Olympic Games 2024: Record-Breaking Performances and Historic Moments',
    summary: 'Athletes from around the world deliver stunning performances, with multiple world records shattered and inspiring stories of determination.',
    source: 'ESPN',
    time: '5 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&q=80',
    category: 'Sports',
    sentiment: Sentiment.BULLISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_9',
        title: 'Olympic Games 2024',
        logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop&q=80',
        totalVolume: '$14,23,45,6',
        markets: [
          {
            id: 'market_17',
            title: 'USA most gold',
            yesPrice: 0.68,
            noPrice: 0.32,
            link: '#'
          },
          {
            id: 'market_18',
            title: '10+ world records',
            yesPrice: 0.43,
            noPrice: 0.57,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '9',
    headline: 'Breakthrough in Quantum Computing Achieves 1000-Qubit Milestone',
    summary: 'Scientists reach unprecedented quantum processing power, opening new possibilities for cryptography, drug discovery, and complex simulations.',
    source: 'Nature',
    time: '7 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80',
    category: 'Science',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_10',
        title: 'Quantum Computing Breakthrough',
        logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop&q=80',
        totalVolume: '$10,34,56,8',
        markets: [
          {
            id: 'market_19',
            title: 'Break RSA 2030',
            yesPrice: 0.31,
            noPrice: 0.69,
            link: '#'
          },
          {
            id: 'market_20',
            title: 'Commercial viable',
            yesPrice: 0.58,
            noPrice: 0.42,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '10',
    headline: 'Global Health Initiative Reaches 1 Billion Vaccinations Milestone',
    summary: 'International vaccination campaign achieves unprecedented scale, bringing hope for ending preventable diseases worldwide.',
    source: 'WHO',
    time: '9 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&q=80',
    category: 'Health',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_11',
        title: 'Global Health Initiative',
        logo: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=100&h=100&fit=crop&q=80',
        totalVolume: '$18,90,12,7',
        markets: [
          {
            id: 'market_21',
            title: '80%+ vaccinated',
            yesPrice: 0.76,
            noPrice: 0.24,
            link: '#'
          },
          {
            id: 'market_22',
            title: 'Malaria eradicated',
            yesPrice: 0.29,
            noPrice: 0.71,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '11',
    headline: 'Renewable Energy Surpasses Fossil Fuels in Global Power Generation',
    summary: 'Historic milestone reached as wind, solar, and hydroelectric power now provide majority of world\'s electricity for the first time.',
    source: 'Energy Weekly',
    time: '11 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop&q=80',
    category: 'Science',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_12',
        title: 'Renewable Energy Transition',
        logo: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop&q=80',
        totalVolume: '$12,67,89,4',
        markets: [
          {
            id: 'market_23',
            title: '70% renewable',
            yesPrice: 0.64,
            noPrice: 0.36,
            link: '#'
          },
          {
            id: 'market_24',
            title: 'Coal phased out',
            yesPrice: 0.47,
            noPrice: 0.53,
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '12',
    headline: 'Major Film Studio Announces $2B Investment in Virtual Reality Cinema',
    summary: 'Revolutionary VR movie experiences set to transform entertainment industry with immersive storytelling and interactive narratives.',
    source: 'Hollywood Reporter',
    time: '13 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600&fit=crop&q=80',
    category: 'Entertainment',
    sentiment: Sentiment.BULLISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_13',
        title: 'Virtual Reality Cinema',
        logo: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=100&h=100&fit=crop&q=80',
        totalVolume: '$15,78,90,3',
        markets: [
          {
            id: 'market_25',
            title: 'VR mainstream',
            yesPrice: 0.39,
            noPrice: 0.61,
            link: '#'
          },
          {
            id: 'market_26',
            title: 'VR tickets $50+',
            yesPrice: 0.52,
            noPrice: 0.48,
            link: '#'
          }
        ]
      }
    ]
  }
];