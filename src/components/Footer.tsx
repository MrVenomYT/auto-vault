"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, Lock, CreditCard, Car, ChevronRight } from "lucide-react"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"

export default function Footer() {
  const pathname = usePathname()
  const { settings } = usePlatformSettings()

  // Hide on dashboard
  if (pathname && pathname.startsWith("/dashboard")) {
    return null
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/30">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {settings.dealershipName.toUpperCase()}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              {settings.tagline}. Curated collection of authentic sports cars, supercars, and classic collector automobiles from 1880 to 2026.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>256 Bit Encrypted Secure Checkout</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Dealership Pages
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/inventory" className="hover:text-white transition-colors">
                  Vehicle Inventory &amp; Showroom
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-white transition-colors">
                  Daily Supercar &amp; Luxury Rentals
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-white transition-colors">
                  1880 to 2026 Automotive Timeline
                </Link>
              </li>
              <li>
                <Link href="/financing" className="hover:text-white transition-colors">
                  Financing &amp; Trade-In Appraisal
                </Link>
              </li>
              <li>
                <Link href="/concierge" className="hover:text-white transition-colors">
                  VIP Concierge &amp; Private Track Drives
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Secure Escrow &amp; Payments
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-white bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-xs text-white">Direct Card Authorization</div>
                  <div className="text-[11px] text-zinc-400">Encrypted holding deposits and rentals</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500">
                All reservations are processed with level 1 PCI compliance and fraud protection.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Collector Guarantee
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Certified Provenance and History</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Multi Point Factory Inspection</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Enclosed Transport Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} {settings.dealershipName}. All rights reserved.</p>
          <p>Authentic backgroundless vehicle photography and verified specifications.</p>
        </div>
      </div>
    </footer>
  )
}
