"use client";

import { useState } from "react";
import type { Species } from "@/types/species";
import AdvancedFiltersModal from "./AdvancedFiltersModal";
import ConservationRankBar from "./ConservationRankBar";
import SpeciesFilters from "./SpeciesFilters";
import SpeciesIndexGrid from "./SpeciesIndexGrid";
import SpeciesIndexList from "./SpeciesIndexList";
import SpeciesIndexToolbar from "./SpeciesIndexToolbar";
import useSpeciesFilters from "./useSpeciesFilters";

export type SpeciesView = "grid" | "list";

const LIST_PAGE_SIZE = 25;
const GRID_PAGE_SIZE = 24;

const ECOREGION_MAP: Record<string, string> = {
  "Blue Mountains": "BM",
  "Northern Basin and Range": "BR",
  "Columbia Basin": "CB",
  "Coast Range": "CR",
  "East Cascades": "EC",
  "Klamath Mountains": "KM",
  "Marine and Estuarine": "ME",
  "West Cascades": "WC",
  "Willamette Valley": "WV",
};

const COUNTY_MAP: Record<string, string> = {
  "Baker": "Bake",
  "Benton": "Bent",
  "Clackamas": "Clac",
  "Clatsop": "Clat",
  "Columbia": "Colu",
  "Coos": "Coos",
  "Crook": "Croo",
  "Curry": "Curr",
  "Deschutes": "Desc",
  "Douglas": "Doug",
  "Gilliam": "Gill",
  "Grant": "Gran",
  "Harney": "Harn",
  "Hood River": "Hood",
  "Jackson": "Jack",
  "Jefferson": "Jeff",
  "Josephine": "Jose",
  "Klamath": "Klam",
  "Lake": "Lake",
  "Lane": "Lane",
  "Lincoln": "Linc",
  "Linn": "Linn",
  "Malheur": "Malh",
  "Marion": "Mari",
  "Morrow": "Morr",
  "Multnomah": "Mult",
  "Polk": "Polk",
  "Sherman": "Sher",
  "Tillamook": "Till",
  "Umatilla": "Umat",
  "Union": "Unio",
  "Wallowa": "Wall",
  "Wasco": "Wasc",
  "Washington": "Wash",
  "Wheeler": "Whee",
  "Yamhill": "Yamh",
};

const TAXONOMY_OPTION_MAP: Record<string, string> = {
  // Vascular Plants
  "Vascular Plants": "vascularPlants",
  "Conifers": "conifers",
  "Dicot Plants": "dicotPlants",
  "Ferns": "ferns",
  "Lycophytes": "lycophytes",
  "Monocot Plants": "monocotPlants",
  // Nonvascular Plants and Fungi
  "Bryophtes": "bryophytes",
  "Fungi and Lichen": "fungiAndLichen",
  "Kelp and Algae": "kelpAndAlgae",
  "Ascomycete Fungi": "ascomyceteFungi",
  "Basidiomycete Fungi": "basidiomyceteFungi",
  "Brown Algae": "brownAlgae",
  "Green Algae": "greenAlgae",
  "Hornworts": "hornworts",
  "Lichen": "lichen",
  "Liverworts": "liverworts",
  "Mosses": "mosses",
  "Red Algae": "redAlgae",
  "Zygomyete Fungi": "zygomyeteFungi",
  // Vertebrate Animals
  "Amphibians": "amphibians",
  "Birds": "birds",
  "Fishes": "fishes",
  "Mammals": "mammals",
  "Reptiles": "reptiles",
  "Lampreys": "lampreys",
  "Ray-finned Fishes": "rayFinnedFishes",
  "Sharks": "sharks",
  // Invertebrate Animals
  "Arthropods": "arthropods",
  "Molluscs": "molluscs",
  "Worms": "worms",
  "Arachnids": "arachnids",
  "Bivalves": "bivalves",
  "Branchiopods": "branchiopods",
  "EarthWorms": "earthworms",
  "FlatWorms": "flatworms",
  "Gastropods": "gastropods",
  "Insects": "insects",
  "Malacostracans": "malacostracans",
  "Millipedes": "millipedes",
  "Sea Stars": "seaStars",
  "Springtails": "springtails",
};

const RANK_BAR_MAP: Record<string, string> = {
  "5X": "SX",
  S1: "S1",
  S2: "S2",
  S3: "S3",
  S4: "S4",
  S5: "S5",
};

function parseAbbreviations(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(", ")
    .map((part) => part.replace(/\s*\([^)]*\)/, "").replace("?", "").trim())
    .filter(Boolean);
}

function applyFilters(
  species: Species[],
  selectedFilters: Record<string, string[]>,
  selectedDropdownOptions: Record<string, string[]>,
  selectedRanks: string[],
  searchQuery: string,
): Species[] {
  const q = searchQuery.trim().toLowerCase();

  return species.filter((item) => {
    // SEARCH
    if (q && !(item.commonName ?? "").toLowerCase().includes(q)) return false;

    // TAXONOMY
    const taxonomyIsAll = selectedFilters.Taxonomy?.includes("All species");
    if (!taxonomyIsAll) {
      const taxonomyKeys = [
        "Vascular Plants +",
        "Nonvascular Plants and Fungi +",
        "Vertebrate Animals +",
        "Invertebrate Animals +",
      ];
      const selectedTaxonOptions = taxonomyKeys.flatMap(
        (key) => selectedDropdownOptions[key] ?? [],
      );
      if (selectedTaxonOptions.length > 0) {
        const itemCategories = [item.category1, item.category2].filter(Boolean);
        const selectedTaxonCamel = selectedTaxonOptions.map(
          (opt) => TAXONOMY_OPTION_MAP[opt] ?? opt,
        );
        if (!selectedTaxonCamel.some((val) => itemCategories.includes(val)))
          return false;
      }
    }

    // STATUS — Global Rank
    const globalRankOptions = selectedDropdownOptions["Global Rank +"] ?? [];
    if (
      globalRankOptions.length > 0 &&
      !globalRankOptions.includes(item.globalRank)
    )
      return false;

    // STATUS — State Rank
    const stateRankOptions = selectedDropdownOptions["State Rank +"] ?? [];
    if (
      stateRankOptions.length > 0 &&
      !stateRankOptions.includes(item.stateRank)
    )
      return false;

    // STATUS — ORBIC list
    const orbicListOptions = selectedDropdownOptions["ORBIC list +"] ?? [];
    if (
      orbicListOptions.length > 0 &&
      !orbicListOptions.includes(String(item.orbicList))
    )
      return false;

    // STATUS — Federal Status
    const federalStatusOptions =
      selectedDropdownOptions["Federal Status +"] ?? [];
    if (
      federalStatusOptions.length > 0 &&
      !federalStatusOptions.includes(item.federalRank ?? "")
    )
      return false;

    // STATUS — State Status
    const stateStatusOptions = selectedDropdownOptions["State Status +"] ?? [];
    if (
      stateStatusOptions.length > 0 &&
      !stateStatusOptions.includes(item.stateStatus ?? "")
    )
      return false;

    // STATUS — ODFW SWAP
    const odfwOptions = selectedDropdownOptions["ODFW SWAP +"] ?? [];
    if (odfwOptions.length > 0) {
      const matchesSGCN =
        odfwOptions.includes("SGCN") && item.odfwSGCN === "SGCN";
      const matchesSGIN =
        odfwOptions.includes("SGIN") && item.odfwSGIN === "SGIN";
      if (!matchesSGCN && !matchesSGIN) return false;
    }

    // GEOGRAPHY — OR Endemic
    if (selectedFilters.Geography?.includes("OR Endemic") && item.orEndemic !== "Yes")
      return false;

    // GEOGRAPHY — Ecoregion
    const ecoregionOptions = selectedDropdownOptions["Ecoregion +"] ?? [];
    if (ecoregionOptions.length > 0) {
      const selectedAbbr = ecoregionOptions
        .map((name) => ECOREGION_MAP[name])
        .filter(Boolean);
      const itemEcoregions = parseAbbreviations(item.ecoregion);
      if (!selectedAbbr.some((abbr) => itemEcoregions.includes(abbr)))
        return false;
    }

    // GEOGRAPHY — County
    const countyOptions = selectedDropdownOptions["County +"] ?? [];
    if (countyOptions.length > 0) {
      const selectedAbbr = countyOptions
        .map((name) => COUNTY_MAP[name])
        .filter(Boolean);
      const itemCounties = parseAbbreviations(item.county);
      if (!selectedAbbr.some((abbr) => itemCounties.includes(abbr)))
        return false;
    }

    // S-RANK BAR
    if (selectedRanks.length > 0) {
      const rankAbbrs = selectedRanks.map((r) => RANK_BAR_MAP[r]).filter(Boolean);
      if (!rankAbbrs.some((abbr) => (item.stateRank ?? "").includes(abbr)))
        return false;
    }

    return true;
  });
}

interface IndexClientProps {
  species: Species[];
}

export default function IndexClient({ species }: IndexClientProps) {
  const [view, setView] = useState<SpeciesView>("list");
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onToggleRank = (rank: string) => {
    setCurrentPage(1);
    setSelectedRanks((current) =>
      current.includes(rank)
        ? current.filter((r) => r !== rank)
        : [...current, rank],
    );
  };

  const rawFilters = useSpeciesFilters();

  const filters = {
    ...rawFilters,
    onToggleFilter: (rowLabel: string, filterName: string) => {
      setCurrentPage(1);
      rawFilters.onToggleFilter(rowLabel, filterName);
    },
    onToggleDropdownOption: (filterName: string, option: string) => {
      setCurrentPage(1);
      rawFilters.onToggleDropdownOption(filterName, option);
    },
    onToggleAllDropdownOptions: (filterName: string) => {
      setCurrentPage(1);
      rawFilters.onToggleAllDropdownOptions(filterName);
    },
  };

  const filteredSpecies = applyFilters(
    species,
    filters.selectedFilters,
    filters.selectedDropdownOptions,
    selectedRanks,
    searchQuery,
  );

  const pageSize = view === "grid" ? GRID_PAGE_SIZE : LIST_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filteredSpecies.length / pageSize));
  const paginatedSpecies = filteredSpecies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <SpeciesIndexToolbar
        view={view}
        setView={setView}
        onOpenFilters={() => setIsAdvancedFiltersOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => { setCurrentPage(1); setSearchQuery(q); }}
      />

      <SpeciesFilters {...filters} />

      <ConservationRankBar selectedRanks={selectedRanks} onToggleRank={onToggleRank} />

      {filteredSpecies.length === 0 ? (
        <p className="font-body py-16 text-center text-sm text-[#6d6d6d]">
          No species match the selected filters.
        </p>
      ) : (
        <>
          {view === "grid" ? (
            <SpeciesIndexGrid species={paginatedSpecies} />
          ) : (
            <SpeciesIndexList species={paginatedSpecies} />
          )}

          <div className="font-body mt-6 flex items-center justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-black disabled:opacity-30 hover:bg-black hover:text-white transition"
            >
              ← Prev
            </button>

            <span className="text-[#6d6d6d]">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-black disabled:opacity-30 hover:bg-black hover:text-white transition"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {isAdvancedFiltersOpen && (
        <AdvancedFiltersModal
          onClose={() => setIsAdvancedFiltersOpen(false)}
          {...filters}
        />
      )}
    </>
  );
}
