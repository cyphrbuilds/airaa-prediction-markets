import { Badge } from '@/components/ui/badge';
import { Sentiment } from '@/data/mockData';
import { BADGE_STYLES, COMMON_CLASSES } from '@/lib/constants';

interface SentimentBadgeProps {
  sentiment: Sentiment;
  className?: string;
}

export default function SentimentBadge({ sentiment, className = '' }: SentimentBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={`${COMMON_CLASSES.badge} ${BADGE_STYLES.sentiment[sentiment]} ${className}`}
    >
      {sentiment}
    </Badge>
  );
}