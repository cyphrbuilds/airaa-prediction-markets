'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search news and markets..." }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Search size={20} className="text-gray-600" />
        </motion.button>
      ) : (
        <motion.div
          className="absolute top-0 right-0 bg-white rounded-full shadow-lg border border-gray-200 z-40"
          initial={{ width: 40, opacity: 0 }}
          animate={{ width: 250, opacity: 1 }}
          exit={{ width: 40, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-sm outline-none bg-transparent"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </form>
        </motion.div>
      )}
    </div>
  );
}