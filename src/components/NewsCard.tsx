'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NewsItem } from '@/data/mockData';
import { TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  newsItem: NewsItem;
}

export default function NewsCard({ newsItem }: NewsCardProps) {
  const marketEvents = newsItem.events.slice(0, 2); // Max 2 events
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll events to update current market index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || marketEvents.length <= 1) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      setCurrentMarketIndex(Math.min(newIndex, marketEvents.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [marketEvents.length]);

  return (
    <motion.div
      className="w-full h-full px-4 pt-2 pb-4 flex flex-col justify-start items-start gap-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
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

        {/* Markets Section */}
        <div className="w-full h-[200px] flex flex-col justify-start items-start gap-2">
          <div className="w-full px-3 flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <span className="text-white text-sm font-normal">Markets on</span>
              <span className="text-primary-green text-sm font-medium">Kalshi</span>
            </div>
            <span className="text-muted text-sm font-normal">{currentMarketIndex + 1} of {marketEvents.length}</span>
          </div>

          {/* Market Cards with Horizontal Scroll */}
          <div ref={scrollContainerRef} className="w-full flex-1 overflow-x-auto horizontal-scroll">
            <div className="flex gap-2 px-3 pb-3">
              {/* Market Cards */}
              {marketEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="w-[90vw] flex-shrink-0 px-3 py-3.5 gradient-card rounded-[10px] border border-border flex flex-col justify-start items-start gap-3.5"
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
                      <Button 
                        className="w-full h-9 px-2 py-1.5 rounded-lg flex justify-center items-center gap-1"
                        style={{ backgroundColor: '#131712' }}
                      >
                        <span className="text-[13px] font-normal" style={{ color: '#35D536' }}>Yes</span>
                        <span className="text-[13px] font-normal" style={{ color: '#35D536' }}>30¢</span>
                      </Button>
                      <div className="w-full text-center">
                        <span className="text-subtle text-[13px] font-normal">$100 → </span>
                        <span className="text-success text-[13px] font-normal">$120</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-1">
                      <Button 
                        className="w-full h-9 px-2 py-1.5 rounded-lg flex justify-center items-center gap-1"
                        style={{ backgroundColor: '#131010' }}
                      >
                        <span className="text-[13px] font-normal" style={{ color: '#F34E4F' }}>No</span>
                        <span className="text-[13px] font-normal" style={{ color: '#F34E4F' }}>80¢</span>
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
        </div>
      </div>


    </motion.div>
  );
}