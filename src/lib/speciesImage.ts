import attributionData from "@/data/photoAttribution.json";

type RawAttribution = {
  license: string;
  photographer: string;
  source: string;
  sourceImageUrl: string;
  altText: string;
};

const attribution = attributionData as Record<string, RawAttribution>;

export type PhotoAttribution = {
  photographer: string;
  license: string;
  source: string;
  sourceImageUrl: string;
  altText: string;
};

const CATEGORY_ICONS: Record<string, string> = {
  vascularPlants: "/images/categories/vascular-plants-icon.svg",
  nonvascularPlantsAndFungi: "/images/categories/nonvasc-plants-icon.svg",
  vertebrateAnimals: "/images/categories/vertebrate-animals-icon.svg",
  invertebrateAnimals: "/images/categories/invertebrate-animals-icon.svg",
};

export function getSpeciesImagePath(elementGlobalId: string): string | null {
  return attribution[elementGlobalId] ? `/images/species/${elementGlobalId}.webp` : null;
}

export function getPhotoAttribution(elementGlobalId: string): PhotoAttribution | null {
  const entry = attribution[elementGlobalId];
  if (!entry) return null;
  return {
    photographer: entry.photographer,
    license: entry.license,
    source: entry.source,
    sourceImageUrl: entry.sourceImageUrl,
    altText: entry.altText,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  vascularPlants: "Vascular Plants",
  nonvascularPlantsAndFungi: "Nonvascular Plants & Fungi",
  vertebrateAnimals: "Vertebrate Animals",
  invertebrateAnimals: "Invertebrate Animals",
};

export function getCategoryIcon(list: string): string {
  return CATEGORY_ICONS[list] ?? "/images/categories/vascular-plants-icon.svg";
}

export function getCategoryLabel(list: string): string {
  return CATEGORY_LABELS[list] ?? "Unknown Group";
}
