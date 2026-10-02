import { NextRequest, NextResponse } from "next/server"
import { getPlatformSettings, updatePlatformSettings } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET() {
  const settings = await getPlatformSettings()
  return NextResponse.json({ settings })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const updated = await updatePlatformSettings(body)
    return NextResponse.json({ success: true, settings: updated })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update platform settings" }, { status: 500 })
  }
}
