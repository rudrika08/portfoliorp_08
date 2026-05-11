'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { SendHorizonal, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (query: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const MAX_CHARS = 500

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading || trimmed.length > MAX_CHARS) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }

  const remaining = MAX_CHARS - value.length
  const isOverLimit = remaining < 0

  return (
    <div className="px-3 py-3">
      <div className="flex items-end gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 focus-within:border-primary/60 transition-colors">
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask about skills, projects, experience…"
          rows={1}
          disabled={isLoading}
          aria-label="Chat message input"
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-50 max-h-[120px] leading-relaxed"
          style={{ overflowY: 'hidden' }}
        />
        <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
          {value.length > 0 && (
            <span
              className={`text-[10px] tabular-nums ${
                isOverLimit ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {remaining}
            </span>
          )}
          <button
            id="chat-send-button"
            onClick={handleSend}
            disabled={isLoading || !value.trim() || isOverLimit}
            aria-label="Send message"
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'hsl(11 76% 68%)' }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-white animate-spin" />
            ) : (
              <SendHorizonal className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground/50 text-center mt-1.5">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
