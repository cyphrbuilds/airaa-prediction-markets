import { useMemo } from 'react';
import { NewsItem } from '@/data/mockData';

interface UseNewsCardProps {
  newsItem: NewsItem;
}

export function useNewsCard({ newsItem }: UseNewsCardProps) {
  const totalMarkets = useMemo(() => {
    return newsItem.events.reduce((total, event) => total + event.markets.length, 0);
  }, [newsItem.events]);

  const marketCountText = useMemo(() => {
    return `Show Markets (${totalMarkets})`;
  }, [totalMarkets]);

  return {
    totalMarkets,
    marketCountText,
  };
}