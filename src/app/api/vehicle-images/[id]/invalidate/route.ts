import { NextRequest, NextResponse } from "next/server"
import { getAuthContext, hasRole, AuditLogService } from "@/lib/security/auth"
import { VehicleImageService } from "@/lib/services/vehicleImageService"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = getAuthContext(req)

    // Only MODERATOR, IMAGE_REVIEWER, ADMIN, SERVICE may invalidate images
    if (!hasRole(auth, ["MODERATOR", "IMAGE_REVIEWER", "ADMIN", "SERVICE"])) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "You do not have permission to invalidate vehicle images." } },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { reason = "MANUAL_REVIEW" } = body
    const imageId = params.id
    const requestId = req.headers.get("x-request-id") || `req_${Date.now()}`

    const invalidated = VehicleImageService.invalidate(imageId, reason)

    // Write audit event
    const audit = AuditLogService.log({
      actorType: auth.role === "SERVICE" ? "SERVICE" : "USER",
      actorId: auth.userId,
      tenantId: auth.tenantId,
      action: "IMAGE_INVALIDATED",
      resourceType: "VEHICLE_IMAGE",
      resourceId: imageId,
      newState: { reason, invalidatedBy: auth.email || auth.userId },
      requestId
    })

    return NextResponse.json({
      status: invalidated ? "INVALIDATED" : "NOT_FOUND",
      imageId,
      reason,
      auditId: audit.id,
      timestamp: audit.timestamp
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
