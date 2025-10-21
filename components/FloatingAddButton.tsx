'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        whileHover={{ 
          scale: 1.1,
          rotate: 90,
          boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)'
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Button
          onClick={onClick}
          size="lg"
          className="
            w-16 h-16 rounded-full
            bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600
            shadow-2xl shadow-indigo-500/30
            border-0 transition-all duration-300
            group
          "
        >
          <motion.div
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-8 h-8 text-white" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-indigo-400/20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
