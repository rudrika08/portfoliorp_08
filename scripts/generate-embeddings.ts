/**
 * generate-embeddings.ts
 * Run once at build time: npx tsx scripts/generate-embeddings.ts
 *
 * Prerequisites:
 *   1. pnpm add @google/generative-ai
 *   2. pnpm add -D tsx
 *   3. Set GEMINI_API_KEY in .env.local (or export GEMINI_API_KEY=... in your shell)
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { portfolioChunks } from '../lib/portfolio-knowledge'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load .env.local so GEMINI_API_KEY is available
config({ path: path.join(process.cwd(), '.env.local') })

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  console.error('❌  GEMINI_API_KEY is not set. Add it to .env.local as: GEMINI_API_KEY=...')
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

// FIX #1: Correct embedding model name for @google/generative-ai (legacy SDK)
// 'text-embedding-004' is only in the new @google/genai SDK
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })

const OUTPUT_PATH = path.join(process.cwd(), 'lib', 'portfolio-embeddings.json')

async function generateEmbeddings() {
  console.log(`🚀  Embedding ${portfolioChunks.length} knowledge chunks via Gemini...`)
  const records: { id: string; embedding: number[] }[] = []

  for (let i = 0; i < portfolioChunks.length; i++) {
    const chunk = portfolioChunks[i]
    process.stdout.write(`   [${i + 1}/${portfolioChunks.length}] ${chunk.id}... `)

    const result = await embeddingModel.embedContent(
      `title: ${chunk.title} | text: ${chunk.content}`
    )
    const embedding = result.embedding.values

    records.push({ id: chunk.id, embedding })
    console.log('✓')

    // Small delay to avoid bursty requests
    if (i < portfolioChunks.length - 1) {
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(records, null, 2))
  console.log(`\n✅  Done! Embeddings written to: ${OUTPUT_PATH}`)
  console.log(`   Total chunks embedded: ${records.length}`)
  console.log(`   Embedding dimensions: ${records[0]?.embedding.length ?? 'unknown'}`)
}

generateEmbeddings().catch((err) => {
  console.error('❌  Embedding generation failed:', err)
  process.exit(1)
})