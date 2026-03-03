import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET not set' }, { status: 500 })
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('sanity', {})

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() })
}
