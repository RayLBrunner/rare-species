import data from "@/data/species.json";
import type { EcoRegion, List, Species } from "@/types/species";

const allSpecies = data as unknown as Species[];

function toTitleCase(str: string): string {
  return str.replace(/(?<!')\b\w/g, (char) => char.toUpperCase());
}

function normalizeSpecies(s: Species): Species {
  return s.commonName ? { ...s, commonName: toTitleCase(s.commonName) } : s;
}

export function getAllSpecies(): Species[] {
  return allSpecies.filter((s) => s.slug && s.commonName).map(normalizeSpecies);
}

export function getSpeciesBySlug(slug: string): Species | undefined {
  return getAllSpecies().find((s) => s.slug === slug);
}

export function getSpeciesCountByList(): Record<List, number> {
  const all = getAllSpecies();
  return all.reduce(
    (acc, s) => {
      acc[s.list] = (acc[s.list] ?? 0) + 1;
      return acc;
    },
    {} as Record<List, number>,
  );
}

/**
 * Fixed character order of the 9 regions inside `Species["ecoregionId"]`.
 * Shared with the per-species range map so both read the string the same way.
 */
export const ECOREGION_ID_ORDER: EcoRegion[] = [
  "BM",
  "BR",
  "CB",
  "CR",
  "EC",
  "KM",
  "ME",
  "WC",
  "WV",
];

/**
 * Counts, per ecoregion, how many species are recorded as present there —
 * meaning a "C" (Certain) or "P" (Possible) at that region's position in
 * `ecoregionId`. "X" (Extirpated) and "A" (Absent) are not counted as present.
 */
export function getSpeciesCountByEcoregion(): Record<EcoRegion, number> {
  const counts = Object.fromEntries(
    ECOREGION_ID_ORDER.map((code) => [code, 0]),
  ) as Record<EcoRegion, number>;

  for (const species of getAllSpecies()) {
    const ecoregionId = species.ecoregionId;
    if (!ecoregionId || ecoregionId.length !== ECOREGION_ID_ORDER.length) {
      continue;
    }

    ECOREGION_ID_ORDER.forEach((code, index) => {
      const status = ecoregionId[index];
      if (status === "C" || status === "P") {
        counts[code] += 1;
      }
    });
  }

  return counts;
}

export function getFeaturedSpecies(count: number = 6): Species[] {
  const all = getAllSpecies();
  const featured = all.filter((s) => s.featureMe === true);
  // If species.json currently has featureMe === false for every
  // record, fall back to sampling from all species until the source
  // data is updated with real featureMe flags.
  const pool = featured.length > 0 ? featured : all;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
