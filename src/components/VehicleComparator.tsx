"use client"

import Image from "next/image"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { X, Zap, Gauge, Globe, ShieldCheck, Key, ShoppingBag } from "lucide-react"

interface VehicleComparatorProps {
  vehicles: StructuredVehicle[]
  onClose: () => void
  onSelectVehicle: (vehicle: StructuredVehicle, type: "rental" | "purchase") => void
}

export default function VehicleComparator({
  vehicles,
  onClose,
  onSelectVehicle,
}: VehicleComparatorProps) {
  if (vehicles.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
            Telemetry Comparison
          </div>
          <h3 className="text-2xl font-black text-white">Side by Side Vehicle Specs</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((veh) => (
            <div
              key={veh.vehicleId}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="relative w-full h-44 my-2">
                  <Image
                    src={veh.images.primaryImage.url}
                    alt={veh.vehicle.fullName}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-mono font-bold text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-900/60">
                    {veh.vehicle.modelYear}
                  </span>
                  <h4 className="text-lg font-black text-white mt-1">{veh.vehicle.fullName}</h4>
                  <p className="text-xs text-zinc-400">{veh.vehicle.category}</p>
                </div>

                {/* Specs Table */}
                <div className="mt-4 space-y-2 text-xs divide-y divide-zinc-900">
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">Horsepower</span>
                    <span className="font-bold text-white font-mono">
                      {veh.specifications.horsepower ? `${veh.specifications.horsepower} HP` : "Pioneer"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">0 to 60 MPH</span>
                    <span className="font-bold text-amber-400 font-mono">
                      {veh.specifications.acceleration || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">Top Speed</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {veh.specifications.topSpeed || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">Engine</span>
                    <span className="font-medium text-zinc-300 truncate max-w-[200px]">
                      {veh.specifications.engineType}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">Valuation Price</span>
                    <span className="font-bold text-white font-mono">
                      ${veh.metadata.valuationPrice.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Dual Actions: RENT and BUY */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-900">
                <button
                  onClick={() => {
                    onClose()
                    onSelectVehicle(veh, "rental")
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-zinc-700"
                >
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rent (${veh.rental.dailyRate || 800}/d)</span>
                </button>

                <button
                  onClick={() => {
                    onClose()
                    onSelectVehicle(veh, "purchase")
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy Vehicle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
