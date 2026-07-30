/**
 * src/lib/species-sentence.ts
 *
 * Builds the standard "[commonName] ([scientificName]) is a(n) [category]
 * found in [ecoregions] ecoregion(s). [endemism]" summary sentence from a
 * Species record, handling the messiness of the raw data: camelCase
 * category codes, comma-separated ecoregion codes (some flagged with
 * " (x)" or "?"), and irregular plurals like fungi/algae.
 */
import type { Category2, EcoRegion, Species } from "@/types/species";

const ECOREGION_NAMES: Record<EcoRegion, string> = {
  BM: "Blue Mountains",
  BR: "Northern Basin and Range",
  CB: "Columbia Basin",
  CR: "Coast Range",
  EC: "East Cascades",
  KM: "Klamath Mountains",
  WC: "West Cascades",
  WV: "Willamette Valley",
  ME: "Marine and Estuarine",
};

/** Parses the raw "CR, KM, WC (x), WV?" field into full ecoregion names, deduped and in field order. */
export function getEcoregionNames(rawEcoregion?: string | null): string[] {
  if (!rawEcoregion) return [];

  const seen = new Set<string>();
  const names: string[] = [];

  for (const part of rawEcoregion.split(",")) {
    const code = part.trim().replace(/\(x\)|\?/gi, "").trim();
    if (!(code in ECOREGION_NAMES) || seen.has(code)) continue;
    seen.add(code);
    names.push(ECOREGION_NAMES[code as EcoRegion]);
  }

  return names;
}

/** Joins items into a readable list: "A", "A and B", or "A, B, and C". */
export function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * Humanizes a camelCase Category2 value and singularizes it. Fungi and
 * algae are irregular plurals (fungus/alga); everything else in the
 * dataset singularizes by dropping a trailing "s" (or "es" after a
 * sibilant, e.g. "fishes" -> "fish").
 */
export function singularizeCategory2(category2: Category2): string {
  const humanized = category2
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase();

  if (humanized.endsWith("fungi")) return `${humanized.slice(0, -5)}fungus`;
  if (humanized.endsWith("algae")) return `${humanized.slice(0, -2)}a`;
  if (/(?:[sxz]|[cs]h)es$/.test(humanized)) return humanized.slice(0, -2);
  if (humanized.endsWith("s") && !humanized.endsWith("ss")) {
    return humanized.slice(0, -1);
  }

  return humanized;
}

/** "a" before a consonant sound, "an" before a vowel sound. */
export function articleFor(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function isOregonEndemic(species: Pick<Species, "orEndemic">): boolean {
  return species.orEndemic?.toLowerCase() === "yes";
}

export type SpeciesSentenceSegment =
  | { type: "text"; value: string }
  | { type: "scientificName"; value: string };

/**
 * Breaks the summary sentence into segments so callers can render the
 * scientific name in italics without re-implementing the sentence logic.
 */
export function buildSpeciesSentenceSegments(
  species: Species,
): SpeciesSentenceSegment[] {
  const name = species.commonName ?? species.scientificName ?? "This species";
  const category = singularizeCategory2(species.category2);
  const categoryPhrase = `${articleFor(category)} ${category}`;

  const ecoregionNames = getEcoregionNames(species.ecoregion);
  const locationPhrase = ecoregionNames.length
    ? ` found in ${formatList(ecoregionNames)} ecoregion${
        ecoregionNames.length > 1 ? "s" : ""
      }`
    : "";

  const endemismSentence = isOregonEndemic(species)
    ? "It is endemic to Oregon."
    : "It occurs in Oregon and elsewhere.";

  const segments: SpeciesSentenceSegment[] = [{ type: "text", value: name }];

  const showScientificName =
    !!species.scientificName && species.scientificName !== name;

  if (showScientificName) {
    segments.push({ type: "text", value: " (" });
    segments.push({ type: "scientificName", value: species.scientificName! });
    segments.push({ type: "text", value: ")" });
  }

  segments.push({
    type: "text",
    value: ` is ${categoryPhrase}${locationPhrase}. ${endemismSentence}`,
  });

  return segments;
}

/** Plain-text version of the summary sentence (no italics) for meta tags, alt text, etc. */
export function buildSpeciesSentence(species: Species): string {
  return buildSpeciesSentenceSegments(species)
    .map((segment) => segment.value)
    .join("");
}
