import { Badge } from '@/components/ui/badge';
import { Impact } from '@/data/mockData';
import { BADGE_STYLES, COMMON_CLASSES } from '@/lib/constants';

interface ImpactBadgeProps {
  impact: Impact;
  className?: string;
}

export default function ImpactBadge({ impact, className = '' }: ImpactBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={`${COMMON_CLASSES.badge} ${BADGE_STYLES.impact[impact]} ${className}`}
    >
      {impact}
    </Badge>
  );
}