import { NextRequest } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(_req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'asset', '@favicon.jpeg')
    const file = await readFile(filePath)
    return new Response(file, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    return new Response('Favicon not found', { status: 404 })
  }
}


