'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import Logo from './Logo';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, onSearch }: CategoryFilterProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="w-full bg-background border-b border-border sticky top-0 z-30 backdrop-blur-sm bg-background/95">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Logo />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className="h-8 w-8 rounded-full hover:bg-accent"
          >
            {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
        
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news and markets..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pl-10 pr-4 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={selectedCategory === category ? "default" : "secondary"}
                className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}