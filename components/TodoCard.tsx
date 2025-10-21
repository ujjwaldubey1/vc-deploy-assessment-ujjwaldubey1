'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit2, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';

interface TodoCardProps {
  todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
  };

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, text: editText.trim() } });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`
        group relative overflow-hidden transition-all duration-300 ease-in-out
        ${todo.completed 
          ? 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500/30' 
          : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50'
        }
        hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10
        backdrop-blur-sm border-2
      `}>
        <div className="p-4 flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggle}
              className="
                w-5 h-5 rounded-full border-2 border-slate-400
                data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-500
                data-[state=checked]:border-indigo-500
                transition-all duration-300 ease-in-out
              "
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleEdit}
                autoFocus
                className="
                  bg-transparent border-none p-0 text-slate-100 placeholder:text-slate-400
                  focus:ring-0 focus:border-none focus:outline-none
                "
              />
            ) : (
              <motion.p
                className={`
                  text-slate-100 transition-all duration-300 ease-in-out
                  ${todo.completed 
                    ? 'line-through text-slate-400 opacity-70' 
                    : 'text-slate-100'
                  }
                `}
                initial={false}
                animate={{
                  opacity: todo.completed ? 0.7 : 1,
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
              >
                {todo.text}
              </motion.p>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {!isEditing ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="
                      h-8 w-8 p-0 text-slate-400 hover:text-indigo-400
                      hover:bg-indigo-500/20 transition-all duration-300
                    "
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="
                      h-8 w-8 p-0 text-slate-400 hover:text-red-400
                      hover:bg-red-500/20 transition-all duration-300
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEdit}
                    className="
                      h-8 w-8 p-0 text-emerald-400 hover:text-emerald-300
                      hover:bg-emerald-500/20 transition-all duration-300
                    "
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="
                      h-8 w-8 p-0 text-red-400 hover:text-red-300
                      hover:bg-red-500/20 transition-all duration-300
                    "
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-500 ease-in-out pointer-events-none
          ${todo.completed 
            ? 'bg-gradient-to-r from-emerald-500/5 to-teal-500/5' 
            : 'bg-gradient-to-r from-indigo-500/5 to-purple-500/5'
          }
        `} />
      </Card>
    </motion.div>
  );
}
