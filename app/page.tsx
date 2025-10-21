'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoCard } from '@/components/TodoCard';
import { AddTodoModal } from '@/components/AddTodoModal';
import { FloatingAddButton } from '@/components/FloatingAddButton';
import { EmptyState } from '@/components/EmptyState';
import { useTodos } from '@/contexts/TodoContext';
import { CheckSquare2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const { todos } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <CheckSquare2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Todo App
                </h1>
                <p className="text-slate-400 text-sm">
                  {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>
            </motion.div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex bg-slate-800/50 rounded-lg p-1">
                {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                  <motion.div key={filterType} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={filter === filterType ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setFilter(filterType)}
                      className={`
                        capitalize text-sm transition-all duration-300
                        ${filter === filterType
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                        }
                      `}
                    >
                      {filterType}
                      {filterType === 'active' && activeCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                          {activeCount}
                        </span>
                      )}
                      {filterType === 'completed' && completedCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 rounded-full">
                          {completedCount}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {filteredTodos.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filteredTodos.map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setIsModalOpen(true)} />

      {/* Add Todo Modal */}
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Debug: Show modal state */}
      {isModalOpen && (
        <div className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded z-50">
          Modal is open!
        </div>
      )}
    </div>
  );
}
