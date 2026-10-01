import { NextRequest, NextResponse } from "next/server"
import { getAllVehicles } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")?.toLowerCase().trim() || ""
  const make = searchParams.get("make")?.toLowerCase().trim() || ""
  const era = searchParams.get("era") || ""
  const category = searchParams.get("category") || ""
  const startYear = parseInt(searchParams.get("startYear") || "1880", 10)
  const endYear = parseInt(searchParams.get("endYear") || "2026", 10)

  const rapidApiKey = process.env.RAPID_API_KEY
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

  const allVehicles = await getAllVehicles()

  let filtered = allVehicles.filter((v: any) => {
    const yr = v.vehicle.modelYear
    const matchesYear = yr >= startYear && yr <= endYear
    const matchesMake = !make || v.manufacturer.name.toLowerCase().includes(make)
    const matchesEra = !era || era === "All Eras" || v.vehicle.era === era
    const matchesCategory = !category || category === "All Categories" || v.vehicle.category === category
    const matchesQuery =
      !query ||
      v.manufacturer.name.toLowerCase().includes(query) ||
      v.vehicle.name.toLowerCase().includes(query) ||
      v.vehicle.fullName.toLowerCase().includes(query) ||
      v.vehicle.category.toLowerCase().includes(query) ||
      yr.toString().includes(query)

    return matchesYear && matchesMake && matchesEra && matchesCategory && matchesQuery
  })

  return NextResponse.json({
    total: filtered.length,
    vehicles: filtered,
    rapidApiMatches: rapidApiResults.length,
  })
}
