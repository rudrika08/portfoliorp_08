interface RateLimitEntry {
  count: number
  windowStart: number
}

const MAX_REQUESTS = 10
const WINDOW_MS = 60 * 1000 // 1 minute

// Module-level store — lives in the Node.js process memory
const store = new Map<string, RateLimitEntry>()

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterMs: number
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    // New window
    store.set(ip, { count: 1, windowStart: now })
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterMs: 0 }
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterMs = WINDOW_MS - (now - entry.windowStart)
    return { allowed: false, remaining: 0, retryAfterMs }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, retryAfterMs: 0 }
}
