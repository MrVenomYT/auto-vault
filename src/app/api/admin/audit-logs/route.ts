import { NextRequest, NextResponse } from "next/server"
import { getAuthContext, hasRole, AuditLogService } from "@/lib/security/auth"

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthContext(req)

    if (!hasRole(auth, ["ADMIN", "SERVICE"])) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Admin authorization required to view audit logs." } },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get("limit") || 50)
    const logs = AuditLogService.getLogs(auth.tenantId, limit)

    return NextResponse.json({ logs, count: logs.length })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
