import { MOCK_PRODUCTS } from "@lib/mock-data"

export const SEARCH_INDEX_NAME =
  process.env.NEXT_PUBLIC_INDEX_NAME || "products"

export const searchClient: any = {
  search: async (requests: any[]) => {
    return {
      results: requests.map((request) => {
        const query = (request.params?.query || "").toLowerCase().trim()
        const hits = MOCK_PRODUCTS.filter((p) => {
          if (!query) return true
          return (
            p.title?.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query) ||
            p.subtitle?.toLowerCase().includes(query) ||
            p.handle?.toLowerCase().includes(query)
          )
        }).map((p) => ({
          objectID: p.id,
          id: p.id,
          title: p.title,
          handle: p.handle,
          thumbnail: p.thumbnail,
          description: p.description,
          price: p.variants?.[0]?.calculated_price,
        }))

        return {
          hits,
          page: 0,
          nbHits: hits.length,
          nbPages: 1,
          hitsPerPage: hits.length,
          processingTimeMS: 1,
          query: request.params?.query || "",
          params: "",
          exhaustiveNbHits: true,
        }
      }),
    }
  },
  searchForFacetValues: async () => ({ facetHits: [] }),
}
