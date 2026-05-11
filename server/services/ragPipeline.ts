import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import { portfolioChunks } from '@/lib/portfolio-knowledge'
import { hybridSearch, type EmbeddingRecord } from './hybridSearch'
import { queryCache } from './cache'

const SIMILARITY_THRESHOLD = 0.55
const TOP_K = 5

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set')
}
if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Embedding: Gemini (free tier, separate quota from generation)
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })

// Generation: Groq — llama-3.1-8b-instant (fast, free tier, not deprecated)
// Alternative for higher quality: 'llama-3.3-70b-versatile' (slower, lower rate limits)
const GROQ_MODEL = 'llama-3.3-70b-versatile'

let cachedEmbeddings: EmbeddingRecord[] | null = null

// ─────────────────────────────────────────────────────────────
// Load embeddings once per process
// ─────────────────────────────────────────────────────────────
function loadEmbeddings(): EmbeddingRecord[] {
  if (cachedEmbeddings) return cachedEmbeddings

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    cachedEmbeddings = require('@/lib/portfolio-embeddings.json') as EmbeddingRecord[]
    console.log(`[RAG] Loaded ${cachedEmbeddings.length} embeddings`)
    return cachedEmbeddings
  } catch (err) {
    console.error('[RAG] Failed to load portfolio-embeddings.json', err)
    return []
  }
}

// ─────────────────────────────────────────────────────────────
// Prompt Builder
// ─────────────────────────────────────────────────────────────
function buildSystemPrompt(context: string): string {
  return `You are an AI assistant representing Rudrika Panigrahi's professional portfolio.

STRICT RULES:
- Use ONLY the provided context
- Do NOT hallucinate
- Do NOT make up projects, skills, or experiences
- If information is missing, explicitly say so

STYLE:
- Professional and concise
- Recruiter-friendly
- Use bullet points for lists
- Keep answers under 200 words

Context:
${context}`
}

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export interface Source {
  category: string
  title: string
}

export interface RAGResult {
  answer: string
  sources: Source[]
  cached: boolean
}

// ─────────────────────────────────────────────────────────────
// Embed Query
// ─────────────────────────────────────────────────────────────
async function embedQuery(query: string): Promise<number[]> {
  try {
    const result = await embeddingModel.embedContent(
      `task: search result | query: ${query}`
    )
    return result.embedding.values
  } catch (err) {
    console.error('[RAG] Query embedding failed:', err) // <-- check your terminal for this
    throw err // throw the ORIGINAL error, not a new generic one
  }
}

// ─────────────────────────────────────────────────────────────
// Retrieve Context
// ─────────────────────────────────────────────────────────────
async function retrieveContext(query: string) {
  const embeddings = loadEmbeddings()
  const queryEmbedding = await embedQuery(query)
  const results = hybridSearch(
    query,
    queryEmbedding,
    portfolioChunks,
    embeddings,
    TOP_K,
    SIMILARITY_THRESHOLD
  )
  return results
}

// ─────────────────────────────────────────────────────────────
// Non-streaming fallback
// ─────────────────────────────────────────────────────────────
export async function runRAGQuery(query: string): Promise<RAGResult> {
  try {
    const cached = queryCache.get(query)
    if (cached) {
      return { answer: cached.answer, sources: cached.sources, cached: true }
    }

    const results = await retrieveContext(query)

    if (results.length === 0) {
      const fallback =
        "I couldn't find that in Rudrika's portfolio. Try asking about her projects, skills, experience, or contact information."
      queryCache.set(query, { answer: fallback, sources: [] })
      return { answer: fallback, sources: [], cached: false }
    }

    const context = results
      .map((r) => `[${r.chunk.title}]\n${r.chunk.content}`)
      .join('\n\n---\n\n')

    const sources: Source[] = results.map((r) => ({
      category: r.chunk.category,
      title: r.chunk.title,
    }))

    const response = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: buildSystemPrompt(context) },
        { role: 'user', content: query },
      ],
      temperature: 0.3,
      max_tokens: 512,
    })

    const answer = (response.choices[0]?.message?.content ?? 'No response generated.').trim()

    queryCache.set(query, { answer, sources })
    return { answer, sources, cached: false }
  } catch (err) {
    console.error('[RAG] Query pipeline failed:', err)
    return {
      answer: "I'm having trouble accessing the AI assistant right now. Please try again later.",
      sources: [],
      cached: false,
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Streaming version
// ─────────────────────────────────────────────────────────────
export async function runRAGStream(
  query: string,
  controller: ReadableStreamDefaultController
): Promise<void> {
  const encoder = new TextEncoder()

  const send = (payload: object) => {
    controller.enqueue(
      encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
    )
  }

  try {
    const cached = queryCache.get(query)
    if (cached) {
      send({ token: cached.answer, done: false, cached: true })
      send({ done: true, sources: cached.sources, cached: true })
      controller.close()
      return
    }

    send({ status: 'Searching portfolio...' })

    const results = await retrieveContext(query)

    if (results.length === 0) {
      const fallback =
        "I couldn't find that in Rudrika's portfolio. Try asking about her projects, skills, experience, or contact information."
      queryCache.set(query, { answer: fallback, sources: [] })
      send({ token: fallback, done: false })
      send({ done: true, sources: [], cached: false })
      controller.close()
      return
    }

    const context = results
      .map((r) => `[${r.chunk.title}]\n${r.chunk.content}`)
      .join('\n\n---\n\n')

    const sources: Source[] = results.map((r) => ({
      category: r.chunk.category,
      title: r.chunk.title,
    }))

    send({ status: 'Generating answer...' })

    let fullAnswer = ''

    try {
      const stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt(context) },
          { role: 'user', content: query },
        ],
        temperature: 0.3,
        max_tokens: 512,
        stream: true,
      })

      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content ?? ''
        if (token) {
          fullAnswer += token
          send({ token, done: false })
        }
      }
    } catch (streamErr) {
      console.error('[RAG] Streaming failed:', streamErr)
      send({ token: "I'm having trouble accessing the AI assistant right now. Please try again later.", done: false })
      send({ done: true, sources: [], cached: false })
      controller.close()
      return
    }

    send({ done: true, sources, cached: false })
    queryCache.set(query, { answer: fullAnswer, sources })
    controller.close()
  } catch (err) {
    console.error('[RAG] Stream pipeline failed:', err)
    send({ token: "I'm having trouble accessing the AI assistant right now. Please try again later.", done: false })
    send({ done: true, sources: [], cached: false })
    controller.close()
  }
}