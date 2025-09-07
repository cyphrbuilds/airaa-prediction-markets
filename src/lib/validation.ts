import { NewsItem, isSentiment, isImpact } from '@/data/mockData';

/**
 * Validates a NewsItem object to ensure all required fields are present and valid
 */
export function validateNewsItem(item: Partial<NewsItem>): item is NewsItem {
  return (
    typeof item.id === 'string' &&
    typeof item.headline === 'string' &&
    typeof item.summary === 'string' &&
    typeof item.source === 'string' &&
    typeof item.time === 'string' &&
    typeof item.thumbnail === 'string' &&
    typeof item.category === 'string' &&
    item.sentiment !== undefined && isSentiment(item.sentiment) &&
    item.impact !== undefined && isImpact(item.impact) &&
    Array.isArray(item.events)
  );
}

/**
 * Sanitizes and validates news data
 */
export function sanitizeNewsData(data: Partial<NewsItem>[]): NewsItem[] {
  return data.filter(validateNewsItem);
}