import { NextRequest, NextResponse } from "next/server"
import { updateVehicle, deleteVehicle } from "@/lib/mongodb"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const updated = await updateVehicle(id, body)
    if (!updated) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, vehicle: updated })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update vehicle" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const res = await deleteVehicle(id)
    return NextResponse.json({ success: true, result: res })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete vehicle" }, { status: 500 })
  }
}
