'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface ProgressIndicatorProps {
  currentIndex: number;
  totalItems: number;
  className?: string;
}

export default function ProgressIndicator({ currentIndex, totalItems, className = '' }: ProgressIndicatorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Badge variant="outline" className="text-xs">
        {currentIndex + 1} of {totalItems}
      </Badge>
      <div className="flex space-x-1">
        {Array.from({ length: totalItems }, (_, index) => (
          <motion.div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            style={{ width: index === currentIndex ? '24px' : '8px' }}
            animate={{
              width: index === currentIndex ? '24px' : '8px',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}