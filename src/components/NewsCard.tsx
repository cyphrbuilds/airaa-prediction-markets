'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { NewsItem } from '@/data/mockData';
import { TrendingUp, Clock, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  newsItem: NewsItem;
  onMarketInteraction?: (isInteracting: boolean) => void;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  isBackgroundCard?: boolean;
  isLastNews?: boolean;
  onScrollToTop?: () => void;
}

export default function NewsCard({ newsItem, onMarketInteraction, swipeDirection, isBackgroundCard, isLastNews, onScrollToTop }: NewsCardProps) {
  const marketEvents = newsItem.events.slice(0, 2); // Max 2 events
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteractingWithMarkets = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Handle scroll events to update current market index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || marketEvents.length <= 1) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      setCurrentMarketIndex(Math.min(newIndex, marketEvents.length - 1));
      
      // Debug logging
      console.log('Market scroll:', { scrollLeft, containerWidth, newIndex, marketEventsLength: marketEvents.length });
    };

    // Handle touch events - only prevent bubbling if there are multiple markets
    const hasMultipleMarkets = marketEvents.length > 1;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (hasMultipleMarkets) {
        // Don't prevent default - let the browser handle scrolling
        e.stopPropagation();
        isInteractingWithMarkets.current = true;
        onMarketInteraction?.(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (hasMultipleMarkets) {
        // Don't prevent default - let the browser handle scrolling
        // e.stopPropagation(); // Removed to allow native mobile scrolling
        isInteractingWithMarkets.current = true;
        onMarketInteraction?.(true);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (hasMultipleMarkets) {
        e.stopPropagation();
        // Reset after a short delay to allow for any pending events
        setTimeout(() => {
          isInteractingWithMarkets.current = false;
          onMarketInteraction?.(false);
        }, 100);
      }
    };

    // Mouse events for desktop/tablet - only prevent bubbling if there are multiple markets
    const handleMouseDown = (e: MouseEvent) => {
      if (hasMultipleMarkets) {
        e.stopPropagation();
        isInteractingWithMarkets.current = true;
        onMarketInteraction?.(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (hasMultipleMarkets) {
        e.stopPropagation();
        setTimeout(() => {
          isInteractingWithMarkets.current = false;
          onMarketInteraction?.(false);
        }, 100);
      }
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    
    // Add wheel event for desktop scrolling
    const handleWheel = (e: WheelEvent) => {
      if (hasMultipleMarkets) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [marketEvents.length]);

  // Handle market card swipe animations
  const handleMarketCardPan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const threshold = 50;
    
    // Only handle horizontal swipes
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 500) {
        // Determine swipe direction
        if (offset.x > 0) {
          // Swipe right - go to previous market
          if (currentMarketIndex > 0) {
            setCurrentMarketIndex(currentMarketIndex - 1);
            // Scroll to previous card
            if (scrollContainerRef.current) {
              const containerWidth = scrollContainerRef.current.clientWidth;
              scrollContainerRef.current.scrollTo({
                left: (currentMarketIndex - 1) * containerWidth,
                behavior: 'smooth'
              });
            }
          }
        } else {
          // Swipe left - go to next market
          if (currentMarketIndex < marketEvents.length - 1) {
            setCurrentMarketIndex(currentMarketIndex + 1);
            // Scroll to next card
            if (scrollContainerRef.current) {
              const containerWidth = scrollContainerRef.current.clientWidth;
              scrollContainerRef.current.scrollTo({
                left: (currentMarketIndex + 1) * containerWidth,
                behavior: 'smooth'
              });
            }
          }
        }
      }
    }
  };

  // Define directional animations based on swipe direction
  const getInitialAnimation = () => {
    if (!swipeDirection) return { opacity: 0, y: 50 };
    
    switch (swipeDirection) {
      case 'up':
        return { opacity: 0, y: 100 };
      case 'down':
        return { opacity: 0, y: -100 };
      case 'left':
        return { opacity: 0, x: 100 };
      case 'right':
        return { opacity: 0, x: -100 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getExitAnimation = () => {
    if (!swipeDirection) return { opacity: 0, y: -50 };
    
    switch (swipeDirection) {
      case 'up':
        return { opacity: 0, y: -100 };
      case 'down':
        return { opacity: 0, y: 100 };
      case 'left':
        return { opacity: 0, x: -100 };
      case 'right':
        return { opacity: 0, x: 100 };
      default:
        return { opacity: 0, y: -50 };
    }
  };

  return (
    <motion.div
      className="w-full h-full px-4 pt-2 pb-4 flex flex-col justify-start items-start gap-4"
      initial={isBackgroundCard ? { opacity: 1, x: 0, y: 0 } : getInitialAnimation()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={getExitAnimation()}
      transition={{ duration: 0.3, ease: "easeInOut" }}
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
              <Badge className={`h-7 px-2 py-1 text-sm font-normal border ${
                newsItem.sentiment === 'Bullish' ? 'sentiment-bullish' :
                newsItem.sentiment === 'Bearish' ? 'sentiment-bearish' :
                'sentiment-neutral'
              }`}>
                {newsItem.sentiment}
              </Badge>
              <Badge className={`h-7 px-2 py-1 text-sm font-normal border ${
                newsItem.impact === 'High Impact' ? 'impact-high' :
                newsItem.impact === 'Medium Impact' ? 'impact-medium' :
                'impact-low'
              }`}>
                {newsItem.impact}
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
          <div 
            ref={scrollContainerRef} 
            className="w-full flex-1 overflow-x-auto horizontal-scroll market-cards-scroll"
            style={{ touchAction: 'pan-x' }}
          >
            <div className="flex gap-2 px-3 pb-3">
              {/* Market Cards */}
              {marketEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="market-card flex-shrink-0 px-3 py-3.5 gradient-card rounded-[10px] border border-border flex flex-col justify-start items-start gap-3.5 scroll-snap-align-start"
                  initial={{ opacity: 0, x: index === 0 ? 0 : 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: currentMarketIndex === index ? 1 : 0.95
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onPan={handleMarketCardPan}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  whileDrag={{ 
                    scale: 1.02,
                    rotate: currentMarketIndex === index ? 0 : 2
                  }}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Volume and Expiry */}
                  <div className="w-full flex justify-between items-center">
                    <span className="text-subtle text-[13px] font-normal leading-none">
                      {event.totalVolume}
                    </span>
                    <span className="text-subtle text-[13px] font-normal leading-none">
                      Expire on {event.markets[0]?.expiryDate || 'TBD'}
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
                        <span className="text-[13px] font-normal" style={{ color: '#35D536' }}>
                          {Math.round((event.markets[0]?.yesPrice || 0) * 100)}¢
                        </span>
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
                        <span className="text-[13px] font-normal" style={{ color: '#F34E4F' }}>
                          {Math.round((event.markets[0]?.noPrice || 0) * 100)}¢
                        </span>
                      </Button>
                      <div className="w-full text-center">
                        <span className="text-subtle text-[13px] font-normal">$40 → </span>
                        <span className="text-success text-[13px] font-normal">$120</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Last News Indicator */}
      {isLastNews && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex flex-col items-center justify-center gap-2 py-3"
        >
          <p className="text-muted text-sm">You have reached the end!</p>
          
          <motion.button
            onClick={onScrollToTop}
            className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white text-black rounded-full text-xs font-medium hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-3 h-3" />
            <span>Back to Latest</span>
          </motion.button>
        </motion.div>
      )}

    </motion.div>
  );
}
