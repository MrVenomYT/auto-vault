import { MongoClient, Db } from "mongodb"
import { VEHICLES_DB } from "./db/vehicles"
import { MANUFACTURERS_DB } from "./db/manufacturers"
import { GENERATIONS_DB } from "./db/generations"
import { PlatformSettings, DEFAULT_SETTINGS } from "./types/settings"

const uri = process.env.MONGODB_URI || ""
const options = {}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (uri && uri.startsWith("mongodb")) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

// In-memory state
let inMemorySettings: PlatformSettings = { ...DEFAULT_SETTINGS }
let inMemoryVehicles = [...VEHICLES_DB]
let inMemoryManufacturers = [...MANUFACTURERS_DB]
let inMemoryGenerations = [...GENERATIONS_DB]
let inMemoryBookings: any[] = [
  {
    bookingId: "RES_BK_7492A",
    vehicleId: "veh_porsche_911_carrera_s_2024",
    vehicleFullName: "Porsche 911 Carrera S",
    vehicleModelYear: 2024,
    bookingType: "rental",
    customer: {
      fullName: "Julian Sterling",
      email: "julian.sterling@autovault.com",
      phone: "+1 555 234 8901",
      billingZip: "90210"
    },
    payment: {
      amount: 2550,
      currency: "USD",
      status: "succeeded",
      cardLast4: "4242",
      cardBrand: "Visa"
    },
    rentalDetails: {
      days: 3,
      dailyRate: 850,
      startDate: "2026-10-02",
      endDate: "2026-10-05",
      coverageOption: "Comprehensive Full Shield",
      deliveryOption: "White Glove Transporter"
    },
    status: "confirmed",
    createdAt: "2026-10-01T10:30:00Z",
    updatedAt: "2026-10-01T10:30:00Z"
  },
  {
    bookingId: "RES_BK_8819C",
    vehicleId: "veh_mercedes_300sl_1954",
    vehicleFullName: "Mercedes Benz 300 SL Gullwing Coupe",
    vehicleModelYear: 1954,
    bookingType: "purchase",
    customer: {
      fullName: "Victoria Windsor",
      email: "victoria.windsor@heritage.org",
      phone: "+1 555 987 6543",
      billingZip: "10021"
    },
    payment: {
      amount: 8000,
      currency: "USD",
      status: "authorized",
      cardLast4: "8888",
      cardBrand: "Mastercard"
    },
    purchaseDetails: {
      planType: "Escrow Deposit Hold",
      fullPrice: 1650000,
      depositAmount: 8000,
      warrantyPackage: "Platinum Collector 3 Year",
      deliveryAddress: "740 Park Avenue, New York, NY"
    },
    status: "confirmed",
    createdAt: "2026-09-30T14:15:00Z",
    updatedAt: "2026-09-30T14:15:00Z"
  },
  {
    bookingId: "RES_BK_9104F",
    vehicleId: "veh_ferrari_f8_2024",
    vehicleFullName: "Ferrari F8 Tributo",
    vehicleModelYear: 2024,
    bookingType: "test_drive",
    customer: {
      fullName: "Alexander Vance",
      email: "alexander.vance@velocity.com",
      phone: "+1 555 345 6789",
      billingZip: "33139"
    },
    payment: {
      amount: 250,
      currency: "USD",
      status: "succeeded",
      cardLast4: "1102",
      cardBrand: "American Express"
    },
    testDriveDetails: {
      preferredDate: "2026-10-06",
      preferredTime: "14:00",
      location: "Private Track Facility"
    },
    status: "pending_review",
    createdAt: "2026-10-01T11:45:00Z",
    updatedAt: "2026-10-01T11:45:00Z"
  }
]

let inMemoryInquiries: any[] = [
  {
    inquiryId: "INQ_3012",
    name: "Marcus Aurelius Bradley",
    email: "m.bradley@investmentgroup.com",
    phone: "+1 555 789 0123",
    vehicleInterest: "Bugatti Chiron 2016",
    message: "Requesting international enclosed air freight quote to Geneva, Switzerland.",
    status: "new",
    createdAt: "2026-10-01T09:15:00Z"
  }
]

export async function getDatabase(): Promise<Db | null> {
  if (!clientPromise) return null
  try {
    const mongoClient = await clientPromise
    return mongoClient.db("autovault")
  } catch (error) {
    return null
  }
}

// Platform settings handlers
export async function getPlatformSettings(): Promise<PlatformSettings> {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("settings")
      const doc = await collection.findOne({ key: "global_platform_config" })
      if (doc && doc.settings) {
        return doc.settings as PlatformSettings
      }
      // Insert default if not present
      await collection.updateOne(
        { key: "global_platform_config" },
        { $set: { key: "global_platform_config", settings: DEFAULT_SETTINGS } },
        { upsert: true }
      )
    } catch (e) {
      return inMemorySettings
    }
  }
  return inMemorySettings
}

export async function updatePlatformSettings(newSettings: Partial<PlatformSettings>): Promise<PlatformSettings> {
  inMemorySettings = {
    ...inMemorySettings,
    ...newSettings,
    updatedAt: new Date().toISOString()
  }
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("settings")
      await collection.updateOne(
        { key: "global_platform_config" },
        { $set: { key: "global_platform_config", settings: inMemorySettings } },
        { upsert: true }
      )
    } catch (e) {
      // Return memory fallback
    }
  }
  return inMemorySettings
}

// Vehicle database methods
export async function getAllVehicles() {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("vehicles")
      const count = await collection.countDocuments()
      if (count === 0) {
        await collection.insertMany(VEHICLES_DB as any)
      }
      return await collection.find({}).toArray()
    } catch (e) {
      return inMemoryVehicles
    }
  }
  return inMemoryVehicles
}

export async function insertVehicle(vehicle: any) {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("vehicles")
      await collection.insertOne(vehicle)
      return vehicle
    } catch (e) {
      inMemoryVehicles = [vehicle, ...inMemoryVehicles]
      return vehicle
    }
  }
  inMemoryVehicles = [vehicle, ...inMemoryVehicles]
  return vehicle
}

export async function updateVehicle(vehicleId: string, updates: any) {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("vehicles")
      await collection.updateOne({ vehicleId }, { $set: updates })
    } catch (e) {
      // Memory fallback
    }
  }
  inMemoryVehicles = inMemoryVehicles.map((v) => {
    if (v.vehicleId === vehicleId) {
      return { ...v, ...updates, metadata: { ...v.metadata, ...updates.metadata, updatedAt: new Date().toISOString() } }
    }
    return v
  })
  return inMemoryVehicles.find((v) => v.vehicleId === vehicleId) || null
}

export async function deleteVehicle(vehicleId: string) {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("vehicles")
      await collection.deleteOne({ vehicleId })
    } catch (e) {
      // Memory fallback
    }
  }
  inMemoryVehicles = inMemoryVehicles.filter((v) => v.vehicleId !== vehicleId)
  return { success: true, vehicleId }
}

// Bookings / Reservations
export async function getAllBookings() {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("bookings")
      return await collection.find({}).sort({ createdAt: -1 }).toArray()
    } catch (e) {
      return inMemoryBookings
    }
  }
  return inMemoryBookings
}

export async function insertBooking(booking: any) {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("bookings")
      await collection.insertOne(booking)
      return booking
    } catch (e) {
      inMemoryBookings = [booking, ...inMemoryBookings]
      return booking
    }
  }
  inMemoryBookings = [booking, ...inMemoryBookings]
  return booking
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("bookings")
      await collection.updateOne({ bookingId }, { $set: { status, updatedAt: new Date().toISOString() } })
    } catch (e) {
      // Memory fallback
    }
  }
  inMemoryBookings = inMemoryBookings.map((b) => (b.bookingId === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b))
  return inMemoryBookings.find((b) => b.bookingId === bookingId)
}

// Inquiries / Leads
export async function getAllInquiries() {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("inquiries")
      return await collection.find({}).sort({ createdAt: -1 }).toArray()
    } catch (e) {
      return inMemoryInquiries
    }
  }
  return inMemoryInquiries
}

export async function insertInquiry(inquiry: any) {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("inquiries")
      await collection.insertOne(inquiry)
      return inquiry
    } catch (e) {
      inMemoryInquiries = [inquiry, ...inMemoryInquiries]
      return inquiry
    }
  }
  inMemoryInquiries = [inquiry, ...inMemoryInquiries]
  return inquiry
}
