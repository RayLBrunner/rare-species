import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { getFeaturedSpecies } from "@/lib/species";
import { getStatusBadges } from "@/lib/ranks";
import FeaturedSpeciesCarousel from "./FeaturedSpeciesCarousel";
import type { FeaturedSpeciesItem } from "./FeaturedSpeciesCarousel";

const SPECIES_IMAGES_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "species",
);

export default function FeaturedSpecies() {
  const species: FeaturedSpeciesItem[] = getFeaturedSpecies().map((s) => {
    const imagePath = path.join(SPECIES_IMAGES_DIR, `${s.elementGlobalId}.webp`);
    const hasImage = fs.existsSync(imagePath);

    return {
      name: s.commonName ?? s.scientificName,
      scientificName: s.scientificName,
      slug: s.slug,
      image: hasImage ? `/images/species/${s.elementGlobalId}.webp` : null,
      statuses: getStatusBadges(s),
    };
  });

  return (
    <section aria-labelledby="featured-species-heading">
      <div className="mb-4 z-30 flex items-end justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-[#15803d]">
            Discover something rare
          </p>

          <h2
            id="featured-species-heading"
            className="font-heading text-lg font-bold"
          >
            Featured Species
          </h2>
        </div>

        <Link
          href="/species"
          className="font-body z-40 cursor-pointer text-[13px]"
        >
          View all →
        </Link>
      </div>

      <FeaturedSpeciesCarousel species={species} />
    </section>
  );
}
