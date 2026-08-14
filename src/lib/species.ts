import data from "@/data/species.json";
import type { List, Species } from "@/types/species";

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
