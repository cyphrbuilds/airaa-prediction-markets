import { Badge } from '@/components/ui/badge';
import { Sentiment } from '@/data/mockData';

interface SentimentBadgeProps {
  sentiment: Sentiment;
  className?: string;
}

export default function SentimentBadge({ sentiment, className = '' }: SentimentBadgeProps) {
  const getBadgeStyle = () => {
    switch (sentiment) {
      case Sentiment.BULLISH:
        return 'bg-green-500/90 text-white border-green-400/50';
      case Sentiment.BEARISH:
        return 'bg-red-500/90 text-white border-red-400/50';
      default:
        return 'bg-gray-500/90 text-white border-gray-400/50';
    }
  };

  return (
    <Badge 
      className={`text-xs px-2 py-1 border ${getBadgeStyle()} ${className}`}
    >
      {sentiment}
    </Badge>
  );
}