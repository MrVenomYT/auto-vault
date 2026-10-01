export interface Car {
  id: string
  name: string
  make: string
  model: string
  year: number
  price: number
  rentalRate: number
  category: "Supercar" | "Hypercar" | "Luxury" | "Classic" | "Electric" | "Vintage"
  image: string
  horsepower: number
  topSpeed: number
  acceleration: number
  description: string
  features: string[]
  specs: {
    engine: string
    transmission: string
    drivetrain: string
    fuelType: string
    seating: number
  }
}

export const FEATURED_CARS: Car[] = [
  {
    id: "porsche-911-2024",
    name: "Porsche 911 Carrera S",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2024,
    price: 131300,
    rentalRate: 850,
    category: "Supercar",
    image: "/images/cars/porsche_911_real.png",
    horsepower: 443,
    topSpeed: 191,
    acceleration: 3.5,
    description: "The quintessential German rear engine sports coupe engineered for pinnacle handling precision.",
    features: ["Porsche Active Suspension Management", "Sport Chrono Package", "PDK 8 Speed Transmission"],
    specs: {
      engine: "3.0L Twin Turbo Flat 6",
      transmission: "8 Speed Dual Clutch PDK",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seating: 4,
    },
  },
  {
    id: "ferrari-f8-2024",
    name: "Ferrari F8 Tributo",
    make: "Ferrari",
    model: "F8 Tributo",
    year: 2024,
    price: 280000,
    rentalRate: 1800,
    category: "Supercar",
    image: "/images/cars/ferrari_f8_real.png",
    horsepower: 710,
    topSpeed: 211,
    acceleration: 2.9,
    description: "Italian aerodynamic berlinetta powered by the most celebrated twin turbocharged V8 in Maranello history.",
    features: ["Side Slip Angle Control 6.1", "Ferrari Dynamic Enhancer Plus", "Carbon Ceramic Brakes"],
    specs: {
      engine: "3.9L Twin Turbo V8",
      transmission: "7 Speed F1 Dual Clutch",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seating: 2,
    },
  },
  {
    id: "bugatti-chiron-2016",
    name: "Bugatti Chiron",
    make: "Bugatti",
    model: "Chiron W16",
    year: 2016,
    price: 3200000,
    rentalRate: 6000,
    category: "Hypercar",
    image: "/images/cars/bugatti_chiron_real.png",
    horsepower: 1479,
    topSpeed: 261,
    acceleration: 2.4,
    description: "Monolithic luxury and straight line hypercar speed powered by an 8.0 liter quad turbocharged W16.",
    features: ["Quad Turbocharged 64 Valve W16", "Active Aerodynamic Airbrake", "Full Carbon Monocoque"],
    specs: {
      engine: "8.0L Quad Turbo W16",
      transmission: "7 Speed Dual Clutch",
      drivetrain: "All Wheel Drive",
      fuelType: "Premium Gasoline",
      seating: 2,
    },
  },
  {
    id: "mercedes-300sl-1954",
    name: "Mercedes Benz 300 SL Gullwing",
    make: "Mercedes Benz",
    model: "300 SL",
    year: 1954,
    price: 1650000,
    rentalRate: 2800,
    category: "Classic",
    image: "/images/cars/mercedes_300sl_real.png",
    horsepower: 240,
    topSpeed: 161,
    acceleration: 7.4,
    description: "First production sports car with mechanical direct fuel injection and iconic upward opening gullwing doors.",
    features: ["Mechanical Bosch Direct Injection", "Tubular Spaceframe Chassis", "Iconic Gullwing Doors"],
    specs: {
      engine: "3.0L Inline 6 M198",
      transmission: "4 Speed Manual",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Gasoline",
      seating: 2,
    },
  },
  {
    id: "lamborghini-countach-1974",
    name: "Lamborghini Countach LP400",
    make: "Lamborghini",
    model: "Countach LP400",
    year: 1974,
    price: 1350000,
    rentalRate: 3200,
    category: "Supercar",
    image: "/images/cars/lamborghini_countach_real.png",
    horsepower: 375,
    topSpeed: 179,
    acceleration: 5.4,
    description: "Revolutionary wedge supercar concept by Marcello Gandini with scissor doors and roof periscope.",
    features: ["Periscopio Roof Channel", "Scissor Doors", "Longitudinal Mid Mounted V12"],
    specs: {
      engine: "3.9L Naturally Aspirated V12",
      transmission: "5 Speed Manual Transaxle",
      drivetrain: "Rear Mid Engine Rear Wheel Drive",
      fuelType: "Gasoline",
      seating: 2,
    },
  },
  {
    id: "tesla-model-s-2024",
    name: "Tesla Model S Plaid",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 89990,
    rentalRate: 550,
    category: "Electric",
    image: "/images/cars/tesla_model_s_real.png",
    horsepower: 1020,
    topSpeed: 200,
    acceleration: 1.99,
    description: "Tri motor pure electric performance sedan delivering sub two second zero to sixty acceleration.",
    features: ["Tri Motor Carbon Sleeved Rotors", "Torque Vectoring AWD", "100 kWh Battery Pack"],
    specs: {
      engine: "Tri Motor Electric AWD",
      transmission: "Single Speed Fixed Gear",
      drivetrain: "All Wheel Drive",
      fuelType: "Electric",
      seating: 5,
    },
  }
]
