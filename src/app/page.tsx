import Hero from "../components/home/Hero";
import SpeciesCategories from "../components/home/ExploreBySpecies";
import BrowseByStatus from "../components/home/BrowseByStatus";
import EcoregionExplorer from "@/components/home/EcoregionExplorer";
import FeaturedSpecies from "@/components/home/FeaturedSpecies";
import CTASection from "@/components/home/CTASection";
import { ECOREGION_VIEWBOX, getEcoregionPaths } from "@/lib/ecoregionMap";
import { ECOREGION_ID_ORDER, getSpeciesCountByEcoregion } from "@/lib/species";

export default function Home() {
  // Read the map geometry and tally the per-region counts on the server so the
  // full species dataset never ships to the browser for this section.
  const ecoregionPaths = getEcoregionPaths();
  const ecoregionCounts = getSpeciesCountByEcoregion();

  return (
    <>
      <Hero />
      <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-16">
        <div className="space-y-4">
          <FeaturedSpecies />
          <SpeciesCategories />
          <BrowseByStatus />
          <EcoregionExplorer
            paths={ecoregionPaths}
            counts={ecoregionCounts}
            viewBox={ECOREGION_VIEWBOX}
            order={ECOREGION_ID_ORDER}
          />
        </div>
      </main>
      <CTASection />
    </>
  );
}
