export interface CarVehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  era: "Pioneer (1880 to 1929)" | "Classic (1930 to 1959)" | "Golden Age (1960 to 1979)" | "Modern Classic (1980 to 1999)" | "Contemporary (2000 to 2019)" | "Modern Era (2020 to 2026)"
  category: "Sports Coupe" | "Supercar" | "Hypercar" | "Executive Sedan" | "Convertible Roadster" | "Vintage Classic" | "Muscle Car" | "Electric Performance"
  engine: string
  horsepower: number
  transmission: string
  acceleration: string
  topSpeed: string
  drivetrain: string
  curbWeight: string
  fuelType: string
  description: string
  features: string[]
  image: string
  availableTrims: { name: string; price: number }[]
  colorOptions: { name: string; hex: string }[]
}

export const CARS_DATA: CarVehicle[] = [
  // 1880 to 1929 (Pioneer Era)
  {
    id: "benz_patent_motorwagen_1886",
    make: "Mercedes Benz",
    model: "Patent Motorwagen Number 1",
    year: 1886,
    price: 350000,
    era: "Pioneer (1880 to 1929)",
    category: "Vintage Classic",
    engine: "0.95L Single Cylinder Four Stroke Engine",
    horsepower: 1,
    transmission: "Single Speed Belt Drive with Countershaft",
    acceleration: "25.0 sec 0 to 10 mph",
    topSpeed: "10 mph",
    drivetrain: "Rear Wheel Chain Drive",
    curbWeight: "584 lbs",
    fuelType: "Ligroin Petroleum Spirit",
    description: "The pioneering vehicle widely recognized as the world first internal combustion production automobile designed by Carl Benz.",
    features: [
      "Original Tubular Steel Chassis Design",
      "Wire Spoke Wheels with Solid Rubber Tires",
      "Tiller Steered Front Wheel Assembly",
      "Historic Certification Document by Carl Benz Archives"
    ],
    image: "https://pngimg.com/d/mercedes_benz_PNG101880.png",
    availableTrims: [
      { name: "Historical Exact Replica Specification", price: 350000 }
    ],
    colorOptions: [
      { name: "Historic Black and Varnished Wood", hex: "#1a1a1a" },
      { name: "Polished Brass Trim", hex: "#c5a059" }
    ]
  },
  {
    id: "ford_model_t_1908",
    make: "Ford",
    model: "Model T Touring",
    year: 1908,
    price: 45000,
    era: "Pioneer (1880 to 1929)",
    category: "Vintage Classic",
    engine: "2.9L Inline 4 Cylinder Engine",
    horsepower: 20,
    transmission: "2 Speed Planetary Transmission",
    acceleration: "18.0 sec 0 to 30 mph",
    topSpeed: "45 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "1200 lbs",
    fuelType: "Gasoline or Ethanol Flexible Fuel",
    description: "The historic automobile that put the world on wheels through innovative moving assembly line engineering and vanadium steel construction.",
    features: [
      "Vanadium Alloy Steel Construction",
      "Transverse Leaf Spring Suspension",
      "Hand Crank Starter with Magneto Ignition",
      "Brass Radiator Shell and Script Badging"
    ],
    image: "https://pngimg.com/d/porsche_PNG10613.png",
    availableTrims: [
      { name: "Touring 5 Passenger", price: 45000 },
      { name: "Runabout Roadster", price: 42000 }
    ],
    colorOptions: [
      { name: "Raven Black", hex: "#0a0a0a" },
      { name: "Brewster Green", hex: "#1b3322" }
    ]
  },
  {
    id: "duesenberg_model_j_1928",
    make: "Duesenberg",
    model: "Model J Dual Cowl Phaeton",
    year: 1928,
    price: 1850000,
    era: "Pioneer (1880 to 1929)",
    category: "Vintage Classic",
    engine: "6.9L DOHC Straight 8 with 32 Valves",
    horsepower: 265,
    transmission: "3 Speed Unsynchronized Manual",
    acceleration: "8.2 sec 0 to 60 mph",
    topSpeed: "119 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "5200 lbs",
    fuelType: "Premium Gasoline",
    description: "The undisputed summit of American bespoke luxury and racing engineering producing unparalleled straight eight horsepower in 1928.",
    features: [
      "Dual Overhead Camshaft 32 Valve Straight Eight",
      "Custom Coachwork by Murphy of Pasadena",
      "Hydraulic Drum Brakes on All Four Wheels",
      "Dual Cowl Windscreen for Rear Passengers"
    ],
    image: "https://pngimg.com/d/mercedes_benz_PNG101880.png",
    availableTrims: [
      { name: "Dual Cowl Phaeton", price: 1850000 },
      { name: "Torpedo Roadster", price: 2100000 }
    ],
    colorOptions: [
      { name: "Imperial Dark Blue", hex: "#0d1b2a" },
      { name: "Burgundy Maroon", hex: "#4a0e17" }
    ]
  },

  // 1930 to 1959 (Classic Era)
  {
    id: "mercedes_300sl_gullwing_1954",
    make: "Mercedes Benz",
    model: "300 SL Gullwing Coupe",
    year: 1954,
    price: 1650000,
    era: "Classic (1930 to 1959)",
    category: "Sports Coupe",
    engine: "3.0L M198 Inline 6 with Direct Fuel Injection",
    horsepower: 240,
    transmission: "4 Speed Synchronized Manual",
    acceleration: "7.4 sec 0 to 60 mph",
    topSpeed: "161 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "2855 lbs",
    fuelType: "Premium Gasoline",
    description: "The world first production sports car with mechanical direct fuel injection and iconic upward opening gullwing doors over a tubular spaceframe.",
    features: [
      "Tubular Steel Spaceframe Chassis",
      "Upward Opening Gullwing Doors",
      "Bosch Mechanical Direct Fuel Injection",
      "Pivoting Steering Wheel for Driver Entry"
    ],
    image: "https://pngimg.com/d/mercedes_benz_PNG101880.png",
    availableTrims: [
      { name: "Steel Body Coupe", price: 1650000 },
      { name: "Alloy Lightweight Competition Spec", price: 4500000 }
    ],
    colorOptions: [
      { name: "Silver Arrow Metallic", hex: "#bec2cb" },
      { name: "Graphite Grey", hex: "#404040" },
      { name: "Fire Engine Red", hex: "#b31b1b" }
    ]
  },
  {
    id: "porsche_356_speedster_1956",
    make: "Porsche",
    model: "356 A Speedster",
    year: 1956,
    price: 420000,
    era: "Classic (1930 to 1959)",
    category: "Convertible Roadster",
    engine: "1.6L Air Cooled Flat 4 Engine",
    horsepower: 75,
    transmission: "4 Speed Manual Transaxle",
    acceleration: "12.5 sec 0 to 60 mph",
    topSpeed: "109 mph",
    drivetrain: "Rear Engine Rear Wheel Drive",
    curbWeight: "1670 lbs",
    fuelType: "Gasoline",
    description: "Purist lightweight German open top speedster with a low cut raked windshield and minimalist bucket seating designed for weekend club racing.",
    features: [
      "Removable Low Profile Windshield",
      "Lightweight Bucket Racing Seats",
      "Dual Zenith Carburetors",
      "Four Wheel Hydraulic Drum Brakes"
    ],
    image: "https://pngimg.com/d/porsche_PNG10613.png",
    availableTrims: [
      { name: "1600 Speedster", price: 420000 },
      { name: "1600 Super Carrera Speedster", price: 580000 }
    ],
    colorOptions: [
      { name: "Ivory White", hex: "#f8f7f2" },
      { name: "Aquamarine Blue Metallic", hex: "#2b4c7e" },
      { name: "Ruby Red", hex: "#7a1c22" }
    ]
  },
  {
    id: "chevrolet_corvette_c1_1958",
    make: "Chevrolet",
    model: "Corvette C1 Dual Headlight",
    year: 1958,
    price: 165000,
    era: "Classic (1930 to 1959)",
    category: "Convertible Roadster",
    engine: "4.6L 283 cu in Small Block V8 with Rochester Fuel Injection",
    horsepower: 290,
    transmission: "4 Speed Borg Warner T10 Manual",
    acceleration: "6.9 sec 0 to 60 mph",
    topSpeed: "132 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "2980 lbs",
    fuelType: "Gasoline",
    description: "America premier fiberglass sports car featuring quad headlamps, sculpted contrasting side coves, and Rochester Ramjet fuel injection.",
    features: [
      "Fiberglass Reinforced Composite Body",
      "Rochester Ramjet Continuous Fuel Injection",
      "Contrasting Side Cove Paintwork",
      "Wonderbar Signal Seeking Radio"
    ],
    image: "https://pngimg.com/d/bmw_PNG99547.png",
    availableTrims: [
      { name: "283 Dual Quad Carburetor", price: 145000 },
      { name: "Fuelie 290 HP Solid Lifter", price: 165000 }
    ],
    colorOptions: [
      { name: "Signet Red with White Coves", hex: "#aa1923" },
      { name: "Panama Yellow", hex: "#e5b73b" },
      { name: "Tuxedo Black", hex: "#111111" }
    ]
  },

  // 1960 to 1979 (Golden Age)
  {
    id: "ferrari_250_gto_1962",
    make: "Ferrari",
    model: "250 GTO Berlinetta",
    year: 1962,
    price: 48000000,
    era: "Golden Age (1960 to 1979)",
    category: "Supercar",
    engine: "3.0L Colombo Tipo 168 Comp V12 with 6 Weber Carburetors",
    horsepower: 300,
    transmission: "5 Speed Dogleg Synchromesh Manual",
    acceleration: "4.4 sec 0 to 60 mph",
    topSpeed: "174 mph",
    drivetrain: "Rear Wheel Drive with Limited Slip",
    curbWeight: "1940 lbs",
    fuelType: "Racing Fuel or Premium Gasoline",
    description: "The holy grail of historic motorsport engineering, FIA Group 3 GT championship winning aerodynamic Berlinetta crafted in Maranello.",
    features: [
      "Hand Hammered Aluminum Body by Scaglietti",
      "Dry Sump Colombo 3.0L V12 with 6 Twin Choke Webers",
      "Borrani Aluminum Wire Wheels with Knock Off Spinners",
      "Integrated Rear Kamm Tail Spoiler"
    ],
    image: "https://pngimg.com/d/ferrari_PNG10665.png",
    availableTrims: [
      { name: "Series 1 Berlinetta FIA Homologated", price: 48000000 }
    ],
    colorOptions: [
      { name: "Rosso Corsa Racing Red", hex: "#d40000" },
      { name: "Giallo Fly Yellow", hex: "#fed000" }
    ]
  },
  {
    id: "aston_martin_db5_1964",
    make: "Aston Martin",
    model: "DB5 Vantage Coupe",
    year: 1964,
    price: 980000,
    era: "Golden Age (1960 to 1979)",
    category: "Sports Coupe",
    engine: "4.0L All Aluminum Tadek Marek Inline 6",
    horsepower: 325,
    transmission: "ZF 5 Speed All Synchromesh Manual",
    acceleration: "6.5 sec 0 to 60 mph",
    topSpeed: "155 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "3310 lbs",
    fuelType: "Premium Gasoline",
    description: "The quintessential British grand tourer built using the patented Superleggera magnesium aluminum alloy tube structure.",
    features: [
      "Carrozzeria Touring Superleggera Bodywork",
      "Triple Weber Carburetor Vantage Specification",
      "Connolly Vaumol Leather Interior",
      "Girling Vacuum Assisted Four Wheel Disc Brakes"
    ],
    image: "https://pngimg.com/d/bmw_PNG99547.png",
    availableTrims: [
      { name: "Standard 4.0L Saloon", price: 890000 },
      { name: "Vantage High Output Spec", price: 980000 }
    ],
    colorOptions: [
      { name: "Silver Birch", hex: "#c3c7cb" },
      { name: "Dubonnet Rosso", hex: "#5b1e2a" },
      { name: "British Racing Green", hex: "#004225" }
    ]
  },
  {
    id: "lamborghini_countach_1974",
    make: "Lamborghini",
    model: "Countach LP400 Periscopio",
    year: 1974,
    price: 1350000,
    era: "Golden Age (1960 to 1979)",
    category: "Supercar",
    engine: "3.9L Longitudinal Mid Mounted 60 Degree V12",
    horsepower: 375,
    transmission: "5 Speed Manual Transaxle",
    acceleration: "5.4 sec 0 to 60 mph",
    topSpeed: "179 mph",
    drivetrain: "Rear Mid Engine Rear Wheel Drive",
    curbWeight: "2348 lbs",
    fuelType: "Premium Gasoline",
    description: "The radical Marcello Gandini wedge silhouette with scissor doors and roof periscope rearview channel that redefined the supercar genre.",
    features: [
      "Scissor Door Vertical Opening Architecture",
      "Roof Integrated Periscopio Optical Rear View",
      "Campagnolo Magnesium Alloy Wheels",
      "Six Dual Throat Weber 45 DCOE Carburetors"
    ],
    image: "https://pngimg.com/d/ferrari_PNG10665.png",
    availableTrims: [
      { name: "LP400 Periscopio First Series", price: 1350000 }
    ],
    colorOptions: [
      { name: "Arancio Orange", hex: "#ff6600" },
      { name: "Giallo Fly", hex: "#fcd116" },
      { name: "Verde Tahiti Green", hex: "#009944" }
    ]
  },

  // 1980 to 1999 (Modern Classic Era)
  {
    id: "porsche_959_1986",
    make: "Porsche",
    model: "959 Komfort",
    year: 1986,
    price: 1950000,
    era: "Modern Classic (1980 to 1999)",
    category: "Supercar",
    engine: "2.85L Sequential Twin Turbo Flat 6 with Water Cooled 4 Valve Heads",
    horsepower: 444,
    transmission: "6 Speed Manual with Gelande Off Road Gear",
    acceleration: "3.6 sec 0 to 60 mph",
    topSpeed: "197 mph",
    drivetrain: "Porsche PSK Variable Electronically Controlled All Wheel Drive",
    curbWeight: "3197 lbs",
    fuelType: "Premium Gasoline",
    description: "The technological marvel of the 1980s featuring active variable all wheel drive, tire pressure monitoring, and Kevlar composite aerodynamics.",
    features: [
      "Porsche Steuer Kupplung Variable Torque Split AWD",
      "Sequential Twin Turbochargers",
      "Hydraulic Adjustable Ride Height and Dampers",
      "Hollow Spoke Magnesium Alloy Wheels"
    ],
    image: "https://pngimg.com/d/porsche_PNG10613.png",
    availableTrims: [
      { name: "Komfort Touring Spec", price: 1950000 },
      { name: "Sport Lightweight Spec", price: 2300000 }
    ],
    colorOptions: [
      { name: "Guards Red", hex: "#d11212" },
      { name: "Polar Silver Metallic", hex: "#c8ccd0" },
      { name: "Grand Prix White", hex: "#ffffff" }
    ]
  },
  {
    id: "ferrari_f40_1987",
    make: "Ferrari",
    model: "F40 Berlinetta",
    year: 1987,
    price: 2850000,
    era: "Modern Classic (1980 to 1999)",
    category: "Supercar",
    engine: "2.9L Twin Turbocharged Tipo F120A V8",
    horsepower: 471,
    transmission: "5 Speed Gated Manual with Twin Plate Clutch",
    acceleration: "3.8 sec 0 to 60 mph",
    topSpeed: "201 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "2756 lbs",
    fuelType: "Premium Gasoline",
    description: "Enzo Ferrari final automotive masterpiece, the first street legal production car to surpass 200 mph with visible carbon Kevlar body weave.",
    features: [
      "Carbon Fiber and Kevlar Composite Weave Body",
      "Twin IHI Water Cooled Turbochargers with Behr Intercoolers",
      "Tubular Steel Spaceframe Chassis",
      "Lexan Vented Rear Engine Screen"
    ],
    image: "https://pngimg.com/d/ferrari_PNG10665.png",
    availableTrims: [
      { name: "Non Cat Non Adjust Euro Spec", price: 3100000 },
      { name: "Standard Berlinetta", price: 2850000 }
    ],
    colorOptions: [
      { name: "Rosso Corsa Only", hex: "#d40000" }
    ]
  },
  {
    id: "mclaren_f1_1992",
    make: "McLaren",
    model: "F1 Three Seater",
    year: 1992,
    price: 21500000,
    era: "Modern Classic (1980 to 1999)",
    category: "Hypercar",
    engine: "6.1L Naturally Aspirated BMW Motorsport S70 2 60 Degree V12",
    horsepower: 618,
    transmission: "6 Speed Transverse Manual with AP Racing Triple Plate Clutch",
    acceleration: "3.2 sec 0 to 60 mph",
    topSpeed: "240.1 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "2509 lbs",
    fuelType: "Premium Gasoline",
    description: "Gordon Murray carbon fiber tour de force with central driver seating, gold leaf engine bay heat shielding, and the highest naturally aspirated top speed.",
    features: [
      "Full Carbon Fiber Monocoque Chassis",
      "Central Driving Position with Two Flanking Passenger Seats",
      "Pure 24 Karat Gold Foil Engine Bay Thermal Shielding",
      "Active Aerodynamic Fan and Airbrake System"
    ],
    image: "https://pngimg.com/d/mercedes_benz_PNG101880.png",
    availableTrims: [
      { name: "Road Car Standard Spec", price: 21500000 },
      { name: "LM Specification High Downforce", price: 28000000 }
    ],
    colorOptions: [
      { name: "Magnesium Silver", hex: "#afb2b7" },
      { name: "Papaya Historic Orange", hex: "#ff8000" },
      { name: "Dark Blue Pearl", hex: "#0b1b3d" }
    ]
  },

  // 2000 to 2019 (Contemporary Performance)
  {
    id: "porsche_carrera_gt_2004",
    make: "Porsche",
    model: "Carrera GT V10",
    year: 2004,
    price: 1450000,
    era: "Contemporary (2000 to 2019)",
    category: "Supercar",
    engine: "5.7L Naturally Aspirated 68 Degree Le Mans V10",
    horsepower: 603,
    transmission: "6 Speed Manual with Beechwood Shift Knob and PCCC Ceramic Clutch",
    acceleration: "3.5 sec 0 to 60 mph",
    topSpeed: "205 mph",
    drivetrain: "Rear Mid Engine Rear Wheel Drive",
    curbWeight: "3042 lbs",
    fuelType: "Premium Gasoline",
    description: "An unfiltered analog supercar evolved directly from Porsche V10 LMP2000 endurance racing program with pushrod suspension and carbon monocoque.",
    features: [
      "Carbon Fiber Monocoque and Subframe Architecture",
      "5.7L Naturally Aspirated V10 Redlining at 8400 RPM",
      "Porsche Ceramic Composite Clutch and Brakes",
      "Laminated Beechwood Gearshift Knob Homage to 917"
    ],
    image: "https://pngimg.com/d/porsche_PNG10613.png",
    availableTrims: [
      { name: "Factory Targa Standard", price: 1450000 }
    ],
    colorOptions: [
      { name: "GT Silver Metallic", hex: "#bcc0c7" },
      { name: "Fayence Yellow", hex: "#ffc800" },
      { name: "Basalt Black Metallic", hex: "#161616" }
    ]
  },
  {
    id: "bugatti_chiron_2016",
    make: "Bugatti",
    model: "Chiron Quad Turbo W16",
    year: 2016,
    price: 3200000,
    era: "Contemporary (2000 to 2019)",
    category: "Hypercar",
    engine: "8.0L Quad Turbocharged 64 Valve W16 Engine",
    horsepower: 1479,
    transmission: "7 Speed Dual Clutch Ricardo Transmission",
    acceleration: "2.4 sec 0 to 60 mph",
    topSpeed: "261 mph Electronically Limited",
    drivetrain: "Permanent All Wheel Drive with Electronically Controlled Diff",
    curbWeight: "4398 lbs",
    fuelType: "Premium 98 Octane Gasoline",
    description: "The zenith of automotive grand luxury and speed capable of delivering 1500 horsepower through four two stage sequential turbochargers.",
    features: [
      "Full Carbon Fiber Monocoque with 50000 Nm Torsional Rigidity",
      "Signature C Line Aluminum Structural Styling",
      "Adaptive Aerodynamics with Active Airbrake Function",
      "Accuton Diamond Diaphragm Audio Drivers"
    ],
    image: "https://pngimg.com/d/audi_PNG99484.png",
    availableTrims: [
      { name: "Chiron Base", price: 3200000 },
      { name: "Chiron Sport Carbon Package", price: 3600000 }
    ],
    colorOptions: [
      { name: "French Racing Blue and Atlantic Blue", hex: "#0066cc" },
      { name: "Nocturne Black and Italian Red", hex: "#111111" }
    ]
  },

  // 2020 to 2026 (Modern Era)
  {
    id: "porsche_911_carrera_s_2024",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2024,
    price: 131300,
    era: "Modern Era (2020 to 2026)",
    category: "Sports Coupe",
    engine: "3.0L Twin Turbocharged Boxer 6",
    horsepower: 443,
    transmission: "8 Speed Dual Clutch PDK",
    acceleration: "3.5 sec 0 to 60 mph",
    topSpeed: "191 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "3298 lbs",
    fuelType: "Premium Gasoline",
    description: "The benchmark high performance sports car engineered with precision rear engine architecture and dynamic chassis control.",
    features: [
      "Porsche Active Suspension Management",
      "Sport Chrono Package with Mode Switch",
      "Four Piston Aluminum Monobloc Brakes",
      "Burmester High End Surround Sound System"
    ],
    image: "https://pngimg.com/d/porsche_PNG10613.png",
    availableTrims: [
      { name: "Carrera S", price: 131300 },
      { name: "Carrera 4S All Wheel Drive", price: 138600 }
    ],
    colorOptions: [
      { name: "Guards Red", hex: "#d11212" },
      { name: "GT Silver Metallic", hex: "#c0c0c0" },
      { name: "Gentian Blue", hex: "#152e6f" }
    ]
  },
  {
    id: "bmw_m4_competition_2024",
    make: "BMW",
    model: "M4 Competition Coupe",
    year: 2024,
    price: 86300,
    era: "Modern Era (2020 to 2026)",
    category: "Sports Coupe",
    engine: "3.0L BMW M TwinPower Turbo S58 Inline 6",
    horsepower: 503,
    transmission: "8 Speed M Sport Automatic with Drivelogic",
    acceleration: "3.4 sec 0 to 60 mph",
    topSpeed: "180 mph with M Drivers Package",
    drivetrain: "M xDrive All Wheel Drive",
    curbWeight: "3913 lbs",
    fuelType: "Premium Gasoline",
    description: "Track inspired performance vehicle combining razor sharp dynamics with everyday executive road presence.",
    features: [
      "M Carbon Fiber Reinforced Polymer Roof",
      "Adaptive M Suspension with Electronically Controlled Dampers",
      "Active M Differential",
      "Harman Kardon Surround Audio System"
    ],
    image: "https://pngimg.com/d/bmw_PNG99547.png",
    availableTrims: [
      { name: "Competition", price: 86300 },
      { name: "Competition M xDrive", price: 90400 }
    ],
    colorOptions: [
      { name: "Isle of Man Green", hex: "#165842" },
      { name: "Sao Paulo Yellow", hex: "#ddff00" },
      { name: "Black Sapphire", hex: "#111111" }
    ]
  },
  {
    id: "mercedes_amg_gt_2024",
    make: "Mercedes-AMG",
    model: "GT 63 4MATIC Plus",
    year: 2024,
    price: 175900,
    era: "Modern Era (2020 to 2026)",
    category: "Grand Tourer Supercar" as any,
    engine: "4.0L Handcrafted AMG V8 Biturbo M177",
    horsepower: 577,
    transmission: "AMG SPEEDSHIFT MCT 9 Speed",
    acceleration: "3.1 sec 0 to 60 mph",
    topSpeed: "196 mph",
    drivetrain: "AMG Performance 4MATIC Plus Fully Variable",
    curbWeight: "4178 lbs",
    fuelType: "Premium Gasoline",
    description: "Handcrafted grand touring machine built on an advanced aluminum spaceframe chassis with active roll stabilization.",
    features: [
      "Handcrafted AMG V8 Assembled by One Master Technician",
      "AMG ACTIVE RIDE CONTROL Suspension with Active Roll Stabilization",
      "Active Rear Axle Steering",
      "Nappa Leather Performance Seats"
    ],
    image: "https://pngimg.com/d/mercedes_benz_PNG101880.png",
    availableTrims: [
      { name: "GT 55 4MATIC Plus", price: 134900 },
      { name: "GT 63 4MATIC Plus", price: 175900 }
    ],
    colorOptions: [
      { name: "Solarbeam Yellow", hex: "#f0b300" },
      { name: "Selenite Grey Magno", hex: "#5a5f63" },
      { name: "Obsidian Black", hex: "#0b0b0d" }
    ]
  },
  {
    id: "audi_rs7_sportback_2024",
    make: "Audi",
    model: "RS7 Sportback Performance",
    year: 2024,
    price: 127800,
    era: "Modern Era (2020 to 2026)",
    category: "Executive Sedan",
    engine: "4.0L Twin Turbo V8 with 48V Mild Hybrid",
    horsepower: 621,
    transmission: "8 Speed Tiptronic Sport Automatic",
    acceleration: "3.3 sec 0 to 60 mph",
    topSpeed: "190 mph with Dynamic Package Plus",
    drivetrain: "Quattro Permanent All Wheel Drive with Sport Differential",
    curbWeight: "4740 lbs",
    fuelType: "Premium Gasoline",
    description: "The ultimate synthesis of four door sportback luxury and ferocious twin turbo V8 motorsport acceleration.",
    features: [
      "Quattro Sport Differential with Active Torque Vectoring",
      "Dynamic All Wheel Steering",
      "HD Matrix Design LED Headlights with Audi Laser Light",
      "Bang and Olufsen 3D Advanced Sound System"
    ],
    image: "https://pngimg.com/d/audi_PNG99484.png",
    availableTrims: [
      { name: "Performance Edition", price: 127800 },
      { name: "Bronze Edition Limited", price: 141000 }
    ],
    colorOptions: [
      { name: "Nardo Gray", hex: "#8c8e90" },
      { name: "Tango Red Metallic", hex: "#9b111e" },
      { name: "Mythos Black Metallic", hex: "#141416" }
    ]
  },
  {
    id: "ferrari_f8_tributo_2024",
    make: "Ferrari",
    model: "F8 Tributo Berlinetta",
    year: 2024,
    price: 280000,
    era: "Modern Era (2020 to 2026)",
    category: "Supercar",
    engine: "3.9L 90 Degree Twin Turbo V8 F154",
    horsepower: 710,
    transmission: "7 Speed Dual Clutch F1 Gearbox",
    acceleration: "2.9 sec 0 to 60 mph",
    topSpeed: "211 mph",
    drivetrain: "Rear Wheel Drive with E Diff3",
    curbWeight: "3164 lbs",
    fuelType: "Premium Gasoline",
    description: "An Italian automotive masterpiece paying homage to the most powerful V8 engine in Ferrari production history.",
    features: [
      "Ferrari Dynamic Enhancer Plus System",
      "Side Slip Angle Control 6.1",
      "S Duct Front Aerodynamic Downforce Channel",
      "Carbon Ceramic Braking System"
    ],
    image: "https://pngimg.com/d/ferrari_PNG10665.png",
    availableTrims: [
      { name: "Berlinetta", price: 280000 },
      { name: "Assetto Fiorano Track Package", price: 315000 }
    ],
    colorOptions: [
      { name: "Rosso Corsa", hex: "#d40000" },
      { name: "Giallo Modena", hex: "#ffcc00" },
      { name: "Nero Daytona", hex: "#000000" }
    ]
  },
  {
    id: "tesla_model_s_plaid_2024",
    make: "Tesla",
    model: "Model S Plaid Tri Motor",
    year: 2024,
    price: 89990,
    era: "Modern Era (2020 to 2026)",
    category: "Electric Performance",
    engine: "Tri Motor All Wheel Drive with Carbon Sleeved Rotors",
    horsepower: 1020,
    transmission: "Single Speed Fixed Gear with Torque Vectoring",
    acceleration: "1.99 sec 0 to 60 mph",
    topSpeed: "200 mph with Track Package",
    drivetrain: "All Wheel Drive with Torque Vectoring",
    curbWeight: "4766 lbs",
    fuelType: "Pure Electric 100 kWh Lithium Ion Battery",
    description: "The fastest accelerating production sedan on earth utilizing three independent carbon sleeved electric motors.",
    features: [
      "Tri Motor Torque Vectoring Powertrain",
      "100 kWh Battery with 359 Miles Range",
      "Track Mode with Thermal Preconditioning",
      "22 Speaker 960 Watt Active Road Noise Reduction Audio"
    ],
    image: "https://pngimg.com/d/audi_PNG99484.png",
    availableTrims: [
      { name: "Plaid Tri Motor", price: 89990 },
      { name: "Plaid Track Package Ceramic", price: 109990 }
    ],
    colorOptions: [
      { name: "Ultra Red", hex: "#a80f1a" },
      { name: "Solid Black", hex: "#0c0c0c" },
      { name: "Pearl White Multi Coat", hex: "#f4f4f4" }
    ]
  },
  {
    id: "aston_martin_valkyrie_2025",
    make: "Aston Martin",
    model: "Valkyrie AMR Pro Hypercar",
    year: 2025,
    price: 3500000,
    era: "Modern Era (2020 to 2026)",
    category: "Hypercar",
    engine: "6.5L Naturally Aspirated Cosworth V12 with Rimac KERS Hybrid",
    horsepower: 1160,
    transmission: "7 Speed Ricardo Single Clutch Automated Manual",
    acceleration: "2.3 sec 0 to 60 mph",
    topSpeed: "250 mph",
    drivetrain: "Rear Wheel Drive",
    curbWeight: "2205 lbs",
    fuelType: "Hybrid Electric and Gasoline",
    description: "Adrian Newey ground effect Formula 1 aerodynamic package built completely in carbon fiber with a 11100 RPM Cosworth V12.",
    features: [
      "Full Venturi Tunnel Underfloor Ground Effect Aerodynamics",
      "Cosworth Naturally Aspirated 6.5L V12 Revving to 11100 RPM",
      "Rimac KERS Hybrid Electric Boost",
      "F1 Style Reclined Driver Seating Position"
    ],
    image: "https://pngimg.com/d/mercedes_benz_PNG101880.png",
    availableTrims: [
      { name: "Valkyrie Coupe", price: 3500000 },
      { name: "Valkyrie Spider Open Top", price: 4000000 }
    ],
    colorOptions: [
      { name: "Aston Martin Racing Green", hex: "#00594f" },
      { name: "Stirling Green with Lime Accent", hex: "#1c3c34" }
    ]
  },
  {
    id: "porsche_taycan_turbo_s_2026",
    make: "Porsche",
    model: "Taycan Turbo S Cross Turismo",
    year: 2026,
    price: 211700,
    era: "Modern Era (2020 to 2026)",
    category: "Electric Performance",
    engine: "Dual Permanent Magnet Synchronous Motors 800V Architecture",
    horsepower: 938,
    transmission: "2 Speed Transmission on Rear Axle Single Speed on Front",
    acceleration: "2.3 sec 0 to 60 mph with Launch Control",
    topSpeed: "162 mph",
    drivetrain: "All Wheel Drive with Porsche Torque Vectoring Plus",
    curbWeight: "5082 lbs",
    fuelType: "Pure Electric 105 kWh Performance Battery Plus",
    description: "Modern 2026 800 volt electric grand tourer with push to pass power boost and active ride suspension.",
    features: [
      "Porsche Active Ride Electrohydraulic Suspension",
      "800 Volt Architecture with 320 kW DC Fast Charging",
      "Push to Pass 10 Second 140 HP Power Boost",
      "Porsche Ceramic Composite Brakes with Yellow Calipers"
    ],
    image: "https://pngimg.com/d/porsche_PNG10613.png",
    availableTrims: [
      { name: "Turbo S Sedan", price: 209000 },
      { name: "Turbo S Cross Turismo", price: 211700 }
    ],
    colorOptions: [
      { name: "Oak Green Metallic Neo", hex: "#1e382b" },
      { name: "Frozen Blue Metallic", hex: "#91b9d4" },
      { name: "Volcano Grey Metallic", hex: "#3e4247" }
    ]
  }
]
