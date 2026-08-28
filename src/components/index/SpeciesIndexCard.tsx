import Image from "next/image";
import Link from "next/link";
import { getSpeciesImagePath, getCategoryIcon, getCategoryLabel } from "@/lib/speciesImage";
import { getStateRankPrimary } from "@/lib/speciesDisplay";

const RANK_BG: Record<string, string> = {
  S1: "#d61f4c",
  S2: "#d94a15",
  S3: "#b59b00",
  S4: "#4e8f12",
  S5: "#0d6b37",
};

interface SpeciesIndexCardProps {
  name: string;
  scientificName: string;
  slug: string;
  list: string;
  listColor: string;
  elementGlobalId: string;
  category: string;
  stateRank: string;
}

export default function SpeciesIndexCard({
  name,
  scientificName,
  slug,
  list,
  listColor,
  elementGlobalId,
  category,
  stateRank,
}: SpeciesIndexCardProps) {
  const imagePath = getSpeciesImagePath(elementGlobalId);
  const categoryIcon = getCategoryIcon(category);
  const categoryLabel = getCategoryLabel(category);
  const rankBg = RANK_BG[getStateRankPrimary(stateRank)] ?? "#6d6d6d";

  return (
    <Link
      href={`/species/${slug}`}
      className="group block border-[3px] border-black bg-white shadow-[2px_2px_0_#222] transition hover:-translate-y-0.5 hover:bg-[#032014] sm:border-4 sm:shadow-[4px_4px_0_#222]"
    >
      <div className="relative h-[86px] bg-black sm:h-40">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <div className="relative h-8 w-8 opacity-30 sm:h-12 sm:w-12">
              <Image src={categoryIcon} alt="" fill className="object-contain" />
            </div>
            <p className="font-body hidden text-center text-[9px] font-medium text-white/50 sm:block">{categoryLabel}</p>
          </div>
        )}
      </div>

      <div className="px-2 py-2 sm:px-3 sm:py-3">
        <h2 className="font-heading text-[10.5px] font-bold leading-tight text-black group-hover:text-white sm:text-base">
          {name}
        </h2>

        <p className="font-scientific mt-1 text-[8px] italic leading-tight text-[#777] group-hover:text-white sm:text-xs">
          {scientificName}
        </p>

        <div className="mt-1 flex flex-wrap gap-1 sm:mt-2">
          <span
            className={`font-body inline-block px-2 py-0.5 text-[8px] font-bold text-white sm:px-3 sm:py-1 sm:text-[10px] ${listColor}`}
          >
            {list}
          </span>
          <span
            className="font-body inline-block px-2 py-0.5 text-[8px] font-bold text-white sm:px-3 sm:py-1 sm:text-[10px]"
            style={{ backgroundColor: rankBg }}
          >
            {stateRank}
          </span>
        </div>
      </div>
    </Link>
  );
}
