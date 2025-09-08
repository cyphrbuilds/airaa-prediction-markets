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
      {/* Logo and Brand */}
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 relative">
          <img
            src="/logo.png"
            alt="BetTheNews Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-white text-lg font-semibold">BetTheNews</span>
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