'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface SwipeHintProps {
  show: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function SwipeHint({ show, direction }: SwipeHintProps) {
  const getIcon = () => {
    switch (direction) {
      case 'up': return <ChevronUp size={20} />;
      case 'down': return <ChevronDown size={20} />;
      case 'left': return <ChevronLeft size={20} />;
      case 'right': return <ChevronRight size={20} />;
      default: return <ChevronUp size={20} />;
    }
  };

  const getText = () => {
    switch (direction) {
      case 'up': return 'Swipe up for next';
      case 'down': return 'Swipe down for previous';
      case 'left': return 'Swipe left for previous';
      case 'right': return 'Swipe right for next';
      default: return 'Swipe to navigate';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary/90 text-primary-foreground px-4 py-3 rounded-full text-sm flex items-center space-x-2 backdrop-blur-sm shadow-lg">
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {getIcon()}
            </motion.div>
            <span>{getText()}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}