import { Sentiment, Impact } from '@/data/mockData';

// Badge styling constants
export const BADGE_STYLES = {
  sentiment: {
    [Sentiment.BULLISH]: 'bg-green-500/90 text-white',
    [Sentiment.BEARISH]: 'bg-red-500/90 text-white',
  },
  impact: {
    [Impact.HIGH]: 'bg-orange-500/90 text-white',
    [Impact.MEDIUM]: 'bg-yellow-500/90 text-black',
    [Impact.LOW]: 'bg-gray-500/90 text-white',
  },
} as const;

// Common CSS classes
export const COMMON_CLASSES = {
  badge: 'text-xs',
  iconButton: 'h-6 w-6 sm:h-8 sm:w-8 bg-white/90 hover:bg-white text-gray-900',
  iconSize: 'sm:w-4 sm:h-4',
  iconSizeSmall: 'w-4 h-4',
  spacing: {
    small: 'space-x-1 sm:space-x-2',
    vertical: 'space-y-1',
  },
  positioning: {
    topRight: 'absolute top-2 sm:top-4 right-2 sm:right-4',
    bottomLeft: 'absolute bottom-2 sm:bottom-4 left-2 sm:left-4',
    bottomRight: 'absolute bottom-2 sm:bottom-4 right-2 sm:right-4',
  },
} as const;