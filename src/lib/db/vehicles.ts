import { StructuredVehicle } from "../types/vehicle"

export const VEHICLES_DB: StructuredVehicle[] = [
  // 1880 to 1899 (Pioneering and Experimental)
  {
    vehicleId: "veh_benz_motorwagen_1886",
    manufacturer: {
      name: "Benz and Cie",
      country: "Germany",
      foundedYear: 1883
    },
    vehicle: {
      name: "Patent Motorwagen",
      fullName: "Benz Patent Motorwagen Number 1",
      modelCode: "Typ 1",
      generation: "Model Number 1",
      category: "Vintage",
      bodyType: "Three Wheel Motor Tricycle",
      modelYear: 1886,
      productionStartYear: 1886,
      productionEndYear: 1893,
      vehicleStatus: "historic",
      vehicleClassification: "historical_one_off",
      era: "1880 to 1899 (Pioneering and Experimental)"
    },
    specifications: {
      engineType: "Single Cylinder Four Stroke Horizontal Engine",
      engineCapacity: "0.95L",
      horsepower: 1,
      torque: null,
      transmission: "Single Speed Belt Drive with Countershaft",
      drivetrain: "Rear Wheel Chain Drive",
      fuelType: "Ligroin Petroleum Spirit",
      seatingCapacity: 2,
      doors: 0,
      topSpeed: "10 mph",
      acceleration: "25.0 sec 0 to 10 mph",
      curbWeight: "584 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/benz_motorwagen_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Mercedes Benz Museum Historical Archive",
        caption: "Benz Patent Motorwagen 1886 front quarter transparent studio photograph"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 1500,
      weeklyRate: 8500,
      monthlyRate: 30000,
      depositAmount: 5000,
      currency: "USD"
    },
    metadata: {
      description: "The world first production automobile powered by an internal combustion engine, patented by Carl Benz in January 1886.",
      historicalSignificance: "Official birth of modern automotive transport with integrated chassis and engine layout.",
      officialSource: "Daimler Historical Archive Mannheim Germany",
      valuationPrice: 350000,
      availableTrims: [
        { name: "Museum Replica Certified Historical Spec", price: 350000 }
      ],
      colorOptions: [
        { name: "Historic Black and Varnished Hardwood", hex: "#1c1c1c" },
        { name: "Polished Brass Finish", hex: "#c5a059" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_ford_quadricycle_1896",
    manufacturer: {
      name: "Ford Motor Company",
      country: "United States",
      foundedYear: 1903
    },
    vehicle: {
      name: "Quadricycle",
      fullName: "Ford Quadricycle Runabout",
      modelCode: "Quad 1",
      generation: "Henry Ford First Experimental Vehicle",
      category: "Experimental Vehicle",
      bodyType: "Open Runabout",
      modelYear: 1896,
      productionStartYear: 1896,
      productionEndYear: 1896,
      vehicleStatus: "prototype",
      vehicleClassification: "experimental_automobile",
      era: "1880 to 1899 (Pioneering and Experimental)"
    },
    specifications: {
      engineType: "Ethanol Powered Twin Cylinder Horizontal Engine",
      engineCapacity: "1.0L",
      horsepower: 4,
      transmission: "2 Speed Belt and Chain Drive",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Ethanol and Gasoline",
      seatingCapacity: 2,
      doors: 0,
      topSpeed: "20 mph",
      acceleration: null,
      curbWeight: "500 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/ford_quadricycle_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "The Henry Ford Museum Historical Collection"
      },
      gallery: []
    },
    rental: {
      availableForRental: false,
      dailyRate: null,
      weeklyRate: null,
      monthlyRate: null,
      depositAmount: 5000,
      currency: "USD"
    },
    metadata: {
      description: "Henry Ford first experimental automobile built inside a brick workshop behind his Detroit home on Bagley Avenue.",
      historicalSignificance: "Foundation of Ford Motor Company and American automotive mass transit concept.",
      officialSource: "The Henry Ford Museum Dearborn Michigan",
      valuationPrice: 500000,
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 1900 to 1919 (Early Production and Vintage)
  {
    vehicleId: "veh_oldsmobile_curved_dash_1901",
    manufacturer: {
      name: "Oldsmobile",
      country: "United States",
      foundedYear: 1897
    },
    vehicle: {
      name: "Curved Dash",
      fullName: "Oldsmobile Curved Dash Model R",
      modelCode: "Model R",
      generation: "First Mass Production Automobile",
      category: "Vintage",
      bodyType: "Runabout Buggy",
      modelYear: 1901,
      productionStartYear: 1901,
      productionEndYear: 1907,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1900 to 1919 (Early Production and Vintage)"
    },
    specifications: {
      engineType: "Single Cylinder Four Stroke Water Cooled Engine",
      engineCapacity: "1.6L",
      horsepower: 5,
      transmission: "2 Speed Planetary Manual Transmission",
      drivetrain: "Rear Wheel Chain Drive",
      fuelType: "Gasoline",
      seatingCapacity: 2,
      doors: 0,
      topSpeed: "20 mph",
      acceleration: null,
      curbWeight: "850 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/duesenberg_model_j_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Smithsonian National Museum of American History"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 650,
      weeklyRate: 3800,
      monthlyRate: 14000,
      depositAmount: 2500,
      currency: "USD"
    },
    metadata: {
      description: "The first high volume mass produced automobile in world history with iconic curved front dashboard.",
      historicalSignificance: "Pioneered stationary assembly line manufacturing before Ford moving assembly line.",
      officialSource: "Oldsmobile Historical Society Lansing Michigan",
      valuationPrice: 65000,
      availableTrims: [
        { name: "Standard Runabout", price: 65000 }
      ],
      colorOptions: [
        { name: "Black with Gold Pinstripe", hex: "#111111" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_ford_model_t_1908",
    manufacturer: {
      name: "Ford Motor Company",
      country: "United States",
      foundedYear: 1903
    },
    vehicle: {
      name: "Model T",
      fullName: "Ford Model T Touring",
      modelCode: "Tin Lizzie",
      generation: "Universal Model T Production",
      category: "Vintage",
      bodyType: "Open 5 Passenger Touring",
      modelYear: 1908,
      productionStartYear: 1908,
      productionEndYear: 1927,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1900 to 1919 (Early Production and Vintage)"
    },
    specifications: {
      engineType: "Inline 4 Cylinder Side Valve En Bloc Engine",
      engineCapacity: "2.9L",
      horsepower: 20,
      transmission: "2 Speed Planetary Foot Controlled Transmission",
      drivetrain: "Rear Wheel Drive with Torque Tube",
      fuelType: "Gasoline or Ethanol",
      seatingCapacity: 5,
      doors: 3,
      topSpeed: "45 mph",
      acceleration: "18.0 sec 0 to 30 mph",
      curbWeight: "1200 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/ford_quadricycle_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Ford Motor Company Archives"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 450,
      weeklyRate: 2600,
      monthlyRate: 9500,
      depositAmount: 1500,
      currency: "USD"
    },
    metadata: {
      description: "The universal automobile that transformed society through standardized moving assembly line mass production.",
      historicalSignificance: "Named the most influential car of the 20th century with over 15 million units built.",
      officialSource: "The Henry Ford Historical Archives",
      valuationPrice: 45000,
      availableTrims: [
        { name: "5 Passenger Touring", price: 45000 },
        { name: "Runabout 2 Passenger", price: 42000 }
      ],
      colorOptions: [
        { name: "Raven Black", hex: "#0a0a0a" },
        { name: "Brewster Green", hex: "#1b3322" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 1920 to 1939 (Classic and Pre War)
  {
    vehicleId: "veh_duesenberg_model_j_1928",
    manufacturer: {
      name: "Duesenberg Automobile and Motors",
      country: "United States",
      foundedYear: 1913
    },
    vehicle: {
      name: "Model J",
      fullName: "Duesenberg Model J Dual Cowl Phaeton",
      modelCode: "J Chassis",
      generation: "Duesenberg Straight 8 Luxury Series",
      category: "Classic",
      bodyType: "Dual Cowl Phaeton",
      modelYear: 1928,
      productionStartYear: 1928,
      productionEndYear: 1937,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1920 to 1939 (Classic and Pre War)"
    },
    specifications: {
      engineType: "DOHC 32 Valve Straight 8 Aluminum Engine",
      engineCapacity: "6.9L",
      horsepower: 265,
      transmission: "3 Speed Unsynchronized Manual",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Gasoline",
      seatingCapacity: 5,
      doors: 4,
      topSpeed: "119 mph",
      acceleration: "8.2 sec 0 to 60 mph",
      curbWeight: "5200 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/duesenberg_model_j_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Auburn Cord Duesenberg Museum Auburn Indiana"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 3500,
      weeklyRate: 21000,
      monthlyRate: 75000,
      depositAmount: 10000,
      currency: "USD"
    },
    metadata: {
      description: "The pinnacle of American classic luxury and straight eight engineering with custom handbuilt coachwork by Walter M Murphy.",
      historicalSignificance: "The fastest and most expensive automobile manufactured in America during the Gatsby era.",
      officialSource: "Auburn Cord Duesenberg Museum Archives",
      valuationPrice: 1850000,
      availableTrims: [
        { name: "Dual Cowl Phaeton by Murphy", price: 1850000 },
        { name: "Supercharged SJ Torpedo", price: 2400000 }
      ],
      colorOptions: [
        { name: "Imperial Dark Blue", hex: "#0d1b2a" },
        { name: "Burgundy Maroon", hex: "#4a0e17" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_bugatti_type_57sc_1936",
    manufacturer: {
      name: "Bugatti",
      country: "France",
      foundedYear: 1909
    },
    vehicle: {
      name: "Type 57SC",
      fullName: "Bugatti Type 57SC Atlantic Coupe",
      modelCode: "Type 57SC",
      generation: "Jean Bugatti Atlantic and Atalante Series",
      category: "Classic",
      bodyType: "Art Deco Fastback Coupe",
      modelYear: 1936,
      productionStartYear: 1934,
      productionEndYear: 1940,
      vehicleStatus: "discontinued",
      vehicleClassification: "historical_one_off",
      era: "1920 to 1939 (Classic and Pre War)"
    },
    specifications: {
      engineType: "Supercharged DOHC Straight 8 Engine",
      engineCapacity: "3.3L",
      horsepower: 200,
      transmission: "4 Speed Synchromesh Manual",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "124 mph",
      acceleration: "9.8 sec 0 to 60 mph",
      curbWeight: "2100 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/bugatti_type_57sc_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Musee National de l Automobile Collection Schlumpf"
      },
      gallery: []
    },
    rental: {
      availableForRental: false,
      dailyRate: null,
      weeklyRate: null,
      monthlyRate: null,
      depositAmount: 50000,
      currency: "USD"
    },
    metadata: {
      description: "Art deco masterpiece styled by Jean Bugatti with riveted dorsal fin made from lightweight magnesium aluminum Elektron alloy.",
      historicalSignificance: "Considered by automotive historians to be the most beautiful and valuable pre war car in existence.",
      officialSource: "Bugatti Historic Heritage Archive Molsheim France",
      valuationPrice: 40000000,
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 1940 to 1959 (Post War and Early Classic)
  {
    vehicleId: "veh_mercedes_300sl_1954",
    manufacturer: {
      name: "Mercedes Benz",
      country: "Germany",
      foundedYear: 1926
    },
    vehicle: {
      name: "300 SL",
      fullName: "Mercedes Benz 300 SL Gullwing Coupe",
      modelCode: "W198",
      generation: "W198 Gullwing and Roadster Series",
      category: "Sports Car",
      bodyType: "Gullwing Coupe",
      modelYear: 1954,
      productionStartYear: 1954,
      productionEndYear: 1963,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1940 to 1959 (Post War and Early Classic)"
    },
    specifications: {
      engineType: "M198 Inline 6 with Bosch Direct Fuel Injection",
      engineCapacity: "3.0L",
      horsepower: 240,
      transmission: "4 Speed Synchronized Manual",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "161 mph",
      acceleration: "7.4 sec 0 to 60 mph",
      curbWeight: "2855 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/mercedes_300sl_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Mercedes Benz Classic Center Stuttgart"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 2800,
      weeklyRate: 16500,
      monthlyRate: 60000,
      depositAmount: 8000,
      currency: "USD"
    },
    metadata: {
      description: "First production sports car with mechanical direct fuel injection and iconic upward opening gullwing doors over a tubular spaceframe.",
      historicalSignificance: "Established Mercedes-Benz motorsport heritage on American and European circuits.",
      officialSource: "Mercedes Benz Archive Stuttgart",
      valuationPrice: 1650000,
      availableTrims: [
        { name: "Steel Body Coupe", price: 1650000 },
        { name: "Alloy Lightweight Competition", price: 4500000 }
      ],
      colorOptions: [
        { name: "Silver Arrow Metallic", hex: "#bec2cb" },
        { name: "Graphite Grey", hex: "#404040" },
        { name: "Fire Engine Red", hex: "#b31b1b" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_porsche_356a_1956",
    manufacturer: {
      name: "Porsche",
      country: "Germany",
      foundedYear: 1931
    },
    vehicle: {
      name: "356",
      fullName: "Porsche 356 A Speedster",
      modelCode: "356A",
      generation: "356 A Series",
      category: "Convertible",
      bodyType: "Open Speedster",
      modelYear: 1956,
      productionStartYear: 1955,
      productionEndYear: 1959,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1940 to 1959 (Post War and Early Classic)"
    },
    specifications: {
      engineType: "Air Cooled Flat 4 Rear Engine",
      engineCapacity: "1.6L",
      horsepower: 75,
      transmission: "4 Speed Manual Transaxle",
      drivetrain: "Rear Engine Rear Wheel Drive",
      fuelType: "Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "109 mph",
      acceleration: "12.5 sec 0 to 60 mph",
      curbWeight: "1670 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/porsche_356_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Porsche Museum Archive Zuffenhausen"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 1200,
      weeklyRate: 7000,
      monthlyRate: 25000,
      depositAmount: 4000,
      currency: "USD"
    },
    metadata: {
      description: "Purist lightweight German open top speedster with a low cut raked windshield designed for California club racers.",
      historicalSignificance: "Icon of minimalist sports car engineering and Porsche brand foundation in North America.",
      officialSource: "Porsche Historical Archive Stuttgart",
      valuationPrice: 420000,
      availableTrims: [
        { name: "1600 Speedster", price: 420000 },
        { name: "1600 Super Carrera Speedster", price: 580000 }
      ],
      colorOptions: [
        { name: "Ivory White", hex: "#f8f7f2" },
        { name: "Aquamarine Blue Metallic", hex: "#2b4c7e" },
        { name: "Ruby Red", hex: "#7a1c22" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 1960 to 1979 (Muscle Cars and Golden Age)
  {
    vehicleId: "veh_ferrari_250_gto_1962",
    manufacturer: {
      name: "Ferrari",
      country: "Italy",
      foundedYear: 1939
    },
    vehicle: {
      name: "250 GTO",
      fullName: "Ferrari 250 GTO Berlinetta",
      modelCode: "Tipo 539 62 Comp",
      generation: "Series 1 Homologation Special",
      category: "Racing Car",
      bodyType: "Aerodynamic Berlinetta Coupe",
      modelYear: 1962,
      productionStartYear: 1962,
      productionEndYear: 1964,
      vehicleStatus: "discontinued",
      vehicleClassification: "racing_vehicle",
      era: "1960 to 1979 (Muscle Cars and Golden Age)"
    },
    specifications: {
      engineType: "Colombo Tipo 168 Comp V12 with 6 Weber 38 DCN Carburetors",
      engineCapacity: "3.0L",
      horsepower: 300,
      transmission: "5 Speed Dogleg Synchromesh Manual",
      drivetrain: "Rear Wheel Drive with Limited Slip Differential",
      fuelType: "Racing Fuel or Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "174 mph",
      acceleration: "4.4 sec 0 to 60 mph",
      curbWeight: "1940 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/ferrari_250_gto_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Ferrari Classiche Maranello Italy"
      },
      gallery: []
    },
    rental: {
      availableForRental: false,
      dailyRate: null,
      weeklyRate: null,
      monthlyRate: null,
      depositAmount: 100000,
      currency: "USD"
    },
    metadata: {
      description: "FIA Group 3 GT championship winning aerodynamic Berlinetta developed by Giotto Bizzarrini and Mauro Forghieri.",
      historicalSignificance: "The ultimate synthesis of competition racing and road touring in motorsport history.",
      officialSource: "Ferrari Historical Archive Maranello",
      valuationPrice: 48000000,
      availableTrims: [
        { name: "Series 1 FIA Homologated Competition", price: 48000000 }
      ],
      colorOptions: [
        { name: "Rosso Corsa Racing Red", hex: "#d40000" },
        { name: "Giallo Fly Yellow", hex: "#fed000" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_aston_martin_db5_1964",
    manufacturer: {
      name: "Aston Martin",
      country: "United Kingdom",
      foundedYear: 1913
    },
    vehicle: {
      name: "DB5",
      fullName: "Aston Martin DB5 Vantage Coupe",
      modelCode: "DB5",
      generation: "DB5 Grand Tourer Generation",
      category: "Luxury",
      bodyType: "2 Plus 2 Grand Tourer Coupe",
      modelYear: 1964,
      productionStartYear: 1963,
      productionEndYear: 1965,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1960 to 1979 (Muscle Cars and Golden Age)"
    },
    specifications: {
      engineType: "All Aluminum Tadek Marek Inline 6 with Triple Webers",
      engineCapacity: "4.0L",
      horsepower: 325,
      transmission: "ZF 5 Speed Synchromesh Manual",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 4,
      doors: 2,
      topSpeed: "155 mph",
      acceleration: "6.5 sec 0 to 60 mph",
      curbWeight: "3310 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/aston_martin_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Aston Martin Heritage Trust Oxfordshire"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 2200,
      weeklyRate: 13000,
      monthlyRate: 48000,
      depositAmount: 6000,
      currency: "USD"
    },
    metadata: {
      description: "Iconic British grand tourer built using the patented Superleggera magnesium aluminum alloy tube structure.",
      historicalSignificance: "Global cinematic symbol of luxury British grand touring.",
      officialSource: "Aston Martin Works Newport Pagnell",
      valuationPrice: 980000,
      availableTrims: [
        { name: "Vantage High Output Specification", price: 980000 }
      ],
      colorOptions: [
        { name: "Silver Birch", hex: "#c3c7cb" },
        { name: "Dubonnet Rosso", hex: "#5b1e2a" },
        { name: "British Racing Green", hex: "#004225" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_dodge_charger_rt_1969",
    manufacturer: {
      name: "Dodge",
      country: "United States",
      foundedYear: 1900
    },
    vehicle: {
      name: "Charger",
      fullName: "Dodge Charger R T 440 Magnum",
      modelCode: "B Body Gen 2",
      generation: "Second Generation B Body",
      category: "Muscle Car",
      bodyType: "Hardtop Muscle Coupe",
      modelYear: 1969,
      productionStartYear: 1968,
      productionEndYear: 1970,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1960 to 1979 (Muscle Cars and Golden Age)"
    },
    specifications: {
      engineType: "440 cu in RB Big Block V8 with 4 Barrel Holley",
      engineCapacity: "7.2L",
      horsepower: 375,
      transmission: "TorqueFlite 727 3 Speed Automatic",
      drivetrain: "Rear Wheel Drive with Sure Grip Limited Slip",
      fuelType: "Gasoline",
      seatingCapacity: 5,
      doors: 2,
      topSpeed: "135 mph",
      acceleration: "5.7 sec 0 to 60 mph",
      curbWeight: "3640 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/mercedes_amg_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Chrysler Historical Collection Detroit"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 750,
      weeklyRate: 4500,
      monthlyRate: 16000,
      depositAmount: 2500,
      currency: "USD"
    },
    metadata: {
      description: "Legendary American muscle car with distinctive double diamond Coke bottle silhouette and vacuum operated hidden headlights.",
      historicalSignificance: "Definitive icon of American muscle car performance during the late 1960s.",
      officialSource: "FCA US Historical Services",
      valuationPrice: 145000,
      availableTrims: [
        { name: "R T 440 Magnum", price: 145000 },
        { name: "426 Street Hemi Edition", price: 260000 }
      ],
      colorOptions: [
        { name: "Hemi Orange", hex: "#e04e17" },
        { name: "B5 Blue Metallic", hex: "#2b5c8f" },
        { name: "Triple Black", hex: "#0a0a0a" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_lamborghini_countach_1974",
    manufacturer: {
      name: "Lamborghini",
      country: "Italy",
      foundedYear: 1963
    },
    vehicle: {
      name: "Countach",
      fullName: "Lamborghini Countach LP400 Periscopio",
      modelCode: "LP400",
      generation: "LP400 Periscopio First Generation",
      category: "Supercar",
      bodyType: "Wedge Supercar Coupe",
      modelYear: 1974,
      productionStartYear: 1974,
      productionEndYear: 1978,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1960 to 1979 (Muscle Cars and Golden Age)"
    },
    specifications: {
      engineType: "Longitudinal Mid Mounted 60 Degree V12",
      engineCapacity: "3.9L",
      horsepower: 375,
      transmission: "5 Speed Manual Transaxle",
      drivetrain: "Rear Mid Engine Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "179 mph",
      acceleration: "5.4 sec 0 to 60 mph",
      curbWeight: "2348 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/lamborghini_countach_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Museo Lamborghini Sant Agata Bolognese"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 3200,
      weeklyRate: 19000,
      monthlyRate: 70000,
      depositAmount: 10000,
      currency: "USD"
    },
    metadata: {
      description: "Marcello Gandini revolutionary wedge concept with upward opening scissor doors and central roof periscope rear view channel.",
      historicalSignificance: "Defined the design language of poster supercars for three decades.",
      officialSource: "Automobili Lamborghini Historical Archives",
      valuationPrice: 1350000,
      availableTrims: [
        { name: "LP400 Periscopio First Series", price: 1350000 }
      ],
      colorOptions: [
        { name: "Arancio Orange", hex: "#ff6600" },
        { name: "Giallo Fly", hex: "#fcd116" },
        { name: "Verde Tahiti", hex: "#009944" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 1980 to 1999 (Modern Classic and Supercars)
  {
    vehicleId: "veh_porsche_959_1986",
    manufacturer: {
      name: "Porsche",
      country: "Germany",
      foundedYear: 1931
    },
    vehicle: {
      name: "959",
      fullName: "Porsche 959 Komfort",
      modelCode: "Typ 959",
      generation: "Group B Homologation Supercar",
      category: "Supercar",
      bodyType: "AWD Supercar Coupe",
      modelYear: 1986,
      productionStartYear: 1986,
      productionEndYear: 1993,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1980 to 1999 (Modern Classic and Supercars)"
    },
    specifications: {
      engineType: "Sequential Twin Turbo Flat 6 with Water Cooled 4 Valve Heads",
      engineCapacity: "2.85L",
      horsepower: 444,
      transmission: "6 Speed Manual with Gelande Low Range",
      drivetrain: "Porsche PSK Variable Electronically Controlled All Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 4,
      doors: 2,
      topSpeed: "197 mph",
      acceleration: "3.6 sec 0 to 60 mph",
      curbWeight: "3197 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/porsche_959_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Porsche Museum Historical Archives"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 3800,
      weeklyRate: 22000,
      monthlyRate: 80000,
      depositAmount: 12000,
      currency: "USD"
    },
    metadata: {
      description: "Technological tour de force of the 1980s featuring active torque splitting all wheel drive, tire pressure sensors, and Kevlar aerodynamics.",
      historicalSignificance: "Blueprint for all modern high performance all wheel drive supercars.",
      officialSource: "Porsche Archive Zuffenhausen",
      valuationPrice: 1950000,
      availableTrims: [
        { name: "Komfort Specification", price: 1950000 },
        { name: "Sport Lightweight Specification", price: 2300000 }
      ],
      colorOptions: [
        { name: "Guards Red", hex: "#d11212" },
        { name: "Polar Silver Metallic", hex: "#c8ccd0" },
        { name: "Grand Prix White", hex: "#ffffff" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_ferrari_f40_1987",
    manufacturer: {
      name: "Ferrari",
      country: "Italy",
      foundedYear: 1939
    },
    vehicle: {
      name: "F40",
      fullName: "Ferrari F40 Berlinetta",
      modelCode: "Tipo F120",
      generation: "40th Anniversary Supercar",
      category: "Supercar",
      bodyType: "Carbon Kevlar Berlinetta",
      modelYear: 1987,
      productionStartYear: 1987,
      productionEndYear: 1992,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1980 to 1999 (Modern Classic and Supercars)"
    },
    specifications: {
      engineType: "Twin Turbocharged Tipo F120A V8",
      engineCapacity: "2.9L",
      horsepower: 471,
      transmission: "5 Speed Gated Manual with Twin Plate Clutch",
      drivetrain: "Rear Mid Engine Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "201 mph",
      acceleration: "3.8 sec 0 to 60 mph",
      curbWeight: "2756 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/ferrari_f40_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Ferrari Maranello Historical Archive"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 4500,
      weeklyRate: 27000,
      monthlyRate: 98000,
      depositAmount: 15000,
      currency: "USD"
    },
    metadata: {
      description: "Enzo Ferrari final personally approved automobile, the first street legal production car to breach 200 mph.",
      historicalSignificance: "Celebration of Ferrari 40th anniversary and raw unassisted twin turbo V8 motorsport performance.",
      officialSource: "Ferrari Historical Archives Maranello",
      valuationPrice: 2850000,
      availableTrims: [
        { name: "European Non Cat Specification", price: 3100000 },
        { name: "Standard Berlinetta", price: 2850000 }
      ],
      colorOptions: [
        { name: "Rosso Corsa Exclusive", hex: "#d40000" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_mclaren_f1_1992",
    manufacturer: {
      name: "McLaren Automotive",
      country: "United Kingdom",
      foundedYear: 1963
    },
    vehicle: {
      name: "F1",
      fullName: "McLaren F1 Three Seater",
      modelCode: "F1 XP",
      generation: "Central Seat Monocoque Supercar",
      category: "Hypercar",
      bodyType: "3 Seater Carbon Monocoque",
      modelYear: 1992,
      productionStartYear: 1992,
      productionEndYear: 1998,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "1980 to 1999 (Modern Classic and Supercars)"
    },
    specifications: {
      engineType: "BMW Motorsport S70 2 Naturally Aspirated 60 Degree V12",
      engineCapacity: "6.1L",
      horsepower: 618,
      transmission: "6 Speed Transverse Manual with AP Racing Triple Plate Clutch",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 3,
      doors: 2,
      topSpeed: "240.1 mph",
      acceleration: "3.2 sec 0 to 60 mph",
      curbWeight: "2509 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/mclaren_f1_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "McLaren Technology Centre Woking"
      },
      gallery: []
    },
    rental: {
      availableForRental: false,
      dailyRate: null,
      weeklyRate: null,
      monthlyRate: null,
      depositAmount: 50000,
      currency: "USD"
    },
    metadata: {
      description: "Gordon Murray carbon fiber masterpiece with central driving position, gold foil thermal shielding, and record top speed.",
      historicalSignificance: "Maintains the record for the fastest naturally aspirated production car in history.",
      officialSource: "McLaren Special Operations Heritage Archive",
      valuationPrice: 21500000,
      availableTrims: [
        { name: "Road Car Standard Spec", price: 21500000 },
        { name: "LM Track Specification", price: 28000000 }
      ],
      colorOptions: [
        { name: "Magnesium Silver", hex: "#afb2b7" },
        { name: "Papaya Historic Orange", hex: "#ff8000" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 2000 to 2009 (Early Modern Era)
  {
    vehicleId: "veh_porsche_carrera_gt_2004",
    manufacturer: {
      name: "Porsche",
      country: "Germany",
      foundedYear: 1931
    },
    vehicle: {
      name: "Carrera GT",
      fullName: "Porsche Carrera GT V10",
      modelCode: "Typ 980",
      generation: "V10 Carbon Supercar",
      category: "Supercar",
      bodyType: "Removable Targa Open Top",
      modelYear: 2004,
      productionStartYear: 2004,
      productionEndYear: 2007,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "2000 to 2009 (Early Modern Era)"
    },
    specifications: {
      engineType: "Naturally Aspirated 68 Degree Le Mans Derived V10",
      engineCapacity: "5.7L",
      horsepower: 603,
      transmission: "6 Speed Manual with Beechwood Shift Knob and PCCC Ceramic Clutch",
      drivetrain: "Rear Mid Engine Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "205 mph",
      acceleration: "3.5 sec 0 to 60 mph",
      curbWeight: "3042 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/porsche_carrera_gt_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Porsche Exclusive Manufaktur Stuttgart"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 2900,
      weeklyRate: 17500,
      monthlyRate: 65000,
      depositAmount: 9000,
      currency: "USD"
    },
    metadata: {
      description: "An unfiltered analog supercar evolved from Porsche V10 LMP2000 endurance racing program with pushrod suspension.",
      historicalSignificance: "Considered one of the greatest naturally aspirated manual supercars ever engineered.",
      officialSource: "Porsche Archive Zuffenhausen",
      valuationPrice: 1450000,
      availableTrims: [
        { name: "Factory Targa Standard", price: 1450000 }
      ],
      colorOptions: [
        { name: "GT Silver Metallic", hex: "#bcc0c7" },
        { name: "Fayence Yellow", hex: "#ffc800" },
        { name: "Basalt Black Metallic", hex: "#161616" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_audi_r8_2007",
    manufacturer: {
      name: "Audi",
      country: "Germany",
      foundedYear: 1909
    },
    vehicle: {
      name: "R8",
      fullName: "Audi R8 4.2 FSI Quattro",
      modelCode: "Type 42",
      generation: "First Generation Type 42",
      category: "Sports Car",
      bodyType: "Mid Engine Coupe",
      modelYear: 2007,
      productionStartYear: 2006,
      productionEndYear: 2015,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "2000 to 2009 (Early Modern Era)"
    },
    specifications: {
      engineType: "4.2L High Revving Naturally Aspirated FSI V8",
      engineCapacity: "4.2L",
      horsepower: 420,
      transmission: "6 Speed Open Gated Manual Transmission",
      drivetrain: "Quattro Permanent All Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "187 mph",
      acceleration: "4.4 sec 0 to 60 mph",
      curbWeight: "3439 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/audi_r8_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Audi Tradition Ingolstadt Germany"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 650,
      weeklyRate: 3900,
      monthlyRate: 14500,
      depositAmount: 2000,
      currency: "USD"
    },
    metadata: {
      description: "Everyday mid engine supercar with Audi Space Frame aluminum chassis and contrasting exterior sideblades.",
      historicalSignificance: "Audi first true mid engine flagship production supercar.",
      officialSource: "Audi Historical Archives Ingolstadt",
      valuationPrice: 85000,
      availableTrims: [
        { name: "4.2 FSI V8 Gated Manual", price: 85000 },
        { name: "5.2 FSI V10 Plus", price: 125000 }
      ],
      colorOptions: [
        { name: "Daytona Grey Pearl with Carbon Blade", hex: "#4d5154" },
        { name: "Ibis White with Oxygen Silver Blade", hex: "#f3f3f3" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 2010 to 2019 (Contemporary Era)
  {
    vehicleId: "veh_ferrari_laferrari_2013",
    manufacturer: {
      name: "Ferrari",
      country: "Italy",
      foundedYear: 1939
    },
    vehicle: {
      name: "LaFerrari",
      fullName: "Ferrari LaFerrari HY KERS",
      modelCode: "F150",
      generation: "HY KERS Flagship Hypercar",
      category: "Hypercar",
      bodyType: "Carbon Monocoque Hypercar",
      modelYear: 2013,
      productionStartYear: 2013,
      productionEndYear: 2018,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "2010 to 2019 (Contemporary Era)"
    },
    specifications: {
      engineType: "6.3L Naturally Aspirated 65 Degree V12 with HY KERS Electric Motor",
      engineCapacity: "6.3L",
      horsepower: 950,
      transmission: "7 Speed Dual Clutch F1 Transmission",
      drivetrain: "Rear Wheel Drive with E Diff",
      fuelType: "Hybrid Electric and Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "217 mph",
      acceleration: "2.4 sec 0 to 60 mph",
      curbWeight: "2767 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/ferrari_laferrari_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Ferrari Maranello Special Projects"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 7500,
      weeklyRate: 45000,
      monthlyRate: 160000,
      depositAmount: 25000,
      currency: "USD"
    },
    metadata: {
      description: "Ferrari first production hybrid hypercar, combining Formula 1 KERS electric energy recovery with a 9250 RPM screaming V12.",
      historicalSignificance: "Member of the revered Holy Trinity hypercar trio.",
      officialSource: "Ferrari Historical Archives Maranello",
      valuationPrice: 4200000,
      availableTrims: [
        { name: "LaFerrari Coupe", price: 4200000 },
        { name: "Aperta Open Top Limited", price: 5800000 }
      ],
      colorOptions: [
        { name: "Rosso Corsa", hex: "#d40000" },
        { name: "Nero", hex: "#0a0a0a" },
        { name: "Giallo Modena", hex: "#ffcc00" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_bugatti_chiron_2016",
    manufacturer: {
      name: "Bugatti",
      country: "France",
      foundedYear: 1909
    },
    vehicle: {
      name: "Chiron",
      fullName: "Bugatti Chiron Quad Turbo W16",
      modelCode: "Chiron Base",
      generation: "Quad Turbo W16 Flagship",
      category: "Hypercar",
      bodyType: "Carbon Fiber Grand Tourer Hypercar",
      modelYear: 2016,
      productionStartYear: 2016,
      productionEndYear: 2022,
      vehicleStatus: "discontinued",
      vehicleClassification: "production_vehicle",
      era: "2010 to 2019 (Contemporary Era)"
    },
    specifications: {
      engineType: "8.0L Quad Turbocharged 64 Valve W16 Engine",
      engineCapacity: "8.0L",
      horsepower: 1479,
      transmission: "7 Speed Dual Clutch Ricardo Transmission",
      drivetrain: "Permanent All Wheel Drive with Electronically Controlled Diff",
      fuelType: "Premium 98 Octane Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "261 mph",
      acceleration: "2.4 sec 0 to 60 mph",
      curbWeight: "4398 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/bugatti_chiron_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Bugatti Automobiles SAS Molsheim"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 6000,
      weeklyRate: 36000,
      monthlyRate: 130000,
      depositAmount: 20000,
      currency: "USD"
    },
    metadata: {
      description: "Summit of automotive high luxury and straight line speed powered by four two stage turbochargers.",
      historicalSignificance: "Successor to the Veyron, holding multiple acceleration and decelerating records.",
      officialSource: "Bugatti Archives Molsheim France",
      valuationPrice: 3200000,
      availableTrims: [
        { name: "Chiron Base", price: 3200000 },
        { name: "Chiron Sport", price: 3600000 }
      ],
      colorOptions: [
        { name: "French Racing Blue and Atlantic Blue", hex: "#0066cc" },
        { name: "Nocturne Black and Italian Red", hex: "#111111" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },

  // 2020 to 2026 (Modern and Latest Generation)
  {
    vehicleId: "veh_porsche_911_carrera_s_2024",
    manufacturer: {
      name: "Porsche",
      country: "Germany",
      foundedYear: 1931
    },
    vehicle: {
      name: "911",
      fullName: "Porsche 911 Carrera S",
      modelCode: "992.1 and 992.2",
      generation: "Eighth Generation 992",
      category: "Sports Coupe" as any,
      bodyType: "Rear Engine Sports Coupe",
      modelYear: 2024,
      productionStartYear: 2019,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "3.0L Twin Turbocharged Boxer 6",
      engineCapacity: "3.0L",
      horsepower: 443,
      transmission: "8 Speed Dual Clutch PDK",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 4,
      doors: 2,
      topSpeed: "191 mph",
      acceleration: "3.5 sec 0 to 60 mph",
      curbWeight: "3298 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/porsche_911_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Porsche AG Official Press Fleet"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 850,
      weeklyRate: 5100,
      monthlyRate: 19000,
      depositAmount: 3000,
      currency: "USD"
    },
    metadata: {
      description: "The benchmark high performance sports car engineered with precision rear engine architecture and dynamic chassis control.",
      historicalSignificance: "Continuously refined 911 icon with over 60 years of production evolution.",
      officialSource: "Porsche AG Media Newsroom",
      valuationPrice: 131300,
      availableTrims: [
        { name: "Carrera S", price: 131300 },
        { name: "Carrera 4S All Wheel Drive", price: 138600 }
      ],
      colorOptions: [
        { name: "Guards Red", hex: "#d11212" },
        { name: "GT Silver Metallic", hex: "#c0c0c0" },
        { name: "Gentian Blue", hex: "#152e6f" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_bmw_m4_competition_2024",
    manufacturer: {
      name: "BMW",
      country: "Germany",
      foundedYear: 1916
    },
    vehicle: {
      name: "M4",
      fullName: "BMW M4 Competition Coupe",
      modelCode: "G82",
      generation: "Second Generation G82",
      category: "Coupe",
      bodyType: "High Performance Coupe",
      modelYear: 2024,
      productionStartYear: 2020,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "3.0L BMW M TwinPower Turbo S58 Inline 6",
      engineCapacity: "3.0L",
      horsepower: 503,
      transmission: "8 Speed M Sport Automatic with Drivelogic",
      drivetrain: "M xDrive All Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 4,
      doors: 2,
      topSpeed: "180 mph",
      acceleration: "3.4 sec 0 to 60 mph",
      curbWeight: "3913 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/bmw_m4_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "BMW M GmbH Press Archive"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 650,
      weeklyRate: 3900,
      monthlyRate: 14500,
      depositAmount: 2000,
      currency: "USD"
    },
    metadata: {
      description: "Track inspired performance vehicle combining razor sharp dynamics with everyday executive road presence.",
      historicalSignificance: "Carries forward five decades of BMW Motorsport competition lineage.",
      officialSource: "BMW Group PressClub",
      valuationPrice: 86300,
      availableTrims: [
        { name: "Competition", price: 86300 },
        { name: "Competition M xDrive", price: 90400 }
      ],
      colorOptions: [
        { name: "Isle of Man Green", hex: "#165842" },
        { name: "Sao Paulo Yellow", hex: "#ddff00" },
        { name: "Black Sapphire", hex: "#111111" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_mercedes_amg_gt_2024",
    manufacturer: {
      name: "Mercedes Benz",
      country: "Germany",
      foundedYear: 1926
    },
    vehicle: {
      name: "AMG GT",
      fullName: "Mercedes AMG GT 63 4MATIC Plus",
      modelCode: "C192",
      generation: "Second Generation C192",
      category: "Supercar",
      bodyType: "Grand Tourer Coupe",
      modelYear: 2024,
      productionStartYear: 2023,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "Handcrafted 4.0L AMG V8 Biturbo M177",
      engineCapacity: "4.0L",
      horsepower: 577,
      transmission: "AMG SPEEDSHIFT MCT 9 Speed",
      drivetrain: "AMG Performance 4MATIC Plus Fully Variable",
      fuelType: "Premium Gasoline",
      seatingCapacity: 4,
      doors: 2,
      topSpeed: "196 mph",
      acceleration: "3.1 sec 0 to 60 mph",
      curbWeight: "4178 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/mercedes_amg_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Mercedes AMG Media Fleet Affalterbach"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 1100,
      weeklyRate: 6600,
      monthlyRate: 24000,
      depositAmount: 3500,
      currency: "USD"
    },
    metadata: {
      description: "Handcrafted grand touring machine built on an advanced aluminum spaceframe chassis with active roll stabilization.",
      historicalSignificance: "Affalterbach flagship grand tourer engineered exclusively by AMG.",
      officialSource: "Mercedes Benz Media Global",
      valuationPrice: 175900,
      availableTrims: [
        { name: "GT 55 4MATIC Plus", price: 134900 },
        { name: "GT 63 4MATIC Plus", price: 175900 }
      ],
      colorOptions: [
        { name: "Solarbeam Yellow", hex: "#f0b300" },
        { name: "Selenite Grey Magno", hex: "#5a5f63" },
        { name: "Obsidian Black", hex: "#0b0b0d" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_audi_rs7_2024",
    manufacturer: {
      name: "Audi",
      country: "Germany",
      foundedYear: 1909
    },
    vehicle: {
      name: "RS7",
      fullName: "Audi RS7 Sportback Performance",
      modelCode: "Type 4K8",
      generation: "Second Generation 4K8",
      category: "Sedan",
      bodyType: "Executive 5 Door Sportback",
      modelYear: 2024,
      productionStartYear: 2019,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "4.0L Twin Turbo V8 with 48V Mild Hybrid",
      engineCapacity: "4.0L",
      horsepower: 621,
      transmission: "8 Speed Tiptronic Sport Automatic",
      drivetrain: "Quattro Permanent All Wheel Drive with Sport Differential",
      fuelType: "Premium Gasoline",
      seatingCapacity: 5,
      doors: 5,
      topSpeed: "190 mph",
      acceleration: "3.3 sec 0 to 60 mph",
      curbWeight: "4740 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/audi_rs7_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Audi Sport GmbH Media Archive Neckarsulm"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 780,
      weeklyRate: 4680,
      monthlyRate: 17500,
      depositAmount: 2500,
      currency: "USD"
    },
    metadata: {
      description: "The ultimate synthesis of four door sportback utility and ferocious twin turbo V8 motorsport acceleration.",
      historicalSignificance: "Audi Sport flagship performance executive fastback.",
      officialSource: "Audi MediaCenter Germany",
      valuationPrice: 127800,
      availableTrims: [
        { name: "Performance Edition", price: 127800 },
        { name: "Bronze Edition Limited", price: 141000 }
      ],
      colorOptions: [
        { name: "Nardo Gray", hex: "#8c8e90" },
        { name: "Tango Red Metallic", hex: "#9b111e" },
        { name: "Mythos Black Metallic", hex: "#141416" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_ferrari_f8_2024",
    manufacturer: {
      name: "Ferrari",
      country: "Italy",
      foundedYear: 1939
    },
    vehicle: {
      name: "F8",
      fullName: "Ferrari F8 Tributo Berlinetta",
      modelCode: "Tipo F142MFL",
      generation: "Tributo Berlinetta",
      category: "Supercar",
      bodyType: "Mid Engine Berlinetta",
      modelYear: 2024,
      productionStartYear: 2019,
      productionEndYear: 2023,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "3.9L 90 Degree Twin Turbo V8 F154",
      engineCapacity: "3.9L",
      horsepower: 710,
      transmission: "7 Speed Dual Clutch F1 Gearbox",
      drivetrain: "Rear Wheel Drive with E Diff3",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "211 mph",
      acceleration: "2.9 sec 0 to 60 mph",
      curbWeight: "3164 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/ferrari_f8_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Ferrari Media Maranello"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 1800,
      weeklyRate: 10800,
      monthlyRate: 39000,
      depositAmount: 5000,
      currency: "USD"
    },
    metadata: {
      description: "An Italian automotive masterpiece paying homage to the most powerful V8 engine in Ferrari production history.",
      historicalSignificance: "Tribute to the multi award winning Ferrari twin turbo V8 engine family.",
      officialSource: "Ferrari Corporate Communications",
      valuationPrice: 280000,
      availableTrims: [
        { name: "Berlinetta", price: 280000 },
        { name: "Assetto Fiorano Track Package", price: 315000 }
      ],
      colorOptions: [
        { name: "Rosso Corsa", hex: "#d40000" },
        { name: "Giallo Modena", hex: "#ffcc00" },
        { name: "Nero Daytona", hex: "#000000" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_tesla_model_s_plaid_2024",
    manufacturer: {
      name: "Tesla",
      country: "United States",
      foundedYear: 2003
    },
    vehicle: {
      name: "Model S",
      fullName: "Tesla Model S Plaid Tri Motor",
      modelCode: "Palladium",
      generation: "Palladium Tri Motor Refresh",
      category: "Electric Vehicle",
      bodyType: "Electric Performance Sedan",
      modelYear: 2024,
      productionStartYear: 2021,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "Tri Motor All Wheel Drive with Carbon Sleeved Rotors",
      engineCapacity: null,
      horsepower: 1020,
      transmission: "Single Speed Fixed Gear with Torque Vectoring",
      drivetrain: "All Wheel Drive with Torque Vectoring",
      fuelType: "Pure Electric 100 kWh Lithium Ion Battery",
      seatingCapacity: 5,
      doors: 5,
      topSpeed: "200 mph",
      acceleration: "1.99 sec 0 to 60 mph",
      curbWeight: "4766 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/tesla_model_s_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Tesla Official Media Press Kit"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 550,
      weeklyRate: 3300,
      monthlyRate: 12000,
      depositAmount: 1500,
      currency: "USD"
    },
    metadata: {
      description: "The fastest accelerating production sedan on earth utilizing three independent carbon sleeved electric motors.",
      historicalSignificance: "Pioneered mass market sub two second zero to sixty production electric performance.",
      officialSource: "Tesla Press and Investor Relations",
      valuationPrice: 89990,
      availableTrims: [
        { name: "Plaid Tri Motor", price: 89990 },
        { name: "Plaid Track Package Ceramic", price: 109990 }
      ],
      colorOptions: [
        { name: "Ultra Red", hex: "#a80f1a" },
        { name: "Solid Black", hex: "#0c0c0c" },
        { name: "Pearl White Multi Coat", hex: "#f4f4f4" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_aston_martin_valkyrie_2025",
    manufacturer: {
      name: "Aston Martin",
      country: "United Kingdom",
      foundedYear: 1913
    },
    vehicle: {
      name: "Valkyrie",
      fullName: "Aston Martin Valkyrie AMR Pro Hypercar",
      modelCode: "AM RB 001",
      generation: "Formula 1 Derived Hypercar",
      category: "Hypercar",
      bodyType: "Formula 1 Derived Aero Monocoque",
      modelYear: 2025,
      productionStartYear: 2021,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "Cosworth 6.5L Naturally Aspirated V12 with Rimac KERS Hybrid",
      engineCapacity: "6.5L",
      horsepower: 1160,
      transmission: "7 Speed Ricardo Automated Single Clutch Manual",
      drivetrain: "Rear Wheel Drive",
      fuelType: "Hybrid Electric and Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "250 mph",
      acceleration: "2.3 sec 0 to 60 mph",
      curbWeight: "2205 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/aston_martin_valkyrie_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Aston Martin Lagonda Media Gaydon"
      },
      gallery: []
    },
    rental: {
      availableForRental: false,
      dailyRate: null,
      weeklyRate: null,
      monthlyRate: null,
      depositAmount: 50000,
      currency: "USD"
    },
    metadata: {
      description: "Formula 1 aerodynamic ground effect package co developed with Adrian Newey featuring a 11100 RPM screaming Cosworth V12.",
      historicalSignificance: "First true road car capable of generating its own weight in aerodynamic downforce.",
      officialSource: "Aston Martin Global Media",
      valuationPrice: 3500000,
      availableTrims: [
        { name: "Valkyrie Coupe", price: 3500000 },
        { name: "Valkyrie Spider", price: 4000000 }
      ],
      colorOptions: [
        { name: "Aston Martin Racing Green", hex: "#00594f" },
        { name: "Stirling Green with Lime", hex: "#1c3c34" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_porsche_taycan_2026",
    manufacturer: {
      name: "Porsche",
      country: "Germany",
      foundedYear: 1931
    },
    vehicle: {
      name: "Taycan",
      fullName: "Porsche Taycan Turbo S Cross Turismo",
      modelCode: "J1 II",
      generation: "J1 Second Phase Facelift",
      category: "Electric Vehicle",
      bodyType: "Electric Cross Turismo Wagon",
      modelYear: 2026,
      productionStartYear: 2024,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "Dual Permanent Magnet Synchronous Motors 800V Architecture",
      engineCapacity: null,
      horsepower: 938,
      transmission: "2 Speed Rear Transmission Single Speed Front",
      drivetrain: "All Wheel Drive with Porsche Torque Vectoring Plus",
      fuelType: "Pure Electric 105 kWh Performance Battery Plus",
      seatingCapacity: 5,
      doors: 5,
      topSpeed: "162 mph",
      acceleration: "2.3 sec 0 to 60 mph",
      curbWeight: "5082 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/porsche_taycan_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "Porsche AG Media Newsroom Stuttgart"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 1250,
      weeklyRate: 7500,
      monthlyRate: 28000,
      depositAmount: 4000,
      currency: "USD"
    },
    metadata: {
      description: "Modern 2026 800 volt electric grand tourer with push to pass power boost and active electrohydraulic suspension.",
      historicalSignificance: "Sets the 2026 benchmark for high performance DC fast charging and active chassis control.",
      officialSource: "Porsche Newsroom 2026 Model Release",
      valuationPrice: 211700,
      availableTrims: [
        { name: "Turbo S Sedan", price: 209000 },
        { name: "Turbo S Cross Turismo", price: 211700 }
      ],
      colorOptions: [
        { name: "Oak Green Metallic Neo", hex: "#1e382b" },
        { name: "Frozen Blue Metallic", hex: "#91b9d4" },
        { name: "Volcano Grey Metallic", hex: "#3e4247" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  },
  {
    vehicleId: "veh_corvette_z06_2026",
    manufacturer: {
      name: "Chevrolet",
      country: "United States",
      foundedYear: 1911
    },
    vehicle: {
      name: "Corvette Z06",
      fullName: "Chevrolet Corvette Z06 3LZ",
      modelCode: "C8 Z06",
      generation: "Eighth Generation Mid Engine C8",
      category: "Sports Car",
      bodyType: "Mid Engine Hardtop Coupe",
      modelYear: 2026,
      productionStartYear: 2023,
      productionEndYear: null,
      vehicleStatus: "production",
      vehicleClassification: "production_vehicle",
      era: "2020 to 2026 (Modern and Latest Generation)"
    },
    specifications: {
      engineType: "5.5L LT6 Flat Plane Crank Naturally Aspirated V8",
      engineCapacity: "5.5L",
      horsepower: 670,
      transmission: "8 Speed Tremec Dual Clutch Transmission",
      drivetrain: "Rear Mid Engine Rear Wheel Drive",
      fuelType: "Premium Gasoline",
      seatingCapacity: 2,
      doors: 2,
      topSpeed: "195 mph",
      acceleration: "2.6 sec 0 to 60 mph",
      curbWeight: "3434 lbs"
    },
    images: {
      primaryImage: {
        url: "/images/cars/mercedes_amg_real.png",
        format: "PNG",
        background: "transparent",
        verified: true,
        source: "General Motors Media Center Detroit"
      },
      gallery: []
    },
    rental: {
      availableForRental: true,
      dailyRate: 800,
      weeklyRate: 4800,
      monthlyRate: 17500,
      depositAmount: 2500,
      currency: "USD"
    },
    metadata: {
      description: "Mid engine American supercar featuring the world most powerful naturally aspirated production V8 with 8600 RPM redline.",
      historicalSignificance: "First production mid engine flat plane crank V8 Corvette in nameplate history.",
      officialSource: "Chevrolet Media Information",
      valuationPrice: 112700,
      availableTrims: [
        { name: "1LZ Standard", price: 112700 },
        { name: "3LZ with Z07 Carbon Aero Package", price: 142000 }
      ],
      colorOptions: [
        { name: "Torch Red", hex: "#c91414" },
        { name: "Amplify Orange Tintcoat", hex: "#e55b13" },
        { name: "Carbon Flash Metallic", hex: "#1c1c1c" }
      ],
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z"
    }
  }
]
