'use client';

import { motion } from 'framer-motion';

interface KalashiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function KalashiLogo({ size = 'md', className = '' }: KalashiLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full h-full">
        {/* Kalashi Platform Logo - Abstract K shape */}
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="url(#kalashiGradient)"
            stroke="#000"
            strokeWidth="1"
          />
          
          {/* K shape */}
          <path
            d="M8 8 L8 24 M8 16 L20 8 M8 16 L20 24"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="kalashiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-sm -z-10" />
      </div>
    </motion.div>
  );
}