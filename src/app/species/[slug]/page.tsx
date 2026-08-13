import { notFound } from "next/navigation";
import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesOverview from "@/components/species/SpeciesOverview";
import StatusRankBar from "@/components/species/StatusRankBar";
import { getSpeciesBySlug } from "@/lib/species";

interface SpeciesPageProps {
  params: Promise<{ slug: string }>;
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
