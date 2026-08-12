import Hero from "../components/home/Hero";
import SpeciesCategories from "../components/home/ExploreBySpecies";
import BrowseByStatus from "../components/home/BrowseByStatus";
import ExploreMap from "../components/home/ExploreMap";
import FeaturedSpecies from "@/components/home/FeaturedSpecies";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-16">
        <div className="space-y-4">
          <FeaturedSpecies />
          <SpeciesCategories />
          <BrowseByStatus />
          <ExploreMap />
        </div>
      </main>
    </>
  );
}
