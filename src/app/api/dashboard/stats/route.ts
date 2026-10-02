import { NextResponse } from "next/server"
import { getAllVehicles, getAllBookings, getDatabase } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET() {
  const [vehicles, bookings, db] = await Promise.all([
    getAllVehicles(),
    getAllBookings(),
    getDatabase(),
  ])

  let totalFleetValuation = 0
  let activeRentals = 0
  const eraCounts: Record<string, number> = {}

  vehicles.forEach((v: any) => {
    totalFleetValuation += v.metadata?.valuationPrice || 0
    if (v.rental?.availableForRental) {
      activeRentals += 1
    }
    const era = v.vehicle?.era || "Modern"
    eraCounts[era] = (eraCounts[era] || 0) + 1
  })

  let totalStripeRevenue = 0
  bookings.forEach((b: any) => {
    totalStripeRevenue += b.payment?.amount || 0
  })

  return NextResponse.json({
    database: {
      type: "MongoDB",
      status: db ? "connected" : "ready_in_memory",
      targetDb: "autovault",
    },
    metrics: {
      totalVehicles: vehicles.length,
      totalFleetValuationUSD: totalFleetValuation,
      activeRentableVehicles: activeRentals,
      totalStripeBookings: bookings.length,
      totalStripeRevenueUSD: totalStripeRevenue,
    },
    eraDistribution: eraCounts,
    recentBookings: bookings.slice(0, 5),
  })
}
