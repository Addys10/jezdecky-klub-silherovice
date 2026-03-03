import { client } from './client'

/**
 * Sanity fetch wrapper with Next.js cache tag.
 * Tag 'sanity' allows on-demand revalidation via /api/revalidate.
 */
export function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params ?? {}, {
    next: { tags: ['sanity'] },
  })
}
