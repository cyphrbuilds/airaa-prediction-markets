'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/mockData';
import { Search, X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, onSearch }: CategoryFilterProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to selected category when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedIndex = categories.indexOf(selectedCategory);
      if (selectedIndex !== -1) {
        const container = scrollContainerRef.current;
        const categoryButtons = container.querySelectorAll('button');
        const selectedButton = categoryButtons[selectedIndex];
        
        if (selectedButton) {
          const containerRect = container.getBoundingClientRect();
          const buttonRect = selectedButton.getBoundingClientRect();
          const scrollLeft = selectedButton.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
          
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [selectedCategory]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
      onSearch('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="w-full bg-background">
      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search news and markets..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 pr-4 bg-surface-secondary border border-border-secondary rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs with Fixed Search Icon */}
      <div className="px-4 py-3 flex items-center gap-2">
        {/* Category Tabs */}
        <div ref={scrollContainerRef} className="flex-1 flex justify-start items-center gap-0.5 overflow-x-auto horizontal-scroll">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <button
                onClick={() => onCategoryChange(category)}
                className={`h-[34px] px-3 py-2 rounded-lg flex justify-center items-center transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-surface-tertiary shadow-[inset_0px_-4px_10px_0px_rgba(7,7,7,1.00)] outline outline-1 outline-offset-[-1px] outline-border-tertiary relative overflow-hidden'
                    : 'hover:bg-surface-secondary'
                }`}
              >
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 blur-sm" />
                )}
                <span className={`text-[15px] font-normal leading-tight relative z-10 ${
                  selectedCategory === category ? 'text-white' : 'text-foreground-secondary'
                }`}>
                  {category}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Fixed Search Toggle Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0"
        >
          <button
            onClick={handleSearchToggle}
            className="h-[34px] w-[34px] rounded-lg flex justify-center items-center hover:bg-surface-secondary transition-colors"
          >
            {isSearchOpen ? (
              <X className="h-4 w-4 text-foreground-secondary" />
            ) : (
              <Search className="h-4 w-4 text-foreground-secondary" />
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}