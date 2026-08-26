import Image from "next/image";
import type { Species } from "@/types/species";
import { LIST_FRIENDLY_NAMES, getStateRankPrimary } from "@/lib/speciesDisplay";
import {
  getSpeciesImagePath,
  getPhotoAttribution,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/speciesImage";

interface SpeciesHeroProps {
  species: Species;
}

function getBadgeColor(rank: string | undefined): string {
  if (!rank) return "#6d6d6d";
  const r = rank.toUpperCase();
  if (
    r.includes("S1") ||
    r.includes("SX") ||
    r === "E" ||
    r === "1" ||
    r === "1-EX" ||
    r === "1-X"
  )
    return "#d61f4c";
  if (r.includes("S2") || r === "T" || r === "2" || r === "2-EX")
    return "#d94a15";
  if (r.includes("S3") || r === "3") return "#b59b00";
  return "#4e8f12";
}

export default function SpeciesHero({ species }: SpeciesHeroProps) {
  const breadcrumbPart1 =
    species.kingdom ?? LIST_FRIENDLY_NAMES[species.list] ?? "";
  const breadcrumb = [breadcrumbPart1, species.taxonClass, species.family]
    .filter(Boolean)
    .join(" → ");

  const primaryStateRank = getStateRankPrimary(species.stateRank);

  const imagePath = getSpeciesImagePath(species.elementGlobalId);
  const attr = getPhotoAttribution(species.elementGlobalId);
  const categoryIcon = getCategoryIcon(species.list);
  const categoryLabel = getCategoryLabel(species.list);

  const heroBadges: { label: string; color: string }[] = [];

  if (species.orbicList) {
    heroBadges.push({
      label: `ORBIC List ${species.orbicList}`,
      color: getBadgeColor(species.orbicList),
    });
  }

  heroBadges.push({
    label: species.stateRank,
    color: getBadgeColor(primaryStateRank),
  });

  if (species.federalRank) {
    heroBadges.push({
      label: species.federalRank,
      color: getBadgeColor(species.federalRank),
    });
  }

  return (
    <section className="w-full overflow-hidden bg-[#1f3426] text-white">
      <div className="mx-auto w-full max-w-7xl md:grid md:min-h-[360px] md:grid-cols-[1.6fr_1fr]">
        <div className="px-6 py-8 md:px-10 md:py-10">
          <p className="font-body mb-4 text-[12px] font-semibold text-[#57c783]">
            {breadcrumb}
          </p>

          <h1 className="font-heading text-5xl font-bold leading-tight md:text-6xl">
            {species.commonName}
          </h1>

          <p className="font-scientific mt-4 text-base italic text-[#9ecfaf]">
            {species.scientificName}
          </p>

<div className="relative block min-h-[240px] bg-black md:hidden my-3">
          {imagePath ? (
            <>
              <Image
                src={imagePath}
                alt={attr?.altText ?? species.commonName ?? ""}
                fill
                loading="eager"
                sizes="(max-width: 1280px) 40vw, 450px"
                className="object-contain"
              />
              {attr && (
                <p className="font-body absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-1.5 text-[10px] text-white">
                  {attr.photographer} · {attr.license}
                </p>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="relative h-24 w-24 opacity-30">
                <Image src={categoryIcon} alt="" fill className="object-contain" />
              </div>
              <p className="font-body text-sm font-medium text-white/50">{categoryLabel}</p>
            </div>
          )}
        </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <span
                key={badge.label}
                className="font-body px-3 py-1 text-[11px] font-bold text-white"
                style={{ backgroundColor: badge.color }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[240px] bg-black md:block">
          {imagePath ? (
            <>
              <Image
                src={imagePath}
                alt={attr?.altText ?? species.commonName ?? ""}
                fill
                priority
                sizes="(max-width: 1280px) 40vw, 450px"
                className="object-contain"
              />
              {attr && (
                <p className="font-body absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-1.5 text-[10px] text-white">
                  {attr.photographer} · {attr.license}
                </p>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="relative h-24 w-24 opacity-30">
                <Image
                  src={categoryIcon}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-body text-sm font-medium text-white/50">
                {categoryLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
