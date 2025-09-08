import { Badge } from '@/components/ui/badge';
import { Impact } from '@/data/mockData';

interface ImpactBadgeProps {
  impact: Impact;
  className?: string;
}

export default function ImpactBadge({ impact, className = '' }: ImpactBadgeProps) {
  const getBadgeStyle = () => {
    switch (impact) {
      case Impact.HIGH:
        return 'bg-orange-500/90 text-white border-orange-400/50';
      case Impact.MEDIUM:
        return 'bg-yellow-500/90 text-black border-yellow-400/50';
      case Impact.LOW:
        return 'bg-gray-500/90 text-white border-gray-400/50';
      default:
        return 'bg-gray-500/90 text-white border-gray-400/50';
    }
  };

  return (
    <Badge 
      className={`text-xs px-2 py-1 border ${getBadgeStyle()} ${className}`}
    >
      {impact}
    </Badge>
  );
}