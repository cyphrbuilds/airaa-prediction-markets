export enum Sentiment {
  BULLISH = 'Bullish',
  BEARISH = 'Bearish'
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
    headline: 'Google Announces Solution to Major Quantum Computing Challenge with Willow Chip',
    summary: 'Google\'s new Willow processor solves a computation in under 5 minutes that would take a classical computer longer than the age of the universe, marking a breakthrough in quantum error correction.',
    source: 'Reuters',
    time: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
    eventLogo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop&q=80',
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
    headline: 'TSMC Chairman Reveals Shared Focus with Elon Musk on Humanoid Robots',
    summary: 'Taiwan Semiconductor chairman C.C. Wei disclosed that the "richest guy in the world" shares his vision for developing multifunctional robots over automobiles, with Taiwan positioned as a key player in AI and robotics.',
    source: 'DIGITIMES',
    time: '4 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
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
    headline: 'Autonomous AI Agents and Profitability to Dominate 2025 Agenda',
    summary: 'Business executives predict that autonomous AI agents capable of performing tasks without direct human involvement will revolutionize industries, with 2025 being "the year of profitability for AI."',
    source: 'Economic Times',
    time: '6 hours ago',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
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
    headline: 'AI-Driven Profits Push Wall Street Toward New Records',
    summary: 'U.S. stocks continue their upward trajectory as tech companies report strong AI-driven results, with Salesforce and Marvell Technology leading gains on autonomous AI agent capabilities.',
    source: 'AP Business',
    time: '8 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80',
    category: 'Business',
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
    headline: 'Apple Intelligence Marks Watershed Moment in Consumer AI Adoption',
    summary: 'Apple\'s integration of OpenAI-powered generative AI across its product ecosystem creates a refined gateway into day-to-day AI for millions of non-tech users, potentially accelerating mainstream adoption.',
    source: 'Forbes',
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
    headline: 'Tesla\'s Optimus Humanoid Robot Breaks New Ground in Robotics',
    summary: 'Tesla demonstrates the latest iteration of its humanoid robot Optimus, showing impressive progress toward bipedal robots that could assist with tasks in homes and industry, despite controversy over automation levels.',
    source: 'TechCrunch',
    time: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
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
    headline: 'AI Robot Artist Ai-Da Sells Painting for $1 Million at Sotheby\'s',
    summary: 'The humanoid robot Ai-Da becomes the first AI artist to sell artwork at auction, with her painting "AI God" fetching $1,084,000 at Sotheby\'s London, far exceeding the $120,000-$180,000 estimate.',
    source: 'Art News',
    time: '3 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&q=80',
    category: 'Entertainment',
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
    headline: 'EU AI Act Raises Concerns Over Innovation Restrictions',
    summary: 'The European Union\'s new AI Act, which categorizes AI applications by risk level and bans certain uses, faces criticism from tech companies who argue it may stifle innovation and give competitors an advantage.',
    source: 'Financial Times',
    time: '5 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    category: 'Politics',
    sentiment: Sentiment.BEARISH,
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
    headline: 'AI Job Displacement Concerns Mount as Automation Accelerates',
    summary: 'Recent studies show that while AI adoption increases productivity, concerns grow over potential job displacement in sectors like customer service, data entry, and content creation as autonomous agents become more capable.',
    source: 'The Guardian',
    time: '7 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    category: 'Business',
    sentiment: Sentiment.BEARISH,
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
    headline: 'New Zealand Leads AI Adoption with 67% of Organizations Using AI',
    summary: 'The AI Forum of New Zealand reports that two-thirds of organizations have adopted AI, with most experiencing increased efficiency and positive financial outcomes, positioning the country as a leader in AI implementation.',
    source: 'NZ Herald',
    time: '9 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
    category: 'Technology',
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
    headline: 'AI Copyright Disputes Intensify as Artists Challenge Training Data Usage',
    summary: 'Writers, artists, and musicians are increasingly challenging AI companies over the use of their work in training datasets, with several high-profile lawsuits potentially reshaping how AI systems are developed and trained.',
    source: 'The Verge',
    time: '11 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    category: 'Politics',
    sentiment: Sentiment.BEARISH,
    impact: Impact.MEDIUM,
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
    headline: 'Nvidia Overtakes Apple as World\'s Most Valuable Company',
    summary: 'Nvidia\'s market capitalization peaks at $3.43 trillion, surpassing Apple as the world\'s largest company, driven by unprecedented demand for AI chips and a 800% growth since ChatGPT\'s launch.',
    source: 'Bloomberg',
    time: '13 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80',
    category: 'Business',
    sentiment: Sentiment.BULLISH,
    impact: Impact.HIGH,
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