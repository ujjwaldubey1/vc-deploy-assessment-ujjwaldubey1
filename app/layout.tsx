import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TodoProvider } from '@/contexts/TodoContext'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Todo App',
  description: 'A beautiful, modern todo application with dark theme and smooth animations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}>
        <TodoProvider>
          {children}
          <Toaster />
        </TodoProvider>
      </body>
    </html>
  )
}
