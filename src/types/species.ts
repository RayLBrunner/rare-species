// species.ts
// Defines the Species Interface

export type TaxonomicGroup =
  | "vascular_plant"
  | "nonvascular_plant"
  | "vertebrate"
  | "invertebrate"
  | "fungi"
  | "other";

export type OrbicRank = "S1" | "S2" | "S3" | "S4" | "S5" | "SH" | "SX";

export type FederalStatus = "LE" | "LT" | "C" | "SOC" | "none";

// ============================================================
// TBD — placeholder values until Ray's snapshot arrives.
// ============================================================

export type EcoRegion = "BM" | "BR" | "CB" | "CR" | "EC" | "KM" | "WC" | "WV";

export type HabitatType =
  | "forest"
  | "wetland"
  | "prairie"
  | "rocky"
  | "coastal"
  | "other";

// ============================================================
// Species
// ============================================================

export interface Species {
  // --- Identifiers ---
  slug: string;
  commonName: string;
  scientificName: string;

  // --- Taxonomy ---
  taxonomicGroup: TaxonomicGroup;
  family?: string;

  // TODO: Finish when we have Ray's column names
}

// ============================================================
// QuizFilters — tracks the user's answers as they go.
// One field per quiz question
// ============================================================
export interface QuizFilters {
  taxonomicGroup?: TaxonomicGroup;
  ecoRegion?: EcoRegion;
  habitatType?: HabitatType;
}