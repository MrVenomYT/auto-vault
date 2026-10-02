import { NextRequest, NextResponse } from "next/server"
import { VEHICLES_DB } from "@/lib/db/vehicles"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { vehicle, maxResults = 10 } = body

    if (!vehicle || !vehicle.make) {
      return NextResponse.json(
        { error: { code: "VEHICLE_IDENTITY_INVALID", message: "Make is required" } },
        { status: 400 }
      )
    }

    const targetMake = vehicle.make.toLowerCase().replace(/[^a-z0-9]/g, "")
    const targetModel = (vehicle.model || "").toLowerCase().replace(/[^a-z0-9]/g, "")

    const matches = VEHICLES_DB.filter(v => {
      const vMake = v.manufacturer.name.toLowerCase().replace(/[^a-z0-9]/g, "")
      const vModel = v.vehicle.name.toLowerCase().replace(/[^a-z0-9]/g, "")
      return (vMake.includes(targetMake) || targetMake.includes(vMake)) &&
             (!targetModel || vModel.includes(targetModel) || targetModel.includes(vModel))
    }).slice(0, maxResults)

    const candidates = matches.map(m => ({
      url: m.images.primaryImage.url,
      sourceUrl: m.metadata.officialSource,
      sourceType: "MANUFACTURER",
      title: m.vehicle.fullName,
      metadata: {
        make: m.manufacturer.name,
        model: m.vehicle.name,
        year: m.vehicle.modelYear,
        generation: m.vehicle.generation,
        bodyStyle: m.vehicle.bodyType
      }
    }))

    return NextResponse.json({ candidates })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
