export type VehicleStatus = "production" | "discontinued" | "concept" | "prototype" | "experimental" | "historic"

export type VehicleClassification = 
  | "production_vehicle"
  | "prototype_vehicle"
  | "concept_car"
  | "racing_vehicle"
  | "experimental_automobile"
  | "historical_one_off"

export type VehicleCategory =
  | "Economy"
  | "Sedan"
  | "Hatchback"
  | "SUV"
  | "Crossover"
  | "Coupe"
  | "Convertible"
  | "Sports Car"
  | "Supercar"
  | "Hypercar"
  | "Luxury"
  | "Classic"
  | "Vintage"
  | "Muscle Car"
  | "Pickup Truck"
  | "Van"
  | "MPV"
  | "Electric Vehicle"
  | "Hybrid Vehicle"
  | "Commercial Vehicle"
  | "Racing Car"
  | "Experimental Vehicle"

export type HistoricalEra =
  | "1880 to 1899 (Pioneering and Experimental)"
  | "1900 to 1919 (Early Production and Vintage)"
  | "1920 to 1939 (Classic and Pre War)"
  | "1940 to 1959 (Post War and Early Classic)"
  | "1960 to 1979 (Muscle Cars and Golden Age)"
  | "1980 to 1999 (Modern Classic and Supercars)"
  | "2000 to 2009 (Early Modern Era)"
  | "2010 to 2019 (Contemporary Era)"
  | "2020 to 2026 (Modern and Latest Generation)"

export interface Manufacturer {
  id: string
  name: string
  country: string
  foundedYear: number
  headquarters?: string
  logo?: string
}

export interface VehicleGeneration {
  id: string
  manufacturerId: string
  modelName: string
  generationName: string
  modelCode?: string
  startYear: number
  endYear: number | null
}

export interface VehicleImage {
  url: string
  format: "PNG"
  background: "transparent"
  verified: boolean
  source: string
  caption?: string
}

export interface VehicleRental {
  availableForRental: boolean
  dailyRate: number | null
  weeklyRate: number | null
  monthlyRate: number | null
  depositAmount: number
  currency: "USD"
}

export interface VehicleSpecifications {
  engineType: string
  engineCapacity: string | null
  horsepower: number | null
  torque?: string | null
  transmission: string
  drivetrain: string
  fuelType: string
  seatingCapacity: number
  doors: number
  topSpeed: string | null
  acceleration: string | null
  curbWeight?: string | null
}

export interface StructuredVehicle {
  vehicleId: string
  manufacturer: {
    name: string
    country: string
    foundedYear: number
  }
  vehicle: {
    name: string
    fullName: string
    modelCode: string | null
    generation: string
    category: VehicleCategory
    bodyType: string
    modelYear: number
    productionStartYear: number
    productionEndYear: number | null
    vehicleStatus: VehicleStatus
    vehicleClassification: VehicleClassification
    era: HistoricalEra
  }
  specifications: VehicleSpecifications
  images: {
    primaryImage: VehicleImage
    gallery: VehicleImage[]
  }
  rental: VehicleRental
  metadata: {
    description: string
    historicalSignificance: string
    officialSource: string
    valuationPrice: number
    availableTrims?: { name: string; price: number }[]
    colorOptions?: { name: string; hex: string }[]
    createdAt: string
    updatedAt: string
  }
}
