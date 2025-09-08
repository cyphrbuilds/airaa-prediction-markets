'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-14 px-4 py-3 flex justify-between items-center bg-background"
    >
      {/* Logo */}
      <div className="w-9 h-9 relative">
        <div className="w-[36.30px] h-[35.70px] bg-gradient-to-br from-green-400 to-green-600 rounded-[9.60px] flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M3 7h18M3 12h18M3 17h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Powered by Airaa */}
      <div className="flex justify-center items-end gap-2.5">
        <div className="text-center">
          <span className="text-white/40 text-xs font-normal">Powered by</span>
          <span className="text-white/40 text-xs font-medium"> </span>
          <span className="text-primary-green text-xs font-semibold underline">
            Airaa
          </span>
        </div>
      </div>
    </motion.div>
  );
}