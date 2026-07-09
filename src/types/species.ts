/* species.ts
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
*/
/**
 * src/types/species.ts
 * 
 * Defines the Species Interface and associated types for the Oregon Rare 
 * Species Selection Guide.
 */

// ============================================================
// Export Type Definitions
// ============================================================

export type TaxonomicGroup =
  | "vascularPlant"     // Raw: Vascular
  | "nonvascularPlant"  // Raw: Non-Vascular
  | "vertebrate"        // Raw: Vertebrate
  | "invertebrate"      // Raw: Invertebrate
  | "fungi"             // Raw: Fungi
  | "other";

export type GlobalRank = "G1" | "G2" | "G3" | "G4" | "G5" | "GH" | "GX" | "other";

export type OrbicRank = "S1" | "S2" | "S3" | "S4" | "S5" | "SH" | "SX";

export type StateStatus = 
  | "listedEndangered"  // Raw: LE
  | "listedThreatened"  // Raw: LT
  | "none";

export type FederalStatus = 
  | "endangered"         // Raw: E or LE
  | "threatened"         // Raw: T or LT
  | "proposedEndangered" // Raw: PE
  | "proposedThreatened" // Raw: PT
  | "candidate"          // Raw: C
  | "speciesOfConcern"   // Raw: SOC
  | "none";

export type EcoRegion = "BM" | "BR" | "CB" | "CR" | "EC" | "KM" | "WC" | "WV";

export type SpeciesUnit = 
  | "species" 
  | "varietyOrSubspecies";

// ============================================================
// Species Interface
// ============================================================

export interface Species {
  // --- Identifiers ---
  slug: string;                          // Raw: ELCODE
  elementGlobalId: number;               // Raw: ELEMENT_GLOBAL_ID
  elementSubnationalId: number;          // Raw: ELEMENT_SUBNATIONAL_ID

  // --- Taxonomy & Names ---
  globalCommonName: string;              // Raw: GLOBAL_COMMMON_NAME (Triple 'M' in CSV)
  family: string;                        // Raw: FAMILY
  scientificName: string;                // Raw: SNAME
  formattedScientificName: string;       // Raw: FORMATTED_SCIENTIFIC_NAME (includes <i> tags)
  commonName: string;                    // Raw: SCOMNAME / STATE_COMMON_NAME

  // --- Status ---
  globalRank: GlobalRank;                // Raw: G_RANK
  orbicRank: OrbicRank;                  // Raw: S_RANK
  stateStatus?: StateStatus;             // Raw: STATE_PROTECTION_STATUS
  federalStatus?: FederalStatus;         // Raw: ENDANGERED_SPP_ACT_STATUS

  // --- Descriptions & Narrative ---
  rankReasons?: string;                  // Raw: S_RANK_REASONS
  diagnosticCharacteristics?: string;    // Raw: DIAGNOSTIC_CHARACTERISTICS
  description?: string;                  // Raw: GENERAL_DESC
  technicalDescription?: string;         // Raw: TECHNICAL_DESC
  idComments?: string;                   // Raw: STATE_ID_COMMENTS
  habitatComments?: string;              // Raw: STATE_HABITAT_COM
  phenologyComments?: string;            // Raw: STATE_PHENOLOGY_COM
  reproductionComments?: string;         // Raw: STATE_REPRODUCTION_COM
  ecologyComments?: string;              // Raw: STATE_ECOLOGY_COM
  managementSummary?: string;            // Raw: MGMT_SUM
  rangeComments?: string;                // Raw: GLOBAL_RANGE_COM
  taxonReference?: string;               // Raw: TAXON_REFERENCE

  // --- Geography & Logic ---
  ecoRegion?: EcoRegion;                 // Raw: ECOREGION
  taxonomicGroup: TaxonomicGroup;        // Raw: TAXONOMIC_GROUP
  speciesUnit: SpeciesUnit;              // Raw: SPECIES_UNIT
  seed: number;                          // Raw: SEED (Randomization from 1 to 1859)
}