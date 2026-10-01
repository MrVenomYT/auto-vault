import Link from "next/link"
import { Car, ShieldCheck, Lock, CreditCard } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AUTO VAULT</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Exclusive dealer of authentic high performance sports cars, supercars, and executive touring vehicles with direct manufacturer warranty.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>256 Bit Encrypted Direct Stripe Processing</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Featured Brands
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Porsche Motorsport</li>
              <li>BMW M Division</li>
              <li>Mercedes AMG Handcrafted</li>
              <li>Audi Sport Quattro</li>
              <li>Ferrari Maranello</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Authorized Payment
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white bg-zinc-900 border border-zinc-800 p-3 rounded-lg">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="font-semibold text-xs text-white">Stripe Payment Gateway</div>
                  <div className="text-xs text-zinc-400">Cards and digital wallets processed directly</div>
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                All reservations and vehicle purchases are secured exclusively through Stripe payments.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Guarantee
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Clean Title and Complete Carfax History</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Multi Point Factory Inspection</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Worldwide Enclosed Transport Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Auto Vault Luxury Cars. All rights reserved.</p>
          <p>Authentic backgroundless vehicle imagery with Stripe secure processing.</p>
        </div>
      </div>
    </footer>
  )
}
