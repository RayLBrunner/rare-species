// The canonical S-Rank list shared by ConservationRankBar (the filter bar on
// the /species page) and the homepage's Browse by Status cards, so both
// stay in sync on labels and colors.
export const stateRankBarItems = [
  {
    short: "SX",
    full: "SX Extinct",
    description: "Extinct",
    color: "bg-[#171717]",
  },
  {
    short: "S1",
    full: "S1 Crit. Imp.",
    description: "Critically Imperiled",
    color: "bg-[#c8103a]",
  },
  {
    short: "S2",
    full: "S2 Imperiled",
    description: "Imperiled",
    color: "bg-[#d94f00]",
  },
  {
    short: "S3",
    full: "S3 Vulnerable",
    description: "Vulnerable",
    color: "bg-[#9f8500]",
  },
  {
    short: "S4",
    full: "S4 App. Secure",
    description: "Apparently Secure",
    color: "bg-[#2f7d32]",
  },
  {
    short: "S5",
    full: "S5 Secure",
    description: "Secure",
    color: "bg-[#006b35]",
  },
];

// Maps a stateRankBarItems `short` code to the substring matched against a
// species' raw stateRank value (e.g. "S1" in "S1S2" or "S2B").
export const RANK_BAR_MAP: Record<string, string> = {
  "5X": "SX",
  S1: "S1",
  S2: "S2",
  S3: "S3",
  S4: "S4",
  S5: "S5",
};

export const filterRows = [
  {
    label: "Taxonomy",
    filters: [
      "All species",
      "Vascular Plants",
      "Nonvascular Plants and Fungi +",
      "Vertebrate Animals +",
      "Invertebrate Animals +",
    ],
  },
  {
    label: "Status",
    filters: [
      "Global Rank +",
      "State Rank +",
      "ORBIC list +",
      "Federal Status +",
      "State Status +",
      "ODFW SWAP +",
    ],
  },
  {
    label: "Geography",
    filters: ["All", "Ecoregion +", "County +", "OR Endemic"],
  },
];

// Maps Species["list"] values to the Taxonomy row's filter label, so a
// `list` value from the homepage can seed the Taxonomy filter directly.
export const LIST_TO_TAXONOMY_FILTER: Record<string, string> = {
  vascularPlants: "Vascular Plants",
  nonvascularPlantsAndFungi: "Nonvascular Plants and Fungi +",
  vertebrateAnimals: "Vertebrate Animals +",
  invertebrateAnimals: "Invertebrate Animals +",
};

export const dropdownOptions: Record<string, string[]> = {
  "Nonvascular Plants and Fungi +": [
    "Bryophtes",
    "Fungi and Lichen",
    "Kelp and Algae",
  ],
  "Vertebrate Animals +": [
    "Amphibians",
    "Birds",
    "Fishes",
    "Mammals",
    "Reptiles",
  ],
  "Invertebrate Animals +": ["Arthropods", "Molluscs", "Sea Stars", "Worms"],
  "Global Rank +": [
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "GN",
    "GX",
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "TU",
    "TN",
    "TX",
  ],
  "State Rank +": ["S1", "S2", "S3", "S4", "S5", "SX", "SN"],
  "ORBIC list +": ["1", "2", "3", "4"],
  "Federal Status +": ["E", "T", "PE", "PT", "PS", "C", "SOC", "UR", "DL"],
  "State Status +": ["C", "LE", "LT", "S", "SC"],
  "ODFW SWAP +": ["SGCN", "SGIN"],
  "Ecoregion +": [
    "Blue Mountains",
    "Northern Basin and Range",
    "Columbia Basin",
    "Coast Range",
    "East Cascades",
    "Klamath Mountains",
    "Marine and Estuarine",
    "West Cascades",
    "Willamette Valley",
  ],
  "County +": [
    "Baker",
    "Benton",
    "Clackamas",
    "Clatsop",
    "Columbia",
    "Coos",
    "Crook",
    "Curry",
    "Deschutes",
    "Douglas",
    "Gilliam",
    "Grant",
    "Harney",
    "Hood River",
    "Jackson",
    "Jefferson",
    "Josephine",
    "Klamath",
    "Lake",
    "Lane",
    "Lincoln",
    "Linn",
    "Malheur",
    "Marion",
    "Morrow",
    "Multnomah",
    "Polk",
    "Sherman",
    "Tillamook",
    "Umatilla",
    "Union",
    "Wallowa",
    "Wasco",
    "Washington",
    "Wheeler",
    "Yamhill",
  ],
};
