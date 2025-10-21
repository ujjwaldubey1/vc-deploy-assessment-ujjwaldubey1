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
    <div className="fixed bottom-8 right-8 z-50">
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
        <Plus className="w-8 h-8 text-white" />
      </Button>
    </div>
  );
}
