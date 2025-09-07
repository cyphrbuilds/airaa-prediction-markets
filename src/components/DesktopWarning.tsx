'use client';

import { motion } from 'framer-motion';
import { Smartphone, ArrowRight } from 'lucide-react';

export default function DesktopWarning() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Smartphone className="w-8 h-8 text-blue-600" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Mobile Experience Required
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          This app is designed for mobile devices. Please use your phone or enable mobile view in your browser for the best experience.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>1. Open Developer Tools (F12)</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>2. Click device toggle</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>3. Select mobile device</span>
          </div>
        </div>
        
        <motion.div
          className="mt-6 flex items-center justify-center space-x-2 text-blue-600"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Swipe to navigate</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}