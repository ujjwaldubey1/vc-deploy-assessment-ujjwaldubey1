'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, TodoAction } from '@/types/todo';

interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [...state, newTodo];
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, updatedAt: new Date() }
          : todo
      );
    
    case 'LOAD_TODOS':
      return action.payload.todos;
    
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        dispatch({ type: 'LOAD_TODOS', payload: { todos: parsedTodos } });
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
