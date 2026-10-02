import { NextRequest, NextResponse } from "next/server"
import { getAllBookings, insertBooking } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET() {
  const bookings = await getAllBookings()
  return NextResponse.json({
    total: bookings.length,
    bookings,
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newBooking = {
      bookingId: `STRIPE_BK_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      vehicleId: body.vehicleId,
      vehicleFullName: body.vehicleFullName,
      vehicleModelYear: body.vehicleModelYear,
      bookingType: body.bookingType || "rental",
      customer: {
        fullName: body.customer?.fullName || "Guest Customer",
        email: body.customer?.email || "customer@autovault.com",
        billingZip: body.customer?.billingZip || "90210",
      },
      payment: {
        gateway: "stripe",
        stripePaymentIntentId: `pi_${Math.random().toString(36).substring(2, 16)}`,
        amount: body.amount || 5000,
        currency: "USD",
        status: "succeeded",
        cardLast4: body.cardLast4 || "4242",
        cardBrand: "Visa",
      },
      rentalDetails: body.rentalDetails,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const saved = await insertBooking(newBooking)
    return NextResponse.json({ success: true, booking: saved }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to record booking" }, { status: 500 })
  }
}
