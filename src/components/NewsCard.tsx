'use client';

import { motion } from 'framer-motion';
import { NewsItem } from '@/data/mockData';
import { Share2, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProgressIndicator from './ProgressIndicator';

interface NewsCardProps {
  newsItem: NewsItem;
  onMarketsClick: () => void;
  currentIndex: number;
  totalItems: number;
}

export default function NewsCard({ newsItem, onMarketsClick, currentIndex, totalItems }: NewsCardProps) {
  return (
    <motion.div
      className="relative w-full h-screen bg-background flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
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
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
          <Badge variant="secondary" className="text-xs bg-white/90 text-gray-900">
            {newsItem.category}
          </Badge>
        </div>
        
        {/* Save and Share Icons at Bottom Right of Image */}
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 bg-white/90 hover:bg-white text-gray-900">
            <Bookmark size={14} className="sm:w-4 sm:h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 bg-white/90 hover:bg-white text-gray-900">
            <Share2 size={14} className="sm:w-4 sm:h-4" />
          </Button>
        </div>
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
          <span>Show Markets ({newsItem.events.reduce((total, event) => total + event.markets.length, 0)})</span>
        </Button>
      </div>
    </motion.div>
  );
}