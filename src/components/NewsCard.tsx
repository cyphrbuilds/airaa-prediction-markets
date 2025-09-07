'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NewsItem } from '@/data/mockData';
import { Share2, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SentimentBadge from '@/components/ui/SentimentBadge';
import ImpactBadge from '@/components/ui/ImpactBadge';
import { COMMON_CLASSES } from '@/lib/constants';
import { useNewsCard } from '@/hooks/useNewsCard';
import { addBookmark, removeBookmark, isBookmarked } from '@/lib/bookmarks';
import { shareArticle } from '@/lib/share';

interface NewsCardProps {
  newsItem: NewsItem;
  onMarketsClick: () => void;
}

export default function NewsCard({ newsItem, onMarketsClick }: NewsCardProps) {
  const { marketCountText } = useNewsCard({ newsItem });
  const [bookmarked, setBookmarked] = useState(isBookmarked(newsItem.id));
  const [showBookmarkFeedback, setShowBookmarkFeedback] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) { // 300ms double-tap threshold
      toggleBookmark();
    }
    lastTapRef.current = now;
  };

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(newsItem.id);
      setBookmarked(false);
    } else {
      addBookmark(newsItem.id, newsItem.headline);
      setBookmarked(true);
      setShowBookmarkFeedback(true);
      setTimeout(() => setShowBookmarkFeedback(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: newsItem.headline,
      text: newsItem.summary,
      url: window.location.href
    };
    
    const success = await shareArticle(shareData);
    if (success) {
      // Could add a toast notification here
      console.log('Article shared successfully');
    }
  };

  return (
    <motion.div
      className="relative w-full h-screen bg-background flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      onTap={handleDoubleTap}
    >
      {/* Full-Width Image - Takes space up to filter bar */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <img
          src={newsItem.thumbnail}
          alt={newsItem.headline}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Category Badge at Bottom Left of Image */}
        <div className={COMMON_CLASSES.positioning.bottomLeft}>
          <Badge variant="secondary" className={`${COMMON_CLASSES.badge} bg-white/90 text-gray-900`}>
            {newsItem.category}
          </Badge>
        </div>
        
        {/* Sentiment and Impact Tags at Top Right of Image */}
        <div className={`${COMMON_CLASSES.positioning.topRight} flex flex-col ${COMMON_CLASSES.spacing.vertical}`}>
          <SentimentBadge sentiment={newsItem.sentiment} />
          <ImpactBadge impact={newsItem.impact} />
        </div>
        
        {/* Save and Share Icons at Bottom Right of Image */}
        <div className={`${COMMON_CLASSES.positioning.bottomRight} flex items-center ${COMMON_CLASSES.spacing.small}`}>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`${COMMON_CLASSES.iconButton} ${bookmarked ? 'text-yellow-500' : ''}`}
            onClick={toggleBookmark}
          >
            <Bookmark 
              size={14} 
              className={`${COMMON_CLASSES.iconSize} ${bookmarked ? 'fill-current' : ''}`} 
            />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={COMMON_CLASSES.iconButton}
            onClick={handleShare}
          >
            <Share2 size={14} className={COMMON_CLASSES.iconSize} />
          </Button>
        </div>

        {/* Bookmark Feedback */}
        {showBookmarkFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
              Bookmarked! 📌
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-3 sm:px-4 content-with-bottom-actions pt-4 sm:pt-6">

        {/* Headline */}
        <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
          {newsItem.headline}
        </h1>

        {/* Summary */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
          {newsItem.summary}
        </p>

        {/* Source and Time */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <span className="font-medium">{newsItem.source}</span>
          <span>{newsItem.time}</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bottom-actions p-3 sm:p-4">
        <Button
          onClick={onMarketsClick}
          className="w-full flex items-center justify-center space-x-2 py-3 sm:py-4 rounded-xl font-medium shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base"
          size="lg"
        >
          <TrendingUp size={18} className="sm:w-5 sm:h-5" />
          <span>{marketCountText}</span>
        </Button>
      </div>
    </motion.div>
  );
}