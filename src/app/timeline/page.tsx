"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import StripeCheckoutModal from "@/components/StripeCheckoutModal"
import {
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Key,
  ChevronRight,
  Award
} from "lucide-react"

const TIMELINE_ERAS = [
  {
    id: "1880 to 1899 (Pioneering and Experimental)",
    title: "1880 to 1899: The Pioneering Era",
    subtitle: "Invention of the internal combustion engine automobile",
    description: "From Carl Benz's 1886 Motorwagen to early horseless carriage experiments, witness the birth of global individual mobility."
  },
  {
    id: "1900 to 1919 (Early Production and Vintage)",
    title: "1900 to 1919: Vintage and Mass Production",
    subtitle: "Moving assembly lines and standardized motoring",
    description: "Henry Ford's Model T revolutionizes mass assembly while European coachbuilders introduce luxury touring automobiles."
  },
  {
    id: "1920 to 1939 (Classic and Pre War)",
    title: "1920 to 1939: Pre-War and Art Deco Masterpieces",
    subtitle: "The golden era of bespoke automotive design",
    description: "Bugatti Type 57SC, Duesenberg, and Alfa Romeo dominate Grand Prix racing and French concours d'elegance."
  },
  {
    id: "1940 to 1959 (Post War and Early Classic)",
    title: "1940 to 1959: Post-War Rebirth and Early Classics",
    subtitle: "Iconic gullwings, lightweight roadsters, and American tailfins",
    description: "The Mercedes 300 SL Gullwing, Chevrolet Corvette C1, and Ferrari 250 Testa Rossa redefine motorsport elegance."
  },
  {
    id: "1960 to 1979 (Muscle Cars and Golden Age)",
    title: "1960 to 1979: Muscle Cars and the Golden Age",
    subtitle: "V8 horsepower wars and mid-engine revolutions",
    description: "Shelby Cobra, Lamborghini Miura, Ford GT40, and Dodge Charger battle for street and Le Mans supremacy."
  },
  {
    id: "1980 to 1999 (Modern Classic and Supercars)",
    title: "1980 to 1999: The Supercar Renaissance",
    subtitle: "Twin turbos, carbon fiber, and 200+ MPH barrier",
    description: "Ferrari F40, McLaren F1, Porsche 959, and Lamborghini Diablo establish the modern definition of a supercar."
  },
  {
    id: "2000 to 2009 (Early Modern Era)",
    title: "2000 to 2009: Early Modern Hypercars",
    subtitle: "Naturally aspirated V10s and V12 symphonies",
    description: "Porsche Carrera GT, Ferrari Enzo, Audi R8, and Bugatti Veyron push engineering boundaries to 1,000 HP."
  },
  {
    id: "2010 to 2019 (Contemporary Era)",
    title: "2010 to 2019: The Hybrid Holy Trinity",
    subtitle: "KERS hybrid technology and aerodynamically active supercars",
    description: "Ferrari LaFerrari, Porsche 918 Spyder, McLaren P1, and Bugatti Chiron take hypercar performance to unprecedented heights."
  },
  {
    id: "2020 to 2026 (Modern and Latest Generation)",
    title: "2020 to 2026: Next-Gen and Electrified Titans",
    subtitle: "High output dual clutch turbos, F1 powertrains, and all electric hypercars",
    description: "Porsche 911 Carrera S, Ferrari F8, Aston Martin Valkyrie, and Corvette Z06 lead today's automotive pinnacle."
  }
]

export default function TimelinePage() {
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(8) // Default to latest era

  const [selectedVehicle, setSelectedVehicle] = useState<StructuredVehicle | null>(null)
  const [checkoutType, setCheckoutType] = useState<"rental" | "purchase">("rental")
  const [showCheckout, setShowCheckout] = useState<boolean>(false)

  const activeEra = TIMELINE_ERAS[selectedEraIndex]

  const eraVehicles = useMemo(() => {
    return VEHICLES_DB.filter((v) => v.vehicle.era === activeEra.id)
  }, [activeEra])

  const handleSelectVehicle = (vehicle: StructuredVehicle, type: "rental" | "purchase") => {
    setSelectedVehicle(vehicle)
    setCheckoutType(type)
    setShowCheckout(true)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            <span>Automotive History</span>
            <span className="text-zinc-600">|</span>
            <span>1880 to 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            146 Years of Automotive Engineering
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Journey through 9 distinct historical eras of automobile evolution. Select an era to explore authentic manufacturer photography and verified technical specs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Timeline Era Navigation Horizontal Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {TIMELINE_ERAS.map((era, idx) => (
            <button
              key={era.id}
              onClick={() => setSelectedEraIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                selectedEraIndex === idx
                  ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                  : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <div className="text-[10px] font-mono font-bold uppercase">
                Era {idx + 1}
              </div>
              <div className="text-xs font-black truncate text-white">
                {era.id.split(" ")[0]} to {era.id.split(" ")[2]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Era Spotlight Box */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Era {selectedEraIndex + 1} Spotlight</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {activeEra.title}
          </h2>
          <div className="text-sm font-semibold text-zinc-300">
            {activeEra.subtitle}
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            {activeEra.description}
          </p>
        </div>

        {/* Era Vehicles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-lg font-black text-white">
              Vehicles from this Era ({eraVehicles.length} Models)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eraVehicles.map((vehicle) => (
              <div
                key={vehicle.vehicleId}
                className="group bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 rounded-3xl border border-zinc-800/80 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div className="p-5 pb-0 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-900/60">
                      {vehicle.vehicle.modelYear}
                    </span>
                    <Link href={`/vehicles/${vehicle.vehicleId}`}>
                      <h4 className="text-lg font-black text-white mt-2 group-hover:text-red-400 transition-colors tracking-tight">
                        {vehicle.manufacturer.name} {vehicle.vehicle.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-zinc-400">{vehicle.vehicle.category}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-white font-mono">
                      {currencySymbol}{vehicle.metadata.valuationPrice.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase">Valuation</div>
                  </div>
                </div>

                <Link
                  href={`/vehicles/${vehicle.vehicleId}`}
                  className="relative w-full h-52 px-4 flex items-center justify-center my-3 block"
                >
                  <Image
                    src={vehicle.images.primaryImage.url}
                    alt={vehicle.vehicle.fullName}
                    fill
                    className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                    View History
                  </Link>

                  <div className="flex items-center gap-2">
                    {vehicle.rental.availableForRental && (
                      <button
                        onClick={() => handleSelectVehicle(vehicle, "rental")}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-3 py-2 rounded-xl border border-zinc-700"
                      >
                        Rent
                      </button>
                    )}
                    <button
                      onClick={() => handleSelectVehicle(vehicle, "purchase")}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
