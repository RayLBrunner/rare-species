/**
 * src/types/species.ts
 *
 * Defines the Species interface and associated types for the Oregon Rare
 * Species Selection Guide based on Ray's ORBIC_List_09072026 snapshot.
 */
// ============================================================
// Export Type Definitions
// ============================================================

// Broad taxonomic categories based on the actual CSV and conversion script output.
export type List =
  | "invertebrateAnimals"
  | "nonvascularPlantsAndFungi"
  | "vascularPlants"
  | "vertebrateAnimals";

// Generalized Taxon Type. Derived from iNaturalist/ORBIC categories.
export type Category1 =
  | "fishes"
  | "amphibians"
  | "mammals"
  | "reptiles"
  | "birds"
  | "worms"
  | "molluscs"
  | "arthropods"
  | "seaStars"
  | "kelpAndAlgae"
  | "bryophytes"
  | "fungiAndLichen"
  | "vascularPlants"
  | "other";

// Less Generalized Taxon Type. Refined biological subgroups.
export type Category2 =
  | "lampreys"
  | "sharks"
  | "rayFinnedFishes"
  | "amphibians"
  | "mammals"
  | "reptiles"
  | "birds"
  | "flatworms"
  | "earthworms"
  | "gastropods"
  | "bivalves"
  | "branchiopods"
  | "malacostracans"
  | "springtails"
  | "insects"
  | "arachnids"
  | "millipedes"
  | "seaStars"
  | "brownAlgae"
  | "redAlgae"
  | "greenAlgae"
  | "liverworts"
  | "hornworts"
  | "mosses"
  | "lichen"
  | "basidiomyceteFungi"
  | "ascomyceteFungi"
  | "zygomyeteFungi"
  | "dicotPlants"
  | "ferns"
  | "monocotPlants"
  | "lycophytes"
  | "conifers"
  | "other";

/** Ranks combine into complex values (e.g. G2G3, G2Q) so they are kept as strings. */
export type GlobalRank = string;

/** Renamed from OrbicRank and changed to string to handle range ranks (e.g. S1S2). */
export type StateRank = string;

/** Federal legal status codes under the ESA. */
export type FederalRank =
  | "E" // Endangered
  | "T" // Threatened
  | "PE" // Proposed Endangered
  | "PT" // Proposed Threatened
  | "C" // Candidate
  | "SOC" // Species of Concern
  | "PS" // Partial Status
  | "UR" // Under Review
  | "DL" // Delisted
  | "PDL"; // Proposed Delisted

/** Oregon state legal status codes. */
export type StateStatus =
  | "LE" // Listed Endangered
  | "LT" // Listed Threatened
  | "PE" // Proposed Endangered
  | "PT" // Proposed Threatened
  | "C" // Candidate (Plants)
  | "SC" // Species of Concern
  | "S" // Sensitive
  | "SGCN" // Species of Greatest Conservation Need
  | "SCIN"; // Species of Great Information Need

export type OrbicList = "1" | "2" | "3" | "4" | "1-X" | "1-ex" | "2-ex";

/** Endemic status derived from the conversion script. */
export type OrEndemic = "yes" | "no" | "probable" | "breedingPopulationOnly";

/** Standardized codes for Oregon's ecoregions, including Marine and Estuarine. */
export type EcoRegion =
  | "BM"
  | "BR"
  | "CB"
  | "CR"
  | "EC"
  | "KM"
  | "WC"
  | "WV"
  | "ME";

// ============================================================
// Species Interface
// ============================================================

export interface Species {
  //--Identifiers--
  slug: string; // Concatenated/unique URL identifier
  elementGlobalId: string; // Raw: ELEMENT_GLOBAL_ID (Unique ID for species)
  elcode: string; // Raw: ELCODE (ORBIC Identifier)

  //--Taxonomy & Categories--
  category1: Category1; // Generalized Taxon Type
  category2: Category2; // Less Generalized Taxon Type
  list: List; // Broad ORBIC List grouping
  listYear?: string; // Raw: LIST_YEAR (The book year used)
  family: string; // Raw: FAMILY
  taxonOrder?: string; // Raw: ORDER
  taxonClass?: string; // Raw: CLASS
  phylum?: string; // Raw: PHYLUM
  kingdom?: string; // Raw: KINGDOM

  // --- Names ---
  scientificName: string; // Raw: SNAME (Full Latin name with var/ssp)
  commonName?: string; // Raw: SCOMNAME (State Accepted Common Name)
  genusSpecies: string; // Raw: GENUS_SP (Latin Binomial)
  authorNameFull?: string; // Raw: AUTHOR_NAME_FULL
  varSsp?: string; // Raw: VAR_SSP (Variety or Subspecies type)
  subspecies?: string; // Raw: SUBSPECIES (Var/Ssp name)
  orbicSynonyms?: string; // Raw: ORBIC_SYNONYMS

  // --- Conservation Status ---
  globalRank: GlobalRank; // Raw: G_RANK
  globalRankSimple: string; // Simplified Global Rank list for filtering
  stateRank: StateRank; // Raw: S_RANK
  stateRankSimple: string; // Simplified State Rank for filtering
  federalRank?: FederalRank; // Raw: FED
  stateStatus?: StateStatus; // Raw: STATE
  orbicList?: OrbicList; // Raw: ORBIC_LIST (List status 1-4)
  orbicListSimple?: string; // Simplified ORBIC list for filtering
  odfwSGCN?: string; // Raw: ODFW_SGCN (Link to ODFW page)
  odfwSGIN?: string; // Raw: ODFW_SGIN (Species of Great Info Need)
  odfwSWAP?: string; // Combined ODFW_SGIN and ODFW_SGCN field for SWAP filtering
  orEndemic?: OrEndemic; // Raw: OR_ENDEMIC (Endemic to Oregon?)

  // --- Observations & Geography ---
  nEo?: number; // Total observations in database
  nEoPre2000?: number; // Observations before the year 2000
  nEoPost2000?: number; // Observations after the year 2000
  county?: string; // Counties where species is found
  ecoregion?: EcoRegion; // Primary Ecoregion shorthand
  ecoregionId?: string; // ID for ecoregion mapping/images
  otherStates?: string; // Raw: OTHER_STATES (Includes countries for NV plants)

  // --- External Links ---
  iNaturalistId?: string; // Raw: INATURALIST_ID
  iNaturalistLink?: string; // Link to iNat Taxon Page
  nsEexplorerLink?: string; // Link to NatureServe Explorer
  oregonFloraId?: string; // Raw: OREGONFLORA_ID
  oregonFloraLink?: string; // Link to OregonFlora Explorer
  fedLink?: string; // Link to Federal Status page
  stateLink?: string; // Link to State Status page
  odfwLink?: string; // Link to ODFW SGCN page

  // --- Descriptions & Narrative ---
  habitatDescription?: string; // Raw: HABITAT_DESCRIPTION
  physicalDescription?: string; // Raw: PHYSICAL_DESCRIPTION
  ecologyComments?: string; // Raw: ECOLOGY_COMMENTS
  globalRangeComments?: string; // Raw: GLOBAL_RANGE_COMMENTS
  references?: string; // Bibliographic references for taxonomy
  bioticsMatchNote?: string; // Internal QA/matching note from BIOTICS
  autoSummary?: string; // Auto-generated fallback description

  // --- Site Logic ---
  featureMe?: boolean; // Logic: species is worth featuring on site
}
