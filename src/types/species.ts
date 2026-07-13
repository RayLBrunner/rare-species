/**
 * src/types/species.ts
 *
 * Defines the Species interface and associated types for the Oregon Rare
 * Species Selection Guide based on Ray's ORBIC_List_27062026 snapshot.
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

export type OrbicList = string; // TBD — exact ORBIC list names pending confirmation

export type OrEndemic = "Y" | "N";

export type EcoRegion = "BM" | "BR" | "CB" | "CR" | "EC" | "KM" | "WC" | "WV"; // TBD — may change

// ============================================================
// Species Interface
// ============================================================

export interface Species {
  slug: string;
  elementGlobalId: string;
  elcode: string;
  category1: Category1;
  category2: Category2;
  list: List;
  listYear?: number;
  scientificName: string;
  commonName: string;
  genusSpecies: string;
  authorNameFull?: string;
  varSsp?: string;
  subspecies?: string;
  orbicSynonyms?: string;
  globalRank: GlobalRank;
  stateRank: OrbicRank;
  federalRank?: FederalRank;
  stateStatus?: StateStatus;
  odfwSGCN?: string;
  odfwSGIN?: string;
  orbicList?: OrbicList;
  nEo?: number;
  nEoPre2000?: number;
  nEoPost2000?: number;
  county?: string;
  ecoregion?: EcoRegion;
  ecoregionId?: string;
  otherStates?: string;
  orEndemic?: OrEndemic;
  family: string;
  taxonOrder?: string;
  taxonClass?: string;
  phylum?: string;
  kingdom?: string;
  iNaturalistId?: number;
  iNaturalistLink?: string;
  nsEexplorerLink?: string;
  oregonFloraId?: string;
  oregonFloraLink?: string;
  fedLink?: string;
  stateLink?: string;
  odfwLink?: string;
  habitatDescription?: string;
  physicalDescription?: string;
  ecologyComments?: string;
  globalRangeComments?: string;
  references?: string;
  featureMe?: boolean;
}