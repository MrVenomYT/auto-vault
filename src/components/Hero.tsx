"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import CarImage from "@/components/CarImage"
import {
  ShieldCheck,
  Zap,
  Gauge,
  Lock,
  ArrowRight,
  Key,
  Globe,
  ShoppingBag,
  Award,
  Sparkles
} from "lucide-react"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"

interface HeroProps {
  onSelectHeroVehicle: (vehicle: StructuredVehicle, type: "rental" | "purchase") => void
  featuredVehicles: StructuredVehicle[]
}

export default function Hero({ onSelectHeroVehicle, featuredVehicles }: HeroProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { settings } = usePlatformSettings()

  // Find vehicle by featured id if specified
  const displayVehicles = useMemo(() => {
    if (featuredVehicles && featuredVehicles.length > 0) {
      return featuredVehicles
    }
    return []
  }, [featuredVehicles])

  const activeCar = displayVehicles[selectedIndex] || displayVehicles[0]

  if (!activeCar) return null

  const currencySymbol = settings.financials.currencySymbol || "$"

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/80 bg-zinc-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Certified 1880 to 2026 Collection</span>
              <span className="text-zinc-500">|</span>
              <span className="text-emerald-400 font-bold">Verified Real Vehicles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              {settings.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-medium leading-relaxed">
              {settings.heroSubheadline}
            </p>

            {/* Quick Hero Specs Telemetry HUD */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-zinc-500">Horsepower</div>
                <div className="text-xl font-black text-white font-mono mt-0.5">
                  {activeCar.specifications.horsepower ? `${activeCar.specifications.horsepower} HP` : "Historic"}
                </div>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-zinc-500">0 to 60 MPH</div>
                <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                  {activeCar.specifications.acceleration ? activeCar.specifications.acceleration.split(" ")[0] : "Historic"}
                </div>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-zinc-500">Valuation</div>
                <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                  {currencySymbol}{activeCar.metadata.valuationPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Hero CTAs with BOTH RENT and BUY buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {settings.operations.allowDailyRentals && (
                <button
                  onClick={() => onSelectHeroVehicle(activeCar, "rental")}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md flex items-center gap-2"
                >
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Rent for {currencySymbol}{activeCar.rental.dailyRate || 850}/day</span>
                </button>
              )}

              {settings.operations.allowInstantPurchase && (
                <button
                  onClick={() => onSelectHeroVehicle(activeCar, "purchase")}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy for {currencySymbol}{activeCar.metadata.valuationPrice.toLocaleString()}</span>
                </button>
              )}

              <a
                href="#inventory"
                className="text-zinc-400 hover:text-white text-xs font-semibold px-4 py-3.5 transition-all flex items-center gap-1.5"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust and Certification Badges */}
            <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 font-medium">
              <span className="flex items-center gap-1 text-zinc-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                256 Bit Encrypted Processing
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Clean Title and Certified History
              </span>
            </div>
          </div>

          {/* Right Column: Hero Real Car Showcase Visual */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Main Stage Display showing the real vehicle itself */}
            <div className="relative w-full h-72 sm:h-96 flex items-center justify-center">
              {/* Radial Base Floor Shadow */}
              <div className="absolute bottom-6 w-3/4 h-8 bg-black/85 blur-xl rounded-full" />

              <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-700">
                <Image
                  src={activeCar.images.primaryImage.url}
                  alt={activeCar.vehicle.fullName}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
                  priority
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating Meta Tag */}
              <div className="absolute top-2 right-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-xl">
                {activeCar.vehicle.modelYear} | {activeCar.vehicle.category}
              </div>
            </div>

            {/* Interactive Hero Switcher Tabs */}
            <div className="w-full grid grid-cols-4 gap-2 pt-4">
              {displayVehicles.slice(0, 4).map((veh, idx) => (
                <button
                  key={veh.vehicleId}
                  onClick={() => setSelectedIndex(idx)}
                  className={`p-2 rounded-2xl border text-left transition-all ${
                    selectedIndex === idx
                      ? "bg-red-950/40 border-red-600 text-white"
                      : "bg-zinc-900/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="relative w-full h-12 mb-1">
                    <Image
                      src={veh.images.primaryImage.url}
                      alt={veh.vehicle.name}
                      fill
                      unoptimized
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] font-bold truncate text-white">
                    {veh.vehicle.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">
                    {veh.vehicle.modelYear}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
