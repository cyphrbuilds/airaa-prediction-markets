'use client';

import { motion } from 'framer-motion';
import { categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import Logo from './Logo';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, onSearch }: CategoryFilterProps) {
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
            onClick={() => onSearch('')}
            className="h-8 w-8 rounded-full hover:bg-accent"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
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