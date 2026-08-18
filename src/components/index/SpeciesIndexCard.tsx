import Image from "next/image";
import Link from "next/link";
import { getSpeciesImagePath, getCategoryIcon } from "@/lib/speciesImage";

interface SpeciesIndexCardProps {
  name: string;
  scientificName: string;
  slug: string;
  list: string;
  listColor: string;
  elementGlobalId: string;
  category: string;
}

export default function SpeciesIndexCard({
  name,
  scientificName,
  slug,
  list,
  listColor,
  elementGlobalId,
  category,
}: SpeciesIndexCardProps) {
  const imagePath = getSpeciesImagePath(elementGlobalId);
  const categoryIcon = getCategoryIcon(category);

  return (
    <Link
      href={`/species/${slug}`}
      className="group block border-[3px] border-black bg-white shadow-[2px_2px_0_#222] transition hover:-translate-y-0.5 hover:bg-[#032014] sm:border-4 sm:shadow-[4px_4px_0_#222]"
    >
      <div className="relative h-[86px] bg-[#e7e3db] sm:h-40">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="relative h-8 w-8 opacity-30 sm:h-12 sm:w-12">
              <Image src={categoryIcon} alt="" fill className="object-contain" />
            </div>
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

        <span
          className={`font-body mt-1 inline-block px-2 py-0.5 text-[8px] font-bold text-white sm:mt-2 sm:px-3 sm:py-1 sm:text-[10px] ${listColor}`}
        >
          {list}
        </span>
      </div>
    </Link>
  );
}
