"use client"

import CarImage from "@/components/CarImage"
import { StructuredVehicle } from "@/lib/types/vehicle"
import {
  X,
  ShieldCheck,
  CreditCard,
  Gauge,
  Zap,
  Award,
  Globe,
  Check,
  Calendar,
  Layers,
  Fuel,
  Key,
  Info
} from "lucide-react"

interface VehicleDetailModalProps {
  vehicle: StructuredVehicle | null
  onClose: () => void
  onOpenStripeCheckout: (vehicle: StructuredVehicle, mode: "rental" | "purchase") => void
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
  onOpenStripeCheckout
}: VehicleDetailModalProps) {
  if (!vehicle) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Era and Generation */}
        <div className="space-y-1 mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-red-950/60 border border-red-800/80 text-red-400 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {vehicle.vehicle.era}
            </span>
            <span className="bg-zinc-950 border border-zinc-800 text-zinc-300 px-3 py-0.5 rounded-full text-xs font-semibold">
              {vehicle.vehicle.category}
            </span>
            <span className="bg-zinc-950 border border-zinc-800 text-zinc-400 px-3 py-0.5 rounded-full text-xs font-mono">
              Status: {vehicle.vehicle.vehicleStatus}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight pt-2">
            {vehicle.vehicle.modelYear} {vehicle.manufacturer.name} {vehicle.vehicle.name}
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span>Manufactured in {vehicle.manufacturer.country} (Founded {vehicle.manufacturer.foundedYear})</span>
            {vehicle.vehicle.modelCode && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-zinc-300">Model Code: {vehicle.vehicle.modelCode}</span>
              </>
            )}
          </div>
        </div>

        {/* Large Transparent PNG Display */}
        <div className="relative w-full h-72 sm:h-96 bg-zinc-950 rounded-2xl p-6 my-4 flex items-center justify-center border border-zinc-800/80 overflow-hidden shadow-inner">
          <CarImage
            src={vehicle.images.primaryImage.url}
            alt={vehicle.vehicle.fullName}
            fill
            className="object-contain p-4 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
            showVerifiedBadge={true}
            fallbackUrls={vehicle.images?.gallery?.map(g => g.url) || []}
          />
        </div>

        {/* Vehicle Description and Historical Significance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <Info className="w-4 h-4 text-red-500" />
              <span>Vehicle Overview</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {vehicle.metadata.description}
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Historical Significance</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {vehicle.metadata.historicalSignificance}
            </p>
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="my-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Certified Mechanical Specifications
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Engine Type</span>
              <span className="text-xs font-bold text-white block truncate">{vehicle.specifications.engineType}</span>
              {vehicle.specifications.engineCapacity && (
                <span className="text-[10px] text-zinc-400 font-mono">{vehicle.specifications.engineCapacity} Displacement</span>
              )}
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Horsepower</span>
              <span className="text-xs font-bold text-white block">
                {vehicle.specifications.horsepower ? `${vehicle.specifications.horsepower} HP` : "Historic Spec"}
              </span>
              <span className="text-[10px] text-zinc-400">Output Rating</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Acceleration 0 to 60</span>
              <span className="text-xs font-bold text-white block">
                {vehicle.specifications.acceleration || "Standard Benchmark"}
              </span>
              <span className="text-[10px] text-zinc-400">Factory Track Test</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Top Speed</span>
              <span className="text-xs font-bold text-white block">
                {vehicle.specifications.topSpeed || "Documented Limit"}
              </span>
              <span className="text-[10px] text-zinc-400">Manufacturer Tested</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Transmission</span>
              <span className="text-xs font-bold text-white block truncate">{vehicle.specifications.transmission}</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Drivetrain</span>
              <span className="text-xs font-bold text-white block truncate">{vehicle.specifications.drivetrain}</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Fuel Type</span>
              <span className="text-xs font-bold text-white block truncate">{vehicle.specifications.fuelType}</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Seating and Doors</span>
              <span className="text-xs font-bold text-white block">
                {vehicle.specifications.seatingCapacity} Seats, {vehicle.specifications.doors} Doors
              </span>
            </div>
          </div>
        </div>

        {/* Generation and Production Timeline */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 my-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-zinc-400 block">Assigned Generation Series:</span>
            <span className="text-white font-bold text-sm">{vehicle.vehicle.generation}</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-400 block">Production Span:</span>
            <span className="text-white font-mono">
              {vehicle.vehicle.productionStartYear} to {vehicle.vehicle.productionEndYear || "Present"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-zinc-400 block">Archival Source Attribution:</span>
            <span className="text-zinc-300 font-medium">{vehicle.metadata.officialSource}</span>
          </div>
        </div>

        {/* Action Bottom Bar with Rental & Stripe Payment */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-zinc-400">Valuation Reference</div>
            <div className="text-2xl font-black text-white">
              ${vehicle.metadata.valuationPrice.toLocaleString()} USD
            </div>
            {vehicle.rental.availableForRental && vehicle.rental.dailyRate && (
              <div className="text-xs text-emerald-400 font-medium">
                Rental from ${vehicle.rental.dailyRate.toLocaleString()} / Day
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {vehicle.rental.availableForRental && (
              <button
                onClick={() => onOpenStripeCheckout(vehicle, "rental")}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>Rent via Stripe</span>
              </button>
            )}

            <button
              onClick={() => onOpenStripeCheckout(vehicle, "purchase")}
              className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Stripe Reservation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
