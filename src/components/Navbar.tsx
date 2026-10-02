"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Car,
  ShieldCheck,
  Key,
  ShoppingBag,
  Sparkles,
  Calendar,
  DollarSign,
  UserCheck,
  Menu,
  X,
  ChevronRight
} from "lucide-react"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"

export default function Navbar() {
  const pathname = usePathname()
  const { settings } = usePlatformSettings()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Hide consumer navbar on dashboard admin console
  if (pathname && pathname.startsWith("/dashboard")) {
    return null
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Realtime Announcement Banner customizable from Admin Dashboard */}
      {settings.announcementBanner.enabled && (
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-zinc-950 border-b border-red-800/60 text-white text-xs font-medium py-2 px-3 sm:px-6 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-left">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shrink-0 whitespace-nowrap">
                {settings.announcementBanner.badgeText}
              </span>
              <span className="text-zinc-200 text-xs truncate">
                {settings.announcementBanner.text}
              </span>
            </div>
            {settings.promoCode.enabled && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300 font-bold bg-black/50 px-2.5 py-0.5 rounded-md border border-amber-500/30 shrink-0 whitespace-nowrap">
                <span>Code:</span>
                <span className="underline">{settings.promoCode.code}</span>
                <span className="text-zinc-400 font-normal">({settings.promoCode.discountPercent}% Off)</span>
              </div>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-black tracking-tight text-white block">
                {settings.dealershipName.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-bold truncate max-w-[150px] sm:max-w-[240px]">
                {settings.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-zinc-300">
            <Link
              href="/"
              className={`transition-colors py-1 ${
                isActive("/") && pathname === "/" ? "text-red-500 font-bold" : "hover:text-white"
              }`}
            >
              Showroom
            </Link>
            <Link
              href="/inventory"
              className={`transition-colors py-1 ${
                isActive("/inventory") ? "text-red-500 font-bold" : "hover:text-white"
              }`}
            >
              Inventory
            </Link>
            <Link
              href="/rentals"
              className={`transition-colors py-1 ${
                isActive("/rentals") ? "text-red-500 font-bold" : "hover:text-white"
              }`}
            >
              Daily Rentals
            </Link>
            <Link
              href="/timeline"
              className={`transition-colors py-1 ${
                isActive("/timeline") ? "text-red-500 font-bold" : "hover:text-white"
              }`}
            >
              1880 to 2026 History
            </Link>
            <Link
              href="/financing"
              className={`transition-colors py-1 ${
                isActive("/financing") ? "text-red-500 font-bold" : "hover:text-white"
              }`}
            >
              Financing
            </Link>
            <Link
              href="/concierge"
              className={`transition-colors py-1 ${
                isActive("/concierge") ? "text-red-500 font-bold" : "hover:text-white"
              }`}
            >
              VIP Concierge
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-red-600 text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
            >
              <LayoutDashboard className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-red-500" />
              <span className="hidden sm:inline">Admin Console</span>
              <span className="sm:hidden">Admin</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                isActive("/") && pathname === "/" ? "bg-red-950/60 text-red-400 border border-red-900/60" : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span>Showroom Main</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                isActive("/inventory") ? "bg-red-950/60 text-red-400 border border-red-900/60" : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span>Vehicle Inventory</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/rentals"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                isActive("/rentals") ? "bg-red-950/60 text-red-400 border border-red-900/60" : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span>Daily Luxury Rentals</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/timeline"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                isActive("/timeline") ? "bg-red-950/60 text-red-400 border border-red-900/60" : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span>1880 to 2026 History &amp; Timeline</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/financing"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                isActive("/financing") ? "bg-red-950/60 text-red-400 border border-red-900/60" : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span>Financing &amp; Trade In Appraisal</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/concierge"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                isActive("/concierge") ? "bg-red-950/60 text-red-400 border border-red-900/60" : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span>VIP Concierge &amp; Track Drives</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
