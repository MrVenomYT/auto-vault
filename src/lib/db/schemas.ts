import { ObjectId } from "mongodb"
import { StructuredVehicle, Manufacturer, VehicleGeneration } from "../types/vehicle"

export interface MongoVehicleDocument extends StructuredVehicle {
  _id?: ObjectId
}

export interface MongoManufacturerDocument extends Manufacturer {
  _id?: ObjectId
}

export interface MongoGenerationDocument extends VehicleGeneration {
  _id?: ObjectId
}

export interface MongoBookingDocument {
  _id?: ObjectId
  bookingId: string
  vehicleId: string
  vehicleFullName: string
  vehicleModelYear: number
  bookingType: "rental" | "purchase"
  customer: {
    fullName: string
    email?: string
    phone?: string
    billingZip: string
  }
  payment: {
    gateway: "stripe"
    stripePaymentIntentId: string
    amount: number
    currency: "USD"
    status: "authorized" | "captured" | "succeeded" | "refunded"
    cardLast4: string
    cardBrand: string
  }
  rentalDetails?: {
    days: number
    dailyRate: number
    startDate: string
    endDate: string
  }
  status: "confirmed" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
}

export interface MongoAnalyticsSnapshot {
  _id?: ObjectId
  timestamp: string
  totalFleetCount: number
  totalFleetValuation: number
  activeRentalsCount: number
  totalRevenueUSD: number
  stripeTransactionsCount: number
  eraDistribution: Record<string, number>
}
