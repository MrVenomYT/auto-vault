import { NextRequest, NextResponse } from "next/server"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")?.toLowerCase().trim() || ""
  const manufacturer = searchParams.get("manufacturer")?.toLowerCase().trim() || ""
  const category = searchParams.get("category") || ""
  const era = searchParams.get("era") || ""
  const bodyType = searchParams.get("bodyType") || ""
  const fuelType = searchParams.get("fuelType") || ""
  const rentalOnly = searchParams.get("rentalOnly") === "true"
  const startYear = parseInt(searchParams.get("startYear") || "1880", 10)
  const endYear = parseInt(searchParams.get("endYear") || "2026", 10)
  const exactYear = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : null

  let results: StructuredVehicle[] = VEHICLES_DB.filter((item) => {
    // Year filters
    if (exactYear !== null) {
      if (item.vehicle.modelYear !== exactYear) return false
    } else {
      if (item.vehicle.modelYear < startYear || item.vehicle.modelYear > endYear) return false
    }

    // Manufacturer filter
    if (manufacturer && manufacturer !== "all" && !item.manufacturer.name.toLowerCase().includes(manufacturer)) {
      return false
    }

    // Category filter
    if (category && category !== "All Categories" && item.vehicle.category !== category) {
      return false
    }

    // Era filter
    if (era && era !== "All Eras" && item.vehicle.era !== era) {
      return false
    }

    // Body type filter
    if (bodyType && bodyType !== "All Body Types" && item.vehicle.bodyType !== bodyType) {
      return false
    }

    // Fuel type filter
    if (fuelType && fuelType !== "All Fuel Types" && !item.specifications.fuelType.toLowerCase().includes(fuelType.toLowerCase())) {
      return false
    }

    // Rental only filter
    if (rentalOnly && !item.rental.availableForRental) {
      return false
    }

    // Text search
    if (query) {
      const matchName = item.vehicle.name.toLowerCase().includes(query)
      const matchFullName = item.vehicle.fullName.toLowerCase().includes(query)
      const matchManufacturer = item.manufacturer.name.toLowerCase().includes(query)
      const matchCategory = item.vehicle.category.toLowerCase().includes(query)
      const matchEngine = item.specifications.engineType.toLowerCase().includes(query)
      const matchGen = item.vehicle.generation.toLowerCase().includes(query)
      const matchYear = item.vehicle.modelYear.toString().includes(query)
      if (!matchName && !matchFullName && !matchManufacturer && !matchCategory && !matchEngine && !matchGen && !matchYear) {
        return false
      }
    }

    return true
  })

  return NextResponse.json({
    total: results.length,
    startYear,
    endYear,
    vehicles: results,
  })
}
