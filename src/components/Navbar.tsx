"use client"

import Link from "next/link"
import { ShieldCheck, Phone, Car } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white block">
              AUTO VAULT
            </span>
            <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">
              Performance Vehicles
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link href="/" className="hover:text-white transition-colors">
            Showroom
          </Link>
          <Link href="#inventory" className="hover:text-white transition-colors">
            Available Inventory
          </Link>
          <Link href="#specifications" className="hover:text-white transition-colors">
            Performance Specs
          </Link>
          <Link href="#stripe-payment" className="hover:text-white transition-colors">
            Stripe Checkout
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official Manufacturer Certified</span>
          </div>

          <a
            href="#inventory"
            className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-600/20"
          >
            View Inventory
          </a>
        </div>
      </div>
    </header>
  )
}
