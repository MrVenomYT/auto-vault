"use client"

import { useState, useMemo, useEffect } from "react"
import Hero from "@/components/Hero"
import CarCard from "@/components/CarCard"
import StripeCheckoutModal from "@/components/StripeCheckoutModal"
import VehicleComparator from "@/components/VehicleComparator"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"
import {
  Search,
  Filter,
  Layers,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowUpDown,
  CreditCard,
  Key,
  Calendar,
  Zap,
  Globe,
  LayoutDashboard,
  Activity,
  Sliders,
  DollarSign
} from "lucide-react"
import Link from "next/link"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"

const ERAS = [
  "All Eras",
  "1880 to 1899 (Pioneering and Experimental)",
  "1900 to 1919 (Early Production and Vintage)",
  "1920 to 1939 (Classic and Pre War)",
  "1940 to 1959 (Post War and Early Classic)",
  "1960 to 1979 (Muscle Cars and Golden Age)",
  "1980 to 1999 (Modern Classic and Supercars)",
  "2000 to 2009 (Early Modern Era)",
  "2010 to 2019 (Contemporary Era)",
  "2020 to 2026 (Modern and Latest Generation)"
]

const CATEGORIES = [
  "All Categories",
  "Supercar",
  "Hypercar",
  "Sports Car",
  "Classic",
  "Vintage",
  "Muscle Car",
  "Electric Vehicle",
  "Luxury"
]

export default function Home() {
  const { settings } = usePlatformSettings()
  const [vehicles, setVehicles] = useState<StructuredVehicle[]>(VEHICLES_DB)
  const [selectedEra, setSelectedEra] = useState<string>("All Eras")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [rentalOnly, setRentalOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<"year_desc" | "year_asc" | "price_desc" | "power_desc">("year_desc")

  // Checkout modal
  const [selectedVehicle, setSelectedVehicle] = useState<StructuredVehicle | null>(null)
  const [checkoutType, setCheckoutType] = useState<"rental" | "purchase">("rental")
  const [showCheckout, setShowCheckout] = useState<boolean>(false)

  // Compare mode
  const [compareList, setCompareList] = useState<StructuredVehicle[]>([])
  const [showCompare, setShowCompare] = useState<boolean>(false)

  // RapidAPI vehicle scanner state
  const [liveQuery, setLiveQuery] = useState<string>("")
  const [liveLoading, setLiveLoading] = useState<boolean>(false)
  const [liveMessage, setLiveMessage] = useState<string | null>(null)

  // Fetch updated vehicles in real-time
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
    const interval = setInterval(loadLiveVehicles, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleSelectVehicle = (vehicle: StructuredVehicle, type: "rental" | "purchase") => {
    setSelectedVehicle(vehicle)
    setCheckoutType(type)
    setShowCheckout(true)
  }

  const handleToggleCompare = (vehicle: StructuredVehicle) => {
    setCompareList((prev) => {
      const exists = prev.some((v) => v.vehicleId === vehicle.vehicleId)
      if (exists) {
        return prev.filter((v) => v.vehicleId !== vehicle.vehicleId)
      }
      if (prev.length >= 2) {
        return [prev[1], vehicle]
      }
      return [...prev, vehicle]
    })
    setShowCompare(true)
  }

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (selectedEra !== "All Eras" && v.vehicle.era !== selectedEra) {
          return false
        }
        if (selectedCategory !== "All Categories" && v.vehicle.category !== selectedCategory) {
          return false
        }
        if (rentalOnly && !v.rental.availableForRental) {
          return false
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const name = v.vehicle.name?.toLowerCase() || ""
          const make = v.manufacturer.name?.toLowerCase() || ""
          const full = v.vehicle.fullName?.toLowerCase() || ""
          const gen = v.vehicle.generation?.toLowerCase() || ""
          const yr = v.vehicle.modelYear?.toString() || ""
          if (!name.includes(q) && !make.includes(q) && !full.includes(q) && !gen.includes(q) && !yr.includes(q)) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === "year_desc") return b.vehicle.modelYear - a.vehicle.modelYear
        if (sortBy === "year_asc") return a.vehicle.modelYear - b.vehicle.modelYear
        if (sortBy === "price_desc") return b.metadata.valuationPrice - a.metadata.valuationPrice
        if (sortBy === "power_desc") {
          const pA = a.specifications.horsepower || 0
          const pB = b.specifications.horsepower || 0
          return pB - pA
        }
        return 0
      })
  }, [vehicles, selectedEra, selectedCategory, rentalOnly, searchQuery, sortBy])

  const featuredForHero = useMemo(() => {
    if (settings.featuredVehicleIds && settings.featuredVehicleIds.length > 0) {
      const matched = settings.featuredVehicleIds
        .map((id) => vehicles.find((v) => v.vehicleId === id))
        .filter(Boolean) as StructuredVehicle[]
      if (matched.length > 0) return matched
    }
    return [
      vehicles.find((v) => v.vehicleId === "veh_porsche_911_carrera_s_2024") || vehicles[0],
      vehicles.find((v) => v.vehicleId === "veh_ferrari_f8_2024") || vehicles[1],
      vehicles.find((v) => v.vehicleId === "veh_bugatti_chiron_2016") || vehicles[2],
      vehicles.find((v) => v.vehicleId === "veh_mercedes_300sl_1954") || vehicles[3],
    ]
  }, [vehicles, settings.featuredVehicleIds])

  const handleLiveLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!liveQuery.trim()) return

    setLiveLoading(true)
    setLiveMessage(null)

    try {
      const res = await fetch("/api/cars/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carName: liveQuery.trim() }),
      })
      const data = await res.json()
      if (res.ok && data.vehicle) {
        setLiveMessage(`Loaded verified specs for ${data.vehicle.vehicle.fullName} into showroom.`)
        setSelectedVehicle(data.vehicle)
        setCheckoutType("rental")
        setShowCheckout(true)
      } else {
        setLiveMessage(data.error || "Lookup complete.")
      }
    } catch (e) {
      setLiveMessage("Error during vehicle lookup.")
    } finally {
      setLiveLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Live Telemetry Ticker if active */}
      {settings.liveTelemetryTicker && (
        <div className="bg-zinc-900/90 border-b border-zinc-800 text-xs py-2 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] whitespace-nowrap">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-white font-bold">LIVE FLEET TELEMETRY</span>
              <span className="text-zinc-600">|</span>
              <span>Available Units: {vehicles.length}</span>
              <span className="text-zinc-600">|</span>
              <span>Currency: {settings.financials.currency}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400">Escrow Security Active</span>
            </div>
            <Link
              href="/dashboard"
              className="text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
            >
              <span>Command Console</span>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Showcase */}
      <Hero
        featuredVehicles={featuredForHero}
        onSelectHeroVehicle={handleSelectVehicle}
      />

      {/* Main Inventory Catalog Section */}
      <section id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1">
              <span>Timeline Showroom</span>
              <span className="text-zinc-600">|</span>
              <span>1880 to 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Vehicle Inventory and Archives
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Browse 146 years of automotive engineering history with authentic backgroundless vehicle photography.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-2xl text-right">
              <span className="text-xs text-zinc-500 block">Matching Vehicles</span>
              <span className="text-lg font-black text-white font-mono">{filteredVehicles.length} Models</span>
            </div>
            <Link
              href="/dashboard"
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-3xl backdrop-blur-md">
          {/* Search & Sort Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make, model, generation (e.g. Porsche 911, W198, Countach, Ferrari F40)..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 font-medium"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-red-600 font-semibold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-red-600 font-semibold"
              >
                <option value="year_desc">Sort by Year (Newest First)</option>
                <option value="year_asc">Sort by Year (Oldest First)</option>
                <option value="price_desc">Sort by Valuation Price</option>
                <option value="power_desc">Sort by Horsepower</option>
              </select>
            </div>
          </div>

          {/* Era Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {ERAS.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedEra === era
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 font-bold"
                    : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {era}
              </button>
            ))}
          </div>

          {/* Rental Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
            <label className="flex items-center gap-2 text-zinc-300 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={rentalOnly}
                onChange={(e) => setRentalOnly(e.target.checked)}
                className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-red-600 focus:ring-0"
              />
              <span>Show Only Available for Daily Rental</span>
            </label>

            {compareList.length > 0 && (
              <button
                onClick={() => setShowCompare(true)}
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare Vehicles ({compareList.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <p className="text-base text-zinc-300 font-bold">No vehicles found matching criteria.</p>
            <p className="text-xs text-zinc-500">Try resetting filters or adjusting search keywords.</p>
            <button
              onClick={() => {
                setSelectedEra("All Eras")
                setSelectedCategory("All Categories")
                setSearchQuery("")
                setRentalOnly(false)
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <CarCard
                key={vehicle.vehicleId}
                vehicle={vehicle}
                onSelectVehicle={handleSelectVehicle}
                onCompare={handleToggleCompare}
                isComparing={compareList.some((v) => v.vehicleId === vehicle.vehicleId)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Side by Side Vehicle Comparator Modal */}
      {showCompare && compareList.length > 0 && (
        <VehicleComparator
          vehicles={compareList}
          onClose={() => setShowCompare(false)}
          onSelectVehicle={handleSelectVehicle}
        />
      )}

      {/* Real Time Vehicle Finder Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Realtime Automotive Intelligence</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Real Time Automobile Scanner and Verification
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
              Scan any production model in automotive history. Our system queries verified manufacturer specifications and calculates instant market valuation for sales and rentals.
            </p>

            <form onSubmit={handleLiveLookup} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="text"
                value={liveQuery}
                onChange={(e) => setLiveQuery(e.target.value)}
                placeholder="Enter any car (e.g. Aston Martin Valkyrie, McLaren 750S)..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-medium"
              />
              <button
                type="submit"
                disabled={liveLoading || !liveQuery.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{liveLoading ? "Querying Telemetry..." : "Lookup Vehicle"}</span>
              </button>
            </form>

            {liveMessage && (
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 font-mono">
                {liveMessage}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Buyer Protection & Escrow Security Section */}
      <section id="payment-security" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                <Lock className="w-4 h-4" />
                <span>Encrypted Payments</span>
              </div>
              <h3 className="text-2xl font-black text-white">Buyer &amp; Renter Escrow Protection</h3>
              <p className="text-xs text-zinc-400 mt-1">
                All rental reservations and purchase holding deposits are protected with encrypted banking security.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                AES 256 Bit Encryption
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-900/60">
                PCI DSS Level 1
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400">
            <div className="space-y-1">
              <span className="font-bold text-white block">Transparent Pricing</span>
              <p className="text-zinc-500 text-[11px]">No hidden transaction surcharges or unexpected checkout fees.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white block">Instant Hold Authorization</span>
              <p className="text-zinc-500 text-[11px]">Deposits are held securely in escrow until vehicle pickup or inspection.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white block">Global Card Compatibility</span>
              <p className="text-zinc-500 text-[11px]">Supports Visa, Mastercard, American Express, and Discover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && selectedVehicle && (
        <StripeCheckoutModal
          vehicle={selectedVehicle}
          bookingType={checkoutType}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  )
}
