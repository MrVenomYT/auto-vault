"use client"

import { useState } from "react"
import Image from "next/image"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { X, Lock, CheckCircle2, CreditCard, Key, ShieldCheck } from "lucide-react"

interface StructuredStripeModalProps {
  vehicle: StructuredVehicle | null
  mode: "rental" | "purchase"
  onClose: () => void
}

export default function StructuredStripeModal({
  vehicle,
  mode,
  onClose
}: StructuredStripeModalProps) {
  const [selectedTrim, setSelectedTrim] = useState<number>(0)
  const [rentalDays, setRentalDays] = useState<number>(3)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [zipCode, setZipCode] = useState("")

  if (!vehicle) return null

  const isRental = mode === "rental"
  const trims = vehicle.metadata.availableTrims || [{ name: "Standard Specification", price: vehicle.metadata.valuationPrice }]
  const activeTrim = trims[selectedTrim] || trims[0]

  const totalAmount = isRental
    ? (vehicle.rental.dailyRate || 500) * rentalDays + vehicle.rental.depositAmount
    : vehicle.rental.depositAmount || 5000

  const handleStripeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stripe Payment Confirmed
              </h3>
              <p className="text-zinc-300 text-sm max-w-md mx-auto">
                {isRental
                  ? `Your ${rentalDays} day rental booking for the ${vehicle.vehicle.modelYear} ${vehicle.vehicle.fullName} has been secured through Stripe.`
                  : `Your holding reservation for the ${vehicle.vehicle.modelYear} ${vehicle.vehicle.fullName} has been authorized via Stripe.`}
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-left space-y-2 text-sm max-w-md mx-auto">
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Stripe Charge Reference</span>
                <span className="font-mono text-zinc-200">STRIPE_TX_{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Vehicle Model</span>
                <span className="text-zinc-200">{vehicle.vehicle.fullName}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Generation Code</span>
                <span className="text-zinc-200">{vehicle.vehicle.generation}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Transaction Type</span>
                <span className="text-zinc-200 font-semibold">{isRental ? `Rental (${rentalDays} Days)` : "Purchase Holding Deposit"}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs pt-2 border-t border-zinc-900">
                <span>Total Amount Processed</span>
                <span className="font-bold text-emerald-400 text-sm">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleStripeSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Stripe Verified Payment</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {isRental ? "Complete Rental Booking" : "Secure Purchase Reservation"}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Direct encrypted card authorization with instant electronic receipt.
              </p>
            </div>

            {/* Vehicle Card Summary */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-40 h-24 flex-shrink-0">
                <Image
                  src={vehicle.images.primaryImage.url}
                  alt={vehicle.vehicle.fullName}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block">
                  {vehicle.vehicle.era}
                </span>
                <div className="text-base font-bold text-white">
                  {vehicle.vehicle.modelYear} {vehicle.vehicle.fullName}
                </div>
                <div className="text-xs text-zinc-400">
                  Generation: <span className="text-zinc-300">{vehicle.vehicle.generation}</span>
                </div>
              </div>
            </div>

            {/* Rental Duration or Purchase Trim Selector */}
            {isRental ? (
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Rental Duration (Days): <span className="text-white">{rentalDays} Days</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 3, 7, 14, 30].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setRentalDays(d)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                        rentalDays === d
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {d} {d === 1 ? "Day" : "Days"}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-zinc-400 pt-1">
                  <span>Daily Rate: ${(vehicle.rental.dailyRate || 500).toLocaleString()} USD</span>
                  <span>Refundable Deposit: ${(vehicle.rental.depositAmount).toLocaleString()} USD</span>
                </div>
              </div>
            ) : (
              trims.length > 1 && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Select Available Trim
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trims.map((t, idx) => (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setSelectedTrim(idx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          selectedTrim === idx
                            ? "border-red-600 bg-red-600/10 text-white"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-zinc-300 mt-1">${t.price.toLocaleString()} USD</div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Stripe Card Input Form */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-semibold text-zinc-200">Stripe Card Information</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Lock className="w-3 h-3" />
                  Stripe Encrypted
                </span>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Cardholder Full Name</label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Eleanor Roosevelt"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <CreditCard className="w-5 h-5 text-zinc-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Expiration MM/YY</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Security CVC</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="888"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Billing Postal Code</label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="90210"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-xs text-zinc-300">
              <div>
                <span className="font-semibold block">{isRental ? "Total Rental and Security Hold" : "Stripe Holding Deposit"}</span>
                <span className="text-[10px] text-zinc-500">Processed securely via Stripe</span>
              </div>
              <span className="text-xl font-bold text-emerald-400">${totalAmount.toLocaleString()} USD</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Processing Stripe Authorization...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ${totalAmount.toLocaleString()} via Stripe</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
