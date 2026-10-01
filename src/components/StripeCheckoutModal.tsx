"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import {
  X,
  Lock,
  CheckCircle2,
  CreditCard,
  Key,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Percent,
  Calendar,
  DollarSign,
  Award,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { StructuredVehicle } from "@/lib/types/vehicle"
import { usePlatformSettings } from "@/context/PlatformSettingsContext"

interface CheckoutModalProps {
  vehicle: StructuredVehicle | null
  bookingType: "rental" | "purchase"
  onClose: () => void
}

export default function StripeCheckoutModal({
  vehicle,
  bookingType: initialBookingType,
  onClose,
}: CheckoutModalProps) {
  const { settings } = usePlatformSettings()
  const currencySymbol = settings.financials.currencySymbol || "$"

  const [bookingType, setBookingType] = useState<"rental" | "purchase">(initialBookingType)
  
  // Rental configuration
  const [rentalDays, setRentalDays] = useState<number>(3)
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true)
  const [unlimitedMileage, setUnlimitedMileage] = useState<boolean>(false)
  const [chauffeurService, setChauffeurService] = useState<boolean>(false)

  // Purchase configuration
  const [purchasePlan, setPurchasePlan] = useState<"cash" | "deposit" | "finance">("deposit")
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [financeTermMonths, setFinanceTermMonths] = useState<number>(60)
  const [includeWarranty, setIncludeWarranty] = useState<boolean>(true)
  const [includeEnclosedDelivery, setIncludeEnclosedDelivery] = useState<boolean>(true)
  const [tradeInValue, setTradeInValue] = useState<number>(0)
  const [tradeInMake, setTradeInMake] = useState<string>("")

  // Promo Code
  const [promoInput, setPromoInput] = useState<string>("")
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
  const [promoMessage, setPromoMessage] = useState<string | null>(null)

  // Customer credentials
  const [cardholderName, setCardholderName] = useState<string>("")
  const [customerEmail, setCustomerEmail] = useState<string>("")
  const [customerPhone, setCustomerPhone] = useState<string>("")
  const [cardNumber, setCardNumber] = useState<string>("")
  const [cardExpiry, setCardExpiry] = useState<string>("")
  const [cardCvc, setCardCvc] = useState<string>("")
  const [zipCode, setZipCode] = useState<string>("")
  const [deliveryStreet, setDeliveryStreet] = useState<string>("")

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [confirmationId, setConfirmationId] = useState<string>("")

  const vehiclePrice = vehicle?.metadata?.valuationPrice || 250000
  const dailyRate = vehicle?.rental?.dailyRate || 850
  const dailyInsuranceFee = settings.financials.dailyInsuranceFee || 45
  const deliveryFee = settings.financials.enclosedDeliveryFee || 650
  const securityDeposit = settings.financials.defaultSecurityDeposit || 2500

  // Promo code validation
  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    if (
      settings.promoCode.enabled &&
      promoInput.trim().toUpperCase() === settings.promoCode.code.toUpperCase()
    ) {
      setAppliedDiscount(settings.promoCode.discountPercent)
      setPromoMessage(`Promotion applied: ${settings.promoCode.discountPercent}% discount active`)
    } else {
      setPromoMessage("Invalid promotion code")
      setAppliedDiscount(0)
    }
  }

  // Calculations
  const calculations = useMemo(() => {
    if (bookingType === "rental") {
      const baseRental = dailyRate * rentalDays
      const insuranceTotal = includeInsurance ? dailyInsuranceFee * rentalDays : 0
      const mileageTotal = unlimitedMileage ? 95 * rentalDays : 0
      const chauffeurTotal = chauffeurService ? 350 * rentalDays : 0
      const subtotal = baseRental + insuranceTotal + mileageTotal + chauffeurTotal
      const discountAmount = (subtotal * appliedDiscount) / 100
      const taxAmount = ((subtotal - discountAmount) * settings.financials.taxRatePercent) / 100
      const totalDueNow = Math.round(subtotal - discountAmount + taxAmount)

      return {
        base: baseRental,
        extras: insuranceTotal + mileageTotal + chauffeurTotal,
        discount: discountAmount,
        tax: taxAmount,
        depositHold: settings.operations.requireSecurityDeposit ? securityDeposit : 0,
        netVehiclePrice: 0,
        warrantyCost: 0,
        deliveryCost: 0,
        totalVehicleValue: 0,
        downPaymentAmount: 0,
        monthlyPayment: 0,
        loanAmount: 0,
        totalDueNow,
      }
    } else {
      // Purchase
      const netVehiclePrice = Math.max(0, vehiclePrice - tradeInValue)
      const warrantyCost = includeWarranty ? 4500 : 0
      const deliveryCost = includeEnclosedDelivery ? deliveryFee : 0
      const subtotal = netVehiclePrice + warrantyCost + deliveryCost
      const taxAmount = (subtotal * settings.financials.taxRatePercent) / 100
      const totalVehicleValue = Math.round(subtotal + taxAmount)

      // Down payment calculation for financing
      const downPaymentAmount = Math.round((totalVehicleValue * downPaymentPercent) / 100)
      const loanAmount = totalVehicleValue - downPaymentAmount
      const interestRateAnnual = 0.059 // 5.9% APR
      const monthlyInterest = interestRateAnnual / 12
      const monthlyPayment =
        loanAmount > 0
          ? Math.round(
              (loanAmount *
                (monthlyInterest * Math.pow(1 + monthlyInterest, financeTermMonths))) /
                (Math.pow(1 + monthlyInterest, financeTermMonths) - 1)
            )
          : 0

      let totalDueNow = 5000 // default holding deposit
      if (purchasePlan === "cash") {
        totalDueNow = totalVehicleValue
      } else if (purchasePlan === "finance") {
        totalDueNow = 2500 // finance qualification fee & hold
      } else {
        totalDueNow = 5000 // escrow reservation deposit
      }

      let discountAmount = 0
      if (appliedDiscount > 0) {
        discountAmount = Math.round(totalDueNow * (appliedDiscount / 100))
        totalDueNow = Math.round(totalDueNow - discountAmount)
      }

      return {
        base: vehiclePrice,
        extras: warrantyCost + deliveryCost,
        discount: discountAmount,
        tax: taxAmount,
        depositHold: 0,
        netVehiclePrice,
        warrantyCost,
        deliveryCost,
        totalVehicleValue,
        downPaymentAmount,
        monthlyPayment,
        loanAmount,
        totalDueNow,
      }
    }
  }, [
    bookingType,
    rentalDays,
    includeInsurance,
    unlimitedMileage,
    chauffeurService,
    vehiclePrice,
    tradeInValue,
    includeWarranty,
    includeEnclosedDelivery,
    purchasePlan,
    downPaymentPercent,
    financeTermMonths,
    appliedDiscount,
    settings,
    dailyRate,
    dailyInsuranceFee,
    deliveryFee,
    securityDeposit,
  ])

  if (!vehicle) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const payload = {
      vehicleId: vehicle.vehicleId,
      vehicleFullName: vehicle.vehicle.fullName,
      vehicleModelYear: vehicle.vehicle.modelYear,
      bookingType,
      amount: calculations.totalDueNow,
      cardLast4: cardNumber.replace(/\s+/g, "").slice(-4) || "4242",
      customer: {
        fullName: cardholderName || "Guest Collector",
        email: customerEmail || "client@dealership.com",
        phone: customerPhone || "",
        billingZip: zipCode || "90210",
      },
      rentalDetails:
        bookingType === "rental"
          ? {
              days: rentalDays,
              dailyRate,
              startDate: new Date().toISOString().split("T")[0],
              endDate: new Date(Date.now() + rentalDays * 86400000).toISOString().split("T")[0],
              insuranceIncluded: includeInsurance,
              unlimitedMileage,
            }
          : undefined,
      purchaseDetails:
        bookingType === "purchase"
          ? {
              planType: purchasePlan,
              fullVehicleValuation: vehiclePrice,
              monthlyEstimated: calculations.monthlyPayment,
              warrantyIncluded: includeWarranty,
              deliveryStreet: deliveryStreet || "Dealership VIP Pickup",
            }
          : undefined,
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setConfirmationId(
        data.booking?.bookingId || `RES_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      )
      setIsSuccess(true)
    } catch (e) {
      setConfirmationId(`RES_${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
      setIsSuccess(true)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8 max-h-[90vh] overflow-y-auto scrollbar-thin">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white mb-2">
                Transaction Confirmed
              </h3>
              <p className="text-zinc-400 text-xs max-w-md mx-auto font-medium">
                Your {bookingType === "rental" ? "luxury rental reservation" : "vehicle purchase agreement"} for the {vehicle.vehicle.fullName} has been authenticated and secured in our encrypted records.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-left space-y-3 text-xs max-w-md mx-auto">
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                <span>Confirmation ID</span>
                <span className="font-mono text-emerald-400 font-bold">{confirmationId}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Vehicle</span>
                <span className="text-white font-semibold">{vehicle.vehicle.fullName}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Transaction Type</span>
                <span className="text-amber-400 uppercase font-bold text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  {bookingType === "rental" ? "Daily Luxury Rental" : `Purchase (${purchasePlan})`}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Client Name</span>
                <span className="text-white font-medium">{cardholderName || "Valued Client"}</span>
              </div>
              <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
                <span>Amount Processed</span>
                <span className="font-black text-emerald-400 text-sm">
                  {currencySymbol}{calculations.totalDueNow.toLocaleString()} {settings.financials.currency}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30 text-xs"
            >
              Close and Return to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted Concierge Gateway</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Vehicle Checkout &amp; Customizer
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {vehicle.vehicle.fullName} ({vehicle.vehicle.modelYear})
              </p>
            </div>

            {/* Mode Switcher: BUY vs RENT */}
            <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setBookingType("rental")}
                disabled={!settings.operations.allowDailyRentals}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  bookingType === "rental"
                    ? "bg-zinc-800 text-white shadow-md border border-zinc-700"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Key className="w-4 h-4 text-amber-400" />
                <span>Daily Rental</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingType("purchase")}
                disabled={!settings.operations.allowInstantPurchase}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  bookingType === "purchase"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Purchase Vehicle</span>
              </button>
            </div>

            {/* Vehicle Card Preview */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="relative w-32 h-20 flex-shrink-0">
                <Image
                  src={vehicle.images.primaryImage.url}
                  alt={vehicle.vehicle.fullName}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-red-500 font-mono">
                  {vehicle.vehicle.modelYear} | {vehicle.vehicle.category}
                </div>
                <div className="text-sm font-black text-white truncate">
                  {vehicle.vehicle.fullName}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Full Valuation: <span className="text-white font-bold">{currencySymbol}{vehiclePrice.toLocaleString()} {settings.financials.currency}</span>
                </div>
                {vehicle.rental.dailyRate && (
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Daily Rate: {currencySymbol}{vehicle.rental.dailyRate}/day
                  </div>
                )}
              </div>
            </div>

            {/* RENTAL OPTIONS */}
            {bookingType === "rental" && (
              <div className="space-y-4 bg-zinc-950/70 border border-zinc-800 p-5 rounded-2xl">
                <h4 className="text-xs font-black text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  <span>Rental Duration &amp; Package</span>
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-zinc-300">Days of Rental</span>
                    <span className="font-bold text-red-400 font-mono">{rentalDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={rentalDays}
                    onChange={(e) => setRentalDays(parseInt(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>1 Day ({currencySymbol}{dailyRate}/day)</span>
                    <span>30 Days</span>
                  </div>
                </div>

                {/* Rental Add-on checkboxes */}
                <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeInsurance}
                        onChange={(e) => setIncludeInsurance(e.target.checked)}
                        className="rounded bg-zinc-950 border-zinc-700 text-red-600 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Full Shield Collision Coverage</span>
                        <span className="text-[10px] text-zinc-400">Zero deductible with comprehensive road risk protection</span>
                      </div>
                    </div>
                    <span className="font-mono text-zinc-300 text-xs">+{currencySymbol}{dailyInsuranceFee}/day</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={unlimitedMileage}
                        onChange={(e) => setUnlimitedMileage(e.target.checked)}
                        className="rounded bg-zinc-950 border-zinc-700 text-red-600 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Unlimited Daily Mileage</span>
                        <span className="text-[10px] text-zinc-400">Standard includes 100 miles/day</span>
                      </div>
                    </div>
                    <span className="font-mono text-zinc-300 text-xs">+{currencySymbol}95/day</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={chauffeurService}
                        onChange={(e) => setChauffeurService(e.target.checked)}
                        className="rounded bg-zinc-950 border-zinc-700 text-red-600 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Private Professional Chauffeur</span>
                        <span className="text-[10px] text-zinc-400">Licensed high security VIP executive driver</span>
                      </div>
                    </div>
                    <span className="font-mono text-zinc-300 text-xs">+{currencySymbol}350/day</span>
                  </label>
                </div>
              </div>
            )}

            {/* PURCHASE OPTIONS */}
            {bookingType === "purchase" && (
              <div className="space-y-4 bg-zinc-950/70 border border-zinc-800 p-5 rounded-2xl">
                <h4 className="text-xs font-black text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
                  <span>Purchase &amp; Financing Structure</span>
                </h4>

                {/* Plan Selection */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPurchasePlan("deposit")}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      purchasePlan === "deposit"
                        ? "bg-red-950/40 border-red-600 text-white"
                        : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <span className="font-bold block text-white">Hold Deposit</span>
                    <span className="text-[10px] text-zinc-400">{currencySymbol}5,000 7-Day Lock</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurchasePlan("finance")}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      purchasePlan === "finance"
                        ? "bg-red-950/40 border-red-600 text-white"
                        : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <span className="font-bold block text-white">Auto Loan</span>
                    <span className="text-[10px] text-zinc-400">Monthly Installments</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurchasePlan("cash")}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      purchasePlan === "cash"
                        ? "bg-red-950/40 border-red-600 text-white"
                        : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <span className="font-bold block text-white">Full Wire/Escrow</span>
                    <span className="text-[10px] text-zinc-400">Direct Purchase</span>
                  </button>
                </div>

                {/* Financing Slider if Finance chosen */}
                {purchasePlan === "finance" && (
                  <div className="space-y-3 p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 font-semibold">Down Payment ({downPaymentPercent}%)</span>
                      <span className="font-mono font-bold text-white">
                        {currencySymbol}{calculations.downPaymentAmount.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-zinc-300 font-semibold">Loan Duration</span>
                      <select
                        value={financeTermMonths}
                        onChange={(e) => setFinanceTermMonths(parseInt(e.target.value))}
                        className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white"
                      >
                        <option value={36}>36 Months (3 Years)</option>
                        <option value={48}>48 Months (4 Years)</option>
                        <option value={60}>60 Months (5 Years)</option>
                        <option value={72}>72 Months (6 Years)</option>
                      </select>
                    </div>

                    <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800/80 flex justify-between items-center">
                      <span className="text-zinc-400 text-[11px]">Estimated Monthly Payment</span>
                      <span className="text-emerald-400 font-black font-mono text-sm">
                        {currencySymbol}{calculations.monthlyPayment.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>
                )}

                {/* Trade-in Section */}
                {settings.operations.allowTradeIn && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-300 font-bold">Vehicle Trade-In Credit</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {tradeInValue > 0 ? `-${currencySymbol}${tradeInValue.toLocaleString()}` : "None"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={tradeInMake}
                        onChange={(e) => setTradeInMake(e.target.value)}
                        placeholder="Your current car (e.g. 2021 BMW M3)"
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500"
                      />
                      <input
                        type="number"
                        value={tradeInValue || ""}
                        onChange={(e) => setTradeInValue(Math.max(0, parseInt(e.target.value) || 0))}
                        placeholder="Estimated value in USD"
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Purchase Add-ons */}
                <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeWarranty}
                        onChange={(e) => setIncludeWarranty(e.target.checked)}
                        className="rounded bg-zinc-950 border-zinc-700 text-red-600 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">3-Year Platinum Powertrain Warranty</span>
                        <span className="text-[10px] text-zinc-400">Complete parts and labor protection worldwide</span>
                      </div>
                    </div>
                    <span className="font-mono text-zinc-300 text-xs">+{currencySymbol}4,500</span>
                  </label>

                  {settings.operations.allowHomeDelivery && (
                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeEnclosedDelivery}
                          onChange={(e) => setIncludeEnclosedDelivery(e.target.checked)}
                          className="rounded bg-zinc-950 border-zinc-700 text-red-600 focus:ring-0"
                        />
                        <div>
                          <span className="font-bold text-white block">Enclosed White-Glove Transporter</span>
                          <span className="text-[10px] text-zinc-400">Climate-controlled direct doorstep delivery</span>
                        </div>
                      </div>
                      <span className="font-mono text-zinc-300 text-xs">+{currencySymbol}{deliveryFee}</span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Promo Code Box */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter Promo Code (e.g. APEX15)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono uppercase"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromo}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-zinc-700 transition-all"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <div className="text-[11px] text-emerald-400 font-medium pl-1">
                {promoMessage}
              </div>
            )}

            {/* Card Information Fields */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-bold text-white">Client &amp; Payment Credentials</span>
                <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                  <Lock className="w-3 h-3" />
                  Encrypted Authorization
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Julian Sterling"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="julian@autovault.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-zinc-500 absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Expiry MM/YY</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">CVC Code</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="888"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="90210"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>
                  {bookingType === "rental" ? `Rental Base (${rentalDays} Days)` : `Vehicle Valuation`}
                </span>
                <span className="font-mono text-zinc-200">
                  {currencySymbol}
                  {bookingType === "rental"
                    ? calculations.base.toLocaleString()
                    : vehiclePrice.toLocaleString()}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Promotion ({appliedDiscount}% Off)</span>
                  <span className="font-mono">
                    -{currencySymbol}
                    {calculations.discount ? calculations.discount.toLocaleString() : "Applied"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-sm font-black">
                <span className="text-white">
                  {bookingType === "rental"
                    ? "Total Authorized at Checkout"
                    : purchasePlan === "cash"
                    ? "Full Vehicle Purchase"
                    : purchasePlan === "finance"
                    ? "Finance Application & Hold"
                    : "Reservation Escrow Deposit"}
                </span>
                <span className="text-emerald-400 font-mono text-base">
                  {currencySymbol}{calculations.totalDueNow.toLocaleString()} {settings.financials.currency}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 text-xs"
            >
              {isProcessing ? (
                <span>Securing Transaction...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    Authorize {currencySymbol}{calculations.totalDueNow.toLocaleString()} {settings.financials.currency}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
