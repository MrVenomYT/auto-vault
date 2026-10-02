"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import StripeCheckoutModal from "@/components/StripeCheckoutModal"
import VehicleComparator from "@/components/VehicleComparator"
import {
  ArrowLeft,
  Gauge,
  Zap,
  ShieldCheck,
  Globe,
  Key,
  ShoppingBag,
  Calendar,
  Lock,
  Layers,
  Award,
  CheckCircle2,
  DollarSign,
  Truck,
  FileText,
  Clock,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Maximize2,
  X,
  Image as ImageIcon
} from "lucide-react"

export default function VehicleDetailPage() {
  const routeParams = useParams()
  const vehicleId = (routeParams?.id as string) || ""
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"

  const [vehicle, setVehicle] = useState<StructuredVehicle | null>(null)
  const [allVehicles, setAllVehicles] = useState<StructuredVehicle[]>(VEHICLES_DB)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "history" | "financing">("overview")

  // Carousel and image inspection state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  // Checkout modal
  const [showCheckout, setShowCheckout] = useState<boolean>(false)
  const [checkoutType, setCheckoutType] = useState<"rental" | "purchase">("rental")

  // Compare mode
  const [compareList, setCompareList] = useState<StructuredVehicle[]>([])
  const [showCompare, setShowCompare] = useState<boolean>(false)

  // Financing calculator local state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60)
  const [interestRate] = useState<number>(5.9)

  // Calculate all available images (primary + gallery)
  const allImages = useMemo(() => {
    if (!vehicle) return []
    const list = [vehicle.images?.primaryImage].filter(Boolean)
    if (vehicle.images?.gallery && Array.isArray(vehicle.images.gallery)) {
      vehicle.images.gallery.forEach((g) => {
        if (g && g.url) list.push(g)
      })
    }
    return list
  }, [vehicle])

  const currentImage = allImages[activeImageIndex] || vehicle?.images?.primaryImage

  const handleNextImage = () => {
    if (allImages.length <= 1) return
    setActiveImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const handlePrevImage = () => {
    if (allImages.length <= 1) return
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/vehicles")
        if (res.ok) {
          const data = await res.json()
          if (data.vehicles && data.vehicles.length > 0) {
            setAllVehicles(data.vehicles)
            const found = data.vehicles.find((v: StructuredVehicle) => v.vehicleId === vehicleId)
            if (found) {
              setVehicle(found)
              setLoading(false)
              return
            }
          }
        }
      } catch (e) {
        // Fallback to local
      }

      const localFound = VEHICLES_DB.find((v) => v.vehicleId === vehicleId)
      if (localFound) {
        setVehicle(localFound)
      }
      setLoading(false)
    }

    loadData()
  }, [vehicleId])

  if (!loading && !vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-black text-white">Vehicle Not Found</h1>
        <p className="text-zinc-400 text-sm">
          The requested vehicle identifier does not exist in our active showroom registry.
        </p>
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Inventory</span>
        </Link>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-zinc-400">
        Loading vehicle telemetry and specifications...
      </div>
    )
  }

  // Related vehicles from same era or category
  const relatedVehicles = allVehicles
    .filter((v) => v.vehicleId !== vehicle.vehicleId && (v.vehicle.era === vehicle.vehicle.era || v.vehicle.category === vehicle.vehicle.category))
    .slice(0, 3)

  // Finance calculation
  const valuation = vehicle.metadata.valuationPrice || 250000
  const downPaymentAmount = Math.round((valuation * downPaymentPercent) / 100)
  const principal = valuation - downPaymentAmount
  const monthlyRate = interestRate / 100 / 12
  const estimatedMonthly = Math.round(
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
  )

  const handleOpenCheckout = (type: "rental" | "purchase") => {
    setCheckoutType(type)
    setShowCheckout(true)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Showroom</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/inventory" className="hover:text-white transition-colors">Inventory</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200 font-semibold truncate max-w-xs">{vehicle.vehicle.fullName}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/inventory"
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Inventory</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Real Car Showcase (Interactive Multi-Image Carousel) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full h-80 sm:h-[440px] bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-zinc-800/80 rounded-3xl p-6 flex items-center justify-center overflow-hidden shadow-2xl group">
              {/* Floor ambient glow & realistic shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 w-4/5 h-10 bg-black/95 blur-xl rounded-full" />

              {/* Main Active Image with Smooth Transition */}
              <div className="relative w-full h-full">
                <Image
                  key={currentImage?.url || "primary"}
                  src={currentImage?.url || vehicle.images.primaryImage.url}
                  alt={currentImage?.caption || vehicle.vehicle.fullName}
                  fill
                  priority
                  unoptimized
                  className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.98)] transition-all duration-300 transform group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-xs font-mono font-black text-red-400 bg-red-950/90 px-3 py-1 rounded-full border border-red-900/60 shadow-md">
                  {vehicle.vehicle.modelYear}
                </span>
                <span className="text-xs font-semibold uppercase text-zinc-300 bg-zinc-900/90 px-3 py-1 rounded-full border border-zinc-800 shadow-md">
                  {vehicle.vehicle.category}
                </span>
              </div>

              {/* Top Right Controls (Counter & Zoom) */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-zinc-300 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800 shadow">
                  {activeImageIndex + 1} / {allImages.length}
                </span>
                <button
                  type="button"
                  onClick={() => setFullscreenImage(currentImage?.url || vehicle.images.primaryImage.url)}
                  className="p-1.5 bg-zinc-950/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors shadow"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Carousel Left & Right Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous view angle"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-zinc-950/80 hover:bg-red-600 text-white rounded-full border border-zinc-800 hover:border-red-500 shadow-xl transition-all opacity-80 hover:opacity-100 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next view angle"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-zinc-950/80 hover:bg-red-600 text-white rounded-full border border-zinc-800 hover:border-red-500 shadow-xl transition-all opacity-80 hover:opacity-100 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Caption Pill */}
              {currentImage?.caption && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-950/80 border border-zinc-800/80 rounded-full text-[11px] font-medium text-zinc-400">
                  {currentImage.caption}
                </div>
              )}
            </div>

            {/* Interactive Multi-Image Gallery Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-2xl p-1.5 shrink-0 bg-zinc-950 transition-all overflow-hidden ${
                      activeImageIndex === idx
                        ? "border-2 border-red-600 ring-2 ring-red-600/30 shadow-lg shadow-red-600/20"
                        : "border border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-700"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.caption || `Thumbnail ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-4 gap-3 bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl text-center text-xs">
              <div>
                <span className="text-zinc-500 font-bold uppercase text-[10px] block">Power</span>
                <span className="font-mono font-black text-white text-sm mt-0.5 block">
                  {vehicle.specifications.horsepower ? `${vehicle.specifications.horsepower} HP` : "Historic"}
                </span>
              </div>
              <div className="border-l border-zinc-800">
                <span className="text-zinc-500 font-bold uppercase text-[10px] block">0 to 60</span>
                <span className="font-mono font-black text-amber-400 text-sm mt-0.5 block">
                  {vehicle.specifications.acceleration ? vehicle.specifications.acceleration.split(" ")[0] : "Historic"}
                </span>
              </div>
              <div className="border-l border-zinc-800">
                <span className="text-zinc-500 font-bold uppercase text-[10px] block">Top Speed</span>
                <span className="font-mono font-black text-indigo-400 text-sm mt-0.5 block">
                  {vehicle.specifications.topSpeed || "Historic"}
                </span>
              </div>
              <div className="border-l border-zinc-800">
                <span className="text-zinc-500 font-bold uppercase text-[10px] block">Drivetrain</span>
                <span className="font-medium text-zinc-200 text-xs mt-0.5 block truncate">
                  {vehicle.specifications.drivetrain}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Overview & Direct Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                {vehicle.manufacturer.name} Heritage Collection
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {vehicle.vehicle.fullName}
              </h1>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                {vehicle.metadata.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-baseline justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-zinc-500 block">Purchase Valuation</span>
                  <div className="text-3xl font-black text-white font-mono mt-0.5">
                    {currencySymbol}{valuation.toLocaleString()}
                  </div>
                </div>

                {vehicle.rental.availableForRental && (
                  <div className="text-right">
                    <span className="text-[11px] uppercase font-bold text-zinc-500 block">Daily Rental</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                      {currencySymbol}{vehicle.rental.dailyRate}/day
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: BUY and RENT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {settings.operations.allowDailyRentals && vehicle.rental.availableForRental && (
                  <button
                    onClick={() => handleOpenCheckout("rental")}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 px-4 rounded-2xl transition-all border border-zinc-700 flex items-center justify-center gap-2 text-xs shadow-sm"
                  >
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>Rent Daily ({currencySymbol}{vehicle.rental.dailyRate})</span>
                  </button>
                )}

                {settings.operations.allowInstantPurchase && (
                  <button
                    onClick={() => handleOpenCheckout("purchase")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 text-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Vehicle ({currencySymbol}{valuation.toLocaleString()})</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Certified Clean Title</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-indigo-400" /> Encrypted Escrow</span>
              </div>
            </div>

            {/* Quick Feature Highlights */}
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-2xl border border-zinc-850">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Enclosed climate controlled flatbed delivery available to your doorstep.</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-2xl border border-zinc-850">
                <Award className="w-4 h-4 text-red-500 shrink-0" />
                <span>Includes 150 point factory certification and complete historical provenance documentation.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Detailed Specifications, Historical Significance, Financing */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto scrollbar-thin">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              Overview and Engineering
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "specs"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              Complete Specifications
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "history"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              Historical Provenance
            </button>
            <button
              onClick={() => setActiveTab("financing")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "financing"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              Financing &amp; Lease Calculator
            </button>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-black text-white">Powertrain and Performance</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Engine Configuration</span>
                    <span className="text-white font-medium">{vehicle.specifications.engineType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Displacement / Capacity</span>
                    <span className="text-white font-medium">{vehicle.specifications.engineCapacity || "Historic Standard"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Transmission</span>
                    <span className="text-white font-medium">{vehicle.specifications.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Fuel System</span>
                    <span className="text-white font-medium">{vehicle.specifications.fuelType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-black text-white">Chassis and Dimensions</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Body Type</span>
                    <span className="text-white font-medium">{vehicle.vehicle.bodyType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Seating Capacity</span>
                    <span className="text-white font-medium">{vehicle.specifications.seatingCapacity} Passengers</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Doors</span>
                    <span className="text-white font-medium">{vehicle.specifications.doors} Door</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Production Era</span>
                    <span className="text-red-400 font-medium">{vehicle.vehicle.era}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMPLETE SPECS */}
          {activeTab === "specs" && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-black text-white">Manufacturer Telemetry &amp; Full Specs Table</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Manufacturer</span>
                  <div className="text-white font-bold">{vehicle.manufacturer.name} ({vehicle.manufacturer.country})</div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Model Year &amp; Gen</span>
                  <div className="text-white font-bold">{vehicle.vehicle.modelYear} | {vehicle.vehicle.generation || "Original Generation"}</div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Max Output</span>
                  <div className="text-emerald-400 font-black font-mono">{vehicle.specifications.horsepower ? `${vehicle.specifications.horsepower} Horsepower` : "Historic Output"}</div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">0 to 60 MPH Acceleration</span>
                  <div className="text-amber-400 font-black font-mono">{vehicle.specifications.acceleration || "Historic benchmark"}</div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Top Speed</span>
                  <div className="text-indigo-400 font-black font-mono">{vehicle.specifications.topSpeed || "Historic benchmark"}</div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Vehicle Classification</span>
                  <div className="text-white font-bold capitalize">{vehicle.vehicle.vehicleClassification.replace("_", " ")}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HISTORY */}
          {activeTab === "history" && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black text-white">Historical Significance &amp; Provenance</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                {vehicle.metadata.historicalSignificance || "This model holds historical importance in the evolution of performance engineering and automotive design."}
              </p>
              <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-500">
                Official Registry Source: <span className="text-zinc-400">{vehicle.metadata.officialSource}</span>
              </div>
            </div>
          )}

          {/* TAB: FINANCING */}
          {activeTab === "financing" && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white">Automotive Financing &amp; Payment Estimator</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Customize loan duration and down payment percentage to calculate estimated monthly payments at 5.9% APR.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Down Payment ({downPaymentPercent}%)</span>
                      <span className="font-mono font-bold text-white">{currencySymbol}{downPaymentAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Loan Term</span>
                      <span className="font-mono font-bold text-white">{loanTermMonths} Months</span>
                    </div>
                    <select
                      value={loanTermMonths}
                      onChange={(e) => setLoanTermMonths(parseInt(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value={36}>36 Months (3 Years)</option>
                      <option value={48}>48 Months (4 Years)</option>
                      <option value={60}>60 Months (5 Years)</option>
                      <option value={72}>72 Months (6 Years)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between text-xs space-y-4">
                  <div>
                    <span className="text-zinc-500 uppercase font-bold text-[10px]">Estimated Monthly Installment</span>
                    <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                      {currencySymbol}{estimatedMonthly.toLocaleString()}/mo
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-2">
                      Based on purchase valuation of {currencySymbol}{valuation.toLocaleString()} with {currencySymbol}{downPaymentAmount.toLocaleString()} down at 5.9% fixed APR.
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenCheckout("purchase")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-red-600/30"
                  >
                    Apply for Purchase &amp; Pre Approval
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Vehicles Carousel */}
        {relatedVehicles.length > 0 && (
          <div className="space-y-4 pt-10 border-t border-zinc-800">
            <h3 className="text-xl font-black text-white">More from {vehicle.vehicle.era}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <Link
                  key={rel.vehicleId}
                  href={`/vehicles/${rel.vehicleId}`}
                  className="group bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-red-600/60 rounded-3xl p-5 transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full h-40 flex items-center justify-center mb-3">
                    <Image
                      src={rel.images.primaryImage.url}
                      alt={rel.vehicle.fullName}
                      fill
                      unoptimized
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-red-500 font-mono font-bold">{rel.vehicle.modelYear}</div>
                    <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{rel.vehicle.fullName}</div>
                    <div className="text-xs font-mono text-emerald-400 font-bold">{currencySymbol}{rel.metadata.valuationPrice.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <StripeCheckoutModal
          vehicle={vehicle}
          bookingType={checkoutType}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {/* Fullscreen Image Inspection Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 z-50 p-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full border border-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-zinc-900/80 hover:bg-red-600 text-white rounded-full border border-zinc-700 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-zinc-900/80 hover:bg-red-600 text-white rounded-full border border-zinc-700 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative w-full h-full p-8 flex items-center justify-center">
              <Image
                src={currentImage?.url || fullscreenImage}
                alt={vehicle.vehicle.fullName}
                fill
                unoptimized
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,1)]"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full text-xs font-medium text-zinc-300">
              {vehicle.vehicle.fullName} {currentImage?.caption ? `(${currentImage.caption})` : ""} | {activeImageIndex + 1} of {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
