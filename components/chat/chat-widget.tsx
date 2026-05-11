'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ChatPanel from './chat-panel'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  // Open from hero button
  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-portfolio-chat', handler)
    return () => window.removeEventListener('open-portfolio-chat', handler)
  }, [])

  return (
    <>
      {/* Floating action button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-full px-3 py-1.5 text-xs text-muted-foreground shadow-md hidden sm:block"
            >
              <kbd className="font-mono">Ctrl+K</kbd> to chat
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={buttonRef}
          id="chat-widget-button"
          aria-label={isOpen ? 'Close portfolio chat' : 'Open portfolio chat'}
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(11,76%,68%)] shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:scale-105 transition-transform"
          style={{ background: 'hsl(11 76% 68%)' }}
        >
          {/* Animated ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'hsl(11 76% 68%)' }} />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path
                    d="M14 2C7.373 2 2 7.149 2 13.5c0 3.17 1.3 6.03 3.4 8.08L4 26l4.72-1.38A12.1 12.1 0 0 0 14 25c6.627 0 12-5.149 12-11.5S20.627 2 14 2z"
                    fill="white"
                  />
                  <circle cx="10.5" cy="13" r="1.5" fill="#1a1a1a" />
                  <circle cx="17.5" cy="13" r="1.5" fill="#1a1a1a" />
                  <path
                    d="M10.5 17c0 0 1.5 2 3.5 2s3.5-2 3.5-2"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
