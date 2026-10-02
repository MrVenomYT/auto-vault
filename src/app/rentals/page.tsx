"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import CarImage from "@/components/CarImage"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import StripeCheckoutModal from "@/components/StripeCheckoutModal"
import {
  Key,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  Gauge,
  PhoneCall,
  ChevronRight
} from "lucide-react"

export default function RentalsPage() {
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"

  const [vehicles, setVehicles] = useState<StructuredVehicle[]>(VEHICLES_DB)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedVehicle, setSelectedVehicle] = useState<StructuredVehicle | null>(null)
  const [showCheckout, setShowCheckout] = useState<boolean>(false)

  useEffect(() => {
    async function loadLiveVehicles() {
      try {
        const res = await fetch("/api/vehicles")
        if (res.ok) {
          const data = await res.json()
          if (data.vehicles && data.vehicles.length > 0) {
            setVehicles(data.vehicles)
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    loadLiveVehicles()
  }, [])

  const rentalFleet = useMemo(() => {
    return vehicles.filter((v) => {
      if (!v.rental.availableForRental) return false
      if (selectedCategory !== "All" && v.vehicle.category !== selectedCategory) return false
      return true
    })
  }, [vehicles, selectedCategory])

  const handleRent = (v: StructuredVehicle) => {
    setSelectedVehicle(v)
    setShowCheckout(true)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Hero Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Exotic and Supercar Rental Division</span>
            <span className="text-zinc-500">|</span>
            <span className="text-emerald-400 font-bold">Immediate Daily Reservations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Daily Luxury &amp; Supercar Rentals
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Experience the world&apos;s most thrilling automotive icons on your terms. From the 2024 Porsche 911 Carrera S and Ferrari F8 Tributo to legendary historic classics, delivered directly with white glove transport.
          </p>

          {/* Key Rental Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl">
            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">Full Shield Coverage</span>
                <span className="text-zinc-500 text-[11px]">Comprehensive road protection</span>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">Flexible Durations</span>
                <span className="text-zinc-500 text-[11px]">Daily, weekly, or monthly terms</span>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
              <Lock className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">Instant Hold Escrow</span>
                <span className="text-zinc-500 text-[11px]">Zero hidden surcharges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Category Filter Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {["All", "Supercar", "Hypercar", "Sports Car", "Classic", "Electric Vehicle"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-zinc-400 font-bold shrink-0">
            {rentalFleet.length} Rentable Units
          </span>
        </div>

        {/* Rental Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalFleet.map((vehicle) => (
            <div
              key={vehicle.vehicleId}
              className="group bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 rounded-3xl border border-zinc-800/80 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="p-5 pb-0 flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-900/60">
                    {vehicle.vehicle.modelYear}
                  </span>
                  <Link href={`/vehicles/${vehicle.vehicleId}`}>
                    <h3 className="text-lg font-black text-white mt-2 group-hover:text-amber-400 transition-colors tracking-tight">
                      {vehicle.manufacturer.name} {vehicle.vehicle.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-zinc-400">{vehicle.vehicle.category}</p>
                </div>

                <div className="text-right">
                  <div className="text-base font-black text-emerald-400 font-mono">
                    {currencySymbol}{vehicle.rental.dailyRate}/day
                  </div>
                  <div className="text-[10px] text-zinc-500 font-semibold uppercase">Daily Rate</div>
                </div>
              </div>

              <Link
                href={`/vehicles/${vehicle.vehicleId}`}
                className="relative w-full h-52 px-4 flex items-center justify-center my-3 block"
              >
                <CarImage
                  src={vehicle.images.primaryImage.url}
                  alt={vehicle.vehicle.fullName}
                  fill
                  className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fallbackUrls={vehicle.images?.gallery?.map(g => g.url) || []}
                />
              </Link>

              <div className="px-5 space-y-3">
                <div className="grid grid-cols-3 gap-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-2.5 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Power</div>
                    <div className="font-mono font-bold text-white mt-0.5">
                      {vehicle.specifications.horsepower ? `${vehicle.specifications.horsepower} HP` : "Historic"}
                    </div>
                  </div>
                  <div className="border-x border-zinc-800">
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">0 to 60</div>
                    <div className="font-mono font-bold text-amber-400 mt-0.5">
                      {vehicle.specifications.acceleration ? vehicle.specifications.acceleration.split(" ")[0] : "Historic"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Top Speed</div>
                    <div className="font-mono font-bold text-indigo-400 mt-0.5">
                      {vehicle.specifications.topSpeed || "Historic"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between gap-3 bg-zinc-950/60">
                <Link
                  href={`/vehicles/${vehicle.vehicleId}`}
                  className="text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleRent(vehicle)}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-black text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                >
                  <Key className="w-4 h-4" />
                  <span>Reserve Rental</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rental Terms & FAQ Section */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-black text-white">Rental Requirements and Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400">
            <div className="space-y-2">
              <span className="font-bold text-white text-sm block">Driver Eligibility</span>
              <p>Drivers must be at least 21 years of age with a valid government issued driver&apos;s license and clean driving record.</p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-white text-sm block">Security Hold Deposit</span>
              <p>A standard holding deposit is authorized at checkout and fully released upon vehicle return and inspection.</p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-white text-sm block">White Glove Delivery</span>
              <p>Optional enclosed transport carrier delivers directly to private residences, hotels, airports, or race tracks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedVehicle && (
        <StripeCheckoutModal
          vehicle={selectedVehicle}
          bookingType="rental"
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  )
}
