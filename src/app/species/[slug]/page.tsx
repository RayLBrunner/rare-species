import { Metadata } from "next";
import { notFound } from "next/navigation";
import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesOverview from "@/components/species/SpeciesOverview";
import StatusRankBar from "@/components/species/StatusRankBar";
import { getSpeciesBySlug } from "@/lib/species";

interface SpeciesPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates dynamic SEO metadata for each species page.
 */
export async function generateMetadata({
  params,
}: SpeciesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species) return { title: "Species Not Found" };

  const title = `${species.commonName} (${species.scientificName}) | ORBIC Field Guide`;
  const description =
    species.habitatDescription ||
    `Learn about the ${species.commonName}, a rare taxon tracked by ORBIC in Oregon.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/images/species/${species.elementGlobalId}.webp`],
    },
  };
}

export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species) {
    notFound();
  }

  return (
    <main className="w-full">
      <SpeciesHero species={species} />
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <StatusRankBar species={species} />
        <SpeciesOverview species={species} />
      </div>
    </main>
  );
}