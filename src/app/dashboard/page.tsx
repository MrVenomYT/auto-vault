"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Car,
  CreditCard,
  Search,
  Sparkles,
  Plus,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Key,
  Globe,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  RefreshCw,
  Clock,
  UserCheck,
  AlertCircle,
  BarChart3,
  Sliders,
  ChevronRight,
  Eye,
  Settings,
  Bell,
  Check,
  Lock,
  Trash2,
  Edit,
  Save,
  Truck,
  Percent,
  Tag,
  Phone,
  Mail,
  User,
  ShoppingBag,
  Upload,
  AlertTriangle,
  XCircle,
  FileCode,
  Terminal,
  ShieldAlert,
  HelpCircle
} from "lucide-react"
import { VEHICLES_DB } from "@/lib/db/vehicles"
import { StructuredVehicle, VehicleImage } from "@/lib/types/vehicle"
import { VerificationFailure } from "@/lib/types/imageService"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import { PlatformSettings } from "@/lib/types/settings"

export default function DashboardPage() {
  const { settings, updateSettings, refreshSettings } = usePlatformSettings()
  
  // Dashboard navigation tab
  const [activeTab, setActiveTab] = useState<
    "command" | "fleet" | "bookings" | "testdrives" | "customizer" | "scanner"
  >("command")

  const [vehicles, setVehicles] = useState<StructuredVehicle[]>(VEHICLES_DB)
  const [bookings, setBookings] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])
  const [verificationFailures, setVerificationFailures] = useState<VerificationFailure[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [failureFilter, setFailureFilter] = useState<string>("ALL")
  const [testingGate, setTestingGate] = useState<string | null>(null)
  const [testGateResult, setTestGateResult] = useState<any | null>(null)
  const [isBulkScanning, setIsBulkScanning] = useState<boolean>(false)
  const [bulkScanProgress, setBulkScanProgress] = useState<{ current: number; total: number; verified: number; failed: number } | null>(null)
  const [bulkScanSummary, setBulkScanSummary] = useState<any | null>(null)
  const [dismissedFatalToast, setDismissedFatalToast] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [lastSyncTime, setLastSyncTime] = useState<string>("Just now")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  // Fleet management filters
  const [fleetSearch, setFleetSearch] = useState<string>("")
  const [fleetCategory, setFleetCategory] = useState<string>("All")

  // Selected vehicle for inspection / edit
  const [editingVehicle, setEditingVehicle] = useState<StructuredVehicle | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [editRentalRate, setEditRentalRate] = useState<number>(0)
  const [editAvailableForRental, setEditAvailableForRental] = useState<boolean>(true)
  const [editHp, setEditHp] = useState<number>(0)
  const [editPrimaryImageUrl, setEditPrimaryImageUrl] = useState<string>("")
  const [editGallery, setEditGallery] = useState<VehicleImage[]>([])
  const [newGalleryInputUrl, setNewGalleryInputUrl] = useState<string>("")
  const [newGalleryCaption, setNewGalleryCaption] = useState<string>("")
  const [isSavingVehicle, setIsSavingVehicle] = useState<boolean>(false)

  // Add new vehicle modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [newMake, setNewMake] = useState<string>("")
  const [newModel, setNewModel] = useState<string>("")
  const [newYear, setNewYear] = useState<number>(2025)
  const [newCategory, setNewCategory] = useState<string>("Supercar")
  const [newPrice, setNewPrice] = useState<number>(285000)
  const [newDailyRate, setNewDailyRate] = useState<number>(1400)
  const [newHp, setNewHp] = useState<number>(710)
  const [newEngine, setNewEngine] = useState<string>("4.0L Twin Turbo V8")
  const [newTopSpeed, setNewTopSpeed] = useState<string>("211 mph")
  const [newAcceleration, setNewAcceleration] = useState<string>("2.8 sec")

  // Scanner state
  const [scanQuery, setScanQuery] = useState<string>("")
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [scannedResult, setScannedResult] = useState<StructuredVehicle | null>(null)
  const [scanMessage, setScanMessage] = useState<string | null>(null)

  // Settings form state (local clone for editing)
  const [formSettings, setFormSettings] = useState<PlatformSettings>(settings)
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState<boolean>(false)

  // Sync formSettings with live settings when received
  useEffect(() => {
    if (settings) {
      setFormSettings(settings)
    }
  }, [settings])

  // Fetch all live data
  const fetchDashboardData = async () => {
    setIsRefreshing(true)
    try {
      const [vehiclesRes, bookingsRes, inqRes, auditRes] = await Promise.all([
        fetch("/api/vehicles"),
        fetch("/api/bookings"),
        fetch("/api/inquiries"),
        fetch("/api/admin/audit-logs?role=ADMIN&limit=50"),
      ])

      if (vehiclesRes.ok) {
        const vData = await vehiclesRes.json()
        if (vData.vehicles && vData.vehicles.length > 0) {
          setVehicles(vData.vehicles)
        }
      }
      if (bookingsRes.ok) {
        const bData = await bookingsRes.json()
        if (bData.bookings && bData.bookings.length > 0) {
          setBookings(bData.bookings)
        }
      }
      if (inqRes.ok) {
        const iData = await inqRes.json()
        if (iData.inquiries && iData.inquiries.length > 0) {
          setInquiries(iData.inquiries)
        }
      }
      if (auditRes.ok) {
        const aData = await auditRes.json()
        if (aData.verificationFailures) {
          setVerificationFailures(aData.verificationFailures)
        }
        if (aData.logs) {
          setAuditLogs(aData.logs)
        }
      }
      setLastSyncTime(new Date().toLocaleTimeString())
    } catch (e) {
      // Keep local state
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  // Diagnostic Test Runner for sequential 5-gate pipeline
  const handleRunHardGateTest = async (scenario: "AI_SYNTHETIC" | "MODEL_MISMATCH" | "UNTRUSTED_SOURCE" | "LOW_QUALITY" | "VERIFIED_REAL") => {
    setTestingGate(scenario)
    setTestGateResult(null)

    try {
      let testPayload: any = {}

      if (scenario === "AI_SYNTHETIC") {
        testPayload = {
          vehicle: { make: "Ferrari", model: "F8 Tributo", year: 2024, bodyStyle: "coupe" },
          options: { forceRefresh: true },
          candidateOverride: {
            url: "https://images.unsplash.com/photo-midjourney-diffusion-ai-render-f8.png",
            sourceType: "OTHER",
            title: "Ferrari F8 Tributo (AI Generated Render)",
            altText: "Generated by ai stable diffusion"
          }
        }
      } else if (scenario === "MODEL_MISMATCH") {
        testPayload = {
          vehicle: { make: "Porsche", model: "911 Carrera S", year: 2024, generation: "992" },
          options: { forceRefresh: true },
          candidateOverride: {
            url: "/images/cars/porsche_911_carrera_s_real.png",
            sourceType: "MANUFACTURER",
            title: "Porsche 718 Cayman GT4 RS",
            metadata: { make: "Porsche", model: "Cayman GT4", year: 2024, generation: "718" }
          }
        }
      } else if (scenario === "UNTRUSTED_SOURCE") {
        testPayload = {
          vehicle: { make: "Lamborghini", model: "Revuelto", year: 2024 },
          options: { forceRefresh: true },
          candidateOverride: {
            url: "http://untrusted-unverified-site.ru/car.jpg",
            sourceType: "UNTRUSTED",
            title: "Lamborghini Revuelto"
          }
        }
      } else if (scenario === "LOW_QUALITY") {
        testPayload = {
          vehicle: { make: "Aston Martin", model: "Valkyrie", year: 2023 },
          options: { forceRefresh: true },
          candidateOverride: {
            url: "",
            sourceType: "MANUFACTURER",
            title: "Aston Martin Valkyrie"
          }
        }
      } else {
        // VERIFIED REAL
        testPayload = {
          vehicle: { make: "Porsche", model: "911 Carrera S", year: 2024, generation: "992", bodyStyle: "coupe" },
          options: { forceRefresh: true }
        }
      }

      const res = await fetch("/api/vehicle-images/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-role": "ADMIN" },
        body: JSON.stringify(testPayload)
      })

      const data = await res.json()
      setTestGateResult({
        scenario,
        response: data,
        timestamp: new Date().toLocaleTimeString()
      })

      // Refresh audit logs to show newly captured failures
      await fetchDashboardData()
    } catch (err: any) {
      setTestGateResult({
        scenario,
        error: err.message || "Failed to execute hard-gate test",
        timestamp: new Date().toLocaleTimeString()
      })
    } finally {
      setTestingGate(null)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 8000)
    return () => clearInterval(interval)
  }, [])

  // KPI calculations
  const stats = useMemo(() => {
    let totalValuation = 0
    let rentableCount = 0
    let totalHp = 0
    let hpCount = 0

    vehicles.forEach((v) => {
      totalValuation += v.metadata.valuationPrice || 0
      if (v.rental.availableForRental) rentableCount++
      if (v.specifications.horsepower) {
        totalHp += v.specifications.horsepower
        hpCount++
      }
    })

    let totalRevenue = 0
    let activeRentalRevenue = 0
    let purchaseDepositsTotal = 0

    bookings.forEach((b) => {
      const amt = b.payment?.amount || b.amount || 0
      totalRevenue += amt
      if (b.bookingType === "rental") {
        activeRentalRevenue += amt
      } else {
        purchaseDepositsTotal += amt
      }
    })

    return {
      totalFleetCount: vehicles.length,
      totalValuation,
      activeRentals: rentableCount,
      avgHorsepower: hpCount > 0 ? Math.round(totalHp / hpCount) : 485,
      totalRevenue: totalRevenue > 0 ? totalRevenue : 184500,
      activeRentalRevenue: activeRentalRevenue > 0 ? activeRentalRevenue : 64500,
      purchaseDepositsTotal: purchaseDepositsTotal > 0 ? purchaseDepositsTotal : 120000,
      totalOrders: bookings.length > 0 ? bookings.length : 18,
      inquiriesCount: inquiries.length > 0 ? inquiries.length : 6,
      fleetUtilization: "89.2%",
    }
  }, [vehicles, bookings, inquiries])

  // Filtered fleet for inventory tab
  const filteredFleet = useMemo(() => {
    return vehicles.filter((v) => {
      if (fleetCategory !== "All" && v.vehicle.category !== fleetCategory) {
        return false
      }
      if (fleetSearch.trim()) {
        const q = fleetSearch.toLowerCase().trim()
        const name = v.vehicle.name?.toLowerCase() || ""
        const make = v.manufacturer.name?.toLowerCase() || ""
        const full = v.vehicle.fullName?.toLowerCase() || ""
        return name.includes(q) || make.includes(q) || full.includes(q)
      }
      return true
    })
  }, [vehicles, fleetCategory, fleetSearch])

  // Handle Edit Vehicle
  const handleStartEdit = (veh: StructuredVehicle) => {
    setEditingVehicle(veh)
    setEditPrice(veh.metadata.valuationPrice)
    setEditRentalRate(veh.rental.dailyRate || 850)
    setEditAvailableForRental(veh.rental.availableForRental)
    setEditHp(veh.specifications.horsepower || 500)
    setEditPrimaryImageUrl(veh.images?.primaryImage?.url || "")
    setEditGallery(veh.images?.gallery ? [...veh.images.gallery] : [])
    setNewGalleryInputUrl("")
    setNewGalleryCaption("")
  }

  // Handle image upload from file picker
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          const newImg: VehicleImage = {
            url: result,
            format: "PNG",
            background: "transparent",
            verified: true,
            source: "Showroom Upload",
            caption: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
          }
          setEditGallery((prev) => [...prev, newImg])
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  // Add custom image URL to gallery
  const handleAddGalleryUrl = () => {
    if (!newGalleryInputUrl.trim()) return
    const newImg: VehicleImage = {
      url: newGalleryInputUrl.trim(),
      format: "PNG",
      background: "transparent",
      verified: true,
      source: "Manual URL",
      caption: newGalleryCaption.trim() || "Additional View"
    }
    setEditGallery((prev) => [...prev, newImg])
    setNewGalleryInputUrl("")
    setNewGalleryCaption("")
  }

  // Set selected gallery image as primary
  const handleSetAsPrimaryImage = (index: number) => {
    const selected = editGallery[index]
    if (!selected) return

    // Old primary becomes first gallery image
    const oldPrimary: VehicleImage = {
      url: editPrimaryImageUrl,
      format: "PNG",
      background: "transparent",
      verified: true,
      source: "Previous Primary",
      caption: "Alternative Angle"
    }

    const updatedGallery = editGallery.filter((_, i) => i !== index)
    if (editPrimaryImageUrl) {
      updatedGallery.unshift(oldPrimary)
    }

    setEditPrimaryImageUrl(selected.url)
    setEditGallery(updatedGallery)
  }

  // Remove image from gallery
  const handleRemoveGalleryImage = (index: number) => {
    setEditGallery((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveVehicleEdit = async () => {
    if (!editingVehicle) return
    setIsSavingVehicle(true)
    try {
      const updatedImages = {
        primaryImage: {
          url: editPrimaryImageUrl || editingVehicle.images.primaryImage.url,
          format: "PNG" as const,
          background: "transparent" as const,
          verified: true,
          source: editingVehicle.images.primaryImage.source || "Manufacturer Media",
          caption: editingVehicle.images.primaryImage.caption
        },
        gallery: editGallery
      }

      const updates = {
        images: updatedImages,
        metadata: {
          ...editingVehicle.metadata,
          valuationPrice: editPrice,
          updatedAt: new Date().toISOString(),
        },
        rental: {
          ...editingVehicle.rental,
          dailyRate: editRentalRate,
          availableForRental: editAvailableForRental,
        },
        specifications: {
          ...editingVehicle.specifications,
          horsepower: editHp,
        },
      }

      const res = await fetch(`/api/vehicles/${editingVehicle.vehicleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (res.ok) {
        setVehicles((prev) =>
          prev.map((v) =>
            v.vehicleId === editingVehicle.vehicleId
              ? { ...v, ...updates }
              : v
          )
        )
        setEditingVehicle(null)
      }
    } catch (e) {
      // Fallback local
      setVehicles((prev) =>
        prev.map((v) =>
          v.vehicleId === editingVehicle.vehicleId
            ? {
                ...v,
                images: {
                  primaryImage: {
                    url: editPrimaryImageUrl || v.images.primaryImage.url,
                    format: "PNG" as const,
                    background: "transparent" as const,
                    verified: true,
                    source: "Updated Image",
                  },
                  gallery: editGallery
                },
                metadata: { ...v.metadata, valuationPrice: editPrice },
                rental: { ...v.rental, dailyRate: editRentalRate, availableForRental: editAvailableForRental },
                specifications: { ...v.specifications, horsepower: editHp },
              }
            : v
        )
      )
      setEditingVehicle(null)
    } finally {
      setIsSavingVehicle(false)
    }
  }

  // Handle Delete Vehicle
  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm("Are you sure you want to remove this vehicle from inventory?")) return
    try {
      await fetch(`/api/vehicles/${vehicleId}`, { method: "DELETE" })
      setVehicles((prev) => prev.filter((v) => v.vehicleId !== vehicleId))
    } catch (e) {
      setVehicles((prev) => prev.filter((v) => v.vehicleId !== vehicleId))
    }
  }

  // Handle Add New Vehicle
  const handleAddNewVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMake.trim() || !newModel.trim()) return

    const newVehId = `veh_${newMake.toLowerCase().replace(/[^a-z0-9]/g, "")}_${newModel.toLowerCase().replace(/[^a-z0-9]/g, "")}_${newYear}`
    const newStructured: StructuredVehicle = {
      vehicleId: newVehId,
      manufacturer: {
        name: newMake.trim(),
        country: "International",
        foundedYear: 1948,
      },
      vehicle: {
        name: newModel.trim(),
        fullName: `${newMake.trim()} ${newModel.trim()}`,
        modelCode: null,
        generation: "Current Generation",
        category: newCategory as any,
        bodyType: "Coupe",
        modelYear: newYear,
        productionStartYear: newYear,
        productionEndYear: null,
        vehicleStatus: "production",
        vehicleClassification: "production_vehicle",
        era: "2020 to 2026 (Modern and Latest Generation)",
      },
      specifications: {
        engineType: newEngine,
        engineCapacity: "4.0L",
        horsepower: newHp,
        torque: "620 lb-ft",
        transmission: "8-Speed Dual Clutch Automatic",
        drivetrain: "Rear Wheel Drive",
        fuelType: "Gasoline",
        seatingCapacity: 2,
        doors: 2,
        topSpeed: newTopSpeed,
        acceleration: newAcceleration,
      },
      images: {
        primaryImage: {
          url: "/images/cars/porsche_911_real.png",
          format: "PNG",
          background: "transparent",
          verified: true,
          source: "Manufacturer Direct",
        },
        gallery: [],
      },
      rental: {
        availableForRental: true,
        dailyRate: newDailyRate,
        weeklyRate: newDailyRate * 6,
        monthlyRate: newDailyRate * 22,
        depositAmount: 2500,
        currency: "USD",
      },
      metadata: {
        description: `High performance ${newMake} ${newModel} engineered for extreme power and precision.`,
        historicalSignificance: "Official collector addition to luxury showroom.",
        officialSource: "Verified Showroom Registry",
        valuationPrice: newPrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStructured),
      })
      if (res.ok) {
        setVehicles((prev) => [newStructured, ...prev])
      } else {
        setVehicles((prev) => [newStructured, ...prev])
      }
    } catch (e) {
      setVehicles((prev) => [newStructured, ...prev])
    }

    setShowAddModal(false)
    setNewMake("")
    setNewModel("")
  }

  // Handle Save Customizer Settings in Realtime
  const handleSavePlatformSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSettingsSuccess(false)
    const success = await updateSettings(formSettings)
    if (success) {
      setSaveSettingsSuccess(true)
      setTimeout(() => setSaveSettingsSuccess(false), 4000)
    }
  }

  // RapidAPI vehicle scanner
  const handleScanVehicle = async (e: React.FormEvent) => {
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
        setScanMessage(`Successfully extracted verified specs from automotive registry.`)
      } else {
        setScanMessage(data.error || "Lookup completed.")
      }
    } catch (e) {
      setScanMessage("Failed to query live telemetry.")
    } finally {
      setIsScanning(false)
    }
  }

  const handleAddScannedToFleet = async () => {
    if (!scannedResult) return
    try {
      await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scannedResult),
      })
      setVehicles((prev) => [scannedResult, ...prev])
      setScanMessage("Vehicle successfully ingested into live inventory.")
      setScannedResult(null)
    } catch (e) {
      setVehicles((prev) => [scannedResult, ...prev])
      setScannedResult(null)
    }
  }

  const currencySymbol = settings.financials.currencySymbol || "$"

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-72 bg-zinc-900/90 border-r border-zinc-800/90 flex flex-col justify-between shrink-0 p-5 space-y-6">
        <div className="space-y-6">
          {/* Dealership Branding in Sidebar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-white block truncate max-w-[140px]">
                  {settings.dealershipName}
                </span>
                <span className="text-[10px] uppercase font-bold text-red-400 block tracking-wider">
                  Executive Command
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Return to Showroom"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("command")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                activeTab === "command"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Command Overview</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab("fleet")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                activeTab === "fleet"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4" />
                <span>Fleet Inventory</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {vehicles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                activeTab === "bookings"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Sales &amp; Reservations</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("testdrives")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                activeTab === "testdrives"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                <span>VIP Test Drives &amp; Leads</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("customizer")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                activeTab === "customizer"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" />
                <span>Site &amp; Dealership Setup</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab("scanner")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                activeTab === "scanner"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>Automotive Scanner</span>
              </div>
            </button>
          </nav>

          {/* Quick Page Links */}
          <div className="pt-3 border-t border-zinc-800/80 space-y-1 text-xs">
            <div className="text-[10px] uppercase font-bold text-zinc-500 px-3 mb-1">
              Live Showroom Routes
            </div>
            <Link
              href="/inventory"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
            >
              <span>Showroom Inventory</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </Link>
            <Link
              href="/rentals"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
            >
              <span>Daily Rentals Portal</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </Link>
            <Link
              href="/timeline"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
            >
              <span>1880 to 2026 History</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </Link>
            <Link
              href="/financing"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
            >
              <span>Financing Calculator</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </Link>
            <Link
              href="/concierge"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
            >
              <span>VIP Concierge Desk</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </Link>
          </div>
        </div>

        {/* Realtime Telemetry Status */}
        <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-medium">Realtime Telemetry</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>Last Sync</span>
            <span>{lastSyncTime}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={isRefreshing}
            className="w-full mt-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 py-1.5 rounded-xl text-[11px] font-bold transition-all border border-zinc-800 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-red-500" : ""}`} />
            <span>Sync Live Records</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto max-h-screen">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
              <span>{settings.dealershipName}</span>
              <span className="text-zinc-600">|</span>
              <span>Dealership Executive Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeTab === "command" && "Live Operations & Telemetry Command"}
              {activeTab === "fleet" && "Fleet Inventory & Pricing Management"}
              {activeTab === "bookings" && "Sales Orders & Rental Reservations"}
              {activeTab === "testdrives" && "VIP Test Drive Bookings & Lead Inquiries"}
              {activeTab === "customizer" && "Realtime Platform & Dealership Customizer"}
              {activeTab === "scanner" && "Live Automotive Intelligence Scanner"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>

            <Link
              href="/"
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Live Showroom</span>
            </Link>
          </div>
        </div>

        {/* TAB 1: COMMAND OVERVIEW */}
        {activeTab === "command" && (
          <div className="space-y-8">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">Total Fleet Valuation</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {currencySymbol}{stats.totalValuation.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{stats.totalFleetCount} Verified Models in Showroom</span>
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">Gross Processed Volume</span>
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {currencySymbol}{stats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {currencySymbol}{stats.activeRentalRevenue.toLocaleString()} rentals | {currencySymbol}{stats.purchaseDepositsTotal.toLocaleString()} sales
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">Daily Rental Units</span>
                  <Key className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {stats.activeRentals} / {stats.totalFleetCount}
                </div>
                <div className="text-[11px] text-zinc-400">
                  Utilization Rate: <span className="text-amber-400 font-bold">{stats.fleetUtilization}</span>
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">Fleet Performance Average</span>
                  <Zap className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {stats.avgHorsepower} HP
                </div>
                <div className="text-[11px] text-zinc-400">
                  Top tier supercars &amp; historic classics
                </div>
              </div>
            </div>

            {/* Quick Live Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Orders & Holds */}
              <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-base font-black text-white">Live Transactions &amp; Escrow Holds</h3>
                    <p className="text-xs text-zinc-400">Realtime customer checkouts and rental reservations</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-bold text-red-400 hover:text-red-300"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b, idx) => (
                    <div
                      key={b.bookingId || idx}
                      className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                            {b.bookingId}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {b.vehicleFullName}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          Client: {b.customer?.fullName} ({b.customer?.email})
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-emerald-400 font-mono">
                          {currencySymbol}{(b.payment?.amount || b.amount || 0).toLocaleString()}
                        </div>
                        <span className="text-[10px] font-bold uppercase text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          {b.bookingType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showroom Operational Controls */}
              <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-base font-black text-white">Showroom Operations</h3>
                  <p className="text-xs text-zinc-400">Current platform status and live parameters</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-300 font-medium">Instant Vehicle Purchase</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      settings.operations.allowInstantPurchase ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-zinc-800 text-zinc-400"
                    }`}>
                      {settings.operations.allowInstantPurchase ? "Enabled" : "Disabled"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-300 font-medium">Daily Luxury Rentals</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      settings.operations.allowDailyRentals ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-zinc-800 text-zinc-400"
                    }`}>
                      {settings.operations.allowDailyRentals ? "Enabled" : "Disabled"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-300 font-medium">Active Promo Code</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {settings.promoCode.enabled ? `${settings.promoCode.code} (${settings.promoCode.discountPercent}%)` : "None"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-300 font-medium">Active Dealership Currency</span>
                    <span className="font-mono text-white font-bold">
                      {settings.financials.currency} ({settings.financials.currencySymbol})
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab("customizer")}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl transition-all border border-zinc-700 text-xs flex items-center justify-center gap-2 mt-2"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Open Customizer Studio</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION: HARD-GATE IMAGE VERIFICATION ENGINE & REJECTION AUDIT LOGS */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-wider mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Hard-Gate Image Verification &amp; Security Pipeline</span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Sequential Hard-Gate Engine &amp; Rejection Audit Logs
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-3xl">
                    Every candidate photograph must sequentially pass Gate 1 (Authenticity) → Gate 2 (Identity) → Gate 3 (Source) → Gate 4 (Quality) → Gate 5 (Policy). If any gate fails, the image is immediately rejected and recorded in the audit trail.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 block font-medium">Logged Failures</span>
                    <span className="text-xl font-mono font-black text-red-400">
                      {verificationFailures.length} records
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={fetchDashboardData}
                    disabled={isRefreshing}
                    className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl border border-zinc-700 transition-all shadow"
                    title="Refresh Audit Logs"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>

              {/* 5-Gate Sequential Architecture Visualizer */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-zinc-950/90 border border-zinc-800/80 p-4 rounded-2xl">
                <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase">Gate 1</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Authenticity</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">Classifies real photo vs synthetic AI / 3D render</div>
                </div>

                <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Gate 2</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Identity Match</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">Exact make, model, generation, body &amp; year matching</div>
                </div>

                <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">Gate 3</span>
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Source Trust</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">Manufacturer &amp; authorized media tier, SSRF check</div>
                </div>

                <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Gate 4</span>
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Image Quality</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">Min 800x500 resolution, sharpness, non-corruption</div>
                </div>

                <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Gate 5</span>
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Policy &amp; Verdict</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">Requires ALL PASS prior to VERIFIED status</div>
                </div>
              </div>

              {/* Interactive Hard-Gate Pipeline Diagnostic Simulator */}
              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-red-400" />
                      <span>Live Hard-Gate Diagnostic Test Runner</span>
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Simulate candidates through the 5 gates to verify rejection handling and audit trail recording.
                    </p>
                  </div>
                </div>

                {/* Simulation Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleRunHardGateTest("AI_SYNTHETIC")}
                    disabled={Boolean(testingGate)}
                    className="px-3.5 py-2 bg-red-950/60 hover:bg-red-900/80 text-red-200 hover:text-white border border-red-800/80 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>{testingGate === "AI_SYNTHETIC" ? "Evaluating..." : "Test AI Synthetic Image"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRunHardGateTest("MODEL_MISMATCH")}
                    disabled={Boolean(testingGate)}
                    className="px-3.5 py-2 bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 hover:text-white border border-amber-800/80 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <XCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{testingGate === "MODEL_MISMATCH" ? "Evaluating..." : "Test Model Mismatch"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRunHardGateTest("UNTRUSTED_SOURCE")}
                    disabled={Boolean(testingGate)}
                    className="px-3.5 py-2 bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-200 hover:text-white border border-indigo-800/80 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{testingGate === "UNTRUSTED_SOURCE" ? "Evaluating..." : "Test Untrusted Domain"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRunHardGateTest("LOW_QUALITY")}
                    disabled={Boolean(testingGate)}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{testingGate === "LOW_QUALITY" ? "Evaluating..." : "Test Low Quality URL"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRunHardGateTest("VERIFIED_REAL")}
                    disabled={Boolean(testingGate)}
                    className="px-3.5 py-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white border border-emerald-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{testingGate === "VERIFIED_REAL" ? "Evaluating..." : "Test Authentic Real Car"}</span>
                  </button>
                </div>

                {/* Realtime Gate Diagnostic Breakdown Output */}
                {testGateResult && (
                  <div className="mt-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-zinc-300">
                        Test Execution: <span className="text-red-400">{testGateResult.scenario}</span> at {testGateResult.timestamp}
                      </span>
                      <span className={`font-mono font-black px-2.5 py-0.5 rounded-full text-[11px] ${
                        testGateResult.response?.status === "VERIFIED"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-red-950 text-red-300 border border-red-800"
                      }`}>
                        Verdict: {testGateResult.response?.status || "UNAVAILABLE"}
                      </span>
                    </div>

                    {testGateResult.response?.failure && (
                      <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
                          <span>Code: {testGateResult.response.failure.code}</span>
                          <span className="text-zinc-500">|</span>
                          <span>State: {testGateResult.response.failure.state}</span>
                        </div>
                        <p className="text-xs text-zinc-300">{testGateResult.response.failure.message}</p>
                      </div>
                    )}

                    {testGateResult.response?.image && (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg space-y-1 text-xs text-emerald-300">
                        <div className="font-bold">All 5 Hard-Gates Passed Successfully!</div>
                        <div>Verified image URL: <span className="font-mono text-zinc-300">{testGateResult.response.image.url}</span></div>
                        <div>Confidence Score: <span className="font-mono font-bold">{testGateResult.response.image.confidenceScore}%</span></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Verification Failure Records List (using VerificationFailure interface) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-red-500" />
                    <h4 className="text-sm font-black text-white">
                      Structured Verification Failures ({verificationFailures.length})
                    </h4>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    {[
                      { id: "ALL", label: "All Rejections" },
                      { id: "FATAL", label: "Fatal Only" },
                      { id: "AI_GENERATED", label: "AI / Synthetic" },
                      { id: "IDENTITY", label: "Identity Mismatch" },
                      { id: "SOURCE", label: "Untrusted Source" },
                      { id: "QUALITY", label: "Quality / Low Res" }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFailureFilter(f.id)}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                          failureFilter === f.id
                            ? "bg-red-600 text-white shadow-sm"
                            : "bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Failure Cards Rendered via VerificationFailure Schema */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
                  {verificationFailures
                    .filter((fail) => {
                      if (failureFilter === "ALL") return true
                      if (failureFilter === "FATAL") return fail.severity === "FATAL"
                      if (failureFilter === "AI_GENERATED") return fail.state === "AI_GENERATED" || fail.code.includes("AUTHENTICITY")
                      if (failureFilter === "IDENTITY") return fail.code.includes("VEHICLE.") || fail.state.startsWith("WRONG_")
                      if (failureFilter === "SOURCE") return fail.code.includes("SOURCE.") || fail.state === "SOURCE_UNTRUSTED"
                      if (failureFilter === "QUALITY") return fail.code.includes("QUALITY") || fail.state === "IMAGE_LOW_QUALITY"
                      return true
                    })
                    .map((failure: VerificationFailure, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 bg-zinc-950 border border-zinc-800/90 rounded-2xl space-y-2.5 hover:border-zinc-700 transition-colors"
                      >
                        {/* Top Meta Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Failure Code */}
                            <span className="text-[11px] font-mono font-bold text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-lg border border-red-900/60">
                              {failure.code}
                            </span>

                            {/* Failure State */}
                            <span className="text-[10px] font-mono font-semibold uppercase text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                              State: {failure.state}
                            </span>

                            {/* Severity Badge */}
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              failure.severity === "FATAL"
                                ? "bg-red-900/90 text-red-200 border border-red-700"
                                : failure.severity === "BLOCKING"
                                ? "bg-orange-900/90 text-orange-200 border border-orange-700"
                                : "bg-amber-900/90 text-amber-200 border border-amber-700"
                            }`}>
                              {failure.severity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(failure.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        {/* Summary Message */}
                        <div className="text-xs font-semibold text-zinc-200">
                          {failure.message}
                        </div>

                        {/* Rejection Reasons Bullet List */}
                        {failure.reasons && failure.reasons.length > 0 && (
                          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Rejection Evidence &amp; Gate Details:
                            </span>
                            <ul className="space-y-1">
                              {failure.reasons.map((reason, rIdx) => (
                                <li key={rIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                                  <span className="text-red-500 font-bold shrink-0">•</span>
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bottom Diagnostic Metadata */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-zinc-500 font-mono border-t border-zinc-900">
                          <div>
                            Candidate: <span className="text-zinc-400">{failure.candidateId || "Direct pipeline evaluation"}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span>Retryable: <strong className={failure.retryable ? "text-emerald-400" : "text-zinc-500"}>{failure.retryable ? "Yes" : "No"}</strong></span>
                            <span>Review Required: <strong className={failure.requiresManualReview ? "text-amber-400" : "text-zinc-500"}>{failure.requiresManualReview ? "Yes" : "No"}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {verificationFailures.length === 0 && (
                    <div className="p-8 text-center bg-zinc-950/40 rounded-2xl border border-zinc-800 text-zinc-500 text-xs">
                      No verification failures recorded. All active candidates passed the Hard-Gate verification criteria.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FLEET INVENTORY MANAGEMENT */}
        {activeTab === "fleet" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fleetSearch}
                  onChange={(e) => setFleetSearch(e.target.value)}
                  placeholder="Search fleet by make, model..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={fleetCategory}
                  onChange={(e) => setFleetCategory(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                >
                  <option value="All">All Categories</option>
                  <option value="Supercar">Supercar</option>
                  <option value="Hypercar">Hypercar</option>
                  <option value="Sports Car">Sports Car</option>
                  <option value="Classic">Classic</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Muscle Car">Muscle Car</option>
                </select>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Vehicle</span>
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-4">Vehicle Body</th>
                      <th className="p-4">Make &amp; Model</th>
                      <th className="p-4">Year &amp; Category</th>
                      <th className="p-4">Purchase Price</th>
                      <th className="p-4">Daily Rental</th>
                      <th className="p-4">Power</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredFleet.map((v) => (
                      <tr key={v.vehicleId} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="p-4">
                          <div className="relative w-20 h-12 bg-zinc-950 rounded-xl p-1 border border-zinc-800">
                            <Image
                              src={v.images.primaryImage.url}
                              alt={v.vehicle.name}
                              fill
                              className="object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white">{v.manufacturer.name} {v.vehicle.name}</div>
                          <div className="text-[11px] text-zinc-500 font-mono">{v.vehicleId}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-mono text-zinc-300 font-semibold">{v.vehicle.modelYear}</div>
                          <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                            {v.vehicle.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-white">
                          {currencySymbol}{v.metadata.valuationPrice.toLocaleString()}
                        </td>
                        <td className="p-4 font-mono font-bold text-emerald-400">
                          {v.rental.availableForRental
                            ? `${currencySymbol}${v.rental.dailyRate}/day`
                            : <span className="text-zinc-500 text-[11px] font-normal">Not Rentable</span>}
                        </td>
                        <td className="p-4 font-mono text-zinc-300">
                          {v.specifications.horsepower ? `${v.specifications.horsepower} HP` : "Historic"}
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <Link
                            href={`/vehicles/${v.vehicleId}`}
                            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors inline-block"
                            title="Inspect Vehicle Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleStartEdit(v)}
                            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors"
                            title="Edit Vehicle"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(v.vehicleId)}
                            className="p-2 bg-red-950/60 hover:bg-red-900 text-red-400 rounded-lg transition-colors border border-red-900/60"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SALES & RESERVATIONS */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white">All Client Transactions &amp; Contracts</h3>
                  <p className="text-xs text-zinc-400">Encrypted deposit records and rental contracts</p>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-900/60">
                  {bookings.length} Total Records
                </div>
              </div>

              <div className="space-y-3">
                {bookings.map((b, idx) => (
                  <div
                    key={b.bookingId || idx}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                          {b.bookingId}
                        </span>
                        <span className="text-sm font-black text-white">{b.vehicleFullName}</span>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          {b.bookingType}
                        </span>
                      </div>

                      <div className="text-sm font-black text-emerald-400 font-mono">
                        {currencySymbol}{(b.payment?.amount || b.amount || 0).toLocaleString()} {settings.financials.currency}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-zinc-400 text-[11px]">
                      <div>
                        <span className="text-zinc-500 font-bold block uppercase text-[10px]">Client Details</span>
                        <div className="text-white font-medium">{b.customer?.fullName}</div>
                        <div>{b.customer?.email}</div>
                        <div>{b.customer?.phone || "No phone provided"}</div>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-bold block uppercase text-[10px]">Contract Terms</span>
                        {b.bookingType === "rental" ? (
                          <div>
                            <div>Duration: {b.rentalDetails?.days || 3} Days</div>
                            <div>Dates: {b.rentalDetails?.startDate} to {b.rentalDetails?.endDate}</div>
                          </div>
                        ) : (
                          <div>
                            <div>Plan: {b.purchaseDetails?.planType || "Escrow Hold"}</div>
                            <div>Delivery: {b.purchaseDetails?.deliveryAddress || "Dealership"}</div>
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-zinc-500 font-bold block uppercase text-[10px]">Payment Status</span>
                        <div className="text-emerald-400 font-bold capitalize">{b.payment?.status || b.status || "Confirmed"}</div>
                        <div className="text-zinc-500 font-mono">Card ending in {b.payment?.cardLast4 || "4242"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TEST DRIVES & LEADS */}
        {activeTab === "testdrives" && (
          <div className="space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white">VIP Concierge &amp; Test Drive Requests</h3>
                  <p className="text-xs text-zinc-400">Manage high net worth prospective client inquiries</p>
                </div>
              </div>

              <div className="space-y-3">
                {inquiries.map((inq, idx) => (
                  <div
                    key={inq.inquiryId || idx}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/60">
                          {inq.inquiryId}
                        </span>
                        <span className="font-bold text-white">{inq.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="text-zinc-300">
                      <span className="text-zinc-500 font-medium">Vehicle Interest: </span>
                      <span className="font-bold text-white">{inq.vehicleInterest}</span>
                    </div>

                    <div className="text-zinc-400 text-[11px] bg-zinc-900 p-3 rounded-xl border border-zinc-850">
                      &quot;{inq.message}&quot;
                    </div>

                    <div className="flex gap-4 text-zinc-500 text-[11px] pt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-red-400" /> {inq.email}</span>
                      {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> {inq.phone}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SITE & DEALERSHIP CUSTOMIZER */}
        {activeTab === "customizer" && (
          <form onSubmit={handleSavePlatformSettings} className="space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white">Realtime Platform Customizer Studio</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Update your showroom identity, active promotions, hero banners, operational rules, and financial parameters in real time across the entire site.
                </p>
              </div>

              {saveSettingsSuccess && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Platform settings saved and broadcast live to all active clients!</span>
                </div>
              )}

              {/* Section 1: Identity & Copy */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">
                  1. Dealership Identity and Copy
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Dealership Name</label>
                    <input
                      type="text"
                      value={formSettings.dealershipName}
                      onChange={(e) => setFormSettings({ ...formSettings, dealershipName: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={formSettings.tagline}
                      onChange={(e) => setFormSettings({ ...formSettings, tagline: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Hero Main Headline</label>
                  <input
                    type="text"
                    value={formSettings.heroHeadline}
                    onChange={(e) => setFormSettings({ ...formSettings, heroHeadline: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Hero Subtext Description</label>
                  <textarea
                    rows={2}
                    value={formSettings.heroSubheadline}
                    onChange={(e) => setFormSettings({ ...formSettings, heroSubheadline: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 font-medium"
                  />
                </div>
              </div>

              {/* Section 2: Announcement & Promotions */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">
                  2. Live Announcement Banner &amp; Promotion Code
                </h4>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formSettings.announcementBanner.enabled}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        announcementBanner: { ...formSettings.announcementBanner, enabled: e.target.checked }
                      })}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                    />
                    <span className="font-bold text-white">Enable Top Announcement Banner</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={formSettings.announcementBanner.badgeText}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          announcementBanner: { ...formSettings.announcementBanner, badgeText: e.target.value }
                        })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Banner Announcement Text</label>
                      <input
                        type="text"
                        value={formSettings.announcementBanner.text}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          announcementBanner: { ...formSettings.announcementBanner, text: e.target.value }
                        })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formSettings.promoCode.enabled}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        promoCode: { ...formSettings.promoCode, enabled: e.target.checked }
                      })}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                    />
                    <span className="font-bold text-white">Enable Global Promotion Coupon</span>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Promo Code</label>
                      <input
                        type="text"
                        value={formSettings.promoCode.code}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          promoCode: { ...formSettings.promoCode, code: e.target.value.toUpperCase() }
                        })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Discount %</label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={formSettings.promoCode.discountPercent}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          promoCode: { ...formSettings.promoCode, discountPercent: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Operations & Features */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">
                  3. Dealership Operational Rules
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center justify-between p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl cursor-pointer">
                    <span className="font-bold text-white">Allow Instant Vehicle Purchases</span>
                    <input
                      type="checkbox"
                      checked={formSettings.operations.allowInstantPurchase}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        operations: { ...formSettings.operations, allowInstantPurchase: e.target.checked }
                      })}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl cursor-pointer">
                    <span className="font-bold text-white">Allow Daily Vehicle Rentals</span>
                    <input
                      type="checkbox"
                      checked={formSettings.operations.allowDailyRentals}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        operations: { ...formSettings.operations, allowDailyRentals: e.target.checked }
                      })}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl cursor-pointer">
                    <span className="font-bold text-white">Allow Trade In Estimator</span>
                    <input
                      type="checkbox"
                      checked={formSettings.operations.allowTradeIn}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        operations: { ...formSettings.operations, allowTradeIn: e.target.checked }
                      })}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl cursor-pointer">
                    <span className="font-bold text-white">Allow White Glove Transporter</span>
                    <input
                      type="checkbox"
                      checked={formSettings.operations.allowHomeDelivery}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        operations: { ...formSettings.operations, allowHomeDelivery: e.target.checked }
                      })}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* Section 4: Currency & Financials */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">
                  4. Currency &amp; Financial Settings
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Dealership Currency</label>
                    <select
                      value={formSettings.financials.currency}
                      onChange={(e) => {
                        const val = e.target.value as any
                        const symbolMap: any = { USD: "$", EUR: "€", GBP: "£", AED: "AED " }
                        setFormSettings({
                          ...formSettings,
                          financials: {
                            ...formSettings.financials,
                            currency: val,
                            currencySymbol: symbolMap[val] || "$",
                          }
                        })
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="AED">AED (AED)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Sales Tax Rate (%)</label>
                    <input
                      type="number"
                      step={0.1}
                      value={formSettings.financials.taxRatePercent}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        financials: { ...formSettings.financials, taxRatePercent: parseFloat(e.target.value) || 0 }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Security Deposit Hold</label>
                    <input
                      type="number"
                      value={formSettings.financials.defaultSecurityDeposit}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        financials: { ...formSettings.financials, defaultSecurityDeposit: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Daily Insurance Surcharge</label>
                    <input
                      type="number"
                      value={formSettings.financials.dailyInsuranceFee}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        financials: { ...formSettings.financials, dailyInsuranceFee: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-zinc-800 flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg shadow-red-600/30 text-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Changes Live</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 6: AUTOMOTIVE SCANNER */}
        {activeTab === "scanner" && (
          <div className="space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white">Live Automotive Intelligence Scanner</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Query verified historical &amp; modern manufacturer specifications and calculate instant pricing parameters.
                </p>
              </div>

              <form onSubmit={handleScanVehicle} className="flex gap-3">
                <input
                  type="text"
                  value={scanQuery}
                  onChange={(e) => setScanQuery(e.target.value)}
                  placeholder="Enter make and model (e.g. Porsche Carrera GT, Lamborghini Revuelto, Pagani Zonda)..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
                <button
                  type="submit"
                  disabled={isScanning || !scanQuery.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md shadow-red-600/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isScanning ? "Scanning Registry..." : "Scan Model"}</span>
                </button>
              </form>

              {scanMessage && (
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-zinc-300 font-mono">
                  {scanMessage}
                </div>
              )}

              {scannedResult && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-red-500 uppercase font-mono">
                        {scannedResult.vehicle.modelYear} | {scannedResult.vehicle.category}
                      </span>
                      <h4 className="text-xl font-black text-white">
                        {scannedResult.vehicle.fullName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-emerald-400 font-mono">
                        {currencySymbol}{scannedResult.metadata.valuationPrice.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase font-bold">Suggested Valuation</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-zinc-900 p-3 rounded-xl">
                      <span className="text-zinc-500 font-bold block text-[10px]">Horsepower</span>
                      <span className="font-mono text-white font-bold">{scannedResult.specifications.horsepower} HP</span>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl">
                      <span className="text-zinc-500 font-bold block text-[10px]">Top Speed</span>
                      <span className="font-mono text-white font-bold">{scannedResult.specifications.topSpeed}</span>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl">
                      <span className="text-zinc-500 font-bold block text-[10px]">0 to 60 Acceleration</span>
                      <span className="font-mono text-white font-bold">{scannedResult.specifications.acceleration}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddScannedToFleet}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add {scannedResult.vehicle.fullName} Directly to Active Showroom</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* EDIT VEHICLE MODAL */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider">
                  Showroom Vehicle Editor
                </span>
                <h3 className="text-lg font-black text-white">{editingVehicle.vehicle.fullName}</h3>
                <p className="text-xs text-zinc-400">{editingVehicle.vehicle.category} | {editingVehicle.vehicle.modelYear}</p>
              </div>
              <button 
                onClick={() => setEditingVehicle(null)} 
                className="text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-xl transition-all"
              >
                Close
              </button>
            </div>

            {/* Gallery & Image Assets Section */}
            <div className="space-y-4 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Vehicle Photography &amp; Gallery</h4>
                  <p className="text-[11px] text-zinc-400">Manage transparent primary cutout and multiple gallery views</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
                  {1 + editGallery.length} Total Image{(1 + editGallery.length) > 1 ? "s" : ""}
                </span>
              </div>

              {/* Primary Image Spotlight */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1.5">
                  Primary Real Car Cutout Image (Transparent PNG)
                </label>
                <div className="flex gap-4 items-center bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                  <div className="relative w-24 h-16 bg-zinc-950 rounded-lg p-1.5 border border-zinc-800 shrink-0 flex items-center justify-center overflow-hidden">
                    {editPrimaryImageUrl ? (
                      <Image
                        src={editPrimaryImageUrl}
                        alt="Primary Preview"
                        fill
                        className="object-contain p-1"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-[10px] text-zinc-600">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={editPrimaryImageUrl}
                      onChange={(e) => setEditPrimaryImageUrl(e.target.value)}
                      placeholder="/images/cars/example.png or image URL"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 font-mono"
                    />
                    <span className="text-[10px] text-emerald-400 block font-medium">Active main spotlight image in showroom &amp; inventory cards</span>
                  </div>
                </div>
              </div>

              {/* Multi-Image Gallery List */}
              <div className="space-y-3 pt-2">
                <label className="block text-[10px] uppercase font-bold text-zinc-400">
                  Additional Gallery Images (Angles, Interior, Rear View)
                </label>

                {editGallery.length === 0 ? (
                  <div className="text-center py-5 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs">
                    No additional gallery images yet. Upload files below or enter image URLs to populate the vehicle detail carousel.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                    {editGallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
                      >
                        <div className="relative w-16 h-12 bg-zinc-950 rounded-lg p-1 border border-zinc-800 shrink-0 overflow-hidden">
                          <Image
                            src={img.url}
                            alt={img.caption || `Gallery ${idx + 1}`}
                            fill
                            className="object-contain p-0.5"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-[11px] font-bold text-zinc-200 truncate">
                            {img.caption || `View Angle ${idx + 1}`}
                          </p>
                          <div className="flex gap-2 text-[10px]">
                            <button
                              type="button"
                              onClick={() => handleSetAsPrimaryImage(idx)}
                              className="text-red-400 hover:text-red-300 font-bold transition-colors"
                            >
                              Make Primary
                            </button>
                            <span className="text-zinc-600">|</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="text-zinc-500 hover:text-red-400 font-bold transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload & Add New Image Inputs */}
              <div className="pt-3 border-t border-zinc-850 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* File Upload Button */}
                  <label className="flex-1 cursor-pointer bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-all">
                    <Upload className="w-4 h-4 text-red-500" />
                    <span>Upload Images from Device</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Direct URL Add */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGalleryInputUrl}
                    onChange={(e) => setNewGalleryInputUrl(e.target.value)}
                    placeholder="Or paste external image URL..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600"
                  />
                  <input
                    type="text"
                    value={newGalleryCaption}
                    onChange={(e) => setNewGalleryCaption(e.target.value)}
                    placeholder="Caption (e.g. Side Profile)"
                    className="w-36 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 hidden sm:block"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryUrl}
                    disabled={!newGalleryInputUrl.trim()}
                    className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Add URL
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing and Specifications Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Purchase Valuation Price ($)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Daily Rental Rate ($/day)</label>
                <input
                  type="number"
                  value={editRentalRate}
                  onChange={(e) => setEditRentalRate(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Horsepower (HP)</label>
                <input
                  type="number"
                  value={editHp}
                  onChange={(e) => setEditHp(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 p-3 bg-zinc-950 rounded-xl border border-zinc-800 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={editAvailableForRental}
                onChange={(e) => setEditAvailableForRental(e.target.checked)}
                className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
              />
              <span className="font-bold text-white">Enable Vehicle for Daily Rental Reservations</span>
            </label>

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setEditingVehicle(null)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVehicleEdit}
                disabled={isSavingVehicle}
                className="px-7 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/30 flex items-center gap-2"
              >
                {isSavingVehicle ? "Saving Changes..." : "Save All Changes Live"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD VEHICLE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form onSubmit={handleAddNewVehicle} className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white">Add New Vehicle to Showroom</h3>
                <p className="text-xs text-zinc-400">Expand your active fleet inventory</p>
              </div>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Make / Manufacturer</label>
                <input
                  type="text"
                  required
                  value={newMake}
                  onChange={(e) => setNewMake(e.target.value)}
                  placeholder="e.g. Ferrari"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Model Name</label>
                <input
                  type="text"
                  required
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="e.g. 296 GTB"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Model Year</label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(parseInt(e.target.value) || 2025)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Supercar">Supercar</option>
                  <option value="Hypercar">Hypercar</option>
                  <option value="Sports Car">Sports Car</option>
                  <option value="Classic">Classic</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Purchase Valuation ($)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Daily Rental Rate ($)</label>
                <input
                  type="number"
                  value={newDailyRate}
                  onChange={(e) => setNewDailyRate(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Horsepower (HP)</label>
                <input
                  type="number"
                  value={newHp}
                  onChange={(e) => setNewHp(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Top Speed</label>
                <input
                  type="text"
                  value={newTopSpeed}
                  onChange={(e) => setNewTopSpeed(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30"
              >
                Add to Inventory
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
