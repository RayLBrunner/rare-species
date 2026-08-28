import type { EcoRegion } from "@/types/species";

export type FilterKey = keyof import("@/types/species").Species;

export interface QuizOption {
  label: string;
  value: string;
  detail: string;
  emoji?: string;
  // West Side maps to ["ME", "CR", "WV", "WC"], East Side Mountains to ["EC", "KM", "BM", "BR"], etc.
  // Array because one quiz answer can span multiple ecoregion codes
  ecoregionCodes?: EcoRegion[];
  image?: string;
  citation?: string;
  backgroundColor?: string;
}

export interface QuizQuestion {
  id: string;
  eyebrow: string;
  prompt: string;
  description: string;
  filterKey: FilterKey;
  // Controls conditional rendering — question only appears if a previous answer matches
  showIf?: {
    questionId: string;
    value: string;
  };
  // G1 skips the S rank question entirely per Ray's doc
  skipNextIf?: string;
  // varSsp filter is not a value match — presence of the field is what matters
  hasVarSspFilter?: boolean;
  // commonName filter excludes generic names like "A mayfly", "Moss" etc from Ray's doc
  exclusionList?: string[];
  options: QuizOption[];
}

export const COMMON_NAME_EXCLUSIONS = [
  "A mayfly",
  "A caddisfly",
  "Liverwort",
  "Moss",
  "Lichen",
  "Fungus",
  "Brown marine alga",
  "Red marine alga",
  "A miner bee",
  "A noctuid moth",
];

export const questions: QuizQuestion[] = [
  {
    id: "ecoregion",
    eyebrow: "Ecoregion",
    prompt: "Select your safe space. Where would you call home?",
    description: "Your answer will narrow the species pool by region.",
    filterKey: "ecoregion",
    options: [
      {
        label: "West Side",
        value: "westSide",
        detail: "Lush forests, wet meadows and beaches",
        image:
          "/images/eco-region/CoastRange_USFS_PublicDomain_24514265823_c0949b9432_o.webp",
        ecoregionCodes: ["ME", "CR", "WV", "WC"],
      },
      {
        label: "East Side",
        value: "eastSide",
        detail: "High and dry",
        image:
          "/images/eco-region/BasinRange_IMG_20200627_112438_RBrunner.webp",
        ecoregionCodes: [],
      },
    ],
  },

  {
    id: "ecoregionEastSide",
    eyebrow: "East Side",
    prompt: "High and dry — but which kind?",
    description: "Pick your preferred East Side landscape.",
    filterKey: "ecoregion",
    showIf: { questionId: "ecoregion", value: "eastSide" },
    options: [
      {
        label: "Mountains",
        value: "eastSideMountains",
        detail: "I'm into trees",
        image:
          "/images/eco-region/2BlueMountains_RBrunner_IMG_20160903_123752086_HDR.webp",
        ecoregionCodes: ["EC", "KM", "BM", "BR"],
      },
      {
        label: "Steppe",
        value: "eastSideSteppe",
        detail: "Big skies and room to roam",
        image:
          "/images/eco-region/BlueMountains_IMG_20160905_073837231_HDR.webp",
        ecoregionCodes: ["CB", "BR"],
      },
    ],
  },

  {
    id: "mobility",
    eyebrow: "Taxonomic Groups",
    prompt: "How do you feel about movement?",
    description: "This determines which branch of the tree of life we explore.",
    filterKey: "category1",
    options: [
      {
        label: "I've got antsy feet. New day, new view.",
        value: "motile",
        detail: "Motile / Animals",
        image: "/images/species/875.webp",
      },
      {
        label:
          "I'm a real home-maker. Let's dig in and make a home where we are.",
        value: "sessile",
        detail: "Sessile / Plants",
        image: "/images/species/2036.webp",
        citation: "David Anderson · CC-BY",
      },
    ],
  },

  {
    id: "backbone",
    eyebrow: "Animal Type",
    prompt: "How necessary are backbones anyway?",
    description: "Pick your preferred body plan.",
    filterKey: "category1",
    showIf: { questionId: "mobility", value: "motile" },
    options: [
      {
        label:
          "Don't make me get out a microscope. Besides, isn't a backbone kind of important?",
        value: "vertebrateAnimals",
        detail: "Vertebrates",
        image: "/images/species/415294.webp",
        citation: "John Hibbard · CC-BY",
      },
      {
        label: "Standard body plan? How boring! Let's get weird.",
        value: "invertebrateAnimals",
        detail: "Invertebrates",
        image: "/images/species/1215.webp",
        citation: "Kathy Fulton · CC-0",
      },
    ],
  },

  {
    id: "vascular",
    eyebrow: "Plant Type",
    prompt: "How do you feel about internal transport structures?",
    description: "Pick your preferred level of structural complexity.",
    filterKey: "list",
    showIf: { questionId: "mobility", value: "sessile" },
    options: [
      {
        label:
          "Let's get big! Bring on the structural innovation! Giant tree trunks and showy flowers.",
        value: "vascularPlants",
        detail: "Vascular",
        image: "/images/eco-region/2WestCascades_RBrunner.webp",
      },
      {
        label:
          "If it ain't broke, don't fix it. I'd rather perfect a smaller system than worry about a new set of structural variables.",
        value: "nonvascularPlantsAndFungi",
        detail: "Nonvascular",
        image: "/images/species/365886.webp",
        citation: "Diego Blanco · CC-0",
      },
    ],
  },

  {
    id: "nonVascularType",
    eyebrow: "NonVascular Type",
    prompt: "Which is cooler?",
    description: "The final split in the sessile branch.",
    filterKey: "category1",
    showIf: { questionId: "vascular", value: "nonvascularPlantsAndFungi" },
    options: [
      {
        label: "Photosynthesis. Making energy from sunlight.",
        value: "bryophytes",
        detail: "Bryophytes",
        image: "/images/species/1870.webp",
        citation: "Matt Unitis · CC-BY-NC",
      },
      {
        label:
          "The fungus among us. They are more closely related to animals than plants!",
        value: "fungiAndLichen",
        detail: "Fungi and Lichen",
        image: "/images/species/10164.webp",
        citation: "Connor Dooley · CC-BY-NC",
      },
    ],
  },

  {
    id: "speciesUnit",
    eyebrow: "Species Unit",
    prompt: "How attached are you to the concept of a species?",
    description: "Full species or finer level.",
    filterKey: "varSsp",
    hasVarSspFilter: true,
    options: [
      {
        label:
          "Isn't that like the basic unit of diversity? Full unique species only please.",
        value: "fullSpecies",
        detail: "Full species",
        emoji: "🔬",
      },
      {
        label:
          "I find it pleasing to identify subtle patterns. If the scientists think this organism is different enough that's good enough for me.",
        value: "hasVarSsp",
        detail: "Subspecies, variety, or population",
        emoji: "🔍",
      },
    ],
  },

  {
    id: "globalRank",
    eyebrow: "Global Rank",
    prompt:
      "Globally, how rare are we talking? What are my chances of meeting this organism? What are its chances of meeting the 2050s?",
    description: "Your answer narrows the pool by global conservation status.",
    filterKey: "globalRank",
    skipNextIf: "G1",
    options: [
      {
        label:
          "G1 — The rarest of the rare! These organisms are dealing with some serious headwinds, things like being found at just a handful of sites, very low numbers of individuals, and dire threats.",
        value: "G1",
        detail:
          "Critically rare in Oregon and globally — state rank question skipped",
        backgroundColor: "bg-[#c71945]",
      },
      {
        label:
          "G2 — Pretty darn rare! These organisms are hanging in there a bit better than the rarest of the rare. More individuals, more locations, more chance to meet them yourself.",
        value: "G2",
        detail: "Very rare",
        backgroundColor: "bg-[#d6420f]",
      },
      {
        label:
          "G3 — Moderately rare. Compared to the rarest organisms, these species still have some serious strengths, which means that they may also have some of the greatest possibilities for recovery. These often-overlooked organisms are by no means secure and are often in greatest need of a champion.",
        value: "G3",
        detail: "Moderately rare",
        backgroundColor: "bg-[#b59b00]",
      },
      {
        label:
          "G4 or G5 — Let's play it safe, I want something that is doing okay outside of Oregon. These organisms have a more robust population globally.",
        value: "G4G5",
        detail: "More common globally",
        backgroundColor: "bg-[#4e8f12]",
      },
    ],
  },

  {
    id: "stateRank",
    eyebrow: "S Rank",
    prompt:
      "Ok, but the whole world is a big place. Give me the local gossip, how rare is this species in Oregon specifically?",
    description: "Only shown if you didn't pick G1.",
    filterKey: "stateRank",
    showIf: { questionId: "globalRank", value: "G1" },
    options: [
      {
        label: "S1 — So very rare!",
        value: "S1",
        detail: "Critically rare in Oregon",
        backgroundColor: "bg-[#c71945]",
      },
      {
        label: "S2 — Pretty darn rare.",
        value: "S2",
        detail: "Very rare in Oregon",
        backgroundColor: "bg-[#d6420f]",
      },
      {
        label: "S3 — Moderately rare.",
        value: "S3",
        detail: "Moderately rare in Oregon",
        backgroundColor: "bg-[#b59b00]",
      },
      {
        label: "Surprise me!",
        value: "any",
        detail: "Any rarity level",
        backgroundColor: "bg-[#0d6b37]",
      },
    ],
  },

  {
    id: "commonName",
    eyebrow: "Common Name",
    prompt: "How attached are you to pronouncing the Species Name?",
    description: "Some species only have scientific names.",
    filterKey: "commonName",
    exclusionList: COMMON_NAME_EXCLUSIONS,
    options: [
      {
        label: "Yes, there should at least be a common name for this thing.",
        value: "hasCommonName",
        detail: "Has a common name",
        emoji: "🗣️",
      },
      {
        label:
          "Not very. I am prepared to sound silly as I stumble through a Greek or Latin-inspired Scientific Name. No one will laugh, this is a safe space.",
        value: "anyName",
        detail: "Scientific name is fine",
        emoji: "📖",
      },
    ],
  },
];
