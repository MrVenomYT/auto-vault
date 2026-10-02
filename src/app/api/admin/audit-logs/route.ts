import { NextRequest, NextResponse } from "next/server"
import { getAuthContext, hasRole, AuditLogService } from "@/lib/security/auth"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthContext(req)

    // Authorization: only ADMIN, MODERATOR, IMAGE_REVIEWER, or SERVICE may view audit logs
    if (!hasRole(auth, ["ADMIN", "MODERATOR", "IMAGE_REVIEWER", "SERVICE"])) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Admin or reviewer authorization required to view audit logs." } },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get("limit") || 50)
    const action = searchParams.get("action") || undefined
    const viewFailures = searchParams.get("failuresOnly") === "true"

    if (viewFailures) {
      const failures = AuditLogService.getFailures(auth.tenantId, limit)
      return NextResponse.json({
        failures,
        count: failures.length,
        tenantId: auth.tenantId,
        timestamp: new Date().toISOString()
      })
    }

    const logs = AuditLogService.getLogs(auth.tenantId, limit, action)
    const failures = AuditLogService.getFailures(auth.tenantId, limit)

    return NextResponse.json({
      logs,
      verificationFailures: failures,
      count: logs.length,
      failureCount: failures.length,
      tenantId: auth.tenantId,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
