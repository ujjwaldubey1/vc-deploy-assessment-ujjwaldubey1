'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodos } from '@/contexts/TodoContext';
import { useToast } from '@/hooks/use-toast';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  const [text, setText] = useState('');
  const { dispatch } = useTodos();
  const { toast } = useToast();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: { text: text.trim() } });
      setText('');
      onClose();
      toast({
        title: "Todo added!",
        description: "Your new todo has been created successfully.",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="
        bg-gradient-to-br from-slate-800/90 to-slate-900/90 
        border-slate-700/50 backdrop-blur-xl
        shadow-2xl shadow-black/50
      ">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <DialogHeader className="space-y-3">
            <DialogTitle className="
              text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 
              bg-clip-text text-transparent
            ">
              Add New Todo
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="What needs to be done?"
                className="
                  bg-slate-800/50 border-slate-600/50 text-slate-100 
                  placeholder:text-slate-400 focus:border-indigo-500/50
                  focus:ring-indigo-500/20 transition-all duration-300
                  h-12 text-lg
                "
                autoFocus
              />
            </div>

            <div className="flex gap-3 justify-end">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="
                    border-slate-600/50 text-slate-300 hover:text-slate-100
                    hover:border-slate-500/50 hover:bg-slate-700/50
                    transition-all duration-300
                  "
                >
                  Cancel
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={!text.trim()}
                  className="
                    bg-gradient-to-r from-indigo-500 to-purple-500
                    hover:from-indigo-600 hover:to-purple-600
                    text-white border-0 shadow-lg shadow-indigo-500/25
                    transition-all duration-300 disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Todo
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
