import { NextResponse } from "next/server"
import { MANUFACTURERS_DB } from "@/lib/db/manufacturers"
import { VEHICLES_DB } from "@/lib/db/vehicles"

export async function GET() {
  const data = MANUFACTURERS_DB.map((m) => {
    const count = VEHICLES_DB.filter((v) =>
      v.manufacturer.name.toLowerCase().includes(m.name.toLowerCase())
    ).length
    return {
      ...m,
      vehicleCount: count,
    }
  })

  return NextResponse.json({
    total: data.length,
    manufacturers: data,
  })
}
