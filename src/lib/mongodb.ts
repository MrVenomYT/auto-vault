import { MongoClient, Db } from "mongodb"
import { VEHICLES_DB } from "./db/vehicles"
import { MANUFACTURERS_DB } from "./db/manufacturers"
import { GENERATIONS_DB } from "./db/generations"

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

// In-memory persistent cache for serverless environments or when MongoDB URI is pending
let inMemoryVehicles = [...VEHICLES_DB]
let inMemoryManufacturers = [...MANUFACTURERS_DB]
let inMemoryGenerations = [...GENERATIONS_DB]
let inMemoryBookings: any[] = [
  {
    bookingId: "STRIPE_BK_7492A",
    vehicleId: "veh_porsche_911_carrera_s_2024",
    vehicleFullName: "Porsche 911 Carrera S",
    vehicleModelYear: 2024,
    bookingType: "rental",
    customer: {
      fullName: "Julian Sterling",
      email: "julian.sterling@autovault.com",
      billingZip: "90210"
    },
    payment: {
      gateway: "stripe",
      stripePaymentIntentId: "pi_3MtwBwLkdIwHu7ix28a3tqZf",
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
      endDate: "2026-10-05"
    },
    status: "confirmed",
    createdAt: "2026-10-01T10:30:00Z",
    updatedAt: "2026-10-01T10:30:00Z"
  },
  {
    bookingId: "STRIPE_BK_8819C",
    vehicleId: "veh_mercedes_300sl_1954",
    vehicleFullName: "Mercedes Benz 300 SL Gullwing Coupe",
    vehicleModelYear: 1954,
    bookingType: "purchase",
    customer: {
      fullName: "Victoria Windsor",
      email: "victoria.windsor@heritage.org",
      billingZip: "10021"
    },
    payment: {
      gateway: "stripe",
      stripePaymentIntentId: "pi_3LqvPwLkdIwHu7ix11b4kqAe",
      amount: 8000,
      currency: "USD",
      status: "authorized",
      cardLast4: "8888",
      cardBrand: "Mastercard"
    },
    status: "confirmed",
    createdAt: "2026-09-30T14:15:00Z",
    updatedAt: "2026-09-30T14:15:00Z"
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

export async function getAllVehicles() {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("vehicles")
      const count = await collection.countDocuments()
      if (count === 0) {
        // Seed initial 1880 to 2026 collection
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

export async function getAllManufacturers() {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("manufacturers")
      const count = await collection.countDocuments()
      if (count === 0) {
        await collection.insertMany(MANUFACTURERS_DB as any)
      }
      return await collection.find({}).toArray()
    } catch (e) {
      return inMemoryManufacturers
    }
  }
  return inMemoryManufacturers
}

export async function getAllGenerations() {
  const db = await getDatabase()
  if (db) {
    try {
      const collection = db.collection("generations")
      const count = await collection.countDocuments()
      if (count === 0) {
        await collection.insertMany(GENERATIONS_DB as any)
      }
      return await collection.find({}).toArray()
    } catch (e) {
      return inMemoryGenerations
    }
  }
  return inMemoryGenerations
}
