"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"
import TimelineNav from "@/components/TimelineNav"
import VehicleDetailModal from "@/components/VehicleDetailModal"
import StructuredStripeModal from "@/components/StructuredStripeModal"
import {
  Gauge,
  Zap,
  ShieldCheck,
  CreditCard,
  Lock,
  Search,
  Check,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Award,
  Calendar,
  Layers,
  Fuel,
  Key,
  Globe,
  Loader2,
  Plus
} from "lucide-react"

export default function HomePage() {
  const [customVehicles, setCustomVehicles] = useState<StructuredVehicle[]>([])
  const [selectedEra, setSelectedEra] = useState<string>("All Eras")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("All Manufacturers")
  const [yearRange, setYearRange] = useState<[number, number]>([1880, 2026])
  const [selectedExactYear, setSelectedExactYear] = useState<number | null>(null)
  const [rentalOnly, setRentalOnly] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  // Real time search state
  const [realtimeInput, setRealtimeInput] = useState<string>("")
  const [isSearchingRealtime, setIsSearchingRealtime] = useState<boolean>(false)
  const [realtimeError, setRealtimeError] = useState<string | null>(null)
  const [realtimeFoundVehicle, setRealtimeFoundVehicle] = useState<StructuredVehicle | null>(null)

  const [detailVehicle, setDetailVehicle] = useState<StructuredVehicle | null>(null)
  const [stripeVehicle, setStripeVehicle] = useState<StructuredVehicle | null>(null)
  const [stripeMode, setStripeMode] = useState<"rental" | "purchase">("purchase")
  const [compareList, setCompareList] = useState<string[]>([])

  const ERAS: string[] = [
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

  const CATEGORIES: string[] = [
    "All Categories",
    "Economy",
    "Sedan",
    "Hatchback",
    "SUV",
    "Crossover",
    "Coupe",
    "Convertible",
    "Sports Car",
    "Supercar",
    "Hypercar",
    "Luxury",
    "Classic",
    "Vintage",
    "Muscle Car",
    "Electric Vehicle",
    "Hybrid Vehicle",
    "Racing Car",
    "Experimental Vehicle"
  ]

  const allVehicles = useMemo(() => {
    return [...customVehicles, ...VEHICLES_DB]
  }, [customVehicles])

  const manufacturers = useMemo(() => {
    const set = new Set<string>()
    allVehicles.forEach((v) => set.add(v.manufacturer.name))
    return ["All Manufacturers", ...Array.from(set).sort()]
  }, [allVehicles])

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((item) => {
      if (selectedExactYear !== null) {
        if (item.vehicle.modelYear !== selectedExactYear) return false
      } else {
        if (item.vehicle.modelYear < yearRange[0] || item.vehicle.modelYear > yearRange[1]) return false
      }

      if (selectedEra !== "All Eras" && item.vehicle.era !== selectedEra) return false
      if (selectedCategory !== "All Categories" && item.vehicle.category !== selectedCategory) return false
      if (selectedManufacturer !== "All Manufacturers" && item.manufacturer.name !== selectedManufacturer) return false
      if (rentalOnly && !item.rental.availableForRental) return false

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = item.vehicle.name.toLowerCase().includes(query)
        const matchFullName = item.vehicle.fullName.toLowerCase().includes(query)
        const matchMake = item.manufacturer.name.toLowerCase().includes(query)
        const matchCat = item.vehicle.category.toLowerCase().includes(query)
        const matchEngine = item.specifications.engineType.toLowerCase().includes(query)
        const matchGen = item.vehicle.generation.toLowerCase().includes(query)
        const matchYear = item.vehicle.modelYear.toString().includes(query)
        if (!matchName && !matchFullName && !matchMake && !matchCat && !matchEngine && !matchGen && !matchYear) {
          return false
        }
      }

      return true
    })
  }, [allVehicles, selectedExactYear, yearRange, selectedEra, selectedCategory, selectedManufacturer, rentalOnly, searchQuery])

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((item) => item !== id))
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, id])
      }
    }
  }

  const comparedVehicles = allVehicles.filter((v) => compareList.includes(v.vehicleId))

  const handleOpenStripe = (vehicle: StructuredVehicle, mode: "rental" | "purchase") => {
    setStripeVehicle(vehicle)
    setStripeMode(mode)
  }

  // Real-time car search using RapidAPI and Gemini API
  const handleRealtimeSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!realtimeInput.trim()) return

    setIsSearchingRealtime(true)
    setRealtimeError(null)
    setRealtimeFoundVehicle(null)

    try {
      const res = await fetch("/api/cars/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carName: realtimeInput.trim() }),
      })

      const data = await res.json()
      if (res.ok && data.vehicle) {
        setRealtimeFoundVehicle(data.vehicle)
        if (!customVehicles.some((v) => v.vehicleId === data.vehicle.vehicleId)) {
          setCustomVehicles((prev) => [data.vehicle, ...prev])
        }
      } else {
        setRealtimeError(data.error || "Could not retrieve real time vehicle details.")
      }
    } catch (err: any) {
      setRealtimeError("Failed to connect to real time automotive service.")
    } finally {
      setIsSearchingRealtime(false)
    }
  }

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Showcase Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 pt-10 pb-16 border-b border-zinc-800">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/15 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Real Time Automotive Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Automotive Catalog 1880 to 2026
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Explore authentic manufacturer models across all production eras with real time backgroundless images according to name, powered by RapidAPI and Gemini.
            </p>
          </div>

          {/* Real-time Car Search Bar by Name */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleRealtimeSearch}
              className="bg-zinc-900/90 border border-indigo-500/40 rounded-2xl p-2.5 flex items-center gap-2 shadow-2xl shadow-indigo-950/40"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-indigo-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={realtimeInput}
                  onChange={(e) => setRealtimeInput(e.target.value)}
                  placeholder="Enter any car name e.g. Ferrari Roma, Lamborghini Huracan, BMW M5..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSearchingRealtime || !realtimeInput.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 flex-shrink-0"
              >
                {isSearchingRealtime ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Get Real Time Car</span>
                  </>
                )}
              </button>
            </form>

            {realtimeError && (
              <p className="text-xs text-red-400 text-center mt-2">{realtimeError}</p>
            )}
          </div>

          {/* Real-Time Retrieved Car Card Spotlight */}
          {realtimeFoundVehicle && (
            <div className="mt-6 bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-zinc-900 border border-indigo-500/50 rounded-3xl p-6 max-w-3xl mx-auto shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real Time Vehicle Retrieved</span>
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  {realtimeFoundVehicle.vehicle.era}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative w-full h-48 bg-zinc-950 rounded-2xl p-4 flex items-center justify-center border border-zinc-800">
                  <Image
                    src={realtimeFoundVehicle.images.primaryImage.url}
                    alt={realtimeFoundVehicle.vehicle.fullName}
                    fill
                    className="object-contain p-2 drop-shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">
                      {realtimeFoundVehicle.manufacturer.name}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {realtimeFoundVehicle.vehicle.modelYear} {realtimeFoundVehicle.vehicle.fullName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {realtimeFoundVehicle.metadata.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                      <div className="font-bold text-white">{realtimeFoundVehicle.specifications.horsepower} HP</div>
                      <div className="text-[10px] text-zinc-500">Power</div>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                      <div className="font-bold text-white">{realtimeFoundVehicle.specifications.acceleration?.split(" ")[0]}</div>
                      <div className="text-[10px] text-zinc-500">0 to 60</div>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                      <div className="font-bold text-white">{realtimeFoundVehicle.specifications.topSpeed?.split(" ")[0]}</div>
                      <div className="text-[10px] text-zinc-500">Speed</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setDetailVehicle(realtimeFoundVehicle)}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => handleOpenStripe(realtimeFoundVehicle, "rental")}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Rent ${realtimeFoundVehicle.rental.dailyRate}/Day</span>
                    </button>
                    <button
                      onClick={() => handleOpenStripe(realtimeFoundVehicle, "purchase")}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Reserve</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Database & Catalog Section */}
      <section id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Structured Vehicle Catalog</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Search and Filter Automobiles</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Displaying {filteredVehicles.length} verified manufacturer records with authentic transparent PNG images.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model generation engine year..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Chronological Timeline Jump Navigator */}
        <TimelineNav
          selectedYear={selectedExactYear}
          onSelectYear={(year) => {
            setSelectedExactYear(year)
          }}
          onSelectDecade={(start, end) => {
            setYearRange([start, end])
          }}
        />

        {/* Faceted Filter Toolbar */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-6">
          {/* Era Pills */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <Calendar className="w-4 h-4 text-red-500" />
              <span>Filter by Historical Era</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ERAS.map((era) => (
                <button
                  key={era}
                  onClick={() => {
                    setSelectedEra(era)
                    setSelectedExactYear(null)
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedEra === era
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          {/* Facet Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-800/80">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Manufacturer Marque
              </label>
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
              >
                {manufacturers.map((m) => (
                  <option key={m} value={m} className="bg-zinc-950 text-white">
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Vehicle Category (22 Official Types)
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-zinc-950 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Model Year: {yearRange[0]} to {yearRange[1]}
                </label>
                {(yearRange[0] !== 1880 || yearRange[1] !== 2026 || selectedExactYear !== null) && (
                  <button
                    onClick={() => {
                      setYearRange([1880, 2026])
                      setSelectedExactYear(null)
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1880"
                  max="2026"
                  step="1"
                  value={selectedExactYear !== null ? selectedExactYear : yearRange[0]}
                  onChange={(e) => {
                    const y = parseInt(e.target.value)
                    setYearRange([y, yearRange[1]])
                    setSelectedExactYear(null)
                  }}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <span className="text-xs text-zinc-400 font-mono w-10 text-right">
                  {selectedExactYear !== null ? selectedExactYear : yearRange[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 p-2.5 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={rentalOnly}
                  onChange={(e) => setRentalOnly(e.target.checked)}
                  className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-semibold text-zinc-300">
                  Available for Rental Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-400 space-y-4">
            <SlidersHorizontal className="w-10 h-10 mx-auto text-zinc-600" />
            <h3 className="text-lg font-bold text-white">No historical vehicles found</h3>
            <p className="text-xs max-w-sm mx-auto">
              Try adjusting your era filter or searching for any real car using the real time lookup bar above.
            </p>
            <button
              onClick={() => {
                setSelectedEra("All Eras")
                setSelectedCategory("All Categories")
                setSelectedManufacturer("All Manufacturers")
                setYearRange([1880, 2026])
                setSelectedExactYear(null)
                setRentalOnly(false)
                setSearchQuery("")
              }}
              className="bg-red-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((item) => {
              const isComparing = compareList.includes(item.vehicleId)

              return (
                <div
                  key={item.vehicleId}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-5 flex flex-col justify-between group transition-all hover:shadow-2xl hover:shadow-black/60"
                >
                  <div>
                    {/* Header with Era and Generation Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block">
                          {item.manufacturer.name}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                          {item.vehicle.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-full text-zinc-200 font-black block">
                          {item.vehicle.modelYear}
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-1">
                          {item.vehicle.category}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg text-[10px] text-zinc-400 mb-3">
                      <Layers className="w-3 h-3 text-zinc-500" />
                      <span>{item.vehicle.generation}</span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                      {item.metadata.description}
                    </p>

                    {/* Authentic Backgroundless Vehicle Image */}
                    <div className="relative w-full h-48 bg-zinc-950 rounded-2xl p-4 my-2 flex items-center justify-center overflow-hidden border border-zinc-800/80">
                      <Image
                        src={item.images.primaryImage.url}
                        alt={item.vehicle.fullName}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Specifications Pill Badges */}
                    <div className="grid grid-cols-3 gap-2 my-4 pt-2 border-t border-zinc-800/60">
                      <div className="bg-zinc-950/70 p-2 rounded-xl text-center">
                        <Zap className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-white">
                          {item.specifications.horsepower ? `${item.specifications.horsepower} HP` : "Historic"}
                        </div>
                        <div className="text-[10px] text-zinc-500">Power</div>
                      </div>
                      <div className="bg-zinc-950/70 p-2 rounded-xl text-center">
                        <Gauge className="w-3.5 h-3.5 text-red-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-white">
                          {item.specifications.acceleration ? item.specifications.acceleration.split(" ")[0] : "Historic"}
                        </div>
                        <div className="text-[10px] text-zinc-500">0 to 60</div>
                      </div>
                      <div className="bg-zinc-950/70 p-2 rounded-xl text-center">
                        <Award className="w-3.5 h-3.5 text-indigo-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-white truncate px-1">
                          {item.specifications.topSpeed ? item.specifications.topSpeed.split(" ")[0] : "Verified"}
                        </div>
                        <div className="text-[10px] text-zinc-500">Top Speed</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400">Valuation MSRP</span>
                      <span className="text-lg font-black text-white">
                        ${item.metadata.valuationPrice.toLocaleString()} USD
                      </span>
                    </div>

                    {item.rental.availableForRental && item.rental.dailyRate && (
                      <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-3 py-1.5 rounded-xl">
                        <span>Rental Available</span>
                        <span className="font-bold">${item.rental.dailyRate.toLocaleString()} / Day</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDetailVehicle(item)}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        Full Details
                      </button>

                      {item.rental.availableForRental ? (
                        <button
                          onClick={() => handleOpenStripe(item, "rental")}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Rent via Stripe</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenStripe(item, "purchase")}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Stripe Reserve</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => toggleCompare(item.vehicleId)}
                      className={`w-full py-1.5 text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                        isComparing
                          ? "bg-red-950/40 text-red-400 border border-red-800/50"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isComparing ? "opacity-100" : "opacity-0"}`} />
                      <span>{isComparing ? "In Direct Comparison" : "Compare Specifications"}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Comparison Matrix */}
      {comparedVehicles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-xl font-bold text-white">Direct Vehicle Comparison Matrix</h3>
                <p className="text-xs text-zinc-400">Comparing {comparedVehicles.length} vehicles side by side across production eras.</p>
              </div>
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-red-400 hover:text-red-300 underline font-medium"
              >
                Clear Comparison
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedVehicles.map((item) => (
                <div key={item.vehicleId} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <div className="relative w-full h-36">
                    <Image
                      src={item.images.primaryImage.url}
                      alt={item.vehicle.fullName}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">{item.vehicle.era}</span>
                    <h4 className="font-bold text-white text-base">{item.vehicle.modelYear} {item.vehicle.fullName}</h4>
                    <p className="text-sm font-semibold text-emerald-400 mt-0.5">${item.metadata.valuationPrice.toLocaleString()} USD</p>
                  </div>
                  <div className="space-y-2 text-xs divide-y divide-zinc-900 pt-2">
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Generation</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[160px] truncate">{item.vehicle.generation}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Engine</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[160px] truncate">{item.specifications.engineType}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Horsepower</span>
                      <span className="text-zinc-200 font-medium">
                        {item.specifications.horsepower ? `${item.specifications.horsepower} HP` : "Historic"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Acceleration</span>
                      <span className="text-zinc-200 font-medium">{item.specifications.acceleration || "Historic"}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Top Speed</span>
                      <span className="text-zinc-200 font-medium">{item.specifications.topSpeed || "Historic"}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Transmission</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[160px] truncate">{item.specifications.transmission}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenStripe(item, item.rental.availableForRental ? "rental" : "purchase")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Proceed with Stripe</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stripe Payment Infrastructure Feature */}
      <section id="stripe-payment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-zinc-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Exclusive Payment Provider</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Direct Stripe Payment Infrastructure
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Every rental booking and purchase deposit is processed exclusively through Stripe, the global financial platform. Enjoy 256 bit card encryption, immediate authorization receipts, and complete buyer protection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl">
                <CreditCard className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Cards and Wallets</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Visa Mastercard American Express and Discover handled directly</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Fraud Prevention</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Stripe Radar real time algorithmic fraud monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {detailVehicle && (
        <VehicleDetailModal
          vehicle={detailVehicle}
          onClose={() => setDetailVehicle(null)}
          onOpenStripeCheckout={(v, mode) => {
            setDetailVehicle(null)
            handleOpenStripe(v, mode)
          }}
        />
      )}

      {stripeVehicle && (
        <StructuredStripeModal
          vehicle={stripeVehicle}
          mode={stripeMode}
          onClose={() => setStripeVehicle(null)}
        />
      )}
    </div>
  )
}
