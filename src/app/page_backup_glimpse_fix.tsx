'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { mockNewsData, categories } from '@/data/mockData';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import MarketsPanel from '@/components/MarketsPanel';
import CategoryFilter from '@/components/CategoryFilter';
import DesktopWarning from '@/components/DesktopWarning';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMarketsOpen, setIsMarketsOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | 'left' | 'right' | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isInteractingWithMarkets, setIsInteractingWithMarkets] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastSwipeTime = useRef(0);

  // Filter news based on selected category and search query
  const filteredNews = mockNewsData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentNews = filteredNews[currentIndex];
  
  // Get next and previous cards for stacking
  const getNextIndex = (index: number) => index < filteredNews.length - 1 ? index + 1 : 0;
  const getPrevIndex = (index: number) => index > 0 ? index - 1 : filteredNews.length - 1;
  
  const nextNews = filteredNews[getNextIndex(currentIndex)];
  const prevNews = filteredNews[getPrevIndex(currentIndex)];

  const handleSwipe = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 300 || isTransitioning) return; // Prevent rapid swipes
    lastSwipeTime.current = now;

    setIsTransitioning(true);
    setSwipeDirection(direction);

    if (direction === 'up') {
      // Next story - infinite scroll
      const nextIndex = currentIndex < filteredNews.length - 1 ? currentIndex + 1 : 0;
      // Delay the index change to allow animation to complete
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        setSwipeDirection(undefined);
      }, 400);
    } else if (direction === 'down') {
      // Previous story - infinite scroll
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredNews.length - 1;
      setTimeout(() => {
        setCurrentIndex(prevIndex);
        setIsTransitioning(false);
        setSwipeDirection(undefined);
      }, 400);
    } else if (direction === 'left') {
      // Swipe left = move to next category (tabs move right) - infinite scroll
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const nextIndex = currentCategoryIndex < categories.length - 1 ? currentCategoryIndex + 1 : 0;
      const nextCategory = categories[nextIndex];
      setTimeout(() => {
        setSelectedCategory(nextCategory);
        setCurrentIndex(0);
        setIsTransitioning(false);
        setSwipeDirection(undefined);
      }, 400);
    } else if (direction === 'right') {
      // Swipe right = move to previous category (tabs move left) - infinite scroll
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const prevIndex = currentCategoryIndex > 0 ? currentCategoryIndex - 1 : categories.length - 1;
      const prevCategory = categories[prevIndex];
      setTimeout(() => {
        setSelectedCategory(prevCategory);
        setCurrentIndex(0);
        setIsTransitioning(false);
        setSwipeDirection(undefined);
      }, 400);
    }
  }, [currentIndex, filteredNews.length, selectedCategory, isTransitioning]);

  const handlePanEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const { offset, velocity } = info;

    // Check if the touch started on a market card area
    const target = event.target as HTMLElement;
    const isMarketCardArea = target.closest('.market-cards-scroll') || target.closest('.horizontal-scroll');
    
    // Check if there are multiple market cards (if only one, allow category changes)
    const hasMultipleMarkets = currentNews?.events && currentNews.events.length > 1;
    
    // Determine swipe direction based on offset and velocity
    if (Math.abs(offset.y) > Math.abs(offset.x)) {
      // Vertical swipe - always allow
      if (offset.y > threshold || velocity.y > 500) {
        handleSwipe('down');
      } else if (offset.y < -threshold || velocity.y < -500) {
        handleSwipe('up');
      }
    } else {
      // Horizontal swipe logic
      if (isMarketCardArea) {
        // If on market cards area - never change category, regardless of single or multiple markets
        return;
      } else {
        // Not on market cards area - always allow category changes
        if (offset.x > threshold || velocity.x > 500) {
          handleSwipe('right'); // Swipe right = move to previous category
        } else if (offset.x < -threshold || velocity.x < -500) {
          handleSwipe('left'); // Swipe left = move to next category
        }
      }
    }
  }, [handleSwipe, currentNews]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Reset to first item when changing category
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentIndex(0); // Reset to first item when searching
  }, []);


  const handleMarketsClose = useCallback(() => {
    setIsMarketsOpen(false);
  }, []);

  const handleMarketInteraction = useCallback((isInteracting: boolean) => {
    setIsInteractingWithMarkets(isInteracting);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // Show desktop warning on desktop
  if (!isMobile) {
    return <DesktopWarning />;
  }

  return (
    <div className="mobile-container bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />

      {/* Stacked News Cards Container */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Previous Card (Bottom Layer) */}
          {prevNews && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 0.9, opacity: 0.3, y: 0 }}
              animate={{ scale: 0.9, opacity: 0.3, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ zIndex: 10 }}
            >
              <NewsCard
                key={`prev-${selectedCategory}-${getPrevIndex(currentIndex)}`}
                newsItem={prevNews}
                onMarketInteraction={() => {}} // Disable interactions for background cards
                swipeDirection={undefined}
                isBackgroundCard={true}
              />
            </motion.div>
          )}

          {/* Next Card (Middle Layer) */}
          {nextNews && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 0.95, opacity: 0.7, y: 0 }}
              animate={{ scale: 0.95, opacity: 0.7, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ zIndex: 20 }}
            >
              <NewsCard
                key={`next-${selectedCategory}-${getNextIndex(currentIndex)}`}
                newsItem={nextNews}
                onMarketInteraction={() => {}}
                swipeDirection={undefined}
                isBackgroundCard={true}
              />
            </motion.div>
          )}

          {/* Current Card (Top Layer) */}
          {currentNews && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              drag={!isTransitioning}
              dragConstraints={{ top: -1000, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.1}
              onPanEnd={handlePanEnd}
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={{ 
                y: swipeDirection === 'up' ? -1000 : 0,
                scale: 1, 
                opacity: swipeDirection === 'up' ? 0 : 1 
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileDrag={{ scale: 1.02, rotate: 2 }}
              style={{ zIndex: 30 }}
            >
              <NewsCard
                key={`current-${selectedCategory}-${currentIndex}`}
                newsItem={currentNews}
                onMarketInteraction={handleMarketInteraction}
                swipeDirection={swipeDirection}
                isBackgroundCard={false}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Markets Panel */}
      <MarketsPanel
        isOpen={isMarketsOpen}
        onClose={handleMarketsClose}
        events={currentNews?.events || []}
      />

    </div>
  );
}