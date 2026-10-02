import { NextRequest, NextResponse } from "next/server"
import { getAuthContext, hasRole, AuditLogService } from "@/lib/security/auth"
import { VehicleImageService } from "@/lib/services/vehicleImageService"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = getAuthContext(req)
    const imageId = params.id

    // Authorization: only IMAGE_REVIEWER, ADMIN, or SERVICE may review/approve images
    if (!hasRole(auth, ["IMAGE_REVIEWER", "ADMIN", "SERVICE"])) {
      return NextResponse.json(
        {
          error: {
            code: "FORBIDDEN",
            message: "You do not have permission to approve or review vehicle images."
          }
        },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { decision, notes } = body // decision: "APPROVE" | "REJECT"

    if (decision !== "APPROVE" && decision !== "REJECT") {
      return NextResponse.json(
        { error: { code: "INVALID_DECISION", message: "Decision must be APPROVE or REJECT" } },
        { status: 400 }
      )
    }

    const requestId = req.headers.get("x-request-id") || `req_${Date.now()}`

    if (decision === "REJECT") {
      VehicleImageService.invalidate(imageId, notes || "MANUAL_REJECT")
    }

    // Write audit event
    const audit = AuditLogService.log({
      actorType: auth.role === "SERVICE" ? "SERVICE" : "USER",
      actorId: auth.userId,
      tenantId: auth.tenantId,
      action: decision === "APPROVE" ? "IMAGE_APPROVED" : "IMAGE_REJECTED",
      resourceType: "VEHICLE_IMAGE",
      resourceId: imageId,
      newState: { decision, notes, reviewedBy: auth.email || auth.userId },
      requestId
    })

    return NextResponse.json({
      status: "SUCCESS",
      decision,
      imageId,
      auditId: audit.id,
      timestamp: audit.timestamp
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
