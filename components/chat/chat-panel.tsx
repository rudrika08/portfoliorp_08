'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Bot, X, Trash2, RotateCcw } from 'lucide-react'
import MessageBubble, { type Message } from './message-bubble'
import ChatInput from './chat-input'
import SuggestedQueries from './suggested-queries'

interface ChatPanelProps {
  onClose: () => void
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendQuery = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return

    setError(null)
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    // Placeholder AI message that gets filled in during streaming
    const aiId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      { id: aiId, role: 'assistant', content: '', sources: [], isStreaming: true },
    ])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({ query }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error ?? `Server error ${res.status}`)
      }

      const contentType = res.headers.get('content-type') ?? ''

      // ── SSE streaming path ────────────────────────────────────────────────
      if (contentType.includes('text/event-stream') && res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let finalSources: Message['sources'] = []

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const payload = JSON.parse(line.slice(6))

              if (payload.error) throw new Error(payload.error)
              if (payload.status) continue // status message — skip

              if (payload.done) {
                finalSources = payload.sources ?? []
              } else if (payload.token) {
                // If it's a cached full answer (cached: true with full token), set directly
                const isFull = payload.cached === true
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiId
                      ? {
                          ...m,
                          content: isFull ? payload.token : m.content + payload.token,
                          isStreaming: !isFull,
                        }
                      : m
                  )
                )
              }
            } catch (parseErr) {
              if (parseErr instanceof Error && parseErr.message !== 'Unexpected end of JSON input')
                throw parseErr
            }
          }
        }

        // Finalize
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId ? { ...m, isStreaming: false, sources: finalSources } : m
          )
        )
      } else {
        // ── JSON fallback path ────────────────────────────────────────────────
        const data = await res.json()
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId
              ? { ...m, content: data.answer, sources: data.sources ?? [], isStreaming: false }
              : m
          )
        )
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setError(msg)
      setMessages((prev) => prev.filter((m) => m.id !== aiId))
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <motion.div
      id="chat-panel"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[420px] h-[580px] flex flex-col rounded-2xl border border-border shadow-2xl overflow-hidden"
      style={{
        background: 'hsl(var(--card) / 0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0"
        style={{ background: 'hsl(11 76% 68% / 0.12)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background: 'hsl(11 76% 68%)' }}
          >
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">AskRuD</p>
            <p className="text-xs text-muted-foreground -mt-0.5">AI assistant about Rudrika</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              title="Clear chat"
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
        {messages.length === 0 ? (
          <SuggestedQueries onSelect={sendQuery} />
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            <RotateCcw className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-border">
        <ChatInput onSend={sendQuery} isLoading={isLoading} />
      </div>
    </motion.div>
  )
}
