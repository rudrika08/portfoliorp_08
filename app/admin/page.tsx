'use client'

import { useState } from 'react'
import { portfolioChunks } from '@/lib/portfolio-knowledge'
import { Lock, RefreshCw, ChevronDown, ChevronUp, CheckCircle2, XCircle, Eye } from 'lucide-react'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123'

type RebuildStatus = 'idle' | 'loading' | 'success' | 'error'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [rebuildStatus, setRebuildStatus] = useState<RebuildStatus>('idle')
  const [rebuildMsg, setRebuildMsg] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  const handleRebuild = async () => {
    setRebuildStatus('loading')
    setRebuildMsg('')
    try {
      const res = await fetch('/api/embed', {
        method: 'POST',
        headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '' },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setRebuildStatus('success')
      setRebuildMsg(data.message ?? 'Embeddings rebuilt successfully.')
    } catch (err) {
      setRebuildStatus('error')
      setRebuildMsg(err instanceof Error ? err.message : 'Rebuild failed.')
    }
  }

  // ── Login gate ──────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'hsl(11 76% 68% / 0.15)', border: '1px solid hsl(11 76% 68% / 0.3)' }}>
              <Lock className="h-6 w-6" style={{ color: 'hsl(11 76% 62%)' }} />
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Portfolio RAG Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium block mb-1.5">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/60"
                placeholder="Enter admin password"
                autoFocus
              />
              {authError && <p className="text-destructive text-xs mt-1.5">Incorrect password.</p>}
            </div>
            <button type="submit" className="w-full py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: 'hsl(11 76% 62%)' }}>
              Unlock
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const categoryCount = portfolioChunks.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">RAG Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">Knowledge base · {portfolioChunks.length} chunks loaded</p>
          </div>
          <button
            onClick={handleRebuild}
            disabled={rebuildStatus === 'loading'}
            id="rebuild-embeddings-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-60 transition-all"
            style={{ background: 'hsl(11 76% 62%)' }}
          >
            <RefreshCw className={`h-4 w-4 ${rebuildStatus === 'loading' ? 'animate-spin' : ''}`} />
            {rebuildStatus === 'loading' ? 'Rebuilding…' : 'Rebuild Embeddings'}
          </button>
        </div>

        {/* Rebuild status */}
        {rebuildStatus !== 'idle' && rebuildStatus !== 'loading' && (
          <div className={`flex items-center gap-2 p-3 rounded-lg mb-6 text-sm ${rebuildStatus === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
            {rebuildStatus === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {rebuildMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {Object.entries(categoryCount).map(([cat, count]) => (
            <div key={cat} className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground capitalize">{cat}</p>
              <p className="text-2xl font-bold mt-1">{count}</p>
              <p className="text-xs text-muted-foreground">{count === 1 ? 'chunk' : 'chunks'}</p>
            </div>
          ))}
        </div>

        {/* Chunk list */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye className="h-4 w-4" /> Knowledge Chunks
          </h2>
          {portfolioChunks.map((chunk) => (
            <div key={chunk.id} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === chunk.id ? null : chunk.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{chunk.category}</span>
                  <span className="text-sm font-medium">{chunk.title}</span>
                </div>
                {expanded === chunk.id ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
              </button>
              {expanded === chunk.id && (
                <div className="px-4 pb-4 border-t border-border space-y-3">
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{chunk.content}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {chunk.keywords.map(kw => (
                      <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
