"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import StripeCheckoutModal from "@/components/StripeCheckoutModal"
import VehicleComparator from "@/components/VehicleComparator"
import {
  Search,
  Filter,
  Layers,
  ArrowUpDown,
  Key,
  ShoppingBag,
  Zap,
  Gauge,
  Globe,
  SlidersHorizontal,
  Grid,
  List,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react"

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

export default function InventoryPage() {
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"

  const [vehicles, setVehicles] = useState<StructuredVehicle[]>(VEHICLES_DB)
  const [selectedEra, setSelectedEra] = useState<string>("All Eras")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [rentalOnly, setRentalOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<"year_desc" | "year_asc" | "price_desc" | "power_desc">("year_desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Checkout modal
  const [selectedVehicle, setSelectedVehicle] = useState<StructuredVehicle | null>(null)
  const [checkoutType, setCheckoutType] = useState<"rental" | "purchase">("rental")
  const [showCheckout, setShowCheckout] = useState<boolean>(false)

  // Compare mode
  const [compareList, setCompareList] = useState<StructuredVehicle[]>([])
  const [showCompare, setShowCompare] = useState<boolean>(false)

  // Fetch live vehicles
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            <span>Showroom Fleet</span>
            <span className="text-zinc-600">|</span>
            <span>1880 to 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Complete Vehicle Inventory &amp; Archives
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Browse our full catalog of authentic sports cars, supercars, hypercars, and historical collector automobiles with transparent PNG cutouts and verified telemetry.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Controls and Filters */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-3xl space-y-4 backdrop-blur-md">
          {/* Row 1: Search, Category, Sort, View */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search make, model, year (e.g. Porsche 911, W198, F40)..."
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

            <div className="md:col-span-1 flex items-center justify-end gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl border transition-all ${
                  viewMode === "grid"
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl border transition-all ${
                  viewMode === "list"
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
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

          {/* Bottom Bar: Count, Rental filter, Compare toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-zinc-300 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={rentalOnly}
                  onChange={(e) => setRentalOnly(e.target.checked)}
                  className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-red-600 focus:ring-0"
                />
                <span>Show Only Available for Daily Rental</span>
              </label>

              <span className="text-zinc-500 font-mono">
                {filteredVehicles.length} of {vehicles.length} Models
              </span>
            </div>

            {compareList.length > 0 && (
              <button
                onClick={() => setShowCompare(true)}
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare Selected ({compareList.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Display Content: Grid View or List View */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <p className="text-base text-zinc-300 font-bold">No vehicles found matching criteria.</p>
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
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.vehicleId}
                className="group relative bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 rounded-3xl border border-zinc-800/80 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div className="p-5 pb-0 flex items-start justify-between gap-2 z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black uppercase text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-900/60">
                        {vehicle.vehicle.modelYear}
                      </span>
                      <span className="text-[10px] font-semibold uppercase text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full">
                        {vehicle.vehicle.category}
                      </span>
                    </div>
                    <Link href={`/vehicles/${vehicle.vehicleId}`}>
                      <h3 className="text-lg font-black text-white mt-2 group-hover:text-red-400 transition-colors tracking-tight">
                        {vehicle.manufacturer.name} {vehicle.vehicle.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 font-medium">
                      {vehicle.vehicle.generation || vehicle.vehicle.bodyType}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-white font-mono">
                      {currencySymbol}{vehicle.metadata.valuationPrice.toLocaleString()}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-zinc-500">
                      Valuation
                    </div>
                  </div>
                </div>

                <Link
                  href={`/vehicles/${vehicle.vehicleId}`}
                  className="relative w-full h-56 px-4 flex items-center justify-center my-3 block"
                >
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <Image
                      src={vehicle.images.primaryImage.url}
                      alt={vehicle.vehicle.fullName}
                      fill
                      unoptimized
                      className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                <div className="px-5 space-y-3 z-10">
                  <div className="grid grid-cols-3 gap-2 bg-zinc-950/80 border border-zinc-800/60 rounded-2xl p-2.5 text-center">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase font-semibold">Power</div>
                      <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">
                        {vehicle.specifications.horsepower ? `${vehicle.specifications.horsepower} HP` : "Historic"}
                      </div>
                    </div>
                    <div className="border-x border-zinc-800/60">
                      <div className="text-[10px] text-zinc-500 uppercase font-semibold">0 to 60</div>
                      <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">
                        {vehicle.specifications.acceleration ? vehicle.specifications.acceleration.split(" ")[0] : "Historic"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase font-semibold">Top Speed</div>
                      <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">
                        {vehicle.specifications.topSpeed || "Historic"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-4 border-t border-zinc-800/80 mt-4 flex flex-col gap-3 z-10 bg-zinc-950/60">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-zinc-400 text-[11px]">Rental Rate: </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {vehicle.rental.dailyRate ? `${currencySymbol}${vehicle.rental.dailyRate}/day` : "Contact Us"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleCompare(vehicle)}
                      className={`p-1.5 px-2.5 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                        compareList.some((v) => v.vehicleId === vehicle.vehicleId)
                          ? "bg-indigo-950/80 text-indigo-400 border-indigo-700"
                          : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Compare</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {settings.operations.allowDailyRentals && (
                      <button
                        onClick={() => handleSelectVehicle(vehicle, "rental")}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all border border-zinc-700 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Key className="w-3.5 h-3.5 text-amber-400" />
                        <span>Rent Daily</span>
                      </button>
                    )}

                    {settings.operations.allowInstantPurchase && (
                      <button
                        onClick={() => handleSelectVehicle(vehicle, "purchase")}
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Vehicle</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View Mode */
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden divide-y divide-zinc-800">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.vehicleId}
                className="p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="relative w-36 h-20 bg-zinc-950 rounded-2xl p-2 border border-zinc-800 shrink-0">
                    <Image
                      src={vehicle.images.primaryImage.url}
                      alt={vehicle.vehicle.fullName}
                      fill
                      unoptimized
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-red-500 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                        {vehicle.vehicle.modelYear}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-semibold uppercase">
                        {vehicle.vehicle.category}
                      </span>
                    </div>
                    <Link href={`/vehicles/${vehicle.vehicleId}`}>
                      <h4 className="text-base font-black text-white hover:text-red-400 transition-colors">
                        {vehicle.manufacturer.name} {vehicle.vehicle.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-zinc-400">{vehicle.vehicle.generation} | {vehicle.specifications.engineType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-base font-black text-white font-mono">
                      {currencySymbol}{vehicle.metadata.valuationPrice.toLocaleString()}
                    </div>
                    {vehicle.rental.availableForRental && (
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        {currencySymbol}{vehicle.rental.dailyRate}/day
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelectVehicle(vehicle, "rental")}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-zinc-700"
                    >
                      Rent
                    </button>
                    <button
                      onClick={() => handleSelectVehicle(vehicle, "purchase")}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                    >
                      Buy
                    </button>
                    <Link
                      href={`/vehicles/${vehicle.vehicleId}`}
                      className="p-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Side by Side Comparator */}
      {showCompare && compareList.length > 0 && (
        <VehicleComparator
          vehicles={compareList}
          onClose={() => setShowCompare(false)}
          onSelectVehicle={handleSelectVehicle}
        />
      )}

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
