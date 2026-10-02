import { NextRequest, NextResponse } from "next/server"
import { getAllVehicles, insertVehicle } from "@/lib/mongodb"
import { StructuredVehicle } from "@/lib/types/vehicle"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")?.toLowerCase().trim() || ""
  const manufacturer = searchParams.get("manufacturer")?.toLowerCase().trim() || ""
  const category = searchParams.get("category") || ""
  const era = searchParams.get("era") || ""
  const rentalOnly = searchParams.get("rentalOnly") === "true"
  const startYear = parseInt(searchParams.get("startYear") || "1880", 10)
  const endYear = parseInt(searchParams.get("endYear") || "2026", 10)
  const exactYear = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : null

  const allVehicles = await getAllVehicles()

  let results = allVehicles.filter((item: any) => {
    if (exactYear !== null) {
      if (item.vehicle.modelYear !== exactYear) return false
    } else {
      if (item.vehicle.modelYear < startYear || item.vehicle.modelYear > endYear) return false
    }

    if (manufacturer && manufacturer !== "all" && !item.manufacturer.name.toLowerCase().includes(manufacturer)) {
      return false
    }

    if (category && category !== "All Categories" && item.vehicle.category !== category) {
      return false
    }

    if (era && era !== "All Eras" && item.vehicle.era !== era) {
      return false
    }

    if (rentalOnly && !item.rental.availableForRental) {
      return false
    }

    if (query) {
      const matchName = item.vehicle.name?.toLowerCase().includes(query)
      const matchFullName = item.vehicle.fullName?.toLowerCase().includes(query)
      const matchMake = item.manufacturer.name?.toLowerCase().includes(query)
      const matchCat = item.vehicle.category?.toLowerCase().includes(query)
      const matchEngine = item.specifications?.engineType?.toLowerCase().includes(query)
      const matchGen = item.vehicle.generation?.toLowerCase().includes(query)
      const matchYear = item.vehicle.modelYear?.toString().includes(query)
      if (!matchName && !matchFullName && !matchMake && !matchCat && !matchEngine && !matchGen && !matchYear) {
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const saved = await insertVehicle(body)
    return NextResponse.json({ success: true, vehicle: saved }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to create vehicle" }, { status: 500 })
  }
}
