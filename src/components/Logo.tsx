'use client';

import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-white font-bold text-sm">I</span>
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-black">
          AIRAA
        </span>
        <span className="text-xs text-gray-500 -mt-1">News & Markets</span>
      </div>
    </motion.div>
  );
}