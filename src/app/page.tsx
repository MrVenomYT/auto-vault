"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { CARS_DATA, CarVehicle } from "@/lib/cars"
import StripeCheckoutModal from "@/components/StripeCheckoutModal"
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
  Fuel
} from "lucide-react"

export default function HomePage() {
  const [selectedEra, setSelectedEra] = useState<string>("All Eras")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands")
  const [yearRange, setYearRange] = useState<[number, number]>([1880, 2026])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeVehicle, setActiveVehicle] = useState<CarVehicle | null>(null)
  const [checkoutVehicle, setCheckoutVehicle] = useState<CarVehicle | null>(null)
  const [compareList, setCompareList] = useState<string[]>([])

  const eras = [
    "All Eras",
    "Pioneer (1880 to 1929)",
    "Classic (1930 to 1959)",
    "Golden Age (1960 to 1979)",
    "Modern Classic (1980 to 1999)",
    "Contemporary (2000 to 2019)",
    "Modern Era (2020 to 2026)"
  ]

  const categories = [
    "All Categories",
    "Sports Coupe",
    "Supercar",
    "Hypercar",
    "Executive Sedan",
    "Convertible Roadster",
    "Vintage Classic",
    "Electric Performance"
  ]

  const brands = useMemo(() => {
    const set = new Set<string>()
    CARS_DATA.forEach((car) => set.add(car.make))
    return ["All Brands", ...Array.from(set).sort()]
  }, [])

  const filteredVehicles = useMemo(() => {
    return CARS_DATA.filter((car) => {
      const matchesEra = selectedEra === "All Eras" || car.era === selectedEra
      const matchesCategory = selectedCategory === "All Categories" || car.category === selectedCategory
      const matchesBrand = selectedBrand === "All Brands" || car.make === selectedBrand
      const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1]
      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        car.make.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query) ||
        car.engine.toLowerCase().includes(query) ||
        car.year.toString().includes(query)

      return matchesEra && matchesCategory && matchesBrand && matchesYear && matchesQuery
    })
  }, [selectedEra, selectedCategory, selectedBrand, yearRange, searchQuery])

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((item) => item !== id))
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, id])
      }
    }
  }

  const comparedVehicles = CARS_DATA.filter((car) => compareList.includes(car.id))

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 pt-12 pb-20 border-b border-zinc-800">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Complete Automotive History 1880 to 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Every Era of Automotive Innovation
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Explore authentic manufacturer models from the 1886 Benz Patent Motorwagen to 2026 hybrid hypercars. High resolution backgroundless imagery with secure Stripe checkout.
            </p>
          </div>

          {/* Hero Featured Car */}
          <div className="mt-8 relative max-w-4xl mx-auto">
            <div className="relative w-full h-72 sm:h-96 flex items-center justify-center">
              <Image
                src="https://pngimg.com/d/porsche_PNG10613.png"
                alt="Porsche 911 Carrera S"
                fill
                priority
                className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-red-500 font-bold block">Featured Modern Showcase</span>
                <h2 className="text-xl font-bold text-white">2024 Porsche 911 Carrera S</h2>
                <span className="text-xs text-zinc-400">443 HP Twin Turbo Boxer 6 with 8 Speed PDK</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setCheckoutVehicle(CARS_DATA.find(c => c.id === "porsche_911_carrera_s_2024") || CARS_DATA[0])}
                  className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Stripe Reserve $5000</span>
                </button>
                <button
                  onClick={() => setActiveVehicle(CARS_DATA.find(c => c.id === "porsche_911_carrera_s_2024") || CARS_DATA[0])}
                  className="flex-1 sm:flex-none bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-3 rounded-xl transition-all"
                >
                  Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Inventory Section with 1880 to 2026 Timeline Controls */}
      <section id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Comprehensive 1880 to 2026 Catalog</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Showroom Inventory</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Showing {filteredVehicles.length} certified vehicles matching your era and category criteria.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search make model year or engine..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-6">
          {/* Era Pills */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <Calendar className="w-4 h-4 text-red-500" />
              <span>Historical Era</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedEra === era
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          {/* Dropdown Filters & Year Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-800/80">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Brand Marque
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
              >
                {brands.map((b) => (
                  <option key={b} value={b} className="bg-zinc-950 text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Vehicle Body Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-zinc-950 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Timeline Range: {yearRange[0]} to {yearRange[1]}
                </label>
                {(yearRange[0] !== 1880 || yearRange[1] !== 2026) && (
                  <button
                    onClick={() => setYearRange([1880, 2026])}
                    className="text-[10px] text-red-400 hover:text-red-300"
                  >
                    Reset Years
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1880"
                  max="2026"
                  step="1"
                  value={yearRange[0]}
                  onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <span className="text-xs text-zinc-400 font-mono">{yearRange[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400 space-y-4">
            <SlidersHorizontal className="w-8 h-8 mx-auto text-zinc-600" />
            <h3 className="text-lg font-bold text-white">No vehicles found</h3>
            <p className="text-xs max-w-sm mx-auto">
              Try adjusting your era selection or resetting the year slider to view vehicles across all decades.
            </p>
            <button
              onClick={() => {
                setSelectedEra("All Eras")
                setSelectedCategory("All Categories")
                setSelectedBrand("All Brands")
                setYearRange([1880, 2026])
                setSearchQuery("")
              }}
              className="bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car) => {
              const isComparing = compareList.includes(car.id)

              return (
                <div
                  key={car.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between group transition-all hover:shadow-2xl hover:shadow-black/50"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-500 block">
                          {car.make}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                          {car.model}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-full text-zinc-300 font-bold block">
                          {car.year}
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-1">{car.category}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                      {car.description}
                    </p>

                    {/* Authentic Backgroundless Car Image */}
                    <div className="relative w-full h-48 bg-zinc-950 rounded-xl p-4 my-2 flex items-center justify-center overflow-hidden border border-zinc-800/80">
                      <Image
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Performance Badges */}
                    <div className="grid grid-cols-3 gap-2 my-4 pt-2 border-t border-zinc-800/60">
                      <div className="bg-zinc-950/60 p-2 rounded-lg text-center">
                        <Zap className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-white">{car.horsepower} HP</div>
                        <div className="text-[10px] text-zinc-500">Power</div>
                      </div>
                      <div className="bg-zinc-950/60 p-2 rounded-lg text-center">
                        <Gauge className="w-3.5 h-3.5 text-red-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-white">{car.acceleration.split(" ")[0]}s</div>
                        <div className="text-[10px] text-zinc-500">0 to 60</div>
                      </div>
                      <div className="bg-zinc-950/60 p-2 rounded-lg text-center">
                        <Award className="w-3.5 h-3.5 text-indigo-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-white">{car.topSpeed.split(" ")[0]}</div>
                        <div className="text-[10px] text-zinc-500">Top Speed</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400">Valuation MSRP</span>
                      <span className="text-lg font-extrabold text-white">
                        ${car.price.toLocaleString()} USD
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveVehicle(car)}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        Specifications
                      </button>
                      <button
                        onClick={() => setCheckoutVehicle(car)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Stripe Reserve</span>
                      </button>
                    </div>

                    <button
                      onClick={() => toggleCompare(car.id)}
                      className={`w-full py-1.5 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                        isComparing
                          ? "bg-red-950/40 text-red-400 border border-red-800/50"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isComparing ? "opacity-100" : "opacity-0"}`} />
                      <span>{isComparing ? "Selected for Comparison" : "Compare Specifications"}</span>
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
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-xl font-bold text-white">Direct Vehicle Comparison</h3>
                <p className="text-xs text-zinc-400">Comparing {comparedVehicles.length} models side by side across eras.</p>
              </div>
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-red-400 hover:text-red-300 underline font-medium"
              >
                Clear Comparison
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedVehicles.map((car) => (
                <div key={car.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
                  <div className="relative w-full h-32">
                    <Image
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">{car.era}</span>
                    <h4 className="font-bold text-white text-base">{car.year} {car.make} {car.model}</h4>
                    <p className="text-sm font-semibold text-emerald-400 mt-0.5">${car.price.toLocaleString()} USD</p>
                  </div>
                  <div className="space-y-2 text-xs divide-y divide-zinc-900 pt-2">
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Engine</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[160px] truncate">{car.engine}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Horsepower</span>
                      <span className="text-zinc-200 font-medium">{car.horsepower} HP</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Acceleration</span>
                      <span className="text-zinc-200 font-medium">{car.acceleration}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Top Speed</span>
                      <span className="text-zinc-200 font-medium">{car.topSpeed}</span>
                    </div>
                    <div className="flex justify-between py-1 text-zinc-400">
                      <span>Transmission</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[160px] truncate">{car.transmission}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCheckoutVehicle(car)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Reserve via Stripe</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stripe Exclusive Payment Section */}
      <section id="stripe-payment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-zinc-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Exclusive Payment Provider</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Direct Stripe Payment Processing
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Every deposit and vehicle purchase is processed exclusively through Stripe financial infrastructure. Enjoy 256 bit card encryption, instant authorization receipts, and full buyer protection across all vehicle eras.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
                <CreditCard className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Credit and Debit Cards</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Visa Mastercard American Express and Discover handled directly</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
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

      {/* Vehicle Specification Quick-View Modal */}
      {activeVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl my-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500 block">
                  {activeVehicle.era}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                </h3>
              </div>
              <button
                onClick={() => setActiveVehicle(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                Close
              </button>
            </div>

            <div className="relative w-full h-56 bg-zinc-950 rounded-xl p-4 my-4 flex items-center justify-center border border-zinc-800">
              <Image
                src={activeVehicle.image}
                alt={`${activeVehicle.make} ${activeVehicle.model}`}
                fill
                className="object-contain p-2"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase block">Engine</span>
                <span className="text-xs font-bold text-white">{activeVehicle.engine}</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase block">Horsepower</span>
                <span className="text-xs font-bold text-white">{activeVehicle.horsepower} HP</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase block">Transmission</span>
                <span className="text-xs font-bold text-white">{activeVehicle.transmission}</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase block">Drivetrain</span>
                <span className="text-xs font-bold text-white">{activeVehicle.drivetrain}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Manufacturer Factory Specifications
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {activeVehicle.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400 block">Valuation MSRP</span>
                <span className="text-xl font-bold text-white">${activeVehicle.price.toLocaleString()} USD</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveVehicle(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const carToReserve = activeVehicle
                    setActiveVehicle(null)
                    setCheckoutVehicle(carToReserve)
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Reserve with Stripe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stripe Checkout Modal */}
      {checkoutVehicle && (
        <StripeCheckoutModal
          vehicle={checkoutVehicle}
          onClose={() => setCheckoutVehicle(null)}
        />
      )}
    </div>
  )
}
