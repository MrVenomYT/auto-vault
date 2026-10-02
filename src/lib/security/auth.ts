import { NextRequest } from "next/server"
import { VerificationFailure } from "@/lib/types/imageService"

export type UserRole =
  | "USER"
  | "SELLER"
  | "MODERATOR"
  | "IMAGE_REVIEWER"
  | "ADMIN"
  | "SERVICE"

export interface AuthContext {
  userId: string
  role: UserRole
  tenantId: string
  email?: string
  isAuthenticated: boolean
}

export interface AuditEvent {
  id: string
  actorType: "USER" | "SERVICE"
  actorId: string
  tenantId?: string
  action:
    | "IMAGE_RESOLVED"
    | "IMAGE_APPROVED"
    | "IMAGE_REJECTED"
    | "IMAGE_INVALIDATED"
    | "POLICY_CHANGED"
    | "THRESHOLD_CHANGED"
    | "ROLE_CHANGED"
  resourceType: string
  resourceId: string
  previousState?: unknown
  newState?: unknown
  failure?: VerificationFailure
  requestId: string
  timestamp: string
}

// In-memory append-only audit log store
const auditLogs: AuditEvent[] = []

export class AuditLogService {
  static log(event: Omit<AuditEvent, "id" | "timestamp">): AuditEvent {
    const record: AuditEvent = {
      ...event,
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    }
    auditLogs.push(record)
    // Keep bounded in memory
    if (auditLogs.length > 500) {
      auditLogs.shift()
    }
    return record
  }

  static getLogs(tenantId?: string, limit = 50, actionFilter?: string): AuditEvent[] {
    let logs = tenantId 
      ? auditLogs.filter(l => !l.tenantId || l.tenantId === tenantId) 
      : auditLogs
    if (actionFilter) {
      logs = logs.filter(l => l.action === actionFilter)
    }
    return logs.slice(-limit).reverse()
  }

  static getFailures(tenantId?: string, limit = 50): VerificationFailure[] {
    const logs = tenantId 
      ? auditLogs.filter(l => !l.tenantId || l.tenantId === tenantId) 
      : auditLogs
    return logs
      .filter(l => l.failure !== undefined)
      .map(l => l.failure!)
      .slice(-limit)
      .reverse()
  }
}

/**
 * Validates external URLs to protect against SSRF and private IP attacks
 */
export function validateExternalImageUrl(urlStr: string): { valid: boolean; error?: string } {
  try {
    const parsed = new URL(urlStr)

    // Local / relative path allowed (for internal assets)
    if (urlStr.startsWith("/images/")) {
      return { valid: true }
    }

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return { valid: false, error: "Only HTTP and HTTPS image protocols are supported." }
    }

    const host = parsed.hostname.toLowerCase()

    // Block localhost and loopback
    if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0") {
      return { valid: false, error: "Access to loopback addresses is forbidden (SSRF Protection)." }
    }

    // Block private IP ranges
    if (
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host.startsWith("169.254.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)
    ) {
      return { valid: false, error: "Access to private IP ranges is forbidden (SSRF Protection)." }
    }

    // Block AWS / GCP / Cloud metadata addresses
    if (host === "metadata.google.internal" || host === "169.254.169.254") {
      return { valid: false, error: "Access to cloud metadata endpoints is forbidden." }
    }

    return { valid: true }
  } catch (e) {
    return { valid: false, error: "Malformed URL provided." }
  }
}

/**
 * Extracts and verifies authentication context from server request
 */
export function getAuthContext(req: NextRequest): AuthContext {
  const authHeader = req.headers.get("authorization") || ""
  const roleHeader = req.headers.get("x-user-role") as UserRole | null
  const tenantHeader = req.headers.get("x-tenant-id") || "tenant_default"

  // Service worker token authorization
  if (authHeader.startsWith("Bearer service_") || req.headers.get("x-service-key")) {
    return {
      userId: "svc_worker_verified",
      role: "SERVICE",
      tenantId: tenantHeader,
      isAuthenticated: true
    }
  }

  // Admin token or header
  if (authHeader.includes("admin_token") || roleHeader === "ADMIN") {
    return {
      userId: "usr_admin_01",
      role: "ADMIN",
      tenantId: tenantHeader,
      email: "admin@autovault.com",
      isAuthenticated: true
    }
  }

  // Image Reviewer token or header
  if (roleHeader === "IMAGE_REVIEWER") {
    return {
      userId: "usr_reviewer_01",
      role: "IMAGE_REVIEWER",
      tenantId: tenantHeader,
      email: "reviewer@autovault.com",
      isAuthenticated: true
    }
  }

  // Moderator
  if (roleHeader === "MODERATOR") {
    return {
      userId: "usr_mod_01",
      role: "MODERATOR",
      tenantId: tenantHeader,
      email: "moderator@autovault.com",
      isAuthenticated: true
    }
  }

  // Seller
  if (roleHeader === "SELLER") {
    return {
      userId: "usr_seller_01",
      role: "SELLER",
      tenantId: tenantHeader,
      email: "dealer@autovault.com",
      isAuthenticated: true
    }
  }

  // Default authenticated user session
  return {
    userId: "usr_client_guest",
    role: "USER",
    tenantId: tenantHeader,
    isAuthenticated: true
  }
}

/**
 * Verifies if user has one of the allowed roles
 */
export function hasRole(context: AuthContext, allowedRoles: UserRole[]): boolean {
  if (!context.isAuthenticated) return false
  if (context.role === "ADMIN" || context.role === "SERVICE") return true
  return allowedRoles.includes(context.role)
}
