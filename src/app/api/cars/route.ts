import { NextRequest, NextResponse } from "next/server"
import { CARS_DATA } from "@/lib/cars"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")?.toLowerCase().trim() || ""
  const make = searchParams.get("make")?.toLowerCase().trim() || ""
  const era = searchParams.get("era") || ""
  const category = searchParams.get("category") || ""
  const startYear = parseInt(searchParams.get("startYear") || "1880", 10)
  const endYear = parseInt(searchParams.get("endYear") || "2026", 10)

  const rapidApiKey = process.env.RAPID_API_KEY

  // If query is for a specific model not in core seed and rapidApiKey is available, try RapidAPI
  let rapidApiResults: any[] = []
  if (query && rapidApiKey && query.length > 2) {
    try {
      const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${encodeURIComponent(query)}&limit=5`,
        {
          headers: {
            "x-rapidapi-key": rapidApiKey,
            "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
          },
          next: { revalidate: 3600 },
        }
      )
      if (response.ok) {
        rapidApiResults = await response.json()
      }
    } catch (e) {
      // RapidAPI network fallback
    }
  }

  // Filter core 1880 to 2026 catalog
  let filtered = CARS_DATA.filter((car) => {
    const matchesYear = car.year >= startYear && car.year <= endYear
    const matchesMake = !make || car.make.toLowerCase().includes(make)
    const matchesEra = !era || era === "All Eras" || car.era === era
    const matchesCategory = !category || category === "All Categories" || car.category === category
    const matchesQuery =
      !query ||
      car.make.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.category.toLowerCase().includes(query) ||
      car.engine.toLowerCase().includes(query) ||
      car.year.toString().includes(query)

    return matchesYear && matchesMake && matchesEra && matchesCategory && matchesQuery
  })

  return NextResponse.json({
    total: filtered.length,
    cars: filtered,
    rapidApiMatches: rapidApiResults.length,
  })
}
