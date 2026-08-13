import type { Species } from "@/types/species";

export interface RankBadge {
  label: string;
  value: string;
  description: string;
  color: string;
}

const RANK_COLORS: Record<number, string> = {
  1: "bg-[#c71945]",
  2: "bg-[#d6420f]",
  3: "bg-[#b59b00]",
  4: "bg-[#4e8f12]",
  5: "bg-[#0d6b37]",
};

const EXTINCT_COLOR = "bg-black";
const UNKNOWN_COLOR = "bg-[#6b7280]";

const SEVERITY_DESCRIPTIONS: Record<number, string> = {
  1: "Critically imperiled",
  2: "Imperiled",
  3: "Vulnerable",
  4: "Apparently secure",
  5: "Secure",
};

/**
 * NatureServe-style G/S ranks can be compound (e.g. "G2G3", "S1S2B") or
 * hold multiple population segments separated by commas (e.g. "SXB,S1M").
 * We read the first segment and take the most imperiled digit in it.
 */
function parseSeverity(rank: string) {
  const primary = rank.split(",")[0];
  const extinct = /[XH]/.test(primary);
  const digits = Array.from(primary.matchAll(/[1-5]/g)).map((m) => Number(m[0]));
  const severity = digits.length > 0 ? Math.min(...digits) : null;
  return { severity, extinct };
}

function describeSeverityRank(
  rank: string | undefined,
  label: string,
  scope: "globally" | "in Oregon",
): RankBadge | null {
  if (!rank) return null;
  const { severity, extinct } = parseSeverity(rank);

  if (extinct) {
    return {
      label,
      value: rank,
      description: `Presumed extinct or extirpated ${scope}`,
      color: EXTINCT_COLOR,
    };
  }

  if (severity === null) {
    return {
      label,
      value: rank,
      description: "Rank not yet assessed",
      color: UNKNOWN_COLOR,
    };
  }

  return {
    label,
    value: rank,
    description: `${SEVERITY_DESCRIPTIONS[severity]} ${scope}`,
    color: RANK_COLORS[severity],
  };
}

export function describeGlobalRank(rank?: string): RankBadge | null {
  return describeSeverityRank(rank, "Global Rank", "globally");
}

export function describeStateRank(rank?: string): RankBadge | null {
  return describeSeverityRank(rank, "State Rank", "in Oregon");
}

const FEDERAL_LABELS: Record<string, string> = {
  E: "Endangered",
  T: "Threatened",
  PE: "Proposed Endangered",
  PT: "Proposed Threatened",
  C: "Candidate",
  SOC: "Species of Concern",
  PS: "Partial Status",
  UR: "Under Review",
  DL: "Delisted",
  PDL: "Proposed Delisted",
};

const FEDERAL_DESCRIPTIONS: Record<string, string> = {
  E: "Listed as Endangered under the federal Endangered Species Act",
  T: "Listed as Threatened under the federal Endangered Species Act",
  PE: "Proposed for federal listing as Endangered",
  PT: "Proposed for federal listing as Threatened",
  C: "Candidate for federal listing under the ESA",
  SOC: "Species of concern; not currently protected under the ESA",
  PS: "Federally listed status applies only to part of its range",
  UR: "Under review for potential federal listing",
  DL: "Delisted from federal protection",
  PDL: "Proposed for delisting from federal protection",
};

const FEDERAL_COLORS: Record<string, string> = {
  E: "bg-[#c71945]",
  T: "bg-[#d6420f]",
  PE: "bg-[#d6420f]",
  PT: "bg-[#d6420f]",
  C: "bg-[#b59b00]",
  SOC: "bg-[#6b7280]",
  PS: "bg-[#b59b00]",
  UR: "bg-[#6b7280]",
  DL: "bg-[#0d6b37]",
  PDL: "bg-[#4e8f12]",
};

/**
 * Federal ranks are sometimes compound, e.g. "PS:T" (Partial Status,
 * Threatened) - the segment after the colon is the actual listing status.
 */
export function describeFederalRank(rank?: string): RankBadge | null {
  if (!rank) return null;
  const [prefix, code] = rank.includes(":") ? rank.split(":") : [null, rank];

  const label = FEDERAL_LABELS[code] ?? code;
  const description = FEDERAL_DESCRIPTIONS[code] ?? "Federal status on record";
  const color = FEDERAL_COLORS[code] ?? UNKNOWN_COLOR;

  return {
    label: "Federal Status",
    value: label,
    description: prefix === "PS" ? `${description} (partial status)` : description,
    color,
  };
}

const ORBIC_DESCRIPTIONS: Record<string, string> = {
  "1": "Threatened or endangered throughout its range",
  "2": "Threatened or endangered in Oregon, more secure elsewhere",
  "3": "Under review; more information needed",
  "4": "Species of conservation concern (watch list)",
  "1-X": "Presumed extirpated from Oregon",
  "1-ex": "Presumed extirpated from Oregon",
  "2-ex": "Presumed extirpated from Oregon",
};

const ORBIC_COLORS: Record<string, string> = {
  "1": "bg-[#c71945]",
  "2": "bg-[#d6420f]",
  "3": "bg-[#b59b00]",
  "4": "bg-[#4e8f12]",
  "1-X": "bg-black",
  "1-ex": "bg-black",
  "2-ex": "bg-black",
};

export function describeOrbicList(list?: string): RankBadge | null {
  if (!list) return null;

  return {
    label: "ORBIC",
    value: `List ${list.replace(/-(x|ex)$/i, "")}`,
    description:
      ORBIC_DESCRIPTIONS[list] ?? "Species of conservation concern in Oregon",
    color: ORBIC_COLORS[list] ?? UNKNOWN_COLOR,
  };
}

export function getStatusBadges(species: Species): RankBadge[] {
  return [
    describeOrbicList(species.orbicList),
    describeStateRank(species.stateRank),
    describeGlobalRank(species.globalRank),
    describeFederalRank(species.federalRank),
  ].filter((badge): badge is RankBadge => badge !== null);
}
