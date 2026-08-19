import type { Species } from "@/types/species";
import { questions, COMMON_NAME_EXCLUSIONS } from "@/data/questions";

export type QuizFilters = Record<string, string>;

// ============================================================
// Individual Filter Helpers
// ============================================================

function filterByEcoregion(
  species: Species[],
  value: string,
  questionId: string
): Species[] {
  const question = questions.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === value);

  if (!option?.ecoregionCodes || option.ecoregionCodes.length === 0)
    return species;

  // ecoregion field is a comma-separated string like "CR, KM, WC"
  // so we check if any of the selected codes appear in it
  return species.filter((s) => {
    if (!s.ecoregion) return false;
    return option.ecoregionCodes!.some((code) => s.ecoregion!.includes(code));
  });
}

function filterByMobility(species: Species[], value: string): Species[] {
  if (value === "motile") {
    return species.filter(
      (s) => s.list === "vertebrateAnimals" || s.list === "invertebrateAnimals"
    );
  }
  if (value === "sessile") {
    return species.filter(
      (s) =>
        s.list === "vascularPlants" || s.list === "nonvascularPlantsAndFungi"
    );
  }
  return species;
}

function filterByBackbone(species: Species[], value: string): Species[] {
  // value maps directly to list field — "vertebrateAnimals" or "invertebrateAnimals"
  return species.filter((s) => s.list === value);
}

function filterByVascular(species: Species[], value: string): Species[] {
  // value maps directly to list field — "vascularPlants" or "nonvascularPlantsAndFungi"
  return species.filter((s) => s.list === value);
}

function filterByNonVascularType(species: Species[], value: string): Species[] {
  // value maps directly to category1 — "bryophytes" or "fungiAndLichen"
  return species.filter((s) => s.category1 === value);
}

function filterBySpeciesUnit(species: Species[], value: string): Species[] {
  // Not a value match — filters on whether varSsp has a value or not
  if (value === "fullSpecies") {
    return species.filter((s) => !s.varSsp);
  }
  if (value === "hasVarSsp") {
    return species.filter((s) => !!s.varSsp);
  }
  return species;
}

function filterByGlobalRank(species: Species[], value: string): Species[] {
  if (value === "G4G5") {
    // globalRank is a complex string like "G4", "G5", "G4G5", "G4T2"
    // so we check if it starts with G4 or G5
    return species.filter(
      (s) => s.globalRank.startsWith("G4") || s.globalRank.startsWith("G5")
    );
  }
  return species.filter((s) => s.globalRank.startsWith(value));
}

function filterByStateRank(species: Species[], value: string): Species[] {
  if (value === "any") return species;
  // stateRank is a complex string like "S1S2", "S2B,S5N"
  // so we check if the selected rank appears anywhere in the string
  return species.filter((s) => s.stateRank?.includes(value));
}

function filterByCommonName(species: Species[], value: string): Species[] {
  if (value === "hasCommonName") {
    // Keep species whose commonName is not in the exclusion list and is not empty
    return species.filter(
      (s) => s.commonName && !COMMON_NAME_EXCLUSIONS.includes(s.commonName)
    );
  }
  // "anyName" means no filter
  return species;
}

// ============================================================
// Main Filter Function
// ============================================================

export function filterSpecies(
  species: Species[],
  filters: QuizFilters
): Species[] {
  let pool = [...species];

  for (const [questionId, value] of Object.entries(filters)) {
    // Skip questions that were never answered or skipped
    if (!value) continue;

    switch (questionId) {
      case "ecoregion":
        pool = filterByEcoregion(pool, value, "ecoregion");
        break;
      case "ecoregionEastSide":
        pool = filterByEcoregion(pool, value, "ecoregionEastSide");
        break;
      case "mobility":
        pool = filterByMobility(pool, value);
        break;
      case "backbone":
        pool = filterByBackbone(pool, value);
        break;
      case "vascular":
        pool = filterByVascular(pool, value);
        break;
      case "nonVascularType":
        pool = filterByNonVascularType(pool, value);
        break;
      case "speciesUnit":
        pool = filterBySpeciesUnit(pool, value);
        break;
      case "globalRank":
        pool = filterByGlobalRank(pool, value);
        break;
      case "stateRank":
        // Only reached if globalRank was not G1
        pool = filterByStateRank(pool, value);
        break;
      case "commonName":
        pool = filterByCommonName(pool, value);
        break;
    }
  }

  return pool;
}

// ============================================================
// Result Picker
// ============================================================

export function pickResult(pool: Species[], allSpecies: Species[]): Species {
  // Fall back to full list if filters narrowed pool to zero
  const source = pool.length > 0 ? pool : allSpecies;
  const index = Math.floor(Math.random() * source.length);
  return source[index];
}

export function buildWhyMatched(
  answers: QuizFilters,
  questionList: typeof questions
): string {
  const phrases: string[] = [];

  for (const question of questionList) {
    const value = answers[question.id];
    if (!value) continue;

    const option = question.options.find((o) => o.value === value);
    if (!option) continue;

    phrases.push(option.detail.toLowerCase());
  }

  if (phrases.length === 0) {
    return "This species was randomly selected from the full list.";
  }

  const last = phrases.pop();
  const joined =
    phrases.length > 0 ? `${phrases.join(", ")}, and ${last}` : last;

  return `You matched because you chose: ${joined}.`;
}
