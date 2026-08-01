export const ECOREGION_NAMES: Record<string, string> = {
  BM: "Blue Mountains",
  BR: "N. Basin & Range",
  CB: "Columbia Basin",
  CR: "Coast Range",
  EC: "East Cascades",
  KM: "Klamath Mountains",
  ME: "Marine & Estuarine",
  WC: "West Cascades",
  WV: "Willamette Valley",
};

export const ECOREGION_COLORS: Record<string, string> = {
  BM: "bg-[#5b4bb7]",
  BR: "bg-[#8b6d14]",
  CB: "bg-[#6b5e4c]",
  CR: "bg-[#8a4f08]",
  EC: "bg-[#d94f00]",
  KM: "bg-[#4d7c0f]",
  ME: "bg-[#1a6b8a]",
  WC: "bg-[#9f8500]",
  WV: "bg-[#15803d]",
};

export const COUNTY_NAMES: Record<string, string> = {
  Bake: "Baker",
  Bent: "Benton",
  Clac: "Clackamas",
  Clat: "Clatsop",
  Colu: "Columbia",
  Coos: "Coos",
  Croo: "Crook",
  Curr: "Curry",
  Desc: "Deschutes",
  Doug: "Douglas",
  Gill: "Gilliam",
  Gran: "Grant",
  Harn: "Harney",
  Hood: "Hood River",
  Jack: "Jackson",
  Jeff: "Jefferson",
  Jose: "Josephine",
  Klam: "Klamath",
  Lake: "Lake",
  Lane: "Lane",
  Linc: "Lincoln",
  Linn: "Linn",
  Malh: "Malheur",
  Mari: "Marion",
  Morr: "Morrow",
  Mult: "Multnomah",
  Polk: "Polk",
  Sher: "Sherman",
  Till: "Tillamook",
  Umat: "Umatilla",
  Unio: "Union",
  Wall: "Wallowa",
  Wasc: "Wasco",
  Wash: "Washington",
  Whee: "Wheeler",
  Yamh: "Yamhill",
};

export const STATE_RANK_COLORS: Record<string, string> = {
  SX: "text-black",
  S1: "text-[#c71945]",
  S2: "text-[#d6420f]",
  S3: "text-[#b59b00]",
  S4: "text-[#4e8f12]",
  S5: "text-[#0d6b37]",
};

export const FEDERAL_RANK_LABELS: Record<string, string> = {
  E: "Endangered",
  T: "Threatened",
  PE: "Proposed Endangered",
  PT: "Proposed Threatened",
  C: "Candidate",
  SOC: "Species of Concern",
  PS: "Partial Status",
  UR: "Under Review",
  DL: "Delisted",
  PDL: "Proposed Delisted",
};

export const STATE_STATUS_LABELS: Record<string, string> = {
  LE: "Listed Endangered",
  LT: "Listed Threatened",
  PE: "Proposed Endangered",
  PT: "Proposed Threatened",
  C: "Candidate",
  SC: "Species of Concern",
  S: "Sensitive",
  SGCN: "Species of Greatest Conservation Need",
  SCIN: "Species of Great Information Need",
};

export const ORBIC_LIST_DESCRIPTIONS: Record<string, string> = {
  "1": "Endangered in Oregon",
  "2": "Threatened in Oregon",
  "3": "Sensitive / Vulnerable",
  "4": "Apparently Secure",
  "1-X": "Possibly Extinct in Oregon",
  "1-ex": "Extinct in Oregon",
  "2-ex": "Extinct",
};

export const LIST_FRIENDLY_NAMES: Record<string, string> = {
  vascularPlants: "Vascular Plants",
  nonvascularPlantsAndFungi: "Nonvascular Plants & Fungi",
  vertebrateAnimals: "Vertebrate Animals",
  invertebrateAnimals: "Invertebrate Animals",
};

const GLOBAL_RANK_DESCRIPTIONS: Record<string, string> = {
  G1: "Critically Imperiled",
  G2: "Imperiled",
  G3: "Vulnerable",
  G4: "Apparently Secure",
  G5: "Secure",
  GX: "Presumed Extinct",
  GH: "Possibly Extinct",
  GNR: "Not Yet Ranked",
  GU: "Unrankable",
  GNA: "Not Applicable",
};

const STATE_RANK_DESCRIPTIONS: Record<string, string> = {
  SX: "Presumed Extirpated from Oregon",
  S1: "Critically Imperiled in Oregon",
  S2: "Imperiled in Oregon",
  S3: "Vulnerable in Oregon",
  S4: "Apparently Secure in Oregon",
  S5: "Secure in Oregon",
  SH: "Possibly Extirpated from Oregon",
  SNR: "Not Ranked",
  SU: "Unrankable",
};

export function parseAbbrs(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.replace(/\s*\([^)]*\)/, "").replace("?", "").trim())
    .filter(Boolean);
}

export function getStateRankPrimary(stateRank: string): string {
  const ordered = ["SX", "S1", "S2", "S3", "S4", "S5", "SH", "SNR", "SU"];
  return ordered.find((r) => stateRank.includes(r)) ?? stateRank;
}

export function getStateRankDescription(stateRank: string): string {
  const primary = getStateRankPrimary(stateRank);
  return STATE_RANK_DESCRIPTIONS[primary] ?? stateRank;
}

export function getStateRankColor(stateRank: string): string {
  const primary = getStateRankPrimary(stateRank);
  return STATE_RANK_COLORS[primary] ?? "text-black";
}

export function getGlobalRankDescription(globalRank: string): string {
  const ordered = ["GX", "GH", "G1", "G2", "G3", "G4", "G5", "GNR", "GU", "GNA"];
  const match = ordered.find((r) => globalRank.includes(r));
  return match ? (GLOBAL_RANK_DESCRIPTIONS[match] ?? globalRank) : globalRank;
}

export function getOrEndemicFlag(orEndemic: string | undefined): boolean {
  return (orEndemic ?? "").toLowerCase() === "yes";
}
