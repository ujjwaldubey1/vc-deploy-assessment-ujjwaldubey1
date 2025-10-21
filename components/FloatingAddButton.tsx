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
    <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
      <Button
        onClick={onClick}
        size="icon"
        className="
          h-14 w-14 sm:h-16 sm:w-16 rounded-full
          bg-gradient-to-r from-indigo-500 to-purple-500
          hover:from-indigo-600 hover:to-purple-600
          shadow-xl sm:shadow-2xl shadow-indigo-500/30
          border-0 transition-all duration-300
          active:scale-95
        "
        aria-label="Add todo"
      >
        <Plus className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </Button>
    </div>
  );
}
