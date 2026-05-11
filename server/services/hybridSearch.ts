import type { KnowledgeChunk } from '@/lib/portfolio-knowledge'

export interface EmbeddingRecord {
  id: string
  embedding: number[]
}

export interface SearchResult {
  chunk: KnowledgeChunk
  score: number
  semanticScore: number
  kwScore: number
}

// ── Cosine Similarity ────────────────────────────────────────────────────────
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB)
  return denom === 0 ? 0 : dot / denom
}

// ── Keyword Score (0–1) ───────────────────────────────────────────────────────
function keywordScore(query: string, chunk: KnowledgeChunk): number {
  const queryWords = query
    .toLowerCase()
    .split(/[\s,.\-!?]+/)
    .filter((w) => w.length > 2)

  if (queryWords.length === 0) return 0

  const haystack = [
    ...chunk.keywords,
    ...chunk.tags,
    chunk.title,
    chunk.content,
  ]
    .join(' ')
    .toLowerCase()

  let matches = 0
  for (const word of queryWords) {
    if (haystack.includes(word)) matches++
  }
  return matches / queryWords.length
}

// ── Hybrid Search ─────────────────────────────────────────────────────────────
// score = 0.7 × cosine_similarity + 0.3 × keyword_match
export function hybridSearch(
  query: string,
  queryEmbedding: number[],
  chunks: KnowledgeChunk[],
  embeddings: EmbeddingRecord[],
  topK: number,
  threshold: number
): SearchResult[] {
  const embMap = new Map(embeddings.map((e) => [e.id, e.embedding]))

  const scored: SearchResult[] = chunks.map((chunk) => {
    const chunkEmb = embMap.get(chunk.id) ?? []
    const semanticScore = chunkEmb.length > 0
      ? cosineSimilarity(queryEmbedding, chunkEmb)
      : 0
    const kwScore = keywordScore(query, chunk)
    const score = 0.7 * semanticScore + 0.3 * kwScore
    return { chunk, score, semanticScore, kwScore }
  })

  return scored
    .filter((r) => r.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}
