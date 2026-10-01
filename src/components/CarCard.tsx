"use client"

import { useState } from "react"
import Image from "next/image"
import { StructuredVehicle } from "@/lib/types/vehicle"
import {
  Gauge,
  Zap,
  ShieldCheck,
  Globe,
  Key,
  ShoppingBag,
  Layers
} from "lucide-react"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"

interface CarCardProps {
  vehicle: StructuredVehicle
  onSelectVehicle: (vehicle: StructuredVehicle, type: "rental" | "purchase") => void
  onCompare?: (vehicle: StructuredVehicle) => void
  isComparing?: boolean
}

export default function CarCard({
  vehicle,
  onSelectVehicle,
  onCompare,
  isComparing = false,
}: CarCardProps) {
  const [imageError, setImageError] = useState(false)
  const { settings } = usePlatformSettings()

  const currencySymbol = settings.financials.currencySymbol || "$"
  const imageUrl = imageError
    ? "/images/cars/porsche_911_real.png"
    : vehicle.images.primaryImage.url

  return (
    <div className="group relative bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 rounded-3xl border border-zinc-800/80 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/30">
      {/* Top Meta Bar */}
      <div className="p-5 pb-0 flex items-start justify-between gap-2 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-900/60">
              {vehicle.vehicle.modelYear}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full">
              {vehicle.vehicle.category}
            </span>
          </div>
          <h3 className="text-lg font-black text-white mt-2 group-hover:text-red-400 transition-colors tracking-tight">
            {vehicle.manufacturer.name} {vehicle.vehicle.name}
          </h3>
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

      {/* Centerpiece Real Vehicle Photograph (Complete Body, Backgroundless) */}
      <div className="relative w-full h-56 px-4 flex items-center justify-center my-3">
        {/* Floor Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl" />

        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={`${vehicle.manufacturer.name} ${vehicle.vehicle.name}`}
            fill
            className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]"
            referrerPolicy="no-referrer"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        </div>
      </div>

      {/* Specifications Telemetry Grid */}
      <div className="px-5 space-y-3 z-10">
        <div className="grid grid-cols-3 gap-2 bg-zinc-950/80 border border-zinc-800/60 rounded-2xl p-2.5 text-center">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase font-semibold flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-red-500" />
              Power
            </div>
            <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">
              {vehicle.specifications.horsepower ? `${vehicle.specifications.horsepower} HP` : "Historic"}
            </div>
          </div>

          <div className="border-x border-zinc-800/60">
            <div className="text-[10px] text-zinc-500 uppercase font-semibold flex items-center justify-center gap-1">
              <Gauge className="w-3 h-3 text-amber-500" />
              0 to 60
            </div>
            <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">
              {vehicle.specifications.acceleration ? vehicle.specifications.acceleration.split(" ")[0] : "Historic"}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-zinc-500 uppercase font-semibold flex items-center justify-center gap-1">
              <Globe className="w-3 h-3 text-indigo-400" />
              Top Speed
            </div>
            <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">
              {vehicle.specifications.topSpeed || "Historic"}
            </div>
          </div>
        </div>

        {/* Engine spec info */}
        <div className="text-[11px] text-zinc-400 truncate">
          <span className="text-zinc-500 font-semibold">Engine: </span>
          {vehicle.specifications.engineType}
        </div>
      </div>

      {/* Card Action Footer with BOTH BUY and RENT Buttons */}
      <div className="p-5 pt-4 border-t border-zinc-800/80 mt-4 flex flex-col gap-3 z-10 bg-zinc-950/60">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-zinc-400 text-[11px]">Rental Rate: </span>
            <span className="font-mono font-bold text-emerald-400">
              {vehicle.rental.dailyRate ? `${currencySymbol}${vehicle.rental.dailyRate}/day` : "Contact Showroom"}
            </span>
          </div>

          {onCompare && (
            <button
              onClick={() => onCompare(vehicle)}
              className={`p-1.5 px-2.5 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                isComparing
                  ? "bg-indigo-950/80 text-indigo-400 border-indigo-700"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Compare</span>
            </button>
          )}
        </div>

        {/* Dual Action Buttons: RENT & BUY */}
        <div className="grid grid-cols-2 gap-2">
          {settings.operations.allowDailyRentals ? (
            <button
              onClick={() => onSelectVehicle(vehicle, "rental")}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all border border-zinc-700 hover:border-zinc-600 flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Rent Daily</span>
            </button>
          ) : (
            <div className="w-full bg-zinc-900 text-zinc-500 text-xs font-bold py-2.5 rounded-xl text-center border border-zinc-800">
              Rentals Paused
            </div>
          )}

          {settings.operations.allowInstantPurchase ? (
            <button
              onClick={() => onSelectVehicle(vehicle, "purchase")}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy Vehicle</span>
            </button>
          ) : (
            <div className="w-full bg-zinc-900 text-zinc-500 text-xs font-bold py-2.5 rounded-xl text-center border border-zinc-800">
              Sales Inquire Only
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
