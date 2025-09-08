'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NewsItem } from '@/data/mockData';
import { Share2, Bookmark, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SentimentBadge from '@/components/ui/SentimentBadge';
import ImpactBadge from '@/components/ui/ImpactBadge';
import { addBookmark, removeBookmark, isBookmarked } from '@/lib/bookmarks';
import { shareArticle } from '@/lib/share';

interface NewsCardProps {
  newsItem: NewsItem;
}

export default function NewsCard({ newsItem }: NewsCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked(newsItem.id));
  const [showBookmarkFeedback, setShowBookmarkFeedback] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) {
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
      console.log('Article shared successfully');
    }
  };

  return (
    <motion.div
      className="flex-1 px-4 pt-2 pb-4 flex flex-col justify-center items-start gap-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      onTap={handleDoubleTap}
    >
      {/* Main News Card */}
      <div className="w-full flex-1 bg-surface rounded-xl border border-border flex flex-col justify-start items-start overflow-hidden card-hover">
        {/* Image Section */}
        <div className="w-full h-[180px] relative overflow-hidden">
          <img
            src={newsItem.thumbnail}
            alt={newsItem.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Sentiment and Impact Tags */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            <SentimentBadge sentiment={newsItem.sentiment} />
            <ImpactBadge impact={newsItem.impact} />
          </div>
          
          {/* Bookmark and Share Icons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white ${
                bookmarked ? 'text-yellow-400' : ''
              }`}
              onClick={toggleBookmark}
            >
              <Bookmark 
                size={16} 
                className={bookmarked ? 'fill-current' : ''} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
              onClick={handleShare}
            >
              <Share2 size={16} />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 flex flex-col justify-start items-start gap-3">
          {/* Category and Time */}
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-start gap-2">
              <Badge className="h-7 px-2 py-1 bg-surface-secondary border border-border-secondary text-white text-sm font-normal">
                {newsItem.category}
              </Badge>
              <Badge className="h-7 px-2 py-1 bg-surface-secondary border border-border-secondary text-white text-sm font-normal">
                Finance
              </Badge>
            </div>
            <div className="flex justify-center items-center gap-1">
              <Clock className="w-4 h-4 text-muted" />
              <span className="text-muted text-sm font-normal">{newsItem.time}</span>
            </div>
          </div>

          {/* Headline and Summary */}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <h1 className="w-full text-white text-[15px] font-medium leading-tight">
              {newsItem.headline}
            </h1>
            <p className="w-full text-muted text-sm font-normal leading-tight">
              {newsItem.summary}
            </p>
          </div>

          {/* Source */}
          <div className="w-full">
            <span className="text-muted text-sm font-normal">By </span>
            <span className="text-white text-sm font-normal">{newsItem.source}</span>
          </div>
        </div>
      </div>

      {/* Markets Section */}
      <div className="w-full p-3 flex flex-col justify-start items-start gap-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-1">
            <span className="text-white text-sm font-normal">Markets on</span>
            <span className="text-primary-green text-sm font-medium">Kalshi</span>
          </div>
          <span className="text-muted text-sm font-normal">1 of 3</span>
        </div>

        {/* Market Cards */}
        <div className="w-full flex gap-2 overflow-x-auto horizontal-scroll">
          {newsItem.events.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="min-w-[336px] px-3 py-3.5 gradient-card rounded-[10px] border border-border flex flex-col justify-start items-start gap-3.5"
            >
              {/* Volume and Expiry */}
              <div className="w-full flex justify-between items-center">
                <span className="text-subtle text-[13px] font-normal leading-none">
                  {event.totalVolume}
                </span>
                <span className="text-subtle text-[13px] font-normal leading-none">
                  Expire on Sep 9, 27
                </span>
              </div>

              {/* Market Question */}
              <div className="w-full flex justify-start items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="flex-1 text-white text-[13px] font-normal leading-none">
                  {event.markets[0]?.title || 'Market question'}
                </span>
              </div>

              {/* Yes/No Buttons */}
              <div className="w-full flex justify-start items-start gap-3">
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <Button className="w-full h-9 px-2 py-1.5 bg-accent rounded-lg flex justify-center items-center gap-1">
                    <span className="text-white text-[13px] font-normal">Yes</span>
                    <span className="text-white text-[13px] font-normal">30¢</span>
                  </Button>
                  <div className="w-full text-center">
                    <span className="text-subtle text-[13px] font-normal">$100 → </span>
                    <span className="text-success text-[13px] font-normal">$120</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <Button className="w-full h-9 px-2 py-1.5 bg-accent-secondary rounded-lg flex justify-center items-center gap-1">
                    <span className="text-accent-secondary text-[13px] font-normal">No</span>
                    <span className="text-accent-secondary text-[13px] font-normal">80¢</span>
                  </Button>
                  <div className="w-full text-center">
                    <span className="text-subtle text-[13px] font-normal">$40 → </span>
                    <span className="text-success text-[13px] font-normal">$120</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookmark Feedback */}
      {showBookmarkFeedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
            Bookmarked! 📌
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}