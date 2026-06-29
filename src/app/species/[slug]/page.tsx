import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesOverview from "@/components/species/SpeciesOverview";
import StatusRankBar from "@/components/species/StatusRankBar";

export default function SpeciesPage() {
  return (
    <main className="w-full">
      <SpeciesHero />
      <div className="mx-auto w-full max-w-7xl">
        <StatusRankBar />
        <SpeciesOverview />
      </div>
    </main>
  );
}
