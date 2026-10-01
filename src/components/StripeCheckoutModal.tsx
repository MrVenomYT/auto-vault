"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Lock, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react"
import { CarVehicle } from "@/lib/cars"

interface StripeCheckoutModalProps {
  vehicle: CarVehicle | null
  onClose: () => void
}

export default function StripeCheckoutModal({ vehicle, onClose }: StripeCheckoutModalProps) {
  const [selectedTrim, setSelectedTrim] = useState<number>(0)
  const [selectedColor, setSelectedColor] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [zipCode, setZipCode] = useState("")

  if (!vehicle) return null

  const trim = vehicle.availableTrims[selectedTrim] || vehicle.availableTrims[0]
  const color = vehicle.colorOptions[selectedColor] || vehicle.colorOptions[0]
  const depositAmount = 5000
  const totalPrice = trim.price

  const handleStripeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate Stripe payment intent confirmation
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stripe Payment Completed
              </h3>
              <p className="text-zinc-300 text-sm max-w-md mx-auto">
                Your reservation deposit for the {vehicle.year} {vehicle.make} {vehicle.model} has been processed via Stripe.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-left space-y-2 text-sm max-w-md mx-auto">
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Confirmation ID</span>
                <span className="font-mono text-zinc-200">STRIPE_REC_{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Selected Trim</span>
                <span className="text-zinc-200">{trim.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Exterior Color</span>
                <span className="text-zinc-200">{color.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Deposit Processed</span>
                <span className="font-bold text-emerald-400">${depositAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-xs">
                <span>Remaining Balance</span>
                <span className="text-zinc-200">${(totalPrice - depositAmount).toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleStripeSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Stripe Payment Gateway</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Reserve {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Direct card reservation processed securely via Stripe.
              </p>
            </div>

            {/* Vehicle Preview Card */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-40 h-24 flex-shrink-0">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {vehicle.category}
                </div>
                <div className="text-lg font-bold text-white">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </div>
                <div className="text-xs text-zinc-400">
                  Total Vehicle Price: <span className="text-white font-semibold">${totalPrice.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            {/* Trims Selector */}
            {vehicle.availableTrims.length > 1 && (
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Select Model Trim
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.availableTrims.map((t, idx) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setSelectedTrim(idx)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
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
            )}

            {/* Color Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Exterior Color Selection: <span className="text-white normal-case">{color.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {vehicle.colorOptions.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === idx ? "border-white scale-110 shadow-lg" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Stripe Card Fields */}
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
                  placeholder="Alexander Vance"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
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
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
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
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
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
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
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
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between text-xs text-zinc-300">
              <span>Holding Deposit Charged Now</span>
              <span className="text-base font-bold text-emerald-400">${depositAmount.toLocaleString()} USD</span>
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
                  <span>Pay ${depositAmount.toLocaleString()} with Stripe</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
