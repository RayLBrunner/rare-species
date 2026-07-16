/**
 * src/types/species.ts
 *
 * Defines the Species interface and associated types for the Oregon Rare
 * Species Selection Guide based on Ray's ORBIC_List_09072026 snapshot.
 */
// ============================================================
// Export Type Definitions
// ============================================================

export type List = "vascular" | "nonVascular" | "vertebrate" | "invertebrate" | "fungi";

export type Category1 = 
  | "fishes" | "amphibians" | "mammals" | "reptiles" | "birds" 
  | "worms" | "molluscs" | "arthropods" | "seaStars" 
  | "kelpAndAlgae" | "bryophytes" | "fungiAndLichen" 
  | "vascularPlants" | "other";

export type Category2 = 
  | "lampreys" | "sharks" | "rayFinnedFishes" | "amphibians" 
  | "mammals" | "reptiles" | "birds" | "flatworms" | "earthworms" 
  | "gastropods" | "bivalves" | "branchiopods" | "malacostracans" 
  | "springtails" | "insects" | "arachnids" | "millipedes" 
  | "seaStars" | "brownAlgae" | "redAlgae" | "greenAlgae" 
  | "liverworts" | "hornworts" | "mosses" | "lichen" 
  | "basidiomyceteFungi" | "ascomyceteFungi" | "zygomyeteFungi" 
  | "dicotPlants" | "ferns" | "monocotPlants" | "lycophytes" 
  | "conifers" | "other";

export type GlobalRank = "G1" | "G2" | "G3" | "G4" | "G5" | "GH" | "GX" | "other";

export type OrbicRank = "S1" | "S2" | "S3" | "S4" | "S5" | "SH" | "SX";

export type FederalRank =
  | "LE"   // Listed Endangered
  | "LT"   // Listed Threatened
  | "PE"   // Proposed Endangered
  | "PT"   // Proposed Threatened
  | "C"    // Candidate
  | "SOC"  // Species of Concern
  | "none";

export type StateStatus =
  | "LE"   // Listed Endangered
  | "LT"   // Listed Threatened
  | "none";

export type OrbicList = "1" | "2" | "3" | "4" ;

export type OrEndemic = "Y" | "N";

export type EcoRegion = "BM" | "BR" | "CB" | "CR" | "EC" | "KM" | "WC" | "WV"; // TBD — may change

// ============================================================
// Species Interface
// ============================================================

export interface Species {
  //--Identifiers--
  slug: string;                          // Concatenated/unique URL identifier
  elementGlobalId: string;               // Raw: ELEMENT_GLOBAL_ID (Unique ID for species)
  elcode: string;                        // Raw: ELCODE (ORBIC Identifier)
  
  //--Taxonomy & Categories--
  category1: Category1;                  // Generalized Taxon Type
  category2: Category2;                  // Less Generalized Taxon Type
  list: List;                            // Broad ORBIC List grouping
  listYear?: number;                     // Raw: LIST_YEAR (The book year used)
  family: string;                        // Raw: FAMILY
  taxonOrder?: string;                   // Raw: ORDER
  taxonClass?: string;                   // Raw: CLASS
  phylum?: string;                       // Raw: PHYLUM
  kingdom?: string;                      // Raw: KINGDOM

  // --- Names ---
  scientificName: string;                // Raw: SNAME (Full Latin name with var/ssp)
  commonName: string;                    // Raw: SCOMNAME (State Accepted Common Name)
  genusSpecies: string;                  // Raw: GENUS_SP (Latin Binomial)
  authorNameFull?: string;               // Raw: AUTHOR_NAME_FULL
  varSsp?: string;                       // Raw: VAR_SSP (Variety or Subspecies type)
  subspecies?: string;                   // Raw: SUBSPECIES (Var/Ssp name)
  orbicSynonyms?: string;                // Raw: ORBIC_SYNONYMS

  // --- Conservation Status ---
  globalRank: GlobalRank;                // Raw: G_RANK
  stateRank: OrbicRank;                  // Raw: S_RANK
  federalRank?: FederalRank;             // Raw: FED
  stateStatus?: StateStatus;             // Raw: STATE
  orbicList?: OrbicList;                 // Raw: ORBIC_LIST (List status 1-4)
  odfwSGCN?: string;                     // Raw: ODFW_SGCN (Link to ODFW page)
  odfwSGIN?: string;                     // Raw: ODFW_SGIN (Species of Great Info Need)
  orEndemic?: OrEndemic;                 // Raw: OR_ENDEMIC (Endemic to Oregon?)

  // --- Observations & Geography ---
  nEo?: number;                          // Total observations in database
  nEoPre2000?: number;                   // Observations before the year 2000
  nEoPost2000?: number;                  // Observations after the year 2000
  county?: string;                       // Counties where species is found
  ecoregion?: EcoRegion;                 // Primary Ecoregion shorthand
  ecoregionId?: string;                  // ID for ecoregion mapping/images
  otherStates?: string;                  // Raw: OTHER_STATES (Includes countries for NV plants)

  // --- External Links ---
  iNaturalistId?: number;                // Raw: INATURALIST_ID
  iNaturalistLink?: string;              // Link to iNat Taxon Page
  nsEexplorerLink?: string;              // Link to NatureServe Explorer
  oregonFloraId?: string;                // Raw: OREGONFLORA_ID
  oregonFloraLink?: string;              // Link to OregonFlora Explorer
  fedLink?: string;                      // Link to Federal Status page
  stateLink?: string;                    // Link to State Status page
  odfwLink?: string;                     // Link to ODFW SGCN page

  // --- Descriptions & Narrative ---
  habitatDescription?: string;           // Raw: HABITAT_DESCRIPTION
  physicalDescription?: string;          // Raw: PHYSICAL_DESCRIPTION
  ecologyComments?: string;              // Raw: ECOLOGY_COMMENTS
  globalRangeComments?: string;          // Raw: GLOBAL_RANGE_COMMENTS
  references?: string;                   // Bibliographic references for taxonomy

  // --- Site Logic ---
  featureMe?: boolean;                   // Logic: species is worth featuring on site
 }