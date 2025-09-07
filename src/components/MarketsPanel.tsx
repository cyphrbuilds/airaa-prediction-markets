'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PredictionEvent } from '@/data/mockData';
import { X, TrendingUp, ExternalLink } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MarketsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  events: PredictionEvent[];
}

export default function MarketsPanel({ isOpen, onClose, events }: MarketsPanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <SheetHeader className="px-4 pt-4 pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} className="text-primary" />
            <SheetTitle className="text-lg font-bold">Prediction Markets</SheetTitle>
          </div>
        </SheetHeader>
        
        <div className="overflow-y-auto flex-1 px-4">
          
          {/* Events */}
          {events.map((event, eventIndex) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: eventIndex * 0.1 }}
              className="mb-4 last:mb-0"
            >
              {/* Event Header */}
              <div className="flex items-center space-x-2 mb-3">
                <img
                  src={event.logo}
                  alt={event.title}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <h3 className="text-sm font-semibold text-gray-900">
                  {event.title}
                </h3>
              </div>
              
              {/* Market Rows */}
              <div className="space-y-2">
                {event.markets.map((market, marketIndex) => (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (eventIndex * 0.1) + (marketIndex * 0.05) }}
                    className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      {/* Topic */}
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">
                          {market.title}
                        </span>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs bg-green-50 border-green-200 text-green-600 hover:bg-green-100 py-1.5 px-3 rounded-lg"
                        >
                          Yes {Math.round(market.yesPrice * 100)}¢
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs bg-red-50 border-red-200 text-red-600 hover:bg-red-100 py-1.5 px-3 rounded-lg"
                        >
                          No {Math.round(market.noPrice * 100)}¢
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Event Footer */}
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs text-gray-600 pb-2 border-b border-gray-200">
                  <span>Total Volume</span>
                  <span className="font-semibold">{event.totalVolume}</span>
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}