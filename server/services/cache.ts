interface CacheEntry {
  answer: string
  sources: { category: string; title: string }[]
  timestamp: number
}

const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
const MAX_ENTRIES = 100

class QueryCache {
  private store = new Map<string, CacheEntry>()

  private normalize(query: string): string {
    return query.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  get(query: string): CacheEntry | null {
    const key = this.normalize(query)
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      this.store.delete(key)
      return null
    }
    return entry
  }

  set(query: string, data: Omit<CacheEntry, 'timestamp'>): void {
    const key = this.normalize(query)
    // Evict oldest if at capacity
    if (this.store.size >= MAX_ENTRIES) {
      const firstKey = this.store.keys().next().value
      if (firstKey) this.store.delete(firstKey)
    }
    this.store.set(key, { ...data, timestamp: Date.now() })
  }

  get size(): number {
    return this.store.size
  }

  clear(): void {
    this.store.clear()
  }
}

// Module-level singleton — persists across requests in the same Node.js process
export const queryCache = new QueryCache()
