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
  },
  {
    id: '4',
    headline: 'Tesla Stock Plummets 15% After Q4 Delivery Miss',
    summary: 'Electric vehicle manufacturer reports lower-than-expected deliveries, raising concerns about demand and production capacity.',
    source: 'Bloomberg',
    time: '8 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&q=80',
    category: 'Business',
    sentiment: Sentiment.BEARISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_5',
        title: 'Tesla Stock Performance',
        logo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop&q=80',
        totalVolume: '$22,45,67,8',
        markets: [
          {
            id: 'market_9',
            title: 'Stock recovers 20%',
            yesPrice: 0.38,
            noPrice: 0.62,
            expiryDate: 'Mar 31, 2025',
            link: '#'
          },
          {
            id: 'market_10',
            title: 'Cybertruck production > 10k',
            yesPrice: 0.72,
            noPrice: 0.28,
            expiryDate: 'Jun 30, 2025',
            link: '#'
          }
        ]
      },
      {
        id: 'event_6',
        title: 'EV Market Competition',
        logo: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=100&h=100&fit=crop&q=80',
        totalVolume: '$18,23,45,6',
        markets: [
          {
            id: 'market_11',
            title: 'Tesla loses market share',
            yesPrice: 0.55,
            noPrice: 0.45,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          },
          {
            id: 'market_12',
            title: 'New EV model launches',
            yesPrice: 0.88,
            noPrice: 0.12,
            expiryDate: 'Sep 30, 2025',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    headline: 'Climate Summit Reaches Historic Agreement on Carbon Reduction',
    summary: 'World leaders commit to ambitious new targets for reducing greenhouse gas emissions by 2030, marking a turning point in climate policy.',
    source: 'The Guardian',
    time: '10 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop&q=80',
    category: 'Politics',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_7',
        title: 'Climate Policy Implementation',
        logo: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&q=80',
        totalVolume: '$31,56,78,9',
        markets: [
          {
            id: 'market_13',
            title: 'US ratifies agreement',
            yesPrice: 0.65,
            noPrice: 0.35,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          },
          {
            id: 'market_14',
            title: 'China meets targets',
            yesPrice: 0.42,
            noPrice: 0.58,
            expiryDate: 'Dec 31, 2030',
            link: '#'
          }
        ]
      },
      {
        id: 'event_8',
        title: 'Renewable Energy Adoption',
        logo: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop&q=80',
        totalVolume: '$25,34,67,2',
        markets: [
          {
            id: 'market_15',
            title: 'Solar capacity doubles',
            yesPrice: 0.78,
            noPrice: 0.22,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          },
          {
            id: 'market_16',
            title: 'Coal plants close',
            yesPrice: 0.61,
            noPrice: 0.39,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    headline: 'SpaceX Successfully Launches Mars Mission Prototype',
    summary: 'Elon Musk\'s company achieves major milestone in interplanetary travel with successful test of next-generation rocket technology.',
    source: 'Space.com',
    time: '12 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&q=80',
    category: 'Science',
    sentiment: Sentiment.BULLISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_9',
        title: 'Mars Mission Timeline',
        logo: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=100&h=100&fit=crop&q=80',
        totalVolume: '$19,45,23,7',
        markets: [
          {
            id: 'market_17',
            title: 'Manned mission by 2030',
            yesPrice: 0.28,
            noPrice: 0.72,
            expiryDate: 'Dec 31, 2030',
            link: '#'
          },
          {
            id: 'market_18',
            title: 'Colony established',
            yesPrice: 0.15,
            noPrice: 0.85,
            expiryDate: 'Dec 31, 2035',
            link: '#'
          }
        ]
      },
      {
        id: 'event_10',
        title: 'Space Industry Competition',
        logo: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop&q=80',
        totalVolume: '$14,67,89,3',
        markets: [
          {
            id: 'market_19',
            title: 'Blue Origin catches up',
            yesPrice: 0.33,
            noPrice: 0.67,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          },
          {
            id: 'market_20',
            title: 'NASA partnership',
            yesPrice: 0.76,
            noPrice: 0.24,
            expiryDate: 'Jun 30, 2025',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    headline: 'Major Tech Layoffs Continue as Companies Restructure',
    summary: 'Google, Meta, and Amazon announce additional workforce reductions as they focus on AI development and cost optimization.',
    source: 'TechCrunch',
    time: '14 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
    sentiment: Sentiment.BEARISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_11',
        title: 'Tech Employment Trends',
        logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&q=80',
        totalVolume: '$27,89,45,1',
        markets: [
          {
            id: 'market_21',
            title: 'Layoffs exceed 100k',
            yesPrice: 0.82,
            noPrice: 0.18,
            expiryDate: 'Dec 31, 2024',
            link: '#'
          },
          {
            id: 'market_22',
            title: 'Hiring resumes Q2',
            yesPrice: 0.45,
            noPrice: 0.55,
            expiryDate: 'Jun 30, 2025',
            link: '#'
          }
        ]
      },
      {
        id: 'event_12',
        title: 'AI Investment Priorities',
        logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&q=80',
        totalVolume: '$21,34,56,8',
        markets: [
          {
            id: 'market_23',
            title: 'AI spending > $50B',
            yesPrice: 0.67,
            noPrice: 0.33,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          },
          {
            id: 'market_24',
            title: 'New AI products launch',
            yesPrice: 0.89,
            noPrice: 0.11,
            expiryDate: 'Mar 31, 2025',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '8',
    headline: 'Olympic Games 2028 Venue Construction Ahead of Schedule',
    summary: 'Los Angeles organizers report significant progress on infrastructure development, with most venues expected to be completed early.',
    source: 'ESPN',
    time: '16 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&q=80',
    category: 'Sports',
    sentiment: Sentiment.BULLISH,
    impact: Impact.LOW,
    events: [
      {
        id: 'event_13',
        title: 'Olympic Preparation',
        logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop&q=80',
        totalVolume: '$16,78,23,4',
        markets: [
          {
            id: 'market_25',
            title: 'All venues ready',
            yesPrice: 0.73,
            noPrice: 0.27,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          },
          {
            id: 'market_26',
            title: 'Budget stays under $10B',
            yesPrice: 0.41,
            noPrice: 0.59,
            expiryDate: 'Jul 31, 2028',
            link: '#'
          }
        ]
      },
      {
        id: 'event_14',
        title: 'Sports Performance Predictions',
        logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80',
        totalVolume: '$12,45,67,9',
        markets: [
          {
            id: 'market_27',
            title: 'US wins most medals',
            yesPrice: 0.58,
            noPrice: 0.42,
            expiryDate: 'Aug 15, 2028',
            link: '#'
          },
          {
            id: 'market_28',
            title: 'New world records set',
            yesPrice: 0.84,
            noPrice: 0.16,
            expiryDate: 'Aug 15, 2028',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '9',
    headline: 'Breakthrough Cancer Treatment Shows 90% Success Rate',
    summary: 'New immunotherapy approach demonstrates remarkable results in clinical trials, offering hope for previously untreatable cancers.',
    source: 'Nature Medicine',
    time: '18 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80',
    category: 'Health',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_15',
        title: 'Medical Breakthrough Timeline',
        logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&q=80',
        totalVolume: '$35,67,89,2',
        markets: [
          {
            id: 'market_29',
            title: 'FDA approval by 2026',
            yesPrice: 0.72,
            noPrice: 0.28,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          },
          {
            id: 'market_30',
            title: 'Global rollout begins',
            yesPrice: 0.56,
            noPrice: 0.44,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          }
        ]
      },
      {
        id: 'event_16',
        title: 'Healthcare Industry Impact',
        logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&q=80',
        totalVolume: '$28,34,56,7',
        markets: [
          {
            id: 'market_31',
            title: 'Treatment cost < $100k',
            yesPrice: 0.38,
            noPrice: 0.62,
            expiryDate: 'Dec 31, 2028',
            link: '#'
          },
          {
            id: 'market_32',
            title: 'Insurance coverage',
            yesPrice: 0.81,
            noPrice: 0.19,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '10',
    headline: 'Streaming Wars Intensify as Netflix Loses Market Share',
    summary: 'Disney+ and Apple TV+ gain significant subscribers while Netflix faces increased competition and content production challenges.',
    source: 'Variety',
    time: '20 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop&q=80',
    category: 'Entertainment',
    sentiment: Sentiment.BEARISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_17',
        title: 'Streaming Market Dynamics',
        logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop&q=80',
        totalVolume: '$23,45,67,8',
        markets: [
          {
            id: 'market_33',
            title: 'Netflix subscriber loss',
            yesPrice: 0.64,
            noPrice: 0.36,
            expiryDate: 'Mar 31, 2025',
            link: '#'
          },
          {
            id: 'market_34',
            title: 'Disney+ overtakes Netflix',
            yesPrice: 0.29,
            noPrice: 0.71,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          }
        ]
      },
      {
        id: 'event_18',
        title: 'Content Production Trends',
        logo: 'https://images.unsplash.com/photo-1489599808420-1a0b0b0b0b0b?w=100&h=100&fit=crop&q=80',
        totalVolume: '$18,67,89,3',
        markets: [
          {
            id: 'market_35',
            title: 'Original content spending up',
            yesPrice: 0.87,
            noPrice: 0.13,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          },
          {
            id: 'market_36',
            title: 'Live sports streaming grows',
            yesPrice: 0.74,
            noPrice: 0.26,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '11',
    headline: 'Quantum Computing Milestone: 1000-Qubit Processor Achieved',
    summary: 'IBM announces breakthrough in quantum computing with new processor that could revolutionize cryptography and drug discovery.',
    source: 'IEEE Spectrum',
    time: '22 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80',
    category: 'Science',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_19',
        title: 'Quantum Computing Progress',
        logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop&q=80',
        totalVolume: '$29,78,45,6',
        markets: [
          {
            id: 'market_37',
            title: 'Commercial quantum computers',
            yesPrice: 0.43,
            noPrice: 0.57,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          },
          {
            id: 'market_38',
            title: 'Quantum advantage proven',
            yesPrice: 0.66,
            noPrice: 0.34,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          }
        ]
      },
      {
        id: 'event_20',
        title: 'Technology Applications',
        logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&q=80',
        totalVolume: '$24,56,78,9',
        markets: [
          {
            id: 'market_39',
            title: 'Drug discovery breakthrough',
            yesPrice: 0.52,
            noPrice: 0.48,
            expiryDate: 'Dec 31, 2028',
            link: '#'
          },
          {
            id: 'market_40',
            title: 'Cryptography standards change',
            yesPrice: 0.38,
            noPrice: 0.62,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '12',
    headline: 'Global Supply Chain Crisis Shows Signs of Recovery',
    summary: 'Shipping costs normalize and delivery times improve as companies adapt to new logistics models and regional manufacturing.',
    source: 'Financial Times',
    time: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&q=80',
    category: 'Business',
    sentiment: Sentiment.BULLISH,
    impact: Impact.MEDIUM,
    events: [
      {
        id: 'event_21',
        title: 'Supply Chain Recovery',
        logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&q=80',
        totalVolume: '$26,89,34,5',
        markets: [
          {
            id: 'market_41',
            title: 'Shipping costs normalize',
            yesPrice: 0.71,
            noPrice: 0.29,
            expiryDate: 'Jun 30, 2025',
            link: '#'
          },
          {
            id: 'market_42',
            title: 'Delivery times < 7 days',
            yesPrice: 0.58,
            noPrice: 0.42,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          }
        ]
      },
      {
        id: 'event_22',
        title: 'Manufacturing Trends',
        logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop&q=80',
        totalVolume: '$22,45,67,8',
        markets: [
          {
            id: 'market_43',
            title: 'Nearshoring increases',
            yesPrice: 0.83,
            noPrice: 0.17,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          },
          {
            id: 'market_44',
            title: 'Automation adoption up',
            yesPrice: 0.76,
            noPrice: 0.24,
            expiryDate: 'Dec 31, 2025',
            link: '#'
          }
        ]
      }
    ]
  },
  {
    id: '13',
    headline: 'Renewable Energy Storage Breakthrough Reduces Costs by 50%',
    summary: 'New battery technology promises to make renewable energy more competitive with fossil fuels through improved storage efficiency.',
    source: 'Clean Energy News',
    time: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop&q=80',
    category: 'Science',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
    events: [
      {
        id: 'event_23',
        title: 'Energy Storage Innovation',
        logo: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop&q=80',
        totalVolume: '$33,67,89,4',
        markets: [
          {
            id: 'market_45',
            title: 'Grid-scale deployment',
            yesPrice: 0.69,
            noPrice: 0.31,
            expiryDate: 'Dec 31, 2026',
            link: '#'
          },
          {
            id: 'market_46',
            title: 'Cost parity achieved',
            yesPrice: 0.54,
            noPrice: 0.46,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          }
        ]
      },
      {
        id: 'event_24',
        title: 'Clean Energy Transition',
        logo: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&q=80',
        totalVolume: '$28,34,56,7',
        markets: [
          {
            id: 'market_47',
            title: 'Renewable share > 50%',
            yesPrice: 0.62,
            noPrice: 0.38,
            expiryDate: 'Dec 31, 2028',
            link: '#'
          },
          {
            id: 'market_48',
            title: 'Coal plants close faster',
            yesPrice: 0.78,
            noPrice: 0.22,
            expiryDate: 'Dec 31, 2027',
            link: '#'
          }
        ]
      }
    ]
  }
];
