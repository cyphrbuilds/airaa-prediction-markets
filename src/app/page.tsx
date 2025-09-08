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

  const handleSwipe = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 300) return; // Prevent rapid swipes
    lastSwipeTime.current = now;

    setSwipeDirection(direction);

    if (direction === 'up') {
      // Next story
      if (currentIndex < filteredNews.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (direction === 'down') {
      // Previous story
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (direction === 'left') {
      // Swipe left = move to next category (tabs move right)
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      if (currentCategoryIndex < categories.length - 1) {
        const nextCategory = categories[currentCategoryIndex + 1];
        setSelectedCategory(nextCategory);
        setCurrentIndex(0);
      }
    } else if (direction === 'right') {
      // Swipe right = move to previous category (tabs move left)
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      if (currentCategoryIndex > 0) {
        const prevCategory = categories[currentCategoryIndex - 1];
        setSelectedCategory(prevCategory);
        setCurrentIndex(0);
      }
    }

    // Reset swipe direction after animation
    setTimeout(() => setSwipeDirection(undefined), 300);
  }, [currentIndex, filteredNews.length, selectedCategory]);

  const handlePanEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
        handleSwipe('right'); // Swipe right = move to previous category
      } else if (offset.x < -threshold || velocity.x < -500) {
        handleSwipe('left'); // Swipe left = move to next category
      }
    }
  }, [handleSwipe]);

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

      {/* News Card Container */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          onPanEnd={handlePanEnd}
          className="w-full h-full flex flex-col"
          whileDrag={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {currentNews && (
              <NewsCard
                key={`${selectedCategory}-${currentIndex}`}
                newsItem={currentNews}
              />
            )}
          </AnimatePresence>
        </motion.div>
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