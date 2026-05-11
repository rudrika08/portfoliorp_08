import { type NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { portfolioChunks } from '@/lib/portfolio-knowledge'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // Simple secret check — only allow from admin panel
  const secret = req.headers.get('x-admin-secret')
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-2' })

  try {
    const records: { id: string; embedding: number[] }[] = []

    for (const chunk of portfolioChunks) {
      const result = await embeddingModel.embedContent(
        `title: ${chunk.title} | text: ${chunk.content}`
      )
      const embedding = result.embedding.values

      records.push({ id: chunk.id, embedding })
    }

    const outputPath = path.join(process.cwd(), 'lib', 'portfolio-embeddings.json')
    fs.writeFileSync(outputPath, JSON.stringify(records, null, 2))

    return NextResponse.json({
      success: true,
      chunksEmbedded: records.length,
      message: `Embedded ${records.length} chunks successfully.`,
    })
  } catch (err) {
    console.error('[/api/embed]', err)
    return NextResponse.json({ error: 'Embedding generation failed.' }, { status: 500 })
  }
}
