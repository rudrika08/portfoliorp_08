import { type NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/server/middleware/rateLimit'
import { runRAGStream, runRAGQuery } from '@/server/services/ragPipeline'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait a moment before trying again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(rateLimit.retryAfterMs / 1000)) },
      }
    )
  }

  // 2. Parse body
  let query: string
  try {
    const body = await req.json()
    query = (body?.query ?? '').toString().trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters.' }, { status: 400 })
  }
  if (query.length > 500) {
    return NextResponse.json({ error: 'Query too long (max 500 characters).' }, { status: 400 })
  }

  // 3. Prefer streaming; fall back to JSON if client doesn't accept SSE
  const acceptsSSE = req.headers.get('accept')?.includes('text/event-stream')

  if (acceptsSSE) {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          await runRAGStream(query, controller)
        } catch (err) {
          const encoder = new TextEncoder()
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Pipeline error. Please try again.' })}\n\n`
            )
          )
          controller.close()
          console.error('[/api/chat] stream error:', err)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  }

  // Non-streaming fallback
  try {
    const result = await runRAGQuery(query)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/chat] non-stream error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
