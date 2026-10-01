export interface PlatformSettings {
  dealershipName: string
  tagline: string
  heroHeadline: string
  heroSubheadline: string
  announcementBanner: {
    enabled: boolean
    text: string
    badgeText: string
  }
  promoCode: {
    code: string
    discountPercent: number
    enabled: boolean
  }
  operations: {
    allowInstantPurchase: boolean
    allowDailyRentals: boolean
    allowTestDrives: boolean
    allowTradeIn: boolean
    allowHomeDelivery: boolean
    requireSecurityDeposit: boolean
  }
  financials: {
    currency: "USD" | "EUR" | "GBP" | "AED"
    currencySymbol: string
    taxRatePercent: number
    defaultSecurityDeposit: number
    dailyInsuranceFee: number
    enclosedDeliveryFee: number
  }
  featuredVehicleIds: string[]
  liveTelemetryTicker: boolean
  updatedAt: string
}

export const DEFAULT_SETTINGS: PlatformSettings = {
  dealershipName: "AutoVault Apex",
  tagline: "Premier Automotive Sales and Daily Rentals",
  heroHeadline: "Automotive Heritage and Modern Supercars",
  heroSubheadline: "Explore 146 years of automotive engineering from historic pioneers to modern hypercars. Verified authentic vehicles with backgroundless presentation, certified mechanical inspection, and secure reservation.",
  announcementBanner: {
    enabled: true,
    text: "Autumn Supercar Concours: Enter code APEX15 for 15% off all weekend rentals and purchase hold deposits",
    badgeText: "VIP PROMOTION"
  },
  promoCode: {
    code: "APEX15",
    discountPercent: 15,
    enabled: true
  },
  operations: {
    allowInstantPurchase: true,
    allowDailyRentals: true,
    allowTestDrives: true,
    allowTradeIn: true,
    allowHomeDelivery: true,
    requireSecurityDeposit: true
  },
  financials: {
    currency: "USD",
    currencySymbol: "$",
    taxRatePercent: 6.5,
    defaultSecurityDeposit: 2500,
    dailyInsuranceFee: 45,
    enclosedDeliveryFee: 650
  },
  featuredVehicleIds: [
    "veh_porsche_911_carrera_s_2024",
    "veh_ferrari_f8_2024",
    "veh_bugatti_chiron_2016",
    "veh_mercedes_300sl_1954"
  ],
  liveTelemetryTicker: true,
  updatedAt: new Date().toISOString()
}
