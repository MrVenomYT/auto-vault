"use client"

import { useState } from "react"
import Link from "next/link"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"
import {
  DollarSign,
  Percent,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck,
  Award
} from "lucide-react"

export default function FinancingPage() {
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"

  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState<number>(185000)
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(37000)
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60)
  const [interestRate, setInterestRate] = useState<number>(5.9)
  const [tradeInValue, setTradeInValue] = useState<number>(0)

  // Application form state
  const [applicantName, setApplicantName] = useState<string>("")
  const [applicantEmail, setApplicantEmail] = useState<string>("")
  const [applicantPhone, setApplicantPhone] = useState<string>("")
  const [applicantIncome, setApplicantIncome] = useState<string>("")
  const [selectedVehicleInterest, setSelectedVehicleInterest] = useState<string>("Porsche 911 Carrera S")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Monthly payment computation
  const netLoanAmount = Math.max(0, vehiclePrice - downPaymentAmount - tradeInValue)
  const monthlyRate = interestRate / 100 / 12
  const estimatedMonthly =
    netLoanAmount > 0
      ? Math.round(
          (netLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
            (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
        )
      : 0

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          vehicleInterest: selectedVehicleInterest,
          message: `Financing Application: Loan amount ${currencySymbol}${netLoanAmount.toLocaleString()} over ${loanTermMonths} months. Annual income: ${applicantIncome}.`,
          type: "finance_application",
        }),
      })
      setIsSubmitted(true)
    } catch (e) {
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Competitive Luxury Auto Lending</span>
            <span className="text-zinc-500">|</span>
            <span className="text-emerald-400 font-bold">5.9% Starting Fixed APR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Automotive Financing &amp; Lease Solutions
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Tailored bespoke financial structures for collectors, private buyers, and corporate entities. Calculate monthly payment obligations and submit for instant pre qualification.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Interactive Payment Estimator */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div>
            <h2 className="text-2xl font-black text-white">Live Loan Payment Estimator</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Adjust vehicle valuation, down payment, loan duration, and trade in allowance in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sliders & Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-300">Vehicle Purchase Valuation</span>
                  <span className="font-mono font-black text-white text-base">
                    {currencySymbol}{vehiclePrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={2500000}
                  step={5000}
                  value={vehiclePrice}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    setVehiclePrice(val)
                    setDownPaymentAmount(Math.round(val * 0.2))
                  }}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{currencySymbol}30,000</span>
                  <span>{currencySymbol}2,500,000+</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-300">Down Payment Amount</span>
                  <span className="font-mono font-black text-emerald-400 text-base">
                    {currencySymbol}{downPaymentAmount.toLocaleString()} ({Math.round((downPaymentAmount / vehiclePrice) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={vehiclePrice * 0.7}
                  step={1000}
                  value={downPaymentAmount}
                  onChange={(e) => setDownPaymentAmount(parseInt(e.target.value) || 0)}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 space-y-2">
                  <label className="block text-xs font-bold text-zinc-300">Loan Duration</label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(parseInt(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  >
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                    <option value={72}>72 Months (6 Years)</option>
                    <option value={84}>84 Months (7 Years)</option>
                  </select>
                </div>

                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 space-y-2">
                  <label className="block text-xs font-bold text-zinc-300">Trade In Allowance</label>
                  <input
                    type="number"
                    value={tradeInValue || ""}
                    onChange={(e) => setTradeInValue(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Value in USD"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Output Summary Box */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Calculated Monthly Payment</span>
                <div className="text-4xl font-black text-emerald-400 font-mono mt-1">
                  {currencySymbol}{estimatedMonthly.toLocaleString()}/mo
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Fixed APR: <span className="text-white font-bold">{interestRate}%</span> over {loanTermMonths} Months
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-850">
                <div className="flex justify-between">
                  <span>Financed Principal</span>
                  <span className="font-mono text-white">{currencySymbol}{netLoanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment Equity</span>
                  <span className="font-mono text-emerald-400">{currencySymbol}{downPaymentAmount.toLocaleString()}</span>
                </div>
                {tradeInValue > 0 && (
                  <div className="flex justify-between">
                    <span>Trade In Credit</span>
                    <span className="font-mono text-emerald-400">Less {currencySymbol}{tradeInValue.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 space-y-1 text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Pre Approval Guarantee
                </span>
                <p className="text-[11px] text-zinc-400">
                  Pre qualification does not impact your credit score and locks your interest rate for 45 calendar days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white">Online Pre Approval Application</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Submit your financing request directly to our executive underwriting desk.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 bg-zinc-950 rounded-2xl border border-emerald-900/60 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-black text-white">Application Received</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Thank you, {applicantName}. Our luxury vehicle financing specialist will contact you within 2 business hours with your formal loan package.
              </p>
              <Link
                href="/inventory"
                className="inline-block mt-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
              >
                Return to Showroom
              </Link>
            </div>
          ) : (
            <form onSubmit={handleApply} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Julian Sterling"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="julian@autovault.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+1 555 234 5678"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Estimated Annual Income</label>
                <input
                  type="text"
                  required
                  value={applicantIncome}
                  onChange={(e) => setApplicantIncome(e.target.value)}
                  placeholder="$250,000+"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Vehicle of Primary Interest</label>
                <input
                  type="text"
                  required
                  value={selectedVehicleInterest}
                  onChange={(e) => setSelectedVehicleInterest(e.target.value)}
                  placeholder="e.g. 2024 Porsche 911 Carrera S"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="sm:col-span-2 pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 px-8 rounded-2xl text-xs transition-all shadow-lg shadow-red-600/30"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Pre Approval Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
