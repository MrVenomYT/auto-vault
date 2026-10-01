import { VehicleGeneration } from "../types/vehicle"

export const GENERATIONS_DB: VehicleGeneration[] = [
  // Pioneering
  {
    id: "gen_benz_motorwagen_1",
    manufacturerId: "benz_and_cie",
    modelName: "Patent Motorwagen",
    generationName: "Model Number 1",
    modelCode: "Typ 1",
    startYear: 1886,
    endYear: 1893
  },
  {
    id: "gen_daimler_motor_carriage",
    manufacturerId: "daimler_motoren_gesellschaft",
    modelName: "Motorized Carriage",
    generationName: "Original Four Wheel Prototype",
    modelCode: "DMG 1886",
    startYear: 1886,
    endYear: 1889
  },
  {
    id: "gen_ford_quadricycle",
    manufacturerId: "ford",
    modelName: "Quadricycle Runabout",
    generationName: "Henry Ford First Experimental Vehicle",
    modelCode: "Quad 1",
    startYear: 1896,
    endYear: 1901
  },
  // Early Production 1900 to 1919
  {
    id: "gen_oldsmobile_curved_dash",
    manufacturerId: "oldsmobile",
    modelName: "Curved Dash Model R",
    generationName: "First Mass Production Automobile",
    modelCode: "Model R",
    startYear: 1901,
    endYear: 1907
  },
  {
    id: "gen_ford_model_t",
    manufacturerId: "ford",
    modelName: "Model T",
    generationName: "Universal Model T Production",
    modelCode: "Tin Lizzie",
    startYear: 1908,
    endYear: 1927
  },
  {
    id: "gen_cadillac_type_51",
    manufacturerId: "cadillac",
    modelName: "Type 51 V8",
    generationName: "First Mass Produced V8 Engine",
    modelCode: "Type 51",
    startYear: 1914,
    endYear: 1917
  },
  // Classic 1920 to 1939
  {
    id: "gen_duesenberg_model_j",
    manufacturerId: "duesenberg",
    modelName: "Model J",
    generationName: "Duesenberg Straight 8 Luxury Series",
    modelCode: "J Chassis",
    startYear: 1928,
    endYear: 1937
  },
  {
    id: "gen_bugatti_type_57",
    manufacturerId: "bugatti",
    modelName: "Type 57SC",
    generationName: "Jean Bugatti Atlantic and Atalante Series",
    modelCode: "Type 57SC",
    startYear: 1934,
    endYear: 1940
  },
  // Post War 1940 to 1959
  {
    id: "gen_porsche_356_a",
    manufacturerId: "porsche",
    modelName: "356",
    generationName: "356 A Series",
    modelCode: "356A",
    startYear: 1955,
    endYear: 1959
  },
  {
    id: "gen_corvette_c1",
    manufacturerId: "chevrolet",
    modelName: "Corvette",
    generationName: "First Generation C1",
    modelCode: "C1",
    startYear: 1953,
    endYear: 1962
  },
  {
    id: "gen_mercedes_w198",
    manufacturerId: "mercedes_benz",
    modelName: "300 SL",
    generationName: "W198 Gullwing and Roadster Series",
    modelCode: "W198",
    startYear: 1954,
    endYear: 1963
  },
  // Golden Age 1960 to 1979
  {
    id: "gen_jaguar_e_type_s1",
    manufacturerId: "jaguar",
    modelName: "E Type",
    generationName: "Series 1 3.8 and 4.2",
    modelCode: "XKE Series 1",
    startYear: 1961,
    endYear: 1968
  },
  {
    id: "gen_ferrari_250_gto",
    manufacturerId: "ferrari",
    modelName: "250 GTO",
    generationName: "Series 1 Homologation Special",
    modelCode: "Tipo 539 62 Comp",
    startYear: 1962,
    endYear: 1964
  },
  {
    id: "gen_aston_martin_db5",
    manufacturerId: "aston_martin",
    modelName: "DB5",
    generationName: "DB5 Grand Tourer Generation",
    modelCode: "DB5",
    startYear: 1963,
    endYear: 1965
  },
  {
    id: "gen_dodge_charger_b_body",
    manufacturerId: "dodge",
    modelName: "Charger",
    generationName: "Second Generation B Body",
    modelCode: "B Body Gen 2",
    startYear: 1968,
    endYear: 1970
  },
  {
    id: "gen_lamborghini_countach_lp400",
    manufacturerId: "lamborghini",
    modelName: "Countach",
    generationName: "LP400 Periscopio First Generation",
    modelCode: "LP400",
    startYear: 1974,
    endYear: 1978
  },
  // Modern Classic 1980 to 1999
  {
    id: "gen_porsche_959",
    manufacturerId: "porsche",
    modelName: "959",
    generationName: "Group B Homologation Supercar",
    modelCode: "Typ 959",
    startYear: 1986,
    endYear: 1993
  },
  {
    id: "gen_ferrari_f40",
    manufacturerId: "ferrari",
    modelName: "F40",
    generationName: "40th Anniversary Supercar",
    modelCode: "Tipo F120",
    startYear: 1987,
    endYear: 1992
  },
  {
    id: "gen_mclaren_f1",
    manufacturerId: "mclaren",
    modelName: "F1",
    generationName: "Central Seat Monocoque Supercar",
    modelCode: "F1 XP",
    startYear: 1992,
    endYear: 1998
  },
  {
    id: "gen_toyota_supra_a80",
    manufacturerId: "toyota",
    modelName: "Supra",
    generationName: "Fourth Generation A80",
    modelCode: "JZA80",
    startYear: 1993,
    endYear: 2002
  },
  {
    id: "gen_nissan_skyline_r34",
    manufacturerId: "nissan",
    modelName: "Skyline GT R",
    generationName: "Tenth Generation R34",
    modelCode: "BNR34",
    startYear: 1999,
    endYear: 2002
  },
  // Early Modern 2000 to 2009
  {
    id: "gen_porsche_carrera_gt",
    manufacturerId: "porsche",
    modelName: "Carrera GT",
    generationName: "V10 Carbon Supercar",
    modelCode: "Typ 980",
    startYear: 2004,
    endYear: 2007
  },
  {
    id: "gen_ford_gt_first_gen",
    manufacturerId: "ford",
    modelName: "GT",
    generationName: "Centennial Supercharged V8",
    modelCode: "GT40 Homage",
    startYear: 2004,
    endYear: 2006
  },
  {
    id: "gen_audi_r8_type_42",
    manufacturerId: "audi",
    modelName: "R8",
    generationName: "First Generation Type 42",
    modelCode: "Type 42",
    startYear: 2006,
    endYear: 2015
  },
  // Contemporary 2010 to 2019
  {
    id: "gen_ferrari_laferrari",
    manufacturerId: "ferrari",
    modelName: "LaFerrari",
    generationName: "HY KERS Flagship Hypercar",
    modelCode: "F150",
    startYear: 2013,
    endYear: 2018
  },
  {
    id: "gen_porsche_918_spyder",
    manufacturerId: "porsche",
    modelName: "918 Spyder",
    generationName: "Plug In Hybrid V8 Hypercar",
    modelCode: "Typ 918",
    startYear: 2013,
    endYear: 2015
  },
  {
    id: "gen_bugatti_chiron",
    manufacturerId: "bugatti",
    modelName: "Chiron",
    generationName: "Quad Turbo W16 Flagship",
    modelCode: "Chiron Base",
    startYear: 2016,
    endYear: 2022
  },
  // Modern and 2020 to 2026
  {
    id: "gen_porsche_911_992",
    manufacturerId: "porsche",
    modelName: "911",
    generationName: "Eighth Generation 992",
    modelCode: "992.1 and 992.2",
    startYear: 2019,
    endYear: null
  },
  {
    id: "gen_bmw_m4_g82",
    manufacturerId: "bmw",
    modelName: "M4",
    generationName: "Second Generation G82",
    modelCode: "G82",
    startYear: 2020,
    endYear: null
  },
  {
    id: "gen_mercedes_amg_gt_c192",
    manufacturerId: "mercedes_benz",
    modelName: "AMG GT",
    generationName: "Second Generation C192",
    modelCode: "C192",
    startYear: 2023,
    endYear: null
  },
  {
    id: "gen_audi_rs7_4k8",
    manufacturerId: "audi",
    modelName: "RS7",
    generationName: "Second Generation 4K8",
    modelCode: "Type 4K8",
    startYear: 2019,
    endYear: null
  },
  {
    id: "gen_ferrari_f8",
    manufacturerId: "ferrari",
    modelName: "F8",
    generationName: "Tributo Berlinetta",
    modelCode: "Tipo F142MFL",
    startYear: 2019,
    endYear: 2023
  },
  {
    id: "gen_tesla_model_s_palladium",
    manufacturerId: "tesla",
    modelName: "Model S",
    generationName: "Palladium Tri Motor Refresh",
    modelCode: "Palladium",
    startYear: 2021,
    endYear: null
  },
  {
    id: "gen_aston_martin_valkyrie",
    manufacturerId: "aston_martin",
    modelName: "Valkyrie",
    generationName: "Formula 1 Derived Hypercar",
    modelCode: "AM RB 001",
    startYear: 2021,
    endYear: null
  },
  {
    id: "gen_porsche_taycan_j1_2",
    manufacturerId: "porsche",
    modelName: "Taycan",
    generationName: "J1 Second Phase Facelift",
    modelCode: "J1 II",
    startYear: 2024,
    endYear: null
  },
  {
    id: "gen_corvette_c8_z06",
    manufacturerId: "chevrolet",
    modelName: "Corvette Z06",
    generationName: "Eighth Generation Mid Engine C8",
    modelCode: "C8 Z06",
    startYear: 2023,
    endYear: null
  }
]
