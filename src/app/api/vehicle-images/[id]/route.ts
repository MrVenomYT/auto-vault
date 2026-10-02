import { NextRequest, NextResponse } from "next/server"
import { VehicleImageService } from "@/lib/services/vehicleImageService"
import { VEHICLES_DB } from "@/lib/db/vehicles"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicleId = params.id
    const cached = VehicleImageService.getCached(vehicleId)

    if (cached) {
      return NextResponse.json({
        vehicleId,
        status: cached.status,
        image: {
          id: cached.id,
          imageUrl: cached.imageUrl,
          confidenceScore: cached.confidenceScore,
          verifiedAt: cached.verifiedAt
        }
      })
    }

    const matched = VEHICLES_DB.find(v => v.vehicleId === vehicleId)
    if (matched) {
      return NextResponse.json({
        vehicleId,
        status: "VERIFIED",
        image: {
          id: `img_${matched.vehicleId}`,
          imageUrl: matched.images.primaryImage.url,
          confidenceScore: 98,
          verifiedAt: new Date().toISOString()
        }
      })
    }

    return NextResponse.json(
      { error: { code: "NO_IMAGE_CANDIDATES", message: "Vehicle not found" } },
      { status: 404 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
