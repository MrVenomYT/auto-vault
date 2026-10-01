"use client"

import Link from "next/link"
import { ShieldCheck, LayoutDashboard, Car } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block">
              AUTO VAULT
            </span>
            <span className="text-xs uppercase tracking-widest text-zinc-400 block font-semibold">
              Automotive Database 1880 to 2026
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-300">
          <Link href="/" className="hover:text-white transition-colors">
            Showroom
          </Link>
          <Link href="#inventory" className="hover:text-white transition-colors">
            1880 to 2026 Catalog
          </Link>
          <Link href="#stripe-payment" className="hover:text-white transition-colors">
            Stripe Security
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-red-500" />
            <span>MongoDB Dashboard</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
