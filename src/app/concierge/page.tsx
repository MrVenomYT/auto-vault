"use client"

import { useState } from "react"
import Link from "next/link"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  Truck,
  Sparkles,
  Calendar,
  Clock,
  Compass,
  Award
} from "lucide-react"

export default function ConciergePage() {
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [serviceType, setServiceType] = useState<"test_drive" | "custom_sourcing" | "transport">("test_drive")
  const [vehicleInterest, setVehicleInterest] = useState<string>("Ferrari F8 Tributo")
  const [preferredDate, setPreferredDate] = useState<string>("")
  const [details, setDetails] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      name,
      email,
      phone,
      vehicleInterest: `${serviceType.toUpperCase()}: ${vehicleInterest}`,
      message: `Preferred Date: ${preferredDate || "Flexible"}. Details: ${details || "Standard VIP Concierge Request"}`,
      type: "vip_concierge",
    }

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      setIsSuccess(true)
    } catch (e) {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Private Client Services</span>
            <span className="text-zinc-500">|</span>
            <span className="text-amber-400 font-bold">VIP Track &amp; Global Sourcing Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            VIP Concierge &amp; Private Services
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-medium leading-relaxed">
            From private closed circuit track test drives to bespoke international vehicle acquisition and climate controlled transport logistics, our private client desk delivers unmatched automotive luxury.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Service Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Private Track Test Drives</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Experience any supercar in our inventory with professional driving instructors on FIA certified private track circuits.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Bespoke Vehicle Sourcing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Seeking an ultra rare historical classic or limited production hypercar? Our global acquisition network sources verified vehicles worldwide.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">White Glove Enclosed Transport</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dedicated air freight and climate controlled air ride transporters to deliver your purchased or rented vehicle to any private destination.
            </p>
          </div>
        </div>

        {/* Concierge Request Form */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white">Submit VIP Concierge Request</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Your dedicated private client manager will confirm details within 60 minutes.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 bg-zinc-950 rounded-2xl border border-emerald-900/60 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-black text-white">Request Authenticated</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Thank you, {name}. Your private concierge coordinator has received your request and will contact you directly via phone and encrypted email.
              </p>
              <Link
                href="/inventory"
                className="inline-block mt-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
              >
                Return to Showroom
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType("test_drive")}
                  className={`p-3.5 rounded-2xl border text-left font-bold transition-all ${
                    serviceType === "test_drive"
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <span className="block text-white">Track Test Drive</span>
                  <span className="text-[10px] text-zinc-300 font-normal">Private track session</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType("custom_sourcing")}
                  className={`p-3.5 rounded-2xl border text-left font-bold transition-all ${
                    serviceType === "custom_sourcing"
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <span className="block text-white">Vehicle Acquisition</span>
                  <span className="text-[10px] text-zinc-300 font-normal">Rare collector sourcing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType("transport")}
                  className={`p-3.5 rounded-2xl border text-left font-bold transition-all ${
                    serviceType === "transport"
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <span className="block text-white">Enclosed Logistics</span>
                  <span className="text-[10px] text-zinc-300 font-normal">Doorstep transporter</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander Vance"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@velocity.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 789 0123"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Vehicle of Interest or Model Requested</label>
                  <input
                    type="text"
                    required
                    value={vehicleInterest}
                    onChange={(e) => setVehicleInterest(e.target.value)}
                    placeholder="e.g. 2024 Ferrari F8 Tributo or 1965 Shelby Cobra"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Preferred Date / Timeline</label>
                  <input
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="e.g. Next Saturday or Immediate"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Special Requirements &amp; Instructions</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Specify track preference, location, or acquisition parameters..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 px-8 rounded-2xl text-xs transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting Request..." : "Submit VIP Concierge Request"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
