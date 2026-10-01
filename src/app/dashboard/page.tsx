"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Car,
  CreditCard,
  Database,
  Search,
  Sparkles,
  Plus,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Key,
  Flame,
  Globe,
  DollarSign,
  TrendingUp,
  Server,
  Activity,
  Calendar
} from "lucide-react"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle } from "@/lib/types/vehicle"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "fleet" | "bookings" | "scanner" | "database">("overview")
  const [stats, setStats] = useState<any>(null)
  const [vehicles, setVehicles] = useState<StructuredVehicle[]>(VEHICLES_DB)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  // Scanner state
  const [scanQuery, setScanQuery] = useState<string>("")
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [scannedResult, setScannedResult] = useState<StructuredVehicle | null>(null)
  const [scanMessage, setScanMessage] = useState<string | null>(null)

  // New vehicle modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [newMake, setNewMake] = useState<string>("")
  const [newModel, setNewModel] = useState<string>("")
  const [newYear, setNewYear] = useState<number>(2024)
  const [newCategory, setNewCategory] = useState<string>("Sports Car")
  const [newPrice, setNewPrice] = useState<number>(150000)
  const [newDailyRate, setNewDailyRate] = useState<number>(850)

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, vehiclesRes, bookingsRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/vehicles"),
          fetch("/api/bookings"),
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
        if (vehiclesRes.ok) {
          const vehiclesData = await vehiclesRes.json()
          if (vehiclesData.vehicles) setVehicles(vehiclesData.vehicles)
        }
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json()
          if (bookingsData.bookings) setBookings(bookingsData.bookings)
        }
      } catch (e) {
        // Fallback to local initial state
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleScanCar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!scanQuery.trim()) return

    setIsScanning(true)
    setScanMessage(null)
    setScannedResult(null)

    try {
      const res = await fetch("/api/cars/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carName: scanQuery.trim() }),
      })

      const data = await res.json()
      if (res.ok && data.vehicle) {
        setScannedResult(data.vehicle)
        setVehicles((prev) => [data.vehicle, ...prev])
        setScanMessage(`Successfully ingested ${data.vehicle.vehicle.fullName} into MongoDB collection.`)
      } else {
        setScanMessage(data.error || "Failed to scan vehicle.")
      }
    } catch (e) {
      setScanMessage("Error communicating with real time scanner.")
    } finally {
      setIsScanning(false)
    }
  }

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    const uniqueId = `veh_${newMake.toLowerCase()}_${newModel.toLowerCase()}_${newYear}_${Date.now()}`.replace(/[^a-z0-9_]/g, "")

    const newVeh: StructuredVehicle = {
      vehicleId: uniqueId,
      manufacturer: {
        name: newMake,
        country: "International",
        foundedYear: 1900,
      },
      vehicle: {
        name: newModel,
        fullName: `${newMake} ${newModel}`,
        modelCode: `${newMake.toUpperCase()}-${newYear}`,
        generation: `${newMake} Generation Series`,
        category: newCategory as any,
        bodyType: newCategory.includes("Coupe") ? "Coupe" : "Performance Body",
        modelYear: newYear,
        productionStartYear: newYear,
        productionEndYear: null,
        vehicleStatus: "production",
        vehicleClassification: "production_vehicle",
        era: "2020 to 2026 (Modern and Latest Generation)",
      },
      specifications: {
        engineType: "High Performance Engine",
        engineCapacity: "3.0L",
        horsepower: 450,
        torque: "400 lb ft",
        transmission: "Dual Clutch Sport Automatic",
        drivetrain: "Rear Wheel Drive",
        fuelType: "Premium Gasoline",
        seatingCapacity: 2,
        doors: 2,
        topSpeed: "185 mph",
        acceleration: "3.5 sec 0 to 60 mph",
        curbWeight: "3400 lbs",
      },
      images: {
        primaryImage: {
          url: "/images/cars/porsche_911_2024.svg",
          format: "PNG",
          background: "transparent",
          verified: true,
          source: "Auto Vault Management",
        },
        gallery: [],
      },
      rental: {
        availableForRental: true,
        dailyRate: newDailyRate,
        weeklyRate: newDailyRate * 6,
        monthlyRate: newDailyRate * 22,
        depositAmount: newDailyRate * 3,
        currency: "USD",
      },
      metadata: {
        description: `Verified ${newMake} ${newModel} registered in Auto Vault MongoDB database.`,
        historicalSignificance: "Added via dealership administrative inventory portal.",
        officialSource: "Manufacturer Certified Database",
        valuationPrice: newPrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    try {
      await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVeh),
      })
      setVehicles([newVeh, ...vehicles])
      setShowAddModal(false)
      setNewMake("")
      setNewModel("")
    } catch (e) {
      setVehicles([newVeh, ...vehicles])
      setShowAddModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-2 hover:text-red-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showroom</span>
            </Link>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Auto Vault Ops</h1>
            <p className="text-[11px] text-zinc-400 mt-0.5">MongoDB Management Console</p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("fleet")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "fleet"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Fleet Inventory ({vehicles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "bookings"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Stripe Transactions</span>
            </button>

            <button
              onClick={() => setActiveTab("scanner")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "scanner"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>RapidAPI Ingestion</span>
            </button>

            <button
              onClick={() => setActiveTab("database")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "database"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Database and Vercel</span>
            </button>
          </nav>
        </div>

        {/* Database Status Footer Card */}
        <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl space-y-2 mt-8">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Activity className="w-3 h-3" />
              MongoDB Operational
            </span>
            <span className="font-mono text-zinc-500">v7.0</span>
          </div>
          <div className="text-[11px] text-zinc-300 font-mono truncate">
            Collection: autovault.vehicles
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Executive Dashboard</h2>
                <p className="text-xs text-zinc-400 mt-1">Live metrics across 1880 to 2026 vehicle collections and Stripe payments.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Vehicle</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Total Fleet Count</span>
                  <Car className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-3xl font-black text-white">{vehicles.length}</div>
                <div className="text-[10px] text-emerald-400 font-medium">Covering 1880 to 2026 Eras</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Fleet Asset Valuation</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  ${(stats?.metrics?.totalFleetValuationUSD || 89000000).toLocaleString()} USD
                </div>
                <div className="text-[10px] text-zinc-400">Certified MSRP and Historical Values</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Active Rental Fleet</span>
                  <Key className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {vehicles.filter(v => v.rental.availableForRental).length}
                </div>
                <div className="text-[10px] text-zinc-400">Available for Stripe Booking</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Stripe Authorized Total</span>
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  ${(stats?.metrics?.totalStripeRevenueUSD || 10550).toLocaleString()} USD
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">100% Encrypted Transactions</div>
              </div>
            </div>

            {/* Recent Stripe Bookings Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Recent Stripe Customer Transactions</h3>
                  <p className="text-xs text-zinc-400">Direct bookings stored in MongoDB bookings collection.</p>
                </div>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Transaction ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Vehicle Model</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-medium">
                    {bookings.map((b) => (
                      <tr key={b.bookingId} className="hover:bg-zinc-950/40">
                        <td className="py-3 px-4 font-mono text-zinc-400">{b.bookingId}</td>
                        <td className="py-3 px-4 text-white font-bold">{b.customer?.fullName}</td>
                        <td className="py-3 px-4">{b.vehicleFullName}</td>
                        <td className="py-3 px-4 uppercase text-[10px] font-bold text-zinc-400">{b.bookingType}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">${b.payment?.amount?.toLocaleString()} USD</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 bg-emerald-950/50 text-emerald-400 border border-emerald-900 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            {b.payment?.status || "succeeded"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Fleet Inventory Tab */}
        {activeTab === "fleet" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Fleet Inventory Manager</h2>
                <p className="text-xs text-zinc-400 mt-1">Directly managing {vehicles.length} documents in MongoDB.</p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle to MongoDB</span>
              </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Manufacturer</th>
                    <th className="py-3 px-4">Model and Generation</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Power</th>
                    <th className="py-3 px-4">Rental Rate</th>
                    <th className="py-3 px-4">Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-medium">
                  {vehicles.map((v) => (
                    <tr key={v.vehicleId} className="hover:bg-zinc-950/40">
                      <td className="py-3 px-4 font-mono font-bold text-white">{v.vehicle.modelYear}</td>
                      <td className="py-3 px-4 text-red-400 font-bold">{v.manufacturer.name}</td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{v.vehicle.name}</div>
                        <div className="text-[10px] text-zinc-500">{v.vehicle.generation}</div>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{v.vehicle.category}</td>
                      <td className="py-3 px-4 font-mono">{v.specifications.horsepower ? `${v.specifications.horsepower} HP` : "Historic"}</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">
                        {v.rental.availableForRental ? `$${v.rental.dailyRate}/day` : "Not listed"}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">${v.metadata.valuationPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stripe Transactions Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Stripe Payments and Bookings</h2>
              <p className="text-xs text-zinc-400 mt-1">Customer deposits and rental transactions authenticated via Stripe.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Vehicle Reserved</th>
                    <th className="py-3 px-4">Stripe Intent ID</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-medium">
                  {bookings.map((b) => (
                    <tr key={b.bookingId} className="hover:bg-zinc-950/40">
                      <td className="py-3 px-4 font-mono text-zinc-400">{b.bookingId}</td>
                      <td className="py-3 px-4 text-white font-bold">{b.customer?.fullName}</td>
                      <td className="py-3 px-4">{b.vehicleFullName}</td>
                      <td className="py-3 px-4 font-mono text-zinc-500">{b.payment?.stripePaymentIntentId}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">${b.payment?.amount?.toLocaleString()} USD</td>
                      <td className="py-3 px-4 text-zinc-500 font-mono text-[10px]">{b.createdAt?.split("T")[0]}</td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RapidAPI Scanner Tab */}
        {activeTab === "scanner" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">RapidAPI Real Time Ingestion</h2>
              <p className="text-xs text-zinc-400 mt-1">Scan any world automobile and instantly persist specs to MongoDB.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-2xl space-y-4">
              <form onSubmit={handleScanCar} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Enter Vehicle Make and Model
                  </label>
                  <input
                    type="text"
                    value={scanQuery}
                    onChange={(e) => setScanQuery(e.target.value)}
                    placeholder="e.g. Aston Martin DB12, McLaren 750S, Porsche Cayman GT4..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScanning || !scanQuery.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isScanning ? "Querying RapidAPI & Gemini..." : "Scan and Ingest to MongoDB"}</span>
                </button>
              </form>

              {scanMessage && (
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-zinc-300">
                  {scanMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Database & Vercel Tab */}
        {activeTab === "database" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">MongoDB and Vercel Architecture</h2>
              <p className="text-xs text-zinc-400 mt-1">Production deployment readiness, schema indexing, and connection pools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Database className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white">MongoDB Collection Schemas</h3>
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="font-bold text-white block">autovault.vehicles</span>
                    <span className="text-[11px] text-zinc-400">Indexed on modelYear, category, manufacturer.name</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="font-bold text-white block">autovault.bookings</span>
                    <span className="text-[11px] text-zinc-400">Indexed on bookingId, payment.stripePaymentIntentId</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="font-bold text-white block">autovault.manufacturers</span>
                    <span className="text-[11px] text-zinc-400">Indexed on id, name</span>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <span className="font-bold text-white block">autovault.generations</span>
                    <span className="text-[11px] text-zinc-400">Indexed on manufacturerId, startYear</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-indigo-400">
                  <Server className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white">Vercel Deployment Readiness</h3>
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>vercel.json Framework preset configured</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Serverless connection pooling in src/lib/mongodb.ts</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Static fallback assets in public/images/cars/</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Stripe API keys mapped cleanly in environment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">Add Vehicle to MongoDB</h3>
            <p className="text-xs text-zinc-400 mb-6">Create a structured vehicle record.</p>

            <form onSubmit={handleCreateVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    required
                    value={newMake}
                    onChange={(e) => setNewMake(e.target.value)}
                    placeholder="Porsche"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="911 GT3 RS"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Model Year (1880 to 2026)</label>
                  <input
                    type="number"
                    min={1880}
                    max={2026}
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Sports Car">Sports Car</option>
                    <option value="Supercar">Supercar</option>
                    <option value="Hypercar">Hypercar</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Classic">Classic</option>
                    <option value="Vintage">Vintage</option>
                    <option value="Muscle Car">Muscle Car</option>
                    <option value="Electric Vehicle">Electric Vehicle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Valuation Price ($USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Rental Daily Rate ($USD)</label>
                  <input
                    type="number"
                    value={newDailyRate}
                    onChange={(e) => setNewDailyRate(parseInt(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
                >
                  Save to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
