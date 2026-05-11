'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const SUGGESTED_QUERIES = [
  { label: 'Projects built',       query: 'What projects has Rudrika built?' },
  { label: 'Technical skills',     query: 'What are her technical skills and tech stack?' },
  { label: 'ISRO internship',      query: 'Tell me about her experience at ISRO.' },
  { label: 'AI / ML experience',   query: 'What is her experience with AI and ML?' },
  { label: 'How to contact',       query: 'How can I contact or hire Rudrika?' },
]

interface SuggestedQueriesProps {
  onSelect: (query: string) => void
}

export default function SuggestedQueries({ onSelect }: SuggestedQueriesProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      {/* Welcome */}
      <div className="space-y-2">
        <div
          className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: 'hsl(11 76% 68% / 0.15)', border: '1px solid hsl(11 76% 68% / 0.3)' }}
        >
          <Sparkles className="h-6 w-6" style={{ color: 'hsl(11 76% 62%)' }} />
        </div>
        <h3 className="text-sm font-semibold">Ask anything about Rudrika</h3>
        <p className="text-xs text-muted-foreground max-w-[260px] mx-auto">
          Powered by RAG — answers are grounded in her actual portfolio data.
        </p>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-[340px]">
        {SUGGESTED_QUERIES.map((item, i) => (
          <motion.button
            key={item.query}
            id={`suggested-query-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(item.query)}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            {item.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
