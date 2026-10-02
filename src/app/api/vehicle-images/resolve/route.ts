import { NextRequest, NextResponse } from "next/server"
import { getAuthContext, AuditLogService } from "@/lib/security/auth"
import { VehicleImageService } from "@/lib/services/vehicleImageService"

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthContext(req)
    const body = await req.json()
    const { vehicle, options } = body

    if (!vehicle || !vehicle.make || !vehicle.model) {
      return NextResponse.json(
        {
          error: {
            code: "VEHICLE_IDENTITY_INVALID",
            message: "Vehicle make and model are required for image resolution.",
            retryable: false
          }
        },
        { status: 400 }
      )
    }

    // Ignore client-supplied verification bypasses / spoofed scores
    const cleanVehicle = {
      make: String(vehicle.make).trim(),
      model: String(vehicle.model).trim(),
      year: vehicle.year ? Number(vehicle.year) : undefined,
      generation: vehicle.generation ? String(vehicle.generation).trim() : undefined,
      facelift: vehicle.facelift ? String(vehicle.facelift).trim() : undefined,
      trim: vehicle.trim ? String(vehicle.trim).trim() : undefined,
      bodyStyle: vehicle.bodyStyle,
      market: vehicle.market
    }

    const cleanOptions = {
      allowRepresentativeImage: Boolean(options?.allowRepresentativeImage),
      requireExactYear: Boolean(options?.requireExactYear),
      allowTransparentBackground: options?.allowTransparentBackground !== false,
      forceRefresh: Boolean(options?.forceRefresh)
    }

    const result = await VehicleImageService.resolveImage(cleanVehicle, cleanOptions)

    const requestId = req.headers.get("x-request-id") || `req_${Date.now()}`

    // Audit log resolution
    AuditLogService.log({
      actorType: auth.role === "SERVICE" ? "SERVICE" : "USER",
      actorId: auth.userId,
      tenantId: auth.tenantId,
      action: "IMAGE_RESOLVED",
      resourceType: "VEHICLE",
      resourceId: `${cleanVehicle.make}_${cleanVehicle.model}`,
      newState: { status: result.status, confidenceScore: result.verification.confidenceScore },
      requestId
    })

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          code: "VERIFICATION_TIMEOUT",
          message: error.message || "Failed to resolve verified vehicle image.",
          retryable: true
        }
      },
      { status: 500 }
    )
  }
}
