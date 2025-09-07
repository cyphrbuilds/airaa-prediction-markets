'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { mockNewsData, categories, NewsItem } from '@/data/mockData';
import NewsCard from '@/components/NewsCard';
import MarketsPanel from '@/components/MarketsPanel';
import CategoryFilter from '@/components/CategoryFilter';
import SwipeHint from '@/components/SwipeHint';
import DesktopWarning from '@/components/DesktopWarning';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMarketsOpen, setIsMarketsOpen] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | 'left' | 'right' | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const lastSwipeTime = useRef(0);

  // Filter news based on selected category and search query
  const filteredNews = mockNewsData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentNews = filteredNews[currentIndex];

  const handleSwipe = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 300) return; // Prevent rapid swipes
    lastSwipeTime.current = now;

    setSwipeDirection(direction);
    setShowSwipeHint(false);

    if (direction === 'up' || direction === 'right') {
      // Next story
      setCurrentIndex((prev) => (prev + 1) % filteredNews.length);
    } else if (direction === 'down' || direction === 'left') {
      // Previous story
      setCurrentIndex((prev) => (prev - 1 + filteredNews.length) % filteredNews.length);
    }

    // Reset swipe direction after animation
    setTimeout(() => setSwipeDirection(undefined), 300);
  }, [filteredNews.length]);

  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const threshold = 50;
    const { offset, velocity } = info;

    // Determine swipe direction based on offset and velocity
    if (Math.abs(offset.y) > Math.abs(offset.x)) {
      // Vertical swipe
      if (offset.y > threshold || velocity.y > 500) {
        handleSwipe('down');
      } else if (offset.y < -threshold || velocity.y < -500) {
        handleSwipe('up');
      }
    } else {
      // Horizontal swipe
      if (offset.x > threshold || velocity.x > 500) {
        handleSwipe('left');
      } else if (offset.x < -threshold || velocity.x < -500) {
        handleSwipe('right');
      }
    }
  }, [handleSwipe]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Reset to first item when changing category
    setShowSwipeHint(true); // Show hint again when changing categories
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleMarketsClick = useCallback(() => {
    setIsMarketsOpen(true);
  }, []);

  const handleMarketsClose = useCallback(() => {
    setIsMarketsOpen(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentIndex(0); // Reset to first item when searching
    setShowSwipeHint(true);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        handleSwipe('up');
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        handleSwipe('down');
      } else if (e.key === 'Escape') {
        setIsMarketsOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSwipe]);

  // Show desktop warning if not mobile
  if (!isMobile) {
    return <DesktopWarning />;
  }

  if (!currentNews) {
    return (
      <div className="mobile-container bg-background">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
        />
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-2">
              {searchQuery ? 'No results found' : 'No news available for this category'}
            </p>
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="text-primary hover:text-primary/80 text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-background">
      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />

      {/* News Card Container */}
      <div className="relative">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onPanEnd={handlePanEnd}
          className="w-full"
          whileDrag={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            <NewsCard
              key={`${selectedCategory}-${currentIndex}`}
              newsItem={currentNews}
              onMarketsClick={handleMarketsClick}
              currentIndex={currentIndex}
              totalItems={filteredNews.length}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Markets Panel */}
      <MarketsPanel
        isOpen={isMarketsOpen}
        onClose={handleMarketsClose}
        events={currentNews.events}
      />

      {/* Swipe Hint */}
      <SwipeHint 
        show={showSwipeHint && currentIndex === 0} 
        direction={swipeDirection}
      />

      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              ↻
            </motion.div>
            <span>Refreshing...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}