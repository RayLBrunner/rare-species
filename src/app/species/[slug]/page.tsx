import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpeciesBySlug } from "../../../lib/api";
import SpeciesHero from "../../../components/species/SpeciesHero";
import SpeciesOverview from "../../../components/species/SpeciesOverview";
import StatusRankBar from "../../../components/species/StatusRankBar";

/**
 * Generates dynamic SEO metadata for each species page.
 * Uses SCOMNAME and SNAME from the TaxonImagesIndex.
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const species = await getSpeciesBySlug(slug);

  if (!species) return { title: "Species Not Found" };

  // Format: "Common Name (Scientific Name) | ORBIC Field Guide"
  const title = `${species.commonName} (${species.scientificName}) | ORBIC Field Guide`;
  const description = species.habitatDescription || 
                      `Learn about the ${species.commonName}, a rare taxon tracked by ORBIC in Oregon.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // Relative path resolved via metadataBase in root layout.
      // Uses the curated .webp library named by elementGlobalId.
      images: [`/images/species/${species.elementGlobalId}.webp`],
    },
  };
}

export default async function SpeciesPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const species = await getSpeciesBySlug(slug);

  // Trigger a proper 404 for missing taxa per project audit requirements .
  if (!species) notFound();

  return (
    <main className="w-full">
      {/* Data is passed to sub-components to render species-specific details */}
      <SpeciesHero species={species} />
      <div className="mx-auto w-full max-w-7xl px-4">
        <StatusRankBar species={species} />
        <SpeciesOverview species={species} />
      </div>
    </main>
  );
}