"use server"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import { MOCK_PRODUCTS } from "@lib/mock-data"

interface Hits {
  readonly objectID?: string
  id?: string
  [x: string | number | symbol]: unknown
}

/**
 * Uses MeiliSearch or Algolia to search for a query
 * @param {string} query - search query
 */
export async function search(query: string) {
  try {
    // MeiliSearch
    const queries = [{ params: { query }, indexName: SEARCH_INDEX_NAME }]
    const { results } = (await searchClient.search(queries)) as Record<
      string,
      any
    >
    const { hits } = results[0] as { hits: Hits[] }
    return hits || []
  } catch (err) {
    const q = (query || "").toLowerCase()
    const matches = MOCK_PRODUCTS.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    ).map((p) => ({
      id: p.id,
      objectID: p.id,
      title: p.title,
      handle: p.handle,
      thumbnail: p.thumbnail,
    }))
    return matches as Hits[]
  }
}
