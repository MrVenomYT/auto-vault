import { NextRequest, NextResponse } from "next/server"
import { getAllInquiries, insertInquiry } from "@/lib/mongodb"

export async function GET() {
  const inquiries = await getAllInquiries()
  return NextResponse.json({ total: inquiries.length, inquiries })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.email || !body.name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const newInquiry = {
      inquiryId: `INQ_${Date.now().toString().slice(-6)}`,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      vehicleInterest: body.vehicleInterest || "General Fleet Inquiry",
      message: body.message || "VIP Concierge Inquiry",
      type: body.type || "lead",
      status: "new",
      createdAt: new Date().toISOString()
    }

    const saved = await insertInquiry(newInquiry)
    return NextResponse.json({ success: true, inquiry: saved }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit inquiry" }, { status: 500 })
  }
}
