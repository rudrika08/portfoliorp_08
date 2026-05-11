'use client'

import { motion } from 'framer-motion'
import { User, Bot, Layers, Briefcase, Code2, GraduationCap, Mail, BookOpen } from 'lucide-react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: { category: string; title: string }[]
  isStreaming?: boolean
}

const categoryMeta: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  bio:        { icon: <User className="h-3 w-3" />,         label: 'About',      color: 'hsl(270 60% 65%)' },
  education:  { icon: <GraduationCap className="h-3 w-3" />, label: 'Education',  color: 'hsl(200 70% 55%)' },
  experience: { icon: <Briefcase className="h-3 w-3" />,    label: 'Experience', color: 'hsl(145 60% 45%)' },
  projects:   { icon: <Code2 className="h-3 w-3" />,        label: 'Projects',   color: 'hsl(11 76% 62%)'  },
  skills:     { icon: <Layers className="h-3 w-3" />,        label: 'Skills',     color: 'hsl(48 90% 50%)'  },
  contact:    { icon: <Mail className="h-3 w-3" />,          label: 'Contact',    color: 'hsl(340 70% 60%)' },
}

function SourceChip({ category, title }: { category: string; title: string }) {
  const meta = categoryMeta[category] ?? {
    icon: <BookOpen className="h-3 w-3" />,
    label: category,
    color: 'hsl(var(--muted-foreground))',
  }

  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border"
      style={{
        color: meta.color,
        borderColor: `${meta.color}40`,
        background: `${meta.color}15`,
      }}
      title={title}
    >
      {meta.icon}
      {meta.label}
    </span>
  )
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  // Deduplicate sources by category
  const uniqueSources = message.sources
    ? Array.from(new Map(message.sources.map((s) => [s.category, s])).values())
    : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`flex items-end gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: isUser ? 'hsl(11 76% 68%)' : 'hsl(var(--muted))',
          }}
        >
          {isUser
            ? <User className="h-3.5 w-3.5 text-white" />
            : <Bot className="h-3.5 w-3.5 text-muted-foreground" />
          }
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words ${
            isUser
              ? 'rounded-br-sm text-white'
              : 'rounded-bl-sm text-foreground border border-border'
          }`}
          style={
            isUser
              ? { background: 'hsl(11 76% 62%)' }
              : { background: 'hsl(var(--card) / 0.7)', backdropFilter: 'blur(8px)' }
          }
        >
          {message.content
            ? message.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < message.content.split('\n').length - 1 && <br />}
                </span>
              ))
            : null}

          {/* Streaming cursor */}
          {message.isStreaming && (
            <span className="inline-block w-0.5 h-4 ml-0.5 bg-current align-middle animate-pulse rounded-full" />
          )}
        </div>
      </div>

      {/* Source chips — shown below AI messages */}
      {!isUser && uniqueSources.length > 0 && !message.isStreaming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-1 ml-9"
        >
          {uniqueSources.map((s) => (
            <SourceChip key={s.category} category={s.category} title={s.title} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
