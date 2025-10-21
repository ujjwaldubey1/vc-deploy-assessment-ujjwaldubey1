'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="relative mb-8"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="
          w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20
          flex items-center justify-center backdrop-blur-sm border border-indigo-500/30
          shadow-2xl shadow-indigo-500/20
        ">
          <CheckSquare className="w-12 h-12 text-indigo-400" />
        </div>
        
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-slate-200 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        No todos yet
      </motion.h3>
      
      <motion.p
        className="text-slate-400 text-lg max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Start by adding your first todo. Click the{' '}
        <motion.span
          className="inline-flex items-center gap-1 text-indigo-400 font-semibold"
          whileHover={{ scale: 1.1 }}
        >
          <Plus className="w-4 h-4" />
          button
        </motion.span>{' '}
        to get started!
      </motion.p>

      <motion.div
        className="mt-8 flex items-center gap-2 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">Let's make things happen!</span>
        <Sparkles className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}
